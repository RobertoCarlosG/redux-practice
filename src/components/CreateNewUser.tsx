import { Badge,Button,Card,TextInput,Title } from "@tremor/react";
import { useUserActions } from '../hooks/useUserActions'
import { useState } from 'react'

export function CreateNewUser () {
  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok'|'ko'|null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormEvent>) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    setResult(null)

    const name =formData.get('name') as string
    const email =formData.get('email') as string
    const github =formData.get('github') as string
    if (!name || !email || !github) {//Agregar validaciones
      return setResult('ko')
    }

    addUser({name, email, github})
    setResult('ok')
    form.reset()
  }
  return(
    <Card style={{ marginTop:'16px' }}>
      <Title> Crear Nuevo Usuario</Title>
      <form className=""
       onSubmit={handleSubmit}>
        <TextInput 
        name='name' placeholder="Nombre"
        />
        <TextInput name='email' placeholder="E-mail"
        />
        <TextInput name='github' placeholder="Usuario Github"
        />
        <div>
          <Button type='submit' style={{ marginTop:'16px' }}>
            Crear Usuario
          </Button>
          <span>
            { result ==='ok' && <Badge color="gray">Guardado correctamente</Badge>}
            { result ==='ko' && <Badge color='red'>Error con los campos </Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}