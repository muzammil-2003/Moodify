import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import FaceExpression from './features/Expression/components/FaceExpression'
import About from './Pages/About'
import Home from './Pages/Home'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/Protected'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <div>Page Not Found</div>,
        children: [
            { index: true, element: <Protected><Home /></Protected> },
            { path: 'detect', element: <FaceExpression /> },
            { path: 'about', element: <About /> },
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />}
        ]
    }
])

export default router