import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { analyzeSentiment } from "./services/openai";
import { 
  insertUserSchema, insertAgentSchema, insertGuestHouseSchema, 
  insertBookingSchema, insertReviewSchema, insertChatMessageSchema,
  type User, type Agent, type GuestHouse, type Booking, type Experience,
  type FerrySchedule, type Review, type ChatMessage
} from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "niyali-travel-secret-key";

// Middleware for authentication
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getUser(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // WebSocket setup for real-time features
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected to WebSocket');
    
    ws.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        
        if (data.type === 'chat_message') {
          // Handle AI chat message
          const chatMessage = await storage.createChatMessage({
            sessionId: data.sessionId,
            userId: data.userId,
            message: data.message,
            sender: 'user',
            messageType: 'text'
          });
          
          // Send AI response (simplified)
          const aiResponse = await storage.createChatMessage({
            sessionId: data.sessionId,
            userId: data.userId,
            message: "Thank you for your message. How can I help you with your Maldivian travel plans?",
            sender: 'ai',
            messageType: 'text'
          });
          
          ws.send(JSON.stringify({ type: 'chat_response', message: aiResponse }));
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  // Authentication routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      
      res.status(201).json({ 
        user: { ...user, password: undefined }, 
        token 
      });
    } catch (error) {
      res.status(400).json({ message: 'Registration failed', error: error.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      
      res.json({ 
        user: { ...user, password: undefined }, 
        token 
      });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  });

  // Guest Houses routes
  app.get('/api/guest-houses', async (req, res) => {
    try {
      const { atoll, search, featured } = req.query;
      
      let guestHouses: GuestHouse[];
      
      if (featured === 'true') {
        guestHouses = await storage.getFeaturedGuestHouses();
      } else if (atoll) {
        guestHouses = await storage.getGuestHousesByAtoll(atoll as string);
      } else if (search) {
        guestHouses = await storage.searchGuestHouses(search as string);
      } else {
        guestHouses = await storage.getAllGuestHouses();
      }
      
      res.json(guestHouses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch guest houses', error: error.message });
    }
  });

  app.get('/api/guest-houses/:id', async (req, res) => {
    try {
      const guestHouse = await storage.getGuestHouse(req.params.id);
      if (!guestHouse) {
        return res.status(404).json({ message: 'Guest house not found' });
      }
      res.json(guestHouse);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch guest house', error: error.message });
    }
  });

  app.post('/api/guest-houses', authenticateToken, async (req, res) => {
    try {
      const guestHouseData = insertGuestHouseSchema.parse(req.body);
      const guestHouse = await storage.createGuestHouse(guestHouseData);
      res.status(201).json(guestHouse);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create guest house', error: error.message });
    }
  });

  // Experiences routes
  app.get('/api/experiences', async (req, res) => {
    try {
      const { category, featured } = req.query;
      
      let experiences: Experience[];
      
      if (featured === 'true') {
        experiences = await storage.getFeaturedExperiences();
      } else if (category) {
        experiences = await storage.getExperiencesByCategory(category as string);
      } else {
        experiences = await storage.getAllExperiences();
      }
      
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch experiences', error: error.message });
    }
  });

  // Ferry Schedules routes
  app.get('/api/ferry-schedules', async (req, res) => {
    try {
      const { from, to, date } = req.query;
      
      let schedules: FerrySchedule[];
      
      if (from && to) {
        schedules = await storage.searchFerrySchedules(
          from as string, 
          to as string, 
          date as string
        );
      } else {
        schedules = await storage.getAllFerrySchedules();
      }
      
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch ferry schedules', error: error.message });
    }
  });

  // Bookings routes
  app.post('/api/bookings', authenticateToken, async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      
      // Check availability
      const isAvailable = await storage.getBookingAvailability(
        bookingData.guestHouseId,
        new Date(bookingData.checkIn),
        new Date(bookingData.checkOut)
      );
      
      if (!isAvailable) {
        return res.status(400).json({ message: 'Guest house not available for selected dates' });
      }
      
      const booking = await storage.createBooking({
        ...bookingData,
        userId: (req as any).user.id
      });
      
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create booking', error: error.message });
    }
  });

  app.get('/api/bookings/user', authenticateToken, async (req, res) => {
    try {
      const bookings = await storage.getBookingsByUser((req as any).user.id);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
    }
  });

  // Agent routes
  app.post('/api/agents', authenticateToken, async (req, res) => {
    try {
      const agentData = insertAgentSchema.parse(req.body);
      const agent = await storage.createAgent({
        ...agentData,
        userId: (req as any).user.id
      });
      res.status(201).json(agent);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create agent profile', error: error.message });
    }
  });

  app.get('/api/agents', async (req, res) => {
    try {
      const agents = await storage.getAllAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agents', error: error.message });
    }
  });

  app.get('/api/agents/profile', authenticateToken, async (req, res) => {
    try {
      const agent = await storage.getAgentByUserId((req as any).user.id);
      if (!agent) {
        return res.status(404).json({ message: 'Agent profile not found' });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agent profile', error: error.message });
    }
  });

  // Reviews routes
  app.post('/api/reviews', authenticateToken, async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      
      // Analyze sentiment of the review
      const sentiment = await analyzeSentiment(reviewData.comment || '');
      
      const review = await storage.createReview({
        ...reviewData,
        userId: (req as any).user.id
      });
      
      res.status(201).json({ ...review, sentiment });
    } catch (error) {
      res.status(400).json({ message: 'Failed to create review', error: error.message });
    }
  });

  app.get('/api/reviews/guest-house/:id', async (req, res) => {
    try {
      const reviews = await storage.getReviewsByGuestHouse(req.params.id);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
  });

  // Chat routes
  app.get('/api/chat/:sessionId', async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch chat messages', error: error.message });
    }
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: 'Failed to send message', error: error.message });
    }
  });

  // Check availability endpoint
  app.post('/api/availability/check', async (req, res) => {
    try {
      const { guestHouseId, checkIn, checkOut } = req.body;
      
      const isAvailable = await storage.getBookingAvailability(
        guestHouseId,
        new Date(checkIn),
        new Date(checkOut)
      );
      
      res.json({ available: isAvailable });
    } catch (error) {
      res.status(500).json({ message: 'Failed to check availability', error: error.message });
    }
  });

  return httpServer;
}
