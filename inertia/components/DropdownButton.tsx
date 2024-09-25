import { useState } from 'react'
import styled from 'styled-components'
import { Link } from '@inertiajs/react'
import { IconArrowDropDown } from '~/components/icons/IconArrowDropDown'

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const Button = styled.button`
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #ffffff;
  color: #8b64fd;
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 3px;
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
      <Button onClick={toggleDropdown}>
        Créer <IconArrowDropDown />
      </Button>
      <DropdownMenu $isOpen={isOpen}>
        <DropdownItem href="/create-project">Nouveau projet</DropdownItem>
        <DropdownItem href="#">Nouveau tableau</DropdownItem>
      </DropdownMenu>
    </DropdownContainer>
  )
}
