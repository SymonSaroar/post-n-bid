import { createContext, useEffect, useContext, useState } from "react";
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null}
  onSignUp?: (username: string, password: string ) => Promise<any>
  onSignIn?: (username: string, password: string) => Promise<any>
  onSignOut?: () => Promise<any>
}

const TOKEN = 'jwt'
export const API_URL = 'http://192.168.0.12:3300/api'
export const IMAGE_URL = 'http://192.168.0.12:3300/images'
const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
  return useContext(AuthContext)
}
export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null, authenticated: null
  })

  useEffect(() => {
    const loadToken = async() => {
      const token = await SecureStore.getItemAsync(TOKEN)
      console.log('stored', token)

      if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setAuthState({
          token: token,
          authenticated: true,
        })
      }
    }
    try {
      loadToken()
    } catch(e) {
      console.log('Cannot load token from the SecureStore', e)
    }
  }, []);
  const signUp = async (username: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/sign-up`, { username, password })
    } catch (e) {
      return { error: true, message: (e as any).response.data.message }
    }
  }
  const signIn = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/login`, { username, password })
      if(result) {
        setAuthState({
          token: result.data.token,
          authenticated: true
        })
      }
      else{
        console.log('signin: undefined result')
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
      try {
        await SecureStore.setItemAsync(TOKEN, result.data.token)
      } catch(e) {
        console.log('SecureStore.setItemAsync is not usable', e)
      }
      return result
    } catch (e) {
      return {error: true, message: (e as any).response.data.message}
    }
  }
  const singOut = async() => {
    try {
      await SecureStore.deleteItemAsync(TOKEN)
    } catch (e) {
      console.log('SecureStore is not usable', e)
    }
    axios.defaults.headers.common['Authorization'] = ''
    setAuthState({
      token: null,
      authenticated: false
    })
  }
  const value = {
    onSignUp: signUp,
    onSignIn: signIn,
    onSignOut: singOut,
    authState
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}