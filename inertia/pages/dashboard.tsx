import { Head, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import styled from 'styled-components'

export default function Dashboard(props: { version: number }) {
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
        <div className="title">AdonisJS {props.version} x Inertia x React</div>
        <span>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>
      </div>
    </>
  )
}
