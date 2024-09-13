import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface AuthState {
  userId: string,
  access_token: string,
  refresh_token: string
}

const initialState: AuthState = {
  userId: '', access_token: '', refresh_token: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { userId, access_token, refresh_token } = action.payload
      state.userId = userId
      state.access_token = access_token
      state.refresh_token = refresh_token
    },
    logOut: state => {
      state.userId = ''
      state.access_token = ''
      state.refresh_token = ''
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUserId = (state: RootState) => state.reducer.auth.userId
export const selectCurrentAccessToken = (state: RootState) => state.reducer.auth.access_token
export const selectCurrentRefreshToken = (state: RootState) => state.reducer.auth.refresh_token