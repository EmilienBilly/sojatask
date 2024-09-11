import { Head, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import styled from 'styled-components'
import { Flex } from '~/components/utils/Flex'

const Flash = styled.div`
  display: flex;
  justify-content: center;
  background-color: seagreen;
  padding: 10px 10px;
  color: #f7f8fa;
  width: 200px;
`

export default function Dashboard() {
  const flash = usePage<SharedProps>().props.flash

  return (
    <>
      <Head title="Dashboard" />
      <Flex $flxCol={true}>
        {flash.success && <Flash>{flash.success}</Flash>}
        {flash.error && <Flash className="alert alert-error">{flash.error}</Flash>}
        <div className="title">Dashboard</div>
      </Flex>
    </>
  )
}
