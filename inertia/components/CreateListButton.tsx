import styled from 'styled-components'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { BoardType } from '~/types/board'

const Button = styled.button`
  background-color: #8b64fd;
  color: #f7f8fa;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  height: 40px;

  &:hover {
    background-color: rgb(139, 100, 253, 0.7);
    color: #ffffff;
  }
`
const ButtonContainer = styled.div`
  display: inline-flex;
  gap: 4px;
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
  background-color: #8b64fd;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: rgb(139, 100, 253, 0.7);
    color: #ffffff;
  }
`

export default function CreateListButton({ board }: { board: BoardType }) {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const { data, setData, post, processing, reset } = useForm({
    title: '',
    boardId: board.id,
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/create-list', {
      onSuccess: () => {
        setIsFormVisible(false)
        reset()
      },
    })
  }

  return (
    <>
      {isFormVisible ? (
        <Form onSubmit={submit}>
          <Input
            type="text"
            placeholder="Saisissez le nom de la liste"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            required
          />
          <ButtonContainer>
            <SubmitButton type="submit" disabled={processing}>
              Nouvelle liste
            </SubmitButton>
            <button onClick={() => setIsFormVisible(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="currentColor"
              >
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
              </svg>
            </button>
          </ButtonContainer>
        </Form>
      ) : (
        <Button onClick={() => setIsFormVisible(true)}>Ajouter une liste</Button>
      )}
    </>
  )
}
