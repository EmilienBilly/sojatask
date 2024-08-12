import { ReactNode } from 'react'
import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
import styled from 'styled-components'
import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const user = usePage<SharedProps>().props.user

  const Flexbox = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
  `
  return (
    <>
      {user && <Navbar />}
      <Flexbox>
        {user && <Sidebar />}
        <div className="container">{children}</div>
      </Flexbox>
    </>
  )
}

export default Layout
