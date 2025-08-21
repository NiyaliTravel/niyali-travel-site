# NiyaliTravel.com UI/UX Design Specifications

## Overview
This document outlines the UI/UX design specifications for NiyaliTravel.com, a cinematic travel platform connecting travelers with local Maldivian experiences. The design focuses on emotional storytelling, authentic experiences, and seamless user journeys.

## Color Palette
The color palette is inspired by the Maldivian landscape and ocean:

### Primary Colors
- **Ocean Blue**: hsl(222.2, 47.4%, 11.2%) - Used for primary actions, navigation, and key elements
- **Coral Accent**: #FF6B6B - Used for highlights, CTAs, and important notifications
- **Sand Beige**: #F4E7D3 - Used for backgrounds and subtle accents

### Secondary Colors
- **Seafoam Green**: #4ECDC4 - Used for success states and eco-friendly elements
- **Sunset Orange**: #FF9F68 - Used for warnings and special offers
- **Deep Navy**: #1A365D - Used for text and secondary actions

### Neutral Colors
- **White**: #FFFFFF - Primary background
- **Light Gray**: #F8F9FA - Secondary backgrounds
- **Medium Gray**: #6C757D - Supporting text
- **Dark Gray**: #343A40 - Primary text

## Typography
The typography system balances elegance with readability:

### Headings
- **Font Family**: 'Playfair Display' (serif) for emotional impact
- **Weights**: Bold (700) for all headings
- **Sizes**:
  - H1: 3rem (mobile) / 4rem (desktop)
  - H2: 2.5rem (mobile) / 3rem (desktop)
  - H3: 2rem (mobile) / 2.5rem (desktop)
  - H4: 1.5rem (mobile) / 2rem (desktop)

### Body Text
- **Font Family**: 'Open Sans' (sans-serif) for readability
- **Weights**: Regular (400) and Semi-Bold (600)
- **Sizes**:
  - Large: 1.125rem
  - Default: 1rem
  - Small: 0.875rem

## Layout & Spacing
The layout follows a mobile-first, responsive approach:

### Grid System
- **Desktop**: 12-column grid with 24px gutters
- **Tablet**: 8-column grid with 16px gutters
- **Mobile**: 4-column grid with 16px gutters

### Spacing Scale
- XS: 0.25rem (4px)
- SM: 0.5rem (8px)
- MD: 1rem (16px)
- LG: 1.5rem (24px)
- XL: 2rem (32px)
- XXL: 3rem (48px)

## Component Design

### Buttons
Buttons follow a consistent style with clear hierarchy:

#### Primary Button
- Background: Ocean Blue
- Text: White
- Hover: Darken by 10%
- Border Radius: 4px
- Padding: 12px 24px

#### Secondary Button
- Background: Transparent
- Border: 2px solid Ocean Blue
- Text: Ocean Blue
- Hover: Light Blue background
- Border Radius: 4px
- Padding: 12px 24px

#### Accent Button
- Background: Coral Accent
- Text: White
- Hover: Darken by 10%
- Border Radius: 4px
- Padding: 12px 24px

### Cards
Cards are used for content presentation with subtle shadows:

#### Default Card
- Background: White
- Border Radius: 8px
- Shadow: 0 4px 12px rgba(0,0,0,0.05)
- Padding: 24px
- Hover: Shadow intensifies to 0 6px 16px rgba(0,0,0,0.08)

#### Experience Card
- Image: Full-width with 16:9 aspect ratio
- Content: Padding 16px
- Meta: Small text with muted color
- CTA: Primary button at bottom

### Forms
Forms prioritize usability and accessibility:

#### Input Fields
- Height: 48px
- Border: 1px solid Light Gray
- Border Radius: 4px
- Focus: 2px solid Ocean Blue
- Padding: 0 16px

#### Labels
- Font Size: 0.875rem
- Color: Medium Gray
- Margin Bottom: 8px

#### Error States
- Border: 2px solid #FF6B6B
- Text: #FF6B6B
- Icon: Warning triangle

## Navigation

### Header Navigation
- Logo: Top left
- Main Navigation: Center aligned
- User Menu: Top right
- Mobile: Hamburger menu with slide-in panel

### Footer Navigation
- Columns: 4 columns on desktop, 2 columns on mobile
- Links: Medium Gray text
- Hover: Ocean Blue text

## Page Templates

### Homepage Template
1. Hero Section
   - Full-screen background image
   - Overlay: Semi-transparent dark layer
   - Content: Centered with headline, subheadline, and CTA
   - Mood Selector: 4 mood cards below hero

2. Search Section
   - White card with shadow
   - Grid layout for search fields
   - Primary CTA button

3. Featured Experiences
   - Section title with view all link
   - Grid of experience cards (3 columns desktop, 1 column mobile)

4. Testimonials
   - Blue background
   - Quote cards with avatar and rating

5. CTA Section
   - Gradient background (Ocean Blue to Deep Navy)
   - Centered content with dual CTAs

### Destination Page Template
1. Hero Section
   - Destination image with gradient overlay
   - Title and description
   - Breadcrumb navigation

2. Filter Section
   - Search and filter controls
   - Results count

3. Atoll Grid
   - Responsive grid of destination cards
   - Each card with image, title, description, and highlights

4. Interactive Map
   - Placeholder for future map implementation
   - Call-to-action to view map

5. Planning Tips
   - Three cards with icons
   - Concise, helpful information

### Experience Page Template
1. Hero Section
   - Category image with gradient overlay
   - Title and description
   - Breadcrumb navigation

2. Filter Section
   - Search and filter controls
   - Results count

3. Experience Grid
   - Responsive grid of experience cards
   - Each card with image, title, location, price, and rating

4. Category Highlights
   - Featured categories with icons
   - Brief descriptions

### Agent Portal Template
1. Dashboard
   - Welcome message with user name
   - Key metrics cards (4 cards)
   - Recent activity feed
   - Performance metrics

2. Bookings Tab
   - Table of bookings with status
   - Filter and search controls
   - Action buttons for each booking

3. Clients Tab
   - Client list with avatars
   - Client details and spending history
   - Messaging options

4. Commission Tab
   - Commission tracking charts
   - Payment history
   - Performance bonuses

5. Profile Tab
   - User information form
   - Profile picture upload
   - Preferences settings

### Traveler Portal Template
1. Dashboard
   - Welcome message with user name
   - Quick stats cards (4 cards)
   - Upcoming trips preview
   - Recent messages

2. My Trips Tab
   - Upcoming and past trips sections
   - Trip cards with details
   - Booking status indicators

3. Wishlist Tab
   - Grid of wishlist items
   - Add to booking option
   - Remove from wishlist option

4. Messages Tab
   - Conversation list
   - Message composer
   - Unread message indicators

5. Profile Tab
   - User information form
   - Profile picture upload
   - Preferences settings

## Microinteractions

### Hover Effects
- Buttons: Subtle scale transformation (1.05x)
- Cards: Elevation increase with shadow
- Links: Underline animation

### Loading States
- Skeleton loaders for content
- Animated spinner for actions
- Progress indicators for multi-step processes

### Form Feedback
- Real-time validation
- Success and error messages with icons
- Field highlighting for errors

## Accessibility

### Color Contrast
- All text meets WCAG 2.1 AA standards
- Sufficient contrast between background and text
- Colorblind-friendly palette

### Keyboard Navigation
- Full keyboard operability
- Visible focus indicators
- Skip to content link

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for interactive elements
- Descriptive alt text for images

## Responsive Design

### Breakpoints
- Mobile: 0px - 768px
- Tablet: 769px - 1024px
- Desktop: 1025px - 1440px
- Large Desktop: 1441px+

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly sizing for interactive elements

## Performance Considerations

### Image Optimization
- WebP format for modern browsers
- Responsive images with srcset
- Lazy loading for below-fold content

### Animation Performance
- CSS transitions for smooth animations
- RequestAnimationFrame for complex animations
- Reduced motion preference support

## Future Enhancements

### Dark Mode
- Toggle switch in user menu
- Automatic detection based on system preference
- Custom color palette for dark mode

### Personalization
- User preference storage
- Recommended experiences based on history
- Customizable dashboard widgets

This design specification ensures a consistent, emotionally resonant user experience that aligns with the brand's mission of connecting travelers with authentic Maldivian experiences.