import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users' // Luo tämä jos haet käyttäjät backendistä

const usersSlice = createSlice({
  name: 'users',
  initialState: [], // HUOM! Taulukko, EI objekti!
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

// Thunk: hae käyttäjät backendistä
export const initializeUsers = () => async dispatch => {
  const users = await usersService.getAll()
  dispatch(setUsers(users))
}

export default usersSlice.reducer
