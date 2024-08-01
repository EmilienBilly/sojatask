import { ReactNode } from 'react'
import Navbar from '~/components/navbar'
import Sidebar from '~/components/sidebar'
import styled from 'styled-components'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const Test = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
  `
  return (
    <>
      <Navbar />
      <Test>
        <Sidebar />
        <div className="container">{children}</div>
      </Test>
    </>
  )
}

export default Layout
