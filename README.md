# 📚 StudyFire - Study Streak Heatmap

A modern, feature-rich study tracking application built with React and Vite. Track your daily study sessions, maintain streaks, visualize your progress, and stay motivated on your learning journey!

## 🎯 Features

- **Study Heatmap**: Visual representation of your study consistency
- **Streak Tracking**: Build and maintain daily study streaks
- **Analytics Dashboard**: Comprehensive insights into your study patterns
- **Weekly Challenges**: Set and track weekly study goals
- **Pomodoro Timer**: Built-in focused study sessions
- **Subject Performance**: Track progress by subject
- **Daily Insights**: Personalized feedback on your study habits
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Professional Logo**: Modern, clean branding throughout

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd study-streak-heatmap
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:5173/
   ```

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

This generates a `dist/` folder with minified files ready for deployment.

## 👀 Preview Production Build

To test the production build locally:

```bash
npm run preview
```

## 🏗️ Project Structure

```
study-streak-heatmap/
├── src/
│   ├── components/
│   │   ├── charts/          # Data visualization charts
│   │   ├── features/        # Feature components
│   │   ├── forms/           # Input forms
│   │   ├── heatmap/         # Heatmap visualization
│   │   ├── layout/          # Layout components (Navbar, Sidebar)
│   │   ├── pomodoro/        # Pomodoro timer
│   │   └── ui/              # Reusable UI components
│   ├── context/             # React Context (Theme, Study data)
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── utils/               # Utility functions
│   ├── data/                # Sample data
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## 🎨 UI Components

### Logo Component
Professional SVG logo that replaces emoji symbols throughout the app
```jsx
<Logo size="md" withText={true} />
```

### Auth Modal
Functional Sign In and Get Started modals with form validation
```jsx
<AuthModal 
  isOpen={isOpen} 
  onClose={handleClose} 
  type="signin" // or "signup"
/>
```

## 🌙 Theme Support

Switch between light and dark modes using the theme toggle in the navbar. Your preference is saved to `localStorage`.

## 📊 Key Pages

- **Dashboard**: Overview of streaks, heatmap, and daily insights
- **Analytics**: Detailed charts and statistics
- **Calendar**: Calendar view of study sessions
- **Settings**: App preferences and goals

## 🔑 Key Features Explained

### Study Logging
Click "Quick Study" to log study sessions with:
- Duration (in hours)
- Subject selection
- Notes (optional)

### Streak Tracking
- **Current Streak**: Consecutive days of studying
- **Best Streak**: Your personal best
- **Motivational Messages**: Based on your streak milestones

### Weekly Challenges
Set study hour targets for the week and track your progress

### Pomodoro Timer
25-minute focused study sessions with break reminders

## 🛠️ Technologies

- **React 18**: UI framework
- **Vite 5**: Fast build tool
- **Tailwind CSS**: Styling
- **Recharts**: Data visualization
- **Lucide React**: Icons
- **date-fns**: Date utilities

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`:
- Study sessions
- Theme preference
- User information

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
npm run dev -- --port 3000
```

### Build errors?
1. Clear node_modules: `rm -rf node_modules`
2. Reinstall: `npm install`
3. Try building again: `npm run build`

### Dark mode not working?
Clear your browser cache or localStorage

## 📝 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and enhance this project!

## 🎓 Learning Path

New to React? Here's what to explore:
1. Check out `src/App.jsx` for the main component structure
2. Look at `src/context/` to understand state management
3. Explore `src/components/` to see component composition
4. Study `src/hooks/` for custom hook patterns

---

**Happy Studying! Keep your streak alive! 🔥**
#
