import { useState } from 'react'
import styled from 'styled-components'
import { Link } from '@inertiajs/react'

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const Button = styled.button`
  background-color: #5a45ff;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`

const DropdownMenu = styled.button<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: absolute;
  top: 40px;
  background-color: white;
  min-width: 160px;
  border: 1px solid #dedede;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1;
`

const DropdownItem = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  text-align: left;
  display: block;

  &:hover {
    background-color: #f1f1f1;
  }
`

export default function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DropdownContainer>
      <Button onClick={toggleDropdown}>Créer</Button>
      <DropdownMenu $isOpen={isOpen}>
        <DropdownItem href="/create-project">Nouveau projet</DropdownItem>
        <DropdownItem href="#">Nouveau tableau</DropdownItem>
      </DropdownMenu>
    </DropdownContainer>
  )
}
