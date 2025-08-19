# Overview

Niyali Travel is a full-stack web application for authentic Maldivian travel experiences, specializing in guest house bookings and cultural experiences. The platform features an AI-powered chatbot, domestic airlines functionality, agent commission system, real-time ferry schedules, and backend content management. Built with React, Express, and PostgreSQL, it targets travelers seeking local Maldivian experiences beyond traditional resorts.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the user interface
- **Vite** as the build tool and development server
- **Tailwind CSS** with custom theming for styling
- **shadcn/ui** component library for consistent UI elements
- **Wouter** for client-side routing (lightweight React Router alternative)
- **TanStack Query** for server state management and API caching
- **WebSocket** integration for real-time features like chat

## Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with authentication middleware
- **WebSocket server** for real-time chat and notifications
- **JWT-based authentication** with bcrypt for password hashing
- **Session management** with connect-pg-simple
- **OpenAI integration** for AI chatbot and sentiment analysis

## Database Design
- **PostgreSQL** with Drizzle ORM for type-safe database operations
- **Neon Database** as the cloud PostgreSQL provider
- **Schema-first approach** with shared types between frontend and backend
- **Key entities**: Users, Agents, Guest Houses, Bookings, Experiences, Ferry Schedules, Reviews, Chat Messages, Loyalty Program
- **Relational design** with proper foreign keys and constraints

## Authentication & Authorization
- **Role-based access control** (traveler, agent, admin)
- **JWT tokens** for stateless authentication
- **Agent verification system** with tier-based commission rates
- **Secure password handling** with bcrypt hashing

## External Dependencies

- **@neondatabase/serverless**: Cloud PostgreSQL database connection
- **OpenAI API**: Powers the AI chatbot and sentiment analysis features
- **WebSocket (ws)**: Real-time communication for chat functionality
- **Radix UI**: Accessible component primitives for the UI
- **Google Fonts**: Custom typography (Inter, Playfair Display, Fira Code)
- **Unsplash**: Image hosting for property and destination photos

## Key Features
- **Domestic Airlines System**: Comprehensive flight booking with real-time search and filtering
- **AI Travel Assistant**: OpenAI-powered chatbot for personalized recommendations and flight queries
- **Agent Portal**: Commission tracking, booking management, and tier progression
- **Ferry Schedule Integration**: Real-time transportation information
- **Backend Content Management**: Admin dashboard for editing website content and navigation
- **Interactive Statistics**: Animated counters and smooth transitions for engagement
- **Multi-language Support**: Prepared for internationalization
- **Mobile-responsive Design**: Optimized for all device sizes
- **Real-time Notifications**: WebSocket-based live updates

## Recent Changes
- Removed VR tour functionality completely from all components
- Added comprehensive domestic airlines database schema and API endpoints
- Created interactive admin dashboard for content management
- Enhanced website interactivity with animated statistics and hover effects
- Implemented backend routes for content sections and navigation management
- Updated UI components to remove VR references and improve user experience