import styled from 'styled-components'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { BoardType } from '~/types/board'

const Button = styled.button`
  background-color: #f0eefc;
  color: #1f1f20;
  border: none;
  opacity: 70%;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  padding: 8px;
  margin-bottom: 8px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #ccc;
`

const SubmitButton = styled.button`
  background-color: #5a5afc;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
`

export default function CreateListButton({ board }: { board: BoardType }) {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const { data, setData, post, processing } = useForm({
    title: '',
    boardId: board.id,
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/create-list', {
      onSuccess: () => setIsFormVisible(false),
    })
  }

  return (
    <>
      {isFormVisible ? (
        <Form onSubmit={submit}>
          <Input
            type="text"
            placeholder="Enter list title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={processing}>
            Create List
          </SubmitButton>
        </Form>
      ) : (
        <Button onClick={() => setIsFormVisible(true)}>Ajouter une liste</Button>
      )}
    </>
  )
}
