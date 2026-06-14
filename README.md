# Moodify 🎵😊

A web application that detects your facial expression and recommends music based on your current mood. Combining real-time face recognition with a music recommendation system to create a personalized listening experience.

## 🌟 Features

- **Facial Expression Detection**: Real-time face expression recognition using MediaPipe
- **Mood-Based Music Recommendations**: Get song suggestions based on detected emotions
- **User Authentication**: Secure login and registration system with JWT
- **Song Management**: Upload, manage, and organize your music library
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Persistent Storage**: MongoDB database with Redis caching for optimal performance
- **Cloud Image Storage**: ImageKit integration for efficient media management

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Caching**: Redis
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Image Storage**: ImageKit
- **Metadata Parsing**: node-id3

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Router**: React Router v7
- **HTTP Client**: Axios
- **Face Detection**: MediaPipe Vision
- **Form Management**: React Hook Form
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance
- Redis instance
- ImageKit account (for image storage)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/muzammil-2003/Moodify.git
cd Moodify
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory with the following variables:
```
MONGODB_URI=<your-mongodb-connection-string>
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
JWT_SECRET=<your-jwt-secret>
IMAGEKIT_PUBLIC_KEY=<your-imagekit-public-key>
IMAGEKIT_PRIVATE_KEY=<your-imagekit-private-key>
IMAGEKIT_URL_ENDPOINT=<your-imagekit-url-endpoint>
PORT=3000
```

Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:3000`

### 3. Setup Frontend

```bash
cd Frontend
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Moodify/
├── Backend/
│   ├── server.js                 # Entry point
│   ├── package.json
│   └── src/
│       ├── app.js               # Express app setup
│       ├── config/              # Configuration files
│       │   ├── database.js       # MongoDB connection
│       │   └── cache.js          # Redis setup
│       ├── controllers/          # Route controllers
│       │   ├── auth.controller.js
│       │   └── song.controller.js
│       ├── middlewares/          # Custom middlewares
│       │   ├── auth.middleware.js
│       │   └── upload.middleware.js
│       ├── models/               # Mongoose schemas
│       │   ├── user.model.js
│       │   ├── song.model.js
│       │   └── blacklist.model.js
│       ├── routes/               # API routes
│       │   ├── auth.routes.js
│       │   └── song.routes.js
│       └── services/             # Business logic
│           └── storage.service.js
│
└── Frontend/
    ├── src/
    │   ├── App.jsx              # Main component
    │   ├── app.routes.jsx        # Route definitions
    │   ├── main.jsx              # React entry point
    │   ├── index.css             # Global styles
    │   ├── components/           # Reusable components
    │   │   └── Navbar.jsx
    │   ├── features/
    │   │   ├── auth/             # Authentication feature
    │   │   │   ├── auth.context.jsx
    │   │   │   ├── components/
    │   │   │   │   └── Protected.jsx
    │   │   │   ├── hooks/
    │   │   │   │   └── useAuth.js
    │   │   │   ├── pages/
    │   │   │   │   ├── Login.jsx
    │   │   │   │   └── Register.jsx
    │   │   │   └── services/
    │   │   │       └── auth.api.js
    │   │   └── Expression/       # Mood detection feature
    │   │       ├── song.context.jsx
    │   │       ├── components/
    │   │       │   ├── FaceExpression.jsx
    │   │       │   └── Player.jsx
    │   │       ├── hooks/
    │   │       │   └── useSong.js
    │   │       ├── pages/
    │   │       ├── service/
    │   │       │   └── song.api.js
    │   │       └── utils/
    │   │           └── utils.js
    │   ├── Pages/
    │   │   ├── Home.jsx
    │   │   └── About.jsx
    │   ├── assets/
    │   └── public/
    ├── package.json
    └── vite.config.js
```

## 🔑 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user info

### Song Routes (`/api/songs`)
- `GET /` - Get all songs
- `GET /:id` - Get specific song
- `POST /` - Upload new song
- `DELETE /:id` - Delete song
- `GET /mood/:mood` - Get songs by mood

## 🎯 How to Use

1. **Register/Login**: Create an account or login with existing credentials
2. **Enable Camera**: Allow the app to access your webcam
3. **Face Detection**: The app will detect your facial expression in real-time
4. **Get Recommendations**: Based on your detected mood, songs will be recommended
5. **Play Music**: Click on recommended songs to play them

## 🎨 Mood Mapping

The application maps facial expressions to moods:
- **Happy**: Happy, Neutral
- **Laughing**: Laughing, Playful
- **Kissing**: Kissing
- **Concerned**: Concerned, Angry, Sad, Confused
- **Surprised**: Surprised, Shocked

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Token blacklisting for logout
- CORS protection
- Cookie-based session management
- Protected routes

## 📝 Available Scripts

### Backend
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
npm test       # Run tests
```

### Frontend
```bash
npm run dev    # Start Vite development server
npm run build  # Build for production
npm run lint   # Run ESLint
npm run preview # Preview production build
```

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure MongoDB is running and connection string is correct
- Verify Redis instance is accessible
- Check that all environment variables are set

### Frontend Issues
- Clear browser cache if styles don't load properly
- Ensure backend server is running on port 3000
- Check browser console for CORS errors

### Camera/Face Detection Issues
- Ensure browser has permission to access webcam
- Try a different browser if detection doesn't work
- Check lighting conditions for better detection

## 📦 Dependencies

For detailed dependency information, see:
- [Backend package.json](Backend/package.json)
- [Frontend package.json](Frontend/package.json)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

ISC License

## 👨‍💻 Author

Created as a practical learning project

## 🙏 Acknowledgments

- MediaPipe for face detection technology
- Tailwind CSS for styling utilities
- Express.js for backend framework
- React team for the amazing frontend library

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Happy Listening! 🎵**
