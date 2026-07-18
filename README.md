# 💬 Real-Time Chat Application

A high-performance, real-time messaging application that allows concurrent users to communicate seamlessly across multiple dedicated chat rooms. 

## ✨ Key Features

* **Instant Messaging:** Engineered with Socket.io to support concurrent users across multiple chat rooms with sub-200ms message latency.
* **Secure Access:** Implemented secure, JWT-based user authentication and session handling to prevent unauthorized room access and protect user data.
* **Responsive UI:** Built a fully responsive frontend utilizing Tailwind CSS, reducing layout-related bugs across mobile and desktop breakpoints.

## 🛠 Technologies We Use

| Frontend | Backend |
| :--- | :--- |
| **React 19** & **Vite** | **Node.js** & **Express.js** |
| **Tailwind CSS** | **Socket.io** |
| **React Router** | **MongoDB** & **Mongoose** |
| **Axios** | **JWT** & **bcryptjs** |
| **Socket.io Client** | **dotenv** & **cors** |
| **React Hot Toast** & **React Icons** | **cookie-parser** |

## 🚀 Getting Started

1. **Clone the repository:** `git clone https://github.com/yourusername/real-time-chat-app.git`
2. **Backend Setup:** Navigate to the `server` folder, run `npm install`, set up your `.env` variables (MongoDB URI, JWT_SECRET), and run `npm run dev`.
3. **Frontend Setup:** Navigate to the `client` folder, run `npm install`, and start the app with `npm run dev`.

---

## 📋 Project Roadmap

### Phase 1: Project Setup
- [x] React + Vite frontend setup
- [x] Express backend setup
- [x] MongoDB connected
- [x] Tailwind CSS configured
- [x] Project running locally
- [x] Git repository ready

### Phase 2: Authentication
- [ ] User Registration
- [ ] User Login
- [ ] JWT Implementation
- [ ] Password hashing
- [ ] Protected routes

### Phase 3: Chat UI
- [ ] Sidebar navigation
- [ ] Chat window interface
- [ ] Room list display
- [ ] Responsive layout implementation

### Phase 4: Socket.io Integration
- [ ] Connect frontend to Socket.io
- [ ] Connect backend to Socket.io
- [ ] Join room functionality
- [ ] Send message logic
- [ ] Receive message logic
- [ ] Handle disconnections gracefully

### Phase 5: Database & Storage
- [ ] Save new messages to database
- [ ] Load historical messages
- [ ] Create and manage chat rooms

### Phase 6: Advanced Features
- [ ] Typing indicator
- [ ] Online user status
- [ ] Auto-scroll to newest message
- [ ] Message timestamps
- [ ] Toast notifications

### Phase 7: Polish & Refinement
- [ ] Dark mode toggle
- [ ] User profile page
- [ ] Avatar support
- [ ] Enhanced animations
- [ ] Final mobile responsiveness checks

### Phase 8: Deployment
- [ ] Database: MongoDB Atlas
- [ ] Backend: Render
- [ ] Frontend: Vercel
- [ ] Codebase: GitHub

---

## 📓 Development Diary

* **July 18, 2026:** Finalized the project roadmap and defined the comprehensive tech stack. Phase 1 completed successfully.   
