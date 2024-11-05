import { useRef, useState } from 'react'
import styled from 'styled-components'
import { Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '@adonisjs/inertia/types'
import { useProjectContext } from '~/hooks/useProject'
import { IconArrowDropDown } from '~/components/icons/IconArrowDropDown'
import useClickOutside from '~/hooks/useClickOutside'

interface UserProject {
  id: number
  name: string
  description: string
  createdBy: number
}

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const Button = styled.button`
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #f7f8fa;
  color: #8b64fd;
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #dedede;
  }
`

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
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

export default function UserProjectsDropdownButton() {
  const { userWorkspaces } = usePage<SharedProps>().props
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen((previous) => !previous)
  }

  useClickOutside(dropdownRef, () => {
    setIsOpen(false)
  })

  const { setSelectedProject } = useProjectContext()

  const handleSelectProject = (userWorkspace: UserProject) => {
    setSelectedProject({
      id: userWorkspace.id,
      title: userWorkspace.name,
      description: userWorkspace.description,
      created_by: userWorkspace.createdBy,
    })
    setIsOpen(false)
  }

  return (
    <DropdownContainer ref={dropdownRef}>
      <Button onClick={toggleDropdown}>
        Mes projets <IconArrowDropDown />
      </Button>
      <DropdownMenu $isOpen={isOpen}>
        {userWorkspaces &&
          userWorkspaces.map((userWorkspace) => (
            <DropdownItem
              key={userWorkspace.id}
              onClick={() => handleSelectProject(userWorkspace)}
              href={`/user_projects/${userWorkspace.id}`}
            >
              {userWorkspace.name}
            </DropdownItem>
          ))}
      </DropdownMenu>
    </DropdownContainer>
  )
}
