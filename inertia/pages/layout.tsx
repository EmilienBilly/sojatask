import { ReactNode } from 'react'
import Navbar from '~/components/navbar'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  )
}

export default Layout
