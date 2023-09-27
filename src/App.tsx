import { ListOfUsers } from './components/ListOfUsers'
import { CreateNewUser } from './components/CreateNewUser'
import { Toaster } from 'sonner'
import './App.css'

function App() {

  return (
    <>
      <h1>CRUD CON REDUX</h1>
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
    </>
  )
}

export default App
