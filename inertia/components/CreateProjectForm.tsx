import { useForm } from '@inertiajs/react'
import styled from 'styled-components'
import { Flex } from '~/components/utils/Flex'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 16px;

  @media (min-width: 1024px) {
    width: 50%;
  }

  input {
    padding: 6px;
    font-family: inherit;
  }

  textarea {
    padding: 6px;
    font-family: inherit;
  }
`

const Button = styled.button`
  background-color: #8b64fd;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: #6c4ec4;
  }
`

export default function CreateProjectForm() {
  const { data, setData, post, processing, reset } = useForm({
    title: '',
    description: '',
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/create-project', {
      onSuccess: () => reset(),
    })
  }

  return (
    <Form onSubmit={submit}>
      <Flex $flxCol $gap="10px">
        <label htmlFor="title">Titre du projet</label>
        <input
          id="title"
          type="text"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
        />
      </Flex>
      <Flex $flxCol $gap="10px">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
        />
      </Flex>
      <Button type="submit" disabled={processing}>
        Créer
      </Button>
    </Form>
  )
}
