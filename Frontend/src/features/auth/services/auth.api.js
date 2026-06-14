import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

export async function register({ username, email, password }) {

    if (!username || !email || !password) {
        throw new Error('Username, email, and password are required.')
    }
    try {
        const response = await api.post('/api/auth/register', { username, email, password })
        return response.data
    } catch (error) {
        console.error('Error occured: ', error)
        throw new Error('An unexpected error occurred.');
    }
}

export async function login({ identifier, password }) {
    if (!identifier || !password) {
        throw new Error('Username or email, and password are required.')
    }
    try {
        const response = await api.post('/api/auth/login', { username: identifier, email: identifier, password })
        return response.data
    } catch (error) {
        console.error('Error occured: ', error)
        throw new Error('An unexpected error occurred.');
    }
}

export async function getMe() {
    try {
        const response = await api.get('/api/auth/get-me')
        return response.data
    } catch (error) {
        console.error('Error occured: ', error)
        throw new Error('An unexpected error occurred.');
    }
}

export async function logout() {
    try {
        const response = await api.post('/api/auth/logout')
        return response.data
    } catch (error) {
        console.error('Error occured: ', error)
        throw new Error('An unexpected error occurred.');
    }
}