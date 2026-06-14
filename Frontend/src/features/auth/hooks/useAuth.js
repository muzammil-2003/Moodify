import { register, login, getMe, logout } from "../services/auth.api";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleRegister = useCallback(async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (error) {
            console.error("Error Occured: ", error);
            throw error
        } finally {
            setLoading(false)
        }
    }, [setUser, setLoading])

    const handleLogin = useCallback(async ({ identifier, password }) => {
        setLoading(true)
        try {
            const data = await login({ identifier, password })
            setUser(data.user);
        } catch (error) {
            console.error("Error occured: ", error);
            throw error
        } finally {
            setLoading(false)
        }
    }, [setUser, setLoading])

    const fetchMe = useCallback(async () => {
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [setUser, setLoading])

    const handleLogout = useCallback(async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error.message);
            throw error
        } finally {
            setLoading(false);
        }
    }, [setUser, setLoading])

    useEffect(() => {
        fetchMe()
    }, [fetchMe])


    return ({
        user, loading, handleRegister, handleLogin, fetchMe, handleLogout
    })
}