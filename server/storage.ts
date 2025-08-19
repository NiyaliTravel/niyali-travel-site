import { 
  users, agents, guestHouses, bookings, experiences, ferrySchedules, reviews, chatMessages, loyaltyProgram,
  type User, type InsertUser, type Agent, type InsertAgent, type GuestHouse, type InsertGuestHouse,
  type Booking, type InsertBooking, type Experience, type InsertExperience, type FerrySchedule, 
  type InsertFerrySchedule, type Review, type InsertReview, type ChatMessage, type InsertChatMessage,
  type LoyaltyProgram
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc, sql, like, or } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;

  // Agent operations
  getAgent(id: string): Promise<Agent | undefined>;
  getAgentByUserId(userId: string): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: string, agent: Partial<InsertAgent>): Promise<Agent | undefined>;
  getAgentsByTier(tier: string): Promise<Agent[]>;
  getAllAgents(): Promise<Agent[]>;

  // Guest House operations
  getGuestHouse(id: string): Promise<GuestHouse | undefined>;
  getAllGuestHouses(): Promise<GuestHouse[]>;
  getFeaturedGuestHouses(): Promise<GuestHouse[]>;
  getGuestHousesByAtoll(atoll: string): Promise<GuestHouse[]>;
  searchGuestHouses(query: string): Promise<GuestHouse[]>;
  createGuestHouse(guestHouse: InsertGuestHouse): Promise<GuestHouse>;
  updateGuestHouse(id: string, guestHouse: Partial<InsertGuestHouse>): Promise<GuestHouse | undefined>;

  // Booking operations
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  getBookingsByAgent(agentId: string): Promise<Booking[]>;
  getBookingsByGuestHouse(guestHouseId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  getBookingAvailability(guestHouseId: string, checkIn: Date, checkOut: Date): Promise<boolean>;

  // Experience operations
  getAllExperiences(): Promise<Experience[]>;
  getFeaturedExperiences(): Promise<Experience[]>;
  getExperiencesByCategory(category: string): Promise<Experience[]>;
  getExperience(id: string): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;

  // Ferry Schedule operations
  getAllFerrySchedules(): Promise<FerrySchedule[]>;
  searchFerrySchedules(from: string, to: string, date?: string): Promise<FerrySchedule[]>;
  getFerrySchedule(id: string): Promise<FerrySchedule | undefined>;
  createFerrySchedule(schedule: InsertFerrySchedule): Promise<FerrySchedule>;

  // Review operations
  getReviewsByGuestHouse(guestHouseId: string): Promise<Review[]>;
  getReviewsByUser(userId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Chat operations
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;

  // Loyalty Program operations
  getLoyaltyProgram(userId: string): Promise<LoyaltyProgram | undefined>;
  updateLoyaltyPoints(userId: string, points: number): Promise<LoyaltyProgram | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, updateUser: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ ...updateUser, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Agent operations
  async getAgent(id: string): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent || undefined;
  }

  async getAgentByUserId(userId: string): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.userId, userId));
    return agent || undefined;
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const [agent] = await db.insert(agents).values(insertAgent).returning();
    return agent;
  }

  async updateAgent(id: string, updateAgent: Partial<InsertAgent>): Promise<Agent | undefined> {
    const [agent] = await db.update(agents)
      .set(updateAgent)
      .where(eq(agents.id, id))
      .returning();
    return agent || undefined;
  }

  async getAgentsByTier(tier: string): Promise<Agent[]> {
    return await db.select().from(agents).where(eq(agents.tier, tier));
  }

  async getAllAgents(): Promise<Agent[]> {
    return await db.select().from(agents).where(eq(agents.isActive, true));
  }

  // Guest House operations
  async getGuestHouse(id: string): Promise<GuestHouse | undefined> {
    const [guestHouse] = await db.select().from(guestHouses).where(eq(guestHouses.id, id));
    return guestHouse || undefined;
  }

  async getAllGuestHouses(): Promise<GuestHouse[]> {
    return await db.select().from(guestHouses)
      .where(eq(guestHouses.isActive, true))
      .orderBy(desc(guestHouses.rating));
  }

  async getFeaturedGuestHouses(): Promise<GuestHouse[]> {
    return await db.select().from(guestHouses)
      .where(and(eq(guestHouses.isActive, true), eq(guestHouses.featured, true)))
      .orderBy(desc(guestHouses.rating));
  }

  async getGuestHousesByAtoll(atoll: string): Promise<GuestHouse[]> {
    return await db.select().from(guestHouses)
      .where(and(eq(guestHouses.isActive, true), eq(guestHouses.atoll, atoll)))
      .orderBy(desc(guestHouses.rating));
  }

  async searchGuestHouses(query: string): Promise<GuestHouse[]> {
    return await db.select().from(guestHouses)
      .where(
        and(
          eq(guestHouses.isActive, true),
          or(
            like(guestHouses.name, `%${query}%`),
            like(guestHouses.description, `%${query}%`),
            like(guestHouses.atoll, `%${query}%`),
            like(guestHouses.island, `%${query}%`)
          )
        )
      )
      .orderBy(desc(guestHouses.rating));
  }

  async createGuestHouse(insertGuestHouse: InsertGuestHouse): Promise<GuestHouse> {
    const [guestHouse] = await db.insert(guestHouses).values(insertGuestHouse).returning();
    return guestHouse;
  }

  async updateGuestHouse(id: string, updateGuestHouse: Partial<InsertGuestHouse>): Promise<GuestHouse | undefined> {
    const [guestHouse] = await db.update(guestHouses)
      .set({ ...updateGuestHouse, updatedAt: new Date() })
      .where(eq(guestHouses.id, id))
      .returning();
    return guestHouse || undefined;
  }

  // Booking operations
  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
  }

  async getBookingsByAgent(agentId: string): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.agentId, agentId))
      .orderBy(desc(bookings.createdAt));
  }

  async getBookingsByGuestHouse(guestHouseId: string): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.guestHouseId, guestHouseId))
      .orderBy(desc(bookings.createdAt));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async updateBooking(id: string, updateBooking: Partial<InsertBooking>): Promise<Booking | undefined> {
    const [booking] = await db.update(bookings)
      .set({ ...updateBooking, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  async getBookingAvailability(guestHouseId: string, checkIn: Date, checkOut: Date): Promise<boolean> {
    const conflictingBookings = await db.select().from(bookings)
      .where(
        and(
          eq(bookings.guestHouseId, guestHouseId),
          or(
            and(gte(bookings.checkIn, checkIn), lte(bookings.checkIn, checkOut)),
            and(gte(bookings.checkOut, checkIn), lte(bookings.checkOut, checkOut)),
            and(lte(bookings.checkIn, checkIn), gte(bookings.checkOut, checkOut))
          ),
          or(eq(bookings.status, "confirmed"), eq(bookings.status, "pending"))
        )
      );
    
    return conflictingBookings.length === 0;
  }

  // Experience operations
  async getAllExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences)
      .where(eq(experiences.isActive, true))
      .orderBy(desc(experiences.rating));
  }

  async getFeaturedExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences)
      .where(and(eq(experiences.isActive, true), eq(experiences.featured, true)))
      .orderBy(desc(experiences.rating));
  }

  async getExperiencesByCategory(category: string): Promise<Experience[]> {
    return await db.select().from(experiences)
      .where(and(eq(experiences.isActive, true), eq(experiences.category, category)))
      .orderBy(desc(experiences.rating));
  }

  async getExperience(id: string): Promise<Experience | undefined> {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience || undefined;
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [experience] = await db.insert(experiences).values(insertExperience).returning();
    return experience;
  }

  // Ferry Schedule operations
  async getAllFerrySchedules(): Promise<FerrySchedule[]> {
    return await db.select().from(ferrySchedules)
      .where(eq(ferrySchedules.isActive, true))
      .orderBy(ferrySchedules.departureTime);
  }

  async searchFerrySchedules(from: string, to: string, date?: string): Promise<FerrySchedule[]> {
    let query = db.select().from(ferrySchedules)
      .where(
        and(
          eq(ferrySchedules.isActive, true),
          eq(ferrySchedules.fromLocation, from),
          eq(ferrySchedules.toLocation, to)
        )
      );

    if (date) {
      const dayOfWeek = new Date(date).toLocaleLowerCase('en-US', { weekday: 'long' });
      query = query.where(
        sql`${ferrySchedules.operatingDays} @> ARRAY[${dayOfWeek}]::text[]`
      );
    }

    return await query.orderBy(ferrySchedules.departureTime);
  }

  async getFerrySchedule(id: string): Promise<FerrySchedule | undefined> {
    const [schedule] = await db.select().from(ferrySchedules).where(eq(ferrySchedules.id, id));
    return schedule || undefined;
  }

  async createFerrySchedule(insertSchedule: InsertFerrySchedule): Promise<FerrySchedule> {
    const [schedule] = await db.insert(ferrySchedules).values(insertSchedule).returning();
    return schedule;
  }

  // Review operations
  async getReviewsByGuestHouse(guestHouseId: string): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(eq(reviews.guestHouseId, guestHouseId))
      .orderBy(desc(reviews.createdAt));
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    return review;
  }

  // Chat operations
  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    return message;
  }

  // Loyalty Program operations
  async getLoyaltyProgram(userId: string): Promise<LoyaltyProgram | undefined> {
    const [program] = await db.select().from(loyaltyProgram).where(eq(loyaltyProgram.userId, userId));
    return program || undefined;
  }

  async updateLoyaltyPoints(userId: string, points: number): Promise<LoyaltyProgram | undefined> {
    const [program] = await db.update(loyaltyProgram)
      .set({ 
        points: sql`${loyaltyProgram.points} + ${points}`,
        updatedAt: new Date()
      })
      .where(eq(loyaltyProgram.userId, userId))
      .returning();
    return program || undefined;
  }
}

export const storage = new DatabaseStorage();
