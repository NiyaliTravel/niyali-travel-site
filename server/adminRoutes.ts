import type { Express } from "express";
import { storageWrapper as storage } from "./storageWrapper";
import { verifyAdmin } from "./middleware";
import { 
  insertGuestHouseSchema, 
  insertExperienceSchema, 
  insertFerryScheduleSchema, 
  insertDomesticAirlineSchema, 
  insertPackageSchema 
} from "@shared/schema";

export function registerAdminRoutes(app: Express) {
  // Guest Houses
  app.post('/api/admin/guest-houses', verifyAdmin, async (req, res) => {
    try {
      const guestHouseData = insertGuestHouseSchema.parse(req.body);
      const guestHouse = await storage.createGuestHouse(guestHouseData);
      res.status(201).json(guestHouse);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create guest house', error: (error as Error).message });
    }
  });

  app.put('/api/admin/guest-houses/:id', verifyAdmin, async (req, res) => {
    try {
      const guestHouseData = insertGuestHouseSchema.partial().parse(req.body);
      const guestHouse = await storage.updateGuestHouse(req.params.id, guestHouseData);
      if (!guestHouse) {
        return res.status(404).json({ message: 'Guest house not found' });
      }
      res.json(guestHouse);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update guest house', error: (error as Error).message });
    }
  });

  app.delete('/api/admin/guest-houses/:id', verifyAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteGuestHouse(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Guest house not found' });
      }
      res.json({ message: 'Guest house deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete guest house', error: (error as Error).message });
    }
  });

  // Experiences
  app.post('/api/admin/experiences', verifyAdmin, async (req, res) => {
    try {
      const experienceData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(experienceData);
      res.status(201).json(experience);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create experience', error: (error as Error).message });
    }
  });

  app.put('/api/admin/experiences/:id', verifyAdmin, async (req, res) => {
    try {
      const experienceData = insertExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateExperience(req.params.id, experienceData);
      if (!experience) {
        return res.status(404).json({ message: 'Experience not found' });
      }
      res.json(experience);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update experience', error: (error as Error).message });
    }
  });

  app.delete('/api/admin/experiences/:id', verifyAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteExperience(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Experience not found' });
      }
      res.json({ message: 'Experience deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete experience', error: (error as Error).message });
    }
  });

  // Ferry Schedules
  app.post('/api/admin/ferry-schedules', verifyAdmin, async (req, res) => {
    try {
      const scheduleData = insertFerryScheduleSchema.parse(req.body);
      const schedule = await storage.createFerrySchedule(scheduleData);
      res.status(201).json(schedule);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create ferry schedule', error: (error as Error).message });
    }
  });

  app.put('/api/admin/ferry-schedules/:id', verifyAdmin, async (req, res) => {
    try {
      const scheduleData = insertFerryScheduleSchema.partial().parse(req.body);
      const schedule = await storage.updateFerrySchedule(req.params.id, scheduleData);
      if (!schedule) {
        return res.status(404).json({ message: 'Ferry schedule not found' });
      }
      res.json(schedule);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update ferry schedule', error: (error as Error).message });
    }
  });

  app.delete('/api/admin/ferry-schedules/:id', verifyAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteFerrySchedule(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Ferry schedule not found' });
      }
      res.json({ message: 'Ferry schedule deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete ferry schedule', error: (error as Error).message });
    }
  });

  // Domestic Airlines
  app.post('/api/admin/domestic-airlines', verifyAdmin, async (req, res) => {
    try {
      const airlineData = insertDomesticAirlineSchema.parse(req.body);
      const airline = await storage.createDomesticAirline(airlineData);
      res.status(201).json(airline);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create airline', error: (error as Error).message });
    }
  });

  app.put('/api/admin/domestic-airlines/:id', verifyAdmin, async (req, res) => {
    try {
      const airlineData = insertDomesticAirlineSchema.partial().parse(req.body);
      const airline = await storage.updateDomesticAirline(req.params.id, airlineData);
      if (!airline) {
        return res.status(404).json({ message: 'Domestic airline not found' });
      }
      res.json(airline);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update domestic airline', error: (error as Error).message });
    }
  });

  app.delete('/api/admin/domestic-airlines/:id', verifyAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteDomesticAirline(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Domestic airline not found' });
      }
      res.json({ message: 'Domestic airline deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete domestic airline', error: (error as Error).message });
    }
  });

  // Packages
  app.post('/api/admin/packages', verifyAdmin, async (req, res) => {
    try {
      const packageData = insertPackageSchema.parse(req.body);
      const pkg = await storage.createPackage(packageData);
      res.status(201).json(pkg);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create package', error: (error as Error).message });
    }
  });

  app.put('/api/admin/packages/:id', verifyAdmin, async (req, res) => {
    try {
      const packageData = insertPackageSchema.partial().parse(req.body);
      const pkg = await storage.updatePackage(req.params.id, packageData);
      if (!pkg) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.json(pkg);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update package', error: (error as Error).message });
    }
  });

  app.delete('/api/admin/packages/:id', verifyAdmin, async (req, res) => {
    try {
      const deleted = await storage.deletePackage(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.json({ message: 'Package deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete package', error: (error as Error).message });
    }
  });
}