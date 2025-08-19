import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  country: text("country"),
  profileImage: text("profile_image"),
  role: text("role").notNull().default("traveler"), // traveler, agent, admin
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Agents table (extends users)
export const agents = pgTable("agents", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id).notNull(),
  companyName: text("company_name"),
  bio: text("bio"),
  languagesSpoken: text("languages_spoken").array(),
  preferredAtolls: text("preferred_atolls").array(),
  tier: text("tier").default("bronze"), // bronze, silver, gold, platinum
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).default("10.00"),
  totalEarnings: decimal("total_earnings", { precision: 12, scale: 2 }).default("0.00"),
  isActive: boolean("is_active").default(true),
  whatsappNumber: text("whatsapp_number"),
  verificationStatus: text("verification_status").default("pending"), // pending, verified, rejected
});

// Guest Houses table
export const guestHouses = pgTable("guest_houses", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  atoll: text("atoll").notNull(),
  island: text("island").notNull(),
  location: jsonb("location"), // { lat, lng, address }
  images: text("images").array(),
  vrTourUrl: text("vr_tour_url"),
  amenities: text("amenities").array(),
  roomTypes: jsonb("room_types"), // array of room type objects
  pricePerNight: decimal("price_per_night", { precision: 10, scale: 2 }),
  maxGuests: integer("max_guests"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  reviewCount: integer("review_count").default(0),
  isActive: boolean("is_active").default(true),
  featured: boolean("featured").default(false),
  contactInfo: jsonb("contact_info"),
  policies: jsonb("policies"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id).notNull(),
  guestHouseId: uuid("guest_house_id").references(() => guestHouses.id).notNull(),
  agentId: uuid("agent_id").references(() => agents.id),
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out").notNull(),
  guests: integer("guests").notNull(),
  roomType: text("room_type"),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  agentCommission: decimal("agent_commission", { precision: 12, scale: 2 }),
  status: text("status").default("pending"), // pending, confirmed, cancelled, completed
  paymentStatus: text("payment_status").default("pending"), // pending, paid, refunded
  paymentMethod: text("payment_method"),
  specialRequests: text("special_requests"),
  guestDetails: jsonb("guest_details"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Experiences table
export const experiences = pgTable("experiences", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // freediving, cultural, adventure, culinary
  location: text("location"),
  duration: text("duration"),
  price: decimal("price", { precision: 10, scale: 2 }),
  maxParticipants: integer("max_participants"),
  images: text("images").array(),
  vrPreviewUrl: text("vr_preview_url"),
  difficulty: text("difficulty"), // easy, moderate, challenging
  includedItems: text("included_items").array(),
  requirements: text("requirements").array(),
  isActive: boolean("is_active").default(true),
  featured: boolean("featured").default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  reviewCount: integer("review_count").default(0),
});

// Ferry Schedules table
export const ferrySchedules = pgTable("ferry_schedules", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  operatorName: text("operator_name").notNull(),
  fromLocation: text("from_location").notNull(),
  toLocation: text("to_location").notNull(),
  departureTime: text("departure_time").notNull(),
  arrivalTime: text("arrival_time").notNull(),
  duration: text("duration"),
  price: decimal("price", { precision: 8, scale: 2 }).notNull(),
  vesselType: text("vessel_type"), // speedboat, seaplane, ferry
  capacity: integer("capacity"),
  availableSeats: integer("available_seats"),
  operatingDays: text("operating_days").array(), // ['Monday', 'Tuesday', etc.]
  isActive: boolean("is_active").default(true),
  bookingUrl: text("booking_url"),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id).notNull(),
  bookingId: uuid("booking_id").references(() => bookings.id),
  guestHouseId: uuid("guest_house_id").references(() => guestHouses.id),
  experienceId: uuid("experience_id").references(() => experiences.id),
  rating: integer("rating").notNull(), // 1-5 stars
  title: text("title"),
  comment: text("comment"),
  images: text("images").array(),
  isVerified: boolean("is_verified").default(false),
  helpfulCount: integer("helpful_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// AI Chat Messages table
export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  userId: uuid("user_id").references(() => users.id),
  message: text("message").notNull(),
  sender: text("sender").notNull(), // user, ai, agent
  messageType: text("message_type").default("text"), // text, image, booking, vr_link
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Loyalty Program table
export const loyaltyProgram = pgTable("loyalty_program", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id).notNull(),
  points: integer("points").default(0),
  tier: text("tier").default("explorer"), // explorer, adventurer, navigator, captain
  totalSpent: decimal("total_spent", { precision: 12, scale: 2 }).default("0.00"),
  blockchainAddress: text("blockchain_address"),
  nftCollections: jsonb("nft_collections"),
  redemptionHistory: jsonb("redemption_history"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  agent: one(agents, { fields: [users.id], references: [agents.userId] }),
  bookings: many(bookings),
  reviews: many(reviews),
  chatMessages: many(chatMessages),
  loyaltyProgram: one(loyaltyProgram, { fields: [users.id], references: [loyaltyProgram.userId] }),
}));

export const agentsRelations = relations(agents, ({ one, many }) => ({
  user: one(users, { fields: [agents.userId], references: [users.id] }),
  bookings: many(bookings),
}));

export const guestHousesRelations = relations(guestHouses, ({ many }) => ({
  bookings: many(bookings),
  reviews: many(reviews),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  guestHouse: one(guestHouses, { fields: [bookings.guestHouseId], references: [guestHouses.id] }),
  agent: one(agents, { fields: [bookings.agentId], references: [agents.id] }),
}));

export const experiencesRelations = relations(experiences, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  booking: one(bookings, { fields: [reviews.bookingId], references: [bookings.id] }),
  guestHouse: one(guestHouses, { fields: [reviews.guestHouseId], references: [guestHouses.id] }),
  experience: one(experiences, { fields: [reviews.experienceId], references: [experiences.id] }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
});

export const insertGuestHouseSchema = createInsertSchema(guestHouses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
});

export const insertFerryScheduleSchema = createInsertSchema(ferrySchedules).omit({
  id: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type GuestHouse = typeof guestHouses.$inferSelect;
export type InsertGuestHouse = z.infer<typeof insertGuestHouseSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type FerrySchedule = typeof ferrySchedules.$inferSelect;
export type InsertFerrySchedule = z.infer<typeof insertFerryScheduleSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type LoyaltyProgram = typeof loyaltyProgram.$inferSelect;
