import { Head, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'

export default function Dashboard(props: { version: number }) {
  const flash = usePage<SharedProps>().props.flash
  return (
    <>
      <Head title="Dashboard" />
      <div className="container">
        {flash.success && <div className="alert alert-success">{flash.success}</div>}
        {flash.error && <div className="alert alert-error">{flash.error}</div>}
        <div className="title">AdonisJS {props.version} x Inertia x React</div>
        <span>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>
      </div>
    </>
  )
}
