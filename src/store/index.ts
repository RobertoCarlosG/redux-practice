import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from './users/slice'

const persistanceLocalStorageMiddleware = (store) => (next) => (action) =>{
  next(action)
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = store => next => action =>{
  const { type, payload } = action
  const previousState = store.getState()
  next(action)
  if( type === 'users/deleteUserById') {
    const UserIdToRemove = payload
    const userToRemove = previousState.users.find(user => user.id === UserIdToRemove)

    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`,{
      method: 'DELETE'
    })
    .then(res =>{
      if(res.ok) toast.success(`Usuario ${payload} eliminado correctamente`)
    })
  .catch(err =>{
    if ( userToRemove) store.dispatch(rollbackUser(userToRemove))
    console.log(err)
  throw new Error(`Error al eliminar usuario ${UserIdToRemove}`)
  })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch