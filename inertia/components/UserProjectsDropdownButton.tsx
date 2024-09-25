import { useState } from 'react'
import styled from 'styled-components'
import { Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '@adonisjs/inertia/types'
import { useProjectContext } from '~/hooks/useProject'
import { IconArrowDropDown } from '~/components/icons/IconArrowDropDown'

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

export default function UserProjectsDropdownButton() {
  const { userProjects } = usePage<SharedProps>().props
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const { setSelectedProject } = useProjectContext()

  const handleSelectProject = (userProject: UserProject) => {
    setSelectedProject({
      id: userProject.id,
      title: userProject.name,
      description: userProject.description,
      created_by: userProject.createdBy,
    })
  }

  return (
    <DropdownContainer>
      <Button onClick={toggleDropdown}>
        Mes projets <IconArrowDropDown />
      </Button>
      <DropdownMenu $isOpen={isOpen}>
        {userProjects.map((userProject) => (
          <DropdownItem
            key={userProject.id}
            onClick={() => handleSelectProject(userProject)}
            href={`/user_projects/${userProject.id}`}
          >
            {userProject.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  )
}
