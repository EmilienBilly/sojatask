import { Head, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import styled from 'styled-components'
import { Flex } from '~/components/utils/Flex'

export default function Dashboard() {
  const flash = usePage<SharedProps>().props.flash

  const getFormattedDate = () => {
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }
    return today.toLocaleDateString('fr-FR', options)
  }

  const getCurrentMonth = () => {
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
    }
    return new Intl.DateTimeFormat('fr-FR', options).format(today)
  }

  return (
    <div className="container">
      <Head title="Dashboard" />
      <Flex $flxCol={true} $gap="18px">
        {flash.error && <Flash className="alert alert-error">{flash.error}</Flash>}
        <div className="title">Dashboard</div>
        <CurrentDate>
          <Month>{getCurrentMonth().toUpperCase()}</Month>
          <p>Aujourd'hui, {getFormattedDate()}</p>
        </CurrentDate>
        <div>
          <h3>Projets</h3>
          <span>Vous avez 3 pojets</span>
        </div>
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

const Month = styled.p`
  font-weight: bold;
  font-size: 18px;
`

const CurrentDate = styled.div`
  border: solid 1px #1f1f20;
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 16px;
  @media (min-width: 769px) {
    width: 40%;
  }
`
