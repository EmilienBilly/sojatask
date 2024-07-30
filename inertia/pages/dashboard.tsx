import { Head, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import styled from 'styled-components'

export default function Dashboard() {
  const flash = usePage<SharedProps>().props.flash

  const Flash = styled.div`
    background-color: seagreen;
    padding: 10px 10px;
    color: #f7f8fa;
  `
  return (
    <>
      <Head title="Dashboard" />
      <div className="container">
        {flash.success && <Flash>{flash.success}</Flash>}
        {flash.error && <Flash className="alert alert-error">{flash.error}</Flash>}
        <div className="title">Dashboard</div>
      </div>
    </>
  )
}
