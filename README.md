# 💬 Real-Time Chat Application

> A production-ready full-stack real-time chat application built with the MERN stack and Socket.IO, featuring JWT authentication, instant messaging, image sharing, typing indicators, online presence, and a responsive user interface.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-black?logo=socket.io)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 Live Demo

🌐 **Frontend:** https://real-time-chat-application-psi-lac.vercel.app

⚙️ **Backend API:** https://real-time-chat-application-backend-mprn.onrender.com

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Logout
- Delete Account

---

## 💬 Chat Features

- Real-Time Messaging
- One-to-One Chat
- Online User Status
- Typing Indicator
- Message Reply
- Auto Scroll
- Instant Updates using Socket.IO

---

## 🖼 Media Sharing

- Upload Images
- Cloudinary Image Storage
- Image Preview
- Profile Avatar Update

---

## 👤 Profile Management

- Update Profile Name
- Change Profile Picture
- Delete Account
- Persistent Authentication

---

## 🎨 User Interface

- Responsive Design
- Modern Chat UI
- Dark Theme Inspired Design
- Toast Notifications
- Loading States
- Smooth User Experience

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Socket.IO Client
- React Hot Toast
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Socket.IO
- Multer
- Cloudinary

---

# 📂 Project Structure

```
Realtime-chat-app
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   └── utils
│   └── public
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── sockets
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Shivang-Rajput/Real-Time-Chat-Application.git

cd Real-Time-Chat-Application
```

---

## Backend Setup

```bash
cd server

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend

```bash
npm run dev
```

---

# 🌐 Deployment

## Frontend

- Vercel

## Backend

- Render

## Database

- MongoDB Atlas

## Image Storage

- Cloudinary

---

# 📸 Screenshots

### Login Page

> *(Add Screenshot Here)*

---

### Register Page

> *(Add Screenshot Here)*

---

### Chat Interface

> *(Add Screenshot Here)*

---

### Profile Modal

> *(Add Screenshot Here)*

---

### Mobile View

> *(Add Screenshot Here)*

---

# 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected APIs
- Environment Variables
- Secure Image Upload
- CORS Configuration

---

# 🚀 Future Improvements

- Group Chat
- Voice Messages
- Video Calling
- Read Receipts
- Push Notifications
- Emoji Reactions
- Message Search
- File Sharing
- User Blocking
- Chat Backup

---

# 👨‍💻 Author

**Shivang Kumar Singh**

GitHub

https://github.com/Shivang-Rajput

LinkedIn

*(Add Your LinkedIn URL)*

---

# ⭐ Support

If you like this project, don't forget to ⭐ the repository.

It helps and motivates me to build more awesome projects.

---

## 📄 License

This project is licensed under the MIT License.