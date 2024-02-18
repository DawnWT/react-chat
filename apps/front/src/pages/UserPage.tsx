import { Container, styled } from '@panda/jsx'
import { Button } from '@src/components/Button'
import { Card } from '@src/components/Card'
import { Heading } from '@src/components/Heading'
import { TextInput } from '@src/components/TextInput'
import { useEditUser } from '@src/hooks/useEditUser'
import { useCurrentUserStore } from '@src/store/currentUserStore'
import { FormEvent, useCallback, useState } from 'react'

export const UserPage = function () {
  const { userId, username, displayName, password } = useCurrentUserStore()
  const [usernameForm, setUsernameForm] = useState(username)
  const [displaynameForm, setDisplaynameForm] = useState(displayName)
  const [passwordForm, setPasswordForm] = useState(password)
  const { mutate, isError, isPending, isSuccess } = useEditUser(userId)

  const handleSubmit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()
      mutate({ username: usernameForm, displayName: displaynameForm, password: passwordForm })
    },
    [usernameForm, displaynameForm, passwordForm]
  )

  return (
    <Container
      display="grid"
      justifyContent="center"
      alignItems="center"
      gridTemplateRows="1fr max-content 1fr"
      height="100%"
    >
      <Heading align="center">{displayName}</Heading>
      <styled.form onSubmit={handleSubmit} gridRow="2 / -2">
        <Card>
          <TextInput
            label="Nom d'utilisateur"
            id="formUsername"
            value={usernameForm}
            onChange={(e) => {
              setUsernameForm(e.currentTarget.value)
            }}
            error={isError}
          />
          <TextInput
            label="Nom d'affichage"
            id="formDisplayname"
            value={displaynameForm}
            onChange={(e) => {
              setDisplaynameForm(e.currentTarget.value)
            }}
          />
          <TextInput
            label="Mot de passe"
            id="formUsername"
            value={passwordForm}
            onChange={(e) => {
              setPasswordForm(e.currentTarget.value)
            }}
          />
          <Button type="submit" disabled={isPending}>
            Enregistrer
          </Button>
          {isSuccess && <styled.span color="green.500">Enregistrement effectuer</styled.span>}
        </Card>
      </styled.form>
    </Container>
  )
}
