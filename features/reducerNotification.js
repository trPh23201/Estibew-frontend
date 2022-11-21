import { createSlice } from '@reduxjs/toolkit'

export const reducerNotification = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    newNotification: (state, action) => {
      if (state.length === 5) {
        const clone = [...state]
        clone.unshift(action.payload)
        clone.pop()
        return clone
      } else {
        state.unshift(action.payload)
      }
    },
    getAllNotification: (state, action) => {
      return action.payload
    },
  }
})

export const { newNotification, getAllNotification } = reducerNotification.actions

export default reducerNotification.reducer