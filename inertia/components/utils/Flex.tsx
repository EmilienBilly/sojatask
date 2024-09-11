import styled, { css } from 'styled-components'
import { ReactNode } from 'react'

interface FlexProps {
  $full?: boolean
  $center?: boolean
  $spaceBetween?: boolean
  $flxEnd?: boolean
  $flxCol?: boolean
  $gap?: string
  children: ReactNode
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ $full }) =>
    $full &&
    css`
      height: 100%;
      width: 100%;
    `}
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
