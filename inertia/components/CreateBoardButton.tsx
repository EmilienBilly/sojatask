import styled from 'styled-components'
import { Dispatch, SetStateAction } from 'react'

const Button = styled.button`
  background-color: #8b64fd;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`
type CreateBoardButtonProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function CreateBoardButton({ setShowModal, showModal }: CreateBoardButtonProps) {
  return <Button onClick={() => setShowModal(!showModal)}>Créer un tableau</Button>
}
