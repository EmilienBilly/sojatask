import { Head, usePage } from '@inertiajs/react'

interface PageProps {
  flash: {
    success: string
    error: string
    info: string
    warning: string
  }

  [key: string]: any
}

export default function Home(props: { version: number }) {
  const { flash } = usePage<PageProps>().props
  console.log(flash)
  return (
    <>
      <Head title="Homepage" />
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
