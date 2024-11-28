import { Head, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import styled from 'styled-components'
import { Flex } from '#inertia/utils/Flex'

export default function Dashboard() {
  const flash = usePage<SharedProps>().props.flash

  return (
    <div>
      <Head title="Dashboard" />
      <Flex $flxCol={true} $gap="18px">
        {flash.error && <Flash className="alert alert-error">{flash.error}</Flash>}
        <h1>Dashboard</h1>
      </Flex>
    </div>
  )
}

const Flash = styled.div`
  display: flex;
  justify-content: center;
  background-color: seagreen;
  padding: 10px 10px;
  color: #f7f8fa;
  width: 200px;
`
