# Resume Builder - File Structure Reference

```
frontend/
│
├── public/                          # Static assets
│   └── vite.svg                    # Vite logo
│
├── src/
│   ├── api/
│   │   ├── axiosInstance.js        # Axios setup with interceptors
│   │   ├── endpoints.js            # All API endpoint functions
│   │   └── helpers.js              # API utilities (retry, batch, etc)
│   │
│   ├── assets/                     # Images, fonts, etc
│   │
│   ├── components/
│   │   ├── builder/
│   │   │   ├── ResumeBuilderLeft.jsx    # Left form panel
│   │   │   └── ResumePreview.jsx        # Right preview panel
│   │   │
│   │   ├── common/
│   │   │   ├── Loaders.jsx             # Spinner, Skeleton, EmptyState
│   │   │   ├── Modal.jsx               # Reusable modal
│   │   │   └── index.js                # Common exports
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx              # Top navigation bar
│   │   │   ├── Footer.jsx              # Footer component
│   │   │   ├── DashboardSidebar.jsx    # Dashboard sidebar
│   │   │   ├── DashboardNavbar.jsx     # Dashboard top nav
│   │   │   ├── MainLayout.jsx          # Main page layout wrapper
│   │   │   ├── AuthLayout.jsx          # Auth pages layout wrapper
│   │   │   └── DashboardLayout.jsx     # Dashboard layout wrapper
│   │   │
│   │   └── resumeSections/
│   │       ├── PersonalSection.jsx     # Personal info form
│   │       ├── SummarySection.jsx      # Summary form
│   │       ├── EducationSection.jsx    # Education CRUD
│   │       ├── ExperienceSection.jsx   # Experience CRUD
│   │       ├── ProjectSection.jsx      # Projects CRUD
│   │       └── SkillSection.jsx        # Skills CRUD
│   │
│   ├── constants/
│   │   ├── index.js                    # App constants (templates, sections)
│   │   └── messages.js                 # Error/success messages
│   │
│   ├── hooks/
│   │   ├── useToast.js                 # Toast notifications hook
│   │   ├── useAsync.js                 # Async operations hook
│   │   └── index.js                    # Hooks exports
│   │
│   ├── pages/
│   │   ├── Landing.jsx                 # Landing page (hero, features, etc)
│   │   ├── ResumeBuilder.jsx           # Resume builder main page
│   │   ├── Dashboard.jsx               # Dashboard page
│   │   ├── Templates.jsx               # Templates showcase page
│   │   ├── Profile.jsx                 # User profile page
│   │   ├── NotFound.jsx                # 404 page
│   │   └── Auth/
│   │       ├── Login.jsx               # Login page
│   │       └── Register.jsx            # Register page
│   │
│   ├── routes/
│   │   ├── index.jsx                   # React Router setup
│   │   └── ProtectedRoute.jsx          # Protected route wrapper
│   │
│   ├── store/
│   │   └── store.js                    # Zustand stores (Auth, Resume, UI)
│   │
│   ├── utils/
│   │   ├── helpers.js                  # General utility functions
│   │   ├── storage.js                  # LocalStorage utilities
│   │   └── validators.js               # Form validation functions
│   │
│   ├── App.jsx                         # Main App component
│   ├── main.jsx                        # React entry point
│   └── index.css                       # Global styles (Tailwind + custom)
│
├── .env                                # Environment variables
├── .env.example                        # Example env variables
├── .eslintignore                       # ESLint ignore config
├── .eslintrc.config.js                 # ESLint rules
├── .gitignore                          # Git ignore rules
├── eslint.config.js                    # ESLint config file
├── index.html                          # HTML entry point
├── package.json                        # Dependencies & scripts
├── postcss.config.js                   # PostCSS config (Tailwind)
├── prettier.config.js                  # Code formatter config
├── tailwind.config.js                  # Tailwind theme config
├── vite.config.js                      # Vite build config
│
├── README.md                           # Project documentation
├── SETUP.md                            # Setup and deployment guide
└── STRUCTURE.md                        # This file


TOTAL FILES: 35+ component/utility files, 10+ config files
LOC: ~3500+ lines of production-ready React code
```

## File Purposes

### API Layer
- `axiosInstance.js`: HTTP client with automatic token injection
- `endpoints.js`: Centralized API functions for all resources
- `helpers.js`: Retry logic, batch requests, request cancellation

### Components
- **Layout**: Wrappers for different page types
- **Builder**: Resume builder form and preview
- **Common**: Reusable UI components (Modal, Loaders)
- **Sections**: Individual form sections (Education, Experience, etc)

### Utilities
- `helpers.js`: Date formatting, text utils, file handling
- `storage.js`: LocalStorage wrapper for persistence
- `validators.js`: Form validation functions

### State & Hooks
- `store.js`: Zustand stores for global state
- `useToast.js`: Toast notification system
- `useAsync.js`: Async operations with loading/error states

### Pages
- **Public**: Landing, Auth pages
- **Protected**: Dashboard, Resume Builder, Profile
- **404**: NotFound page

## Dependencies Overview

| Package | Purpose |
|---------|---------|
| React | UI library |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling framework |
| React Router | Client-side routing |
| Axios | HTTP client |
| Framer Motion | Animations |
| React Hook Form | Form handling |
| Zustand | State management |
| React Hot Toast | Notifications |
| Lucide React | Icon library |

## Development Workflow

1. **Add Feature**: Create components in appropriate folder
2. **Connect API**: Add endpoints in `api/endpoints.js`
3. **Add State**: Update Zustand stores if needed
4. **Add Styles**: Use Tailwind classes
5. **Add Hooks**: Create custom hooks in `hooks/` folder
6. **Test**: Manual testing against backend
7. **Deploy**: Run `npm run build` and deploy dist folder

## Configuration Files

- `vite.config.js`: Dev server, build optimization
- `tailwind.config.js`: Color theme, breakpoints, animations
- `postcss.config.js`: CSS processing (Tailwind, Autoprefixer)
- `eslint.config.js`: Code quality rules
- `prettier.config.js`: Code formatting

## Deployment Structure

```
dist/
├── index.html          # Entry point
├── assets/
│   ├── index-XXXX.js   # Main JS bundle (minified)
│   └── index-XXXX.css  # Main CSS bundle (minified)
└── vite.svg            # Static assets
```

The `dist/` folder is ready to deploy to any static hosting service (Vercel, Netlify, AWS S3, etc).
