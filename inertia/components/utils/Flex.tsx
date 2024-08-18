import styled, { css } from 'styled-components'
import { ReactNode } from 'react'

interface FlexProps {
  $center?: boolean
  $spaceBetween?: boolean
  $flxEnd?: boolean
  $flxCol?: boolean
  $gap?: string
  children: ReactNode
  // Add any other necessary props
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ $center }) =>
    $center &&
    css`
      justify-content: center;
      align-items: center;
    `}
  ${({ $spaceBetween }) =>
    $spaceBetween &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${({ $flxEnd }) =>
    $flxEnd &&
    css`
      justify-content: flex-end;
      align-items: center;
    `}
  ${({ $flxCol }) =>
    $flxCol &&
    css`
      flex-direction: column;
    `}
  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap};
    `}
`
