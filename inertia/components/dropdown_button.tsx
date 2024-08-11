import { useState } from 'react'
import styled from 'styled-components'
import { Link } from '@inertiajs/react'

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: absolute;
  top: 40px;
  background-color: white;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
`

const DropdownItem = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
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
      <Button onClick={toggleDropdown}>Dropdown</Button>
      <DropdownMenu $isOpen={isOpen}>
        <DropdownItem href="#">Item 1</DropdownItem>
        <DropdownItem href="#">Item 2</DropdownItem>
        <DropdownItem href="#">Item 3</DropdownItem>
      </DropdownMenu>
    </DropdownContainer>
  )
}
