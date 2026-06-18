# AI Resume Builder - Frontend

Modern, production-ready React frontend for AI Resume Builder.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zustand** - State management
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## Project Structure

```
src/
├── api/              # API integration (axios, endpoints)
├── assets/           # Images, fonts, etc.
├── components/
│   ├── builder/      # Resume builder components
│   ├── common/       # Reusable UI components
│   ├── layout/       # Layout components (Navbar, Sidebar, Footer)
│   └── resumeSections/  # Resume section forms
├── constants/        # App constants and templates
├── context/          # React context (optional)
├── hooks/            # Custom hooks
├── pages/            # Page components
│   ├── Auth/         # Login, Register pages
│   └── Dashboard.jsx # Dashboard page
├── routes/           # Route configuration
├── store/            # Zustand stores (Auth, Resume, UI)
├── utils/            # Helper functions
└── App.jsx          # Main App component
```

## Setup Instructions

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=AI Resume Builder
```

### Development

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Features Implemented

### ✅ Authentication
- User Registration with validation
- User Login with JWT
- Protected routes
- Auto-login from localStorage

### ✅ Landing Page
- Hero section with CTA buttons
- Features showcase
- Resume templates preview
- How it works section
- Professional design with animations

### ✅ Dashboard
- Resume overview cards
- List of user resumes
- Create, Edit, Delete resumes
- Download PDF
- Responsive design

### ✅ Resume Builder
- Multi-section form
- Personal Information
- Professional Summary
- Education (add/edit/delete)
- Experience (add/edit/delete)
- Projects (add/edit/delete)
- Skills (add/edit/delete)
- Live preview on right side
- Auto-save functionality
- Real-time updates

### ✅ Templates Page
- Template showcase
- Preview functionality
- Template selection

### ✅ User Profile
- Edit profile information
- User information display

### ✅ Common Features
- Toast notifications
- Loading states
- Error handling
- Mobile responsive design
- Smooth animations with Framer Motion
- Form validation with React Hook Form

## API Integration

All API calls are centralized in `src/api/endpoints.js`:

```javascript
import { authAPI, resumeAPI, educationAPI, experienceAPI, projectAPI, skillAPI } from './api/endpoints'
```

### Authentication
- `authAPI.register(data)` - Register user
- `authAPI.login(data)` - Login user

### Resumes
- `resumeAPI.create(data)` - Create resume
- `resumeAPI.getAll()` - Get all resumes
- `resumeAPI.getById(id)` - Get single resume
- `resumeAPI.getFull(id)` - Get complete resume with all sections
- `resumeAPI.update(id, data)` - Update resume
- `resumeAPI.updateTemplate(id, template)` - Update template
- `resumeAPI.delete(id)` - Delete resume
- `resumeAPI.getPDF(id)` - Download PDF

### Sections (Similar patterns for Education, Experience, Projects, Skills)
- Create: `resumeAPI.create(resumeId, data)`
- Update: `resumeAPI.update(id, data)`
- Delete: `resumeAPI.delete(id)`

## State Management

Using Zustand stores in `src/store/store.js`:

```javascript
// Auth Store
useAuthStore() - { user, token, isAuthenticated, setUser, setToken, logout }

// Resume Store
useResumeStore() - { resumes, currentResume, setResumes, setCurrentResume, ... }

// UI Store
useUIStore() - { showSidebar, loading, error, setSidebar, setLoading, ... }
```

## Styling

- Tailwind CSS with custom theme in `tailwind.config.js`
- Primary gradient: Blue to Purple
- Responsive utilities for mobile-first design
- Custom CSS classes in `src/index.css`

## Custom Hooks

- `useToast()` - Toast notifications
- `useAsync()` - Async operations with loading/error states
- `useDebounce()` - Debounce values

## Code Quality

- ESLint configured for React
- Clean folder structure
- Reusable components
- Proper error handling
- Loading states everywhere
- Mobile-first responsive design
- Production-ready code

## Deployment

### Build the frontend
```bash
npm run build
```

### Deploy to production (example with Netlify)
```bash
netlify deploy --prod --dir=dist
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Dark mode
- [ ] Multiple language support
- [ ] Advanced resume templates
- [ ] AI-powered content suggestions
- [ ] Resume versioning
- [ ] Share resume link
- [ ] Email resume
- [ ] ATS score checker
- [ ] Cover letter builder
- [ ] Interview tips
