import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationSlice'
import blogsReducer from './reducers/blogsSlice'
import userReducer from './reducers/userSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer, // This is the notification state that holds the current notification message
    blogs: blogsReducer, // This is the blogs state that holds all the blog posts
    user: userReducer,  // This is the user state that holds the logged-in user information
  },
})

export default store
