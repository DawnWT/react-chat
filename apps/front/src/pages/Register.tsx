import { ALink } from '@src/components/ALink'
import { Button } from '@src/components/Button'
import { Card } from '@src/components/Card'
import { Heading } from '@src/components/Heading'
import { TextInput } from '@src/components/TextInput'
import { useRegister } from '@src/hooks/useRegister'
import { useCurrentUserStore } from '@src/store/currentUserStore'
import { FormEvent, useCallback, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export const RegisterPage = function () {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { loggedIn } = useCurrentUserStore()

  const { mutate, isPending, isError } = useRegister({
    onSuccess: useCallback(() => {
      navigate('/')
    }, []),
  })

  const handleSubmit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()
      mutate({ username, displayName, password })
    },
    [username, displayName, password]
  )

  if (loggedIn) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Heading align="center" color="white">
        Register
      </Heading>
      <form onSubmit={handleSubmit}>
        <Card>
          <TextInput
            onChange={(e) => {
              setUsername(e.target.value)
              setDisplayName(e.target.value)
            }}
            placeholder="utilisateur123"
            label="Nom d'utilisateur"
            id="formUsername"
            error={isError}
          />
          <TextInput
            onChange={(e) => {
              setDisplayName(e.target.value)
            }}
            placeholder="Utilisateur"
            label="Nom d'affichage"
            id="formDisplayName"
            value={displayName}
          />
          <TextInput
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            isPassword
            placeholder="•••••••"
            label="Mot de passe"
            id="formPassword"
          />
          <ALink to="/login" alignSelf="end" color="white">
            se connecter
          </ALink>
          <Button type="submit" color="white" disabled={isPending}>
            Submit
          </Button>
        </Card>
      </form>
    </>
  )
}
