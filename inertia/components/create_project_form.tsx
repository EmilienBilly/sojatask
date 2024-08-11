import { useForm } from '@inertiajs/react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export default function CreateProjectForm() {
  const { data, setData, post, processing } = useForm({
    title: '',
    description: '',
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/create-project')
  }

  return (
    <>
      <Form onSubmit={submit}>
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          type="text"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
        />
        <button type="submit" disabled={processing}>
          Créer
        </button>
      </Form>
    </>
  )
}
