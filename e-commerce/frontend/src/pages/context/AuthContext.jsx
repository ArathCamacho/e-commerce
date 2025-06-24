"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verificar si hay una sesión activa al cargar la app
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Cambiar a sessionStorage para cerrar sesión al cerrar pestaña
      const savedToken = sessionStorage.getItem("token")
      const savedUser = sessionStorage.getItem("user")

      if (savedToken && savedUser) {
        try {
          // Verificar si el token sigue siendo válido
          const response = await fetch("http://localhost:3001/api/verify-token", {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setToken(savedToken)
            setUser(data.user)
          } else {
            // Token inválido, limpiar sessionStorage
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("user")
          }
        } catch (error) {
          console.error("Error verificando token:", error)
          sessionStorage.removeItem("token")
          sessionStorage.removeItem("user")
        }
      }
      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    // Usar sessionStorage en lugar de localStorage
    sessionStorage.setItem("token", userToken)
    sessionStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    // Limpiar sessionStorage
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    // Limpiar también información de checkout local
    localStorage.removeItem("checkout_user_info")
    localStorage.removeItem("checkout_billing_address")
    localStorage.removeItem("checkout_shipping_info")
  }

  const isAuthenticated = () => {
    return !!user && !!token
  }

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
