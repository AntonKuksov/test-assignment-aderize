// README.md

# Dashboard for Team Management
Build a responsive, single-page application that displays and manages a list of teams and their members using a fake API (provided). The app should allow listing, filtering, and editing of team data.

## 🛠 Mock Service Worker Setup

If you are using MSW (Mock Service Worker) in development, you need to initialize the service worker script:

### Step 1: Generate the Service Worker
```bash
npx msw init public/ --save
```

This will create the `mockServiceWorker.js` file inside your `public/` directory.

### Step 2: Verify the file structure
```
project-root/
├── public/
│   └── mockServiceWorker.js
```

### Step 3: Restart Vite dev server
```bash
npm run dev
```

> ⚠️ If this file is missing, MSW will fail to register and show a MIME type error in the browser console.


## 🚀 Getting Started

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Run tests (if applicable)
```bash
npm test
```

---

This project uses:
- React + TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- MSW for mocking API responses during development
