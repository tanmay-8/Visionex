import { configureStore } from '@reduxjs/toolkit'
import { themeReducer } from './features/themeSlice'
import { userReducer } from './features/userSlice'
import { authReducer } from './features/authSlice'

export const makeStore = () => {
  // console.log(themeReducer)
  return configureStore({
    reducer: {
      theme:themeReducer,
      user:userReducer,
      auth:authReducer
    },
  })
}
