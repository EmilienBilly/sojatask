import styled from 'styled-components'

export default function Sidebar() {
  const Sidenav = styled.div`
    padding: 15px;
    width: 260px;
    border-right-width: 1px;
    border-right-style: solid;
    border-color: hsla(211, 18%, 68%, 0.16);
  `
  return (
    <Sidenav>
      <h2>Hello</h2>
    </Sidenav>
  )
}
