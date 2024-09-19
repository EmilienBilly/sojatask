import styled from 'styled-components'

export default function CreateListButton() {
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
  return (
    <>
      <Button>Ajouter une liste</Button>
    </>
  )
}
