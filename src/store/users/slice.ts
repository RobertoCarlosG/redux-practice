import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: "1",
    name: "Peter Doe",
    email: "peter@hotmail.com",
    github: "roberthlml",
  },
  {
    id: "2",
    name: "yazman Rodriguez",
    email: "yazmanito@git",
    github: "yazmanito",
  },
  {
    id: "3",
    name: "MiduGod",
    email: "midudev@git",
    github: "midudev",
  },
  {
    id: "4",
    name: "RAUL GONZALEZ BLANCO",
    email: "sadas@git",
    github: "miducvadcadev",
  },
];

export type UserId = string

export interface User{
  name: string,
  email: string,
  github: string
}

export interface UserWithId extends User{
  id: UserId
}

const initialState: UserWithId[] = (() => {
  const persitedState = localStorage.getItem("__redux__state__");
  if (persitedState) {
    return JSON.parse(persitedState).users;
  }
  return DEFAULT_STATE
})();

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    addNewUser:(state, action: PayloadAction<User>)=>{
      const id = crypto.randomUUID()
      return [...state, {id, ...action.payload} ]
    },
    deleteUserById: (state,action: PayloadAction<UserId>) =>{
      const id = action.payload
      return state.filter((user) => user.id != id)
    },
    rollbackUser:(state, action: PayloadAction<UserWithId>)=>{
      const isUserAlreadyDefinded = state.some(user=> user.id === action.payload.id)
      if (!isUserAlreadyDefinded) {
        return [...state, action.payload]
      }
    }
  }
})

export default usersSlice.reducer 
export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions
