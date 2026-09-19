# FocusList - To-Do Application

A modern, feature-rich To-Do application with a beautiful landing page and space mission control theme. Built with React and Vite, featuring dark mode, keyboard shortcuts, task history, and more.

![FocusList](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-Latest-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### Core Functionality
- **Task Management**: Create, edit, delete, and complete tasks
- **Projects/Categories**: Organize tasks into color-coded projects
- **Priority Levels**: Custom priority system with visual indicators
- **Due Dates**: Set and track task deadlines
- **Search & Filter**: Find tasks quickly with search and filter options

### Advanced Features
- **🎨 Dark Mode**: Toggle between light and dark themes
- **⌨️ Keyboard Shortcuts**: Power user productivity shortcuts
- **📜 Task History**: Track all task modifications
- **🎯 Daily Goals**: Set and track daily completion targets
- **🔄 Drag & Drop**: Reorder tasks by dragging
- **💾 Local Storage**: All data persists in browser localStorage

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Beautiful Landing Page**: Professional landing page with smooth navigation
- **Space Mission Control Theme**: Subtle space-themed terminology and design
- **Progress Tracking**: Visual progress indicators and statistics

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Pushkar-29-06/To-Do-Application.git
cd To-Do-Application
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5174`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + N` | Open new task modal |
| `Ctrl/Cmd + K` | Focus search bar |
| `Ctrl/Cmd + D` | Toggle dark mode |
| `Esc` | Close modals |

## 🎨 Features Overview

### Landing Page
- Beautiful hero section with animations
- Feature showcase
- Product preview mockups
- Responsive design
- Smooth navigation to app

### To-Do Application
- **Sidebar Navigation**: Collapsible sidebar with navigation items
- **Header**: Page title, search bar, dark mode toggle, notifications
- **Dashboard**: Today's mission with progress tracking
- **Task List**: Polished task cards with all actions
- **Progress Card**: Completion statistics and daily goals
- **Projects Section**: Manage projects and categories

### Task Management
- Add tasks with title, description, due date, priority, and project
- Edit task details
- Mark tasks as complete/incomplete
- Delete tasks with confirmation
- View task history
- Drag and drop to reorder

### Customization
- **Dark Mode**: Full dark theme support
- **Custom Priorities**: Add custom priority levels
- **Daily Goals**: Set your daily task completion target
- **Project Colors**: Color-code your projects

## 🛠️ Technologies Used

- **React 19**: UI library
- **Vite**: Build tool and dev server
- **CSS**: Custom styling with CSS variables
- **localStorage**: Data persistence
- **HTML5**: Semantic markup

## 📁 Project Structure

```
To-Do-Application/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── AddTaskModal.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Header.jsx
│   │   ├── Icon.jsx
│   │   ├── ProgressCard.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── hooks/          # Custom React hooks
│   │   └── useTasks.js
│   ├── pages/          # Page components
│   │   └── Dashboard.jsx
│   ├── utils/          # Utility functions
│   │   └── storage.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Landing page component
│   └── styles.css      # Global styles
├── index.html          # HTML entry point
├── package.json        # Dependencies
└── README.md          # This file
```

## 🎯 Usage

1. **Start from Landing Page**: Click "Get Started" to enter the app
2. **Add Tasks**: Click "Add Task" or press `Ctrl+N`
3. **Organize**: Assign projects and priorities to tasks
4. **Track Progress**: Monitor your daily goal completion
5. **Customize**: Toggle dark mode and set your preferences
6. **Navigate**: Use sidebar to switch between views

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🔧 Customization

### Adding Custom Priorities
The priority system is configurable. Edit `src/hooks/useTasks.js` to modify default priorities or add custom ones.

### Modifying Daily Goals
Default daily goal is 5 tasks. Change this in `src/hooks/useTasks.js` or use the UI to set your preferred goal.

### Theme Colors
All colors are defined as CSS variables in `src/styles.css`. Modify the `:root` and `.dark-mode` sections to customize the theme.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 👤 Author

**Pushkar Mahadik**
- GitHub: [@Pushkar-29-06](https://github.com/Pushkar-29-06)

## 🙏 Acknowledgments

- Built with React and Vite
- Inspired by modern productivity apps
- Icons from Lucide (via custom SVG implementation)

---

**FocusList** - Make room for what matters. ✨
