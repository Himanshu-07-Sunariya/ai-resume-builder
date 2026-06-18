# AI Resume Builder - Quick Start Guide

## Installation & Running

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
The `.env` file is ready to use. Make sure your backend is running on `http://localhost:5000`:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=AI Resume Builder
```

### 3. Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

---

## Frontend Architecture

### Component Hierarchy
```
App
├── Router
│   ├── Landing (public)
│   ├── Login/Register (public)
│   ├── Dashboard Layout (protected)
│   │   ├── Dashboard
│   │   ├── Templates
│   │   └── Profile
│   ├── Resume Builder (protected)
│   └── NotFound
```

### State Management (Zustand)
- **useAuthStore**: User authentication state
- **useResumeStore**: Resume data state  
- **useUIStore**: UI state (sidebar, loading, errors)

### API Integration
All requests go through `src/api/axiosInstance.js` which:
- Automatically adds JWT token to headers
- Handles 401 (unauthorized) responses
- Centers error handling

---

## Key Features

### Landing Page ✨
- Hero section with gradient background
- Responsive grid layouts
- Smooth scroll animations
- Mobile-optimized design

### Authentication 🔐
- Email/password registration & login
- Form validation with React Hook Form
- Error handling and user feedback
- Auto-login from localStorage

### Resume Builder 📝
**Left Panel (Form)**
- Personal Information
- Professional Summary
- Education (add/edit/delete)
- Experience (add/edit/delete)
- Projects (add/edit/delete)
- Skills (add/edit/delete)
- Collapsible sections for easy navigation

**Right Panel (Preview)**
- Live preview of resume
- Updates in real-time
- Professional formatting

**Features**
- Save button (creates/updates on backend)
- Download PDF
- Form validation
- Error handling
- Loading states

### Dashboard 📊
- Overview statistics
- Resume list with actions
- Create, edit, delete functionality
- PDF download for each resume
- Responsive table

### Other Pages
- **Templates**: Browse and preview templates
- **Profile**: Edit user information
- **404**: Error page for invalid routes

---

## Code Structure Best Practices

### File Organization
```
components/
├── builder/          # Resume builder components
├── common/           # Reusable UI (Modal, Loaders)
├── layout/           # Layout components
└── resumeSections/   # Resume form sections

pages/
├── Auth/             # Auth pages
├── Dashboard.jsx     # Dashboard page
├── Landing.jsx       # Landing page
└── ...

api/
├── axiosInstance.js  # Axios setup
├── endpoints.js      # API endpoints
└── helpers.js        # API utilities

hooks/
├── useToast.js       # Toast notifications
└── useAsync.js       # Async operations

utils/
├── helpers.js        # General utilities
├── storage.js        # LocalStorage utilities
└── validators.js     # Form validators

store/
└── store.js          # Zustand stores
```

### Component Patterns

**Form Components**
```jsx
export default function SectionForm({ resume, setResume }) {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data) => {
    setResume({ ...resume, ...data });
  };
  
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

**API Calls**
```jsx
const handleSave = async () => {
  try {
    const response = await resumeAPI.update(id, data);
    showSuccess('Saved!');
  } catch (error) {
    showError(error.message);
  }
};
```

**Protected Routes**
```jsx
<ProtectedRoute>
  <ResumeBuilder />
</ProtectedRoute>
```

---

## Styling System

### Tailwind Configuration
Custom theme in `tailwind.config.js`:
- **Primary**: Blue to Purple gradient (#5865f2 → #a855f7)
- **Accent**: Orange for highlights
- **Dark**: #0f172a
- **Light**: #f8fafc

### CSS Classes
```css
.btn-primary      /* Blue gradient button */
.btn-secondary    /* Border button */
.input-base       /* Form input styling */
.card             /* Card container */
.section-title    /* Section heading */
```

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## API Endpoints Used

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Resumes
- `POST /api/resumes`
- `GET /api/resumes`
- `GET /api/resumes/:id`
- `GET /api/resumes/:id/full`
- `PATCH /api/resumes/:id`
- `DELETE /api/resumes/:id`
- `GET /api/resumes/:id/pdf`
- `PATCH /api/resumes/:id/template`

### Sections (Education, Experience, Projects, Skills)
- `POST /api/resumes/:resumeId/[section]`
- `PATCH /api/[section]/:id`
- `DELETE /api/[section]/:id`

---

## Performance Optimizations

✅ **Code Splitting**: React Router lazy loading ready
✅ **Memoization**: Components wrapped with React.memo where needed
✅ **Debouncing**: useDebounce hook for search inputs
✅ **Lazy Loading**: Images can use native lazy loading
✅ **Tree Shaking**: Unused code removed during build

---

## Testing Integration Points

### Areas to Test
- ✅ Authentication flow (register → login → dashboard)
- ✅ Resume creation (create → fill form → save → download)
- ✅ CRUD operations (create, read, update, delete for all sections)
- ✅ Form validation (email, password, required fields)
- ✅ Error handling (network errors, API errors)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Navigation (routing between pages)

---

## Deployment Checklist

- [ ] Update `VITE_API_BASE_URL` to production backend URL
- [ ] Run `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Deploy `dist/` folder to hosting service
- [ ] Configure CORS on backend for production domain
- [ ] Setup environment variables on hosting platform
- [ ] Test all features on production
- [ ] Setup error monitoring (e.g., Sentry)
- [ ] Enable HTTPS
- [ ] Setup backup and recovery

---

## Troubleshooting

### CORS Errors
Solution: Backend needs to include frontend URL in CORS config
```
Access-Control-Allow-Origin: http://localhost:5173
```

### API 401 Errors
Solution: Token might be expired or missing
- Check if token exists: `localStorage.getItem('token')`
- Clear storage and login again

### Form Not Submitting
Solution: Check form validation errors in console

### Animations Not Working
Solution: Ensure Framer Motion is installed:
```bash
npm install framer-motion
```

---

## Next Steps

1. **Backend Integration**
   - Ensure backend running on port 5000
   - Test all API endpoints

2. **Production Deployment**
   - Choose hosting (Vercel, Netlify, AWS, etc.)
   - Setup CI/CD pipeline
   - Configure domain & SSL

3. **Future Enhancements**
   - Add more resume templates
   - Implement AI suggestions
   - Add dark mode
   - Implement resume versioning
   - Add ATS score checker

---

## Support & Documentation

- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com
- **Vite Docs**: https://vitejs.dev
- **React Router**: https://reactrouter.com
- **Framer Motion**: https://www.framer.com/motion

---

## License

This project is part of AI Resume Builder system.
