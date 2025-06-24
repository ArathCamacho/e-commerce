"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verificar si hay sesión guardada al cargar la página
  useEffect(() => {
    const checkStoredAuth = async () => {
      try {
        const storedToken = localStorage.getItem("authToken")
        const storedUser = localStorage.getItem("userData")

        if (storedToken && storedUser) {
          // Verificar que el token siga siendo válido
          const response = await fetch("http://localhost:3001/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setToken(storedToken)
            setUser(data.user)
          } else {
            // Token inválido, limpiar storage
            localStorage.removeItem("authToken")
            localStorage.removeItem("userData")
          }
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error)
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
      } finally {
        setLoading(false)
      }
    }

    checkStoredAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Guardar en localStorage
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("userData", JSON.stringify(data.user))

        // Actualizar estado
        setToken(data.token)
        setUser(data.user)

        return { success: true, message: data.message }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Error en login:", error)
      return { success: false, error: "Error de conexión" }
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Guardar en localStorage
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("userData", JSON.stringify(data.user))

        // Actualizar estado
        setToken(data.token)
        setUser(data.user)

        return { success: true, message: data.message }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Error en registro:", error)
      return { success: false, error: "Error de conexión" }
    }
  }

  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")

    // Limpiar estado
    setToken(null)
    setUser(null)
  }

  const isAuthenticated = () => {
    return !!(token && user)
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
