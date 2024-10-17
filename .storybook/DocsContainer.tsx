import type { DocsContainerProps as BaseContainerProps } from '@storybook/blocks'
import type { PropsWithChildren } from 'react'
import { DocsContainer as BaseContainer } from '@storybook/blocks'
import { themes } from '@storybook/theming'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'

export function DocsContainer(props: PropsWithChildren<BaseContainerProps>) {
  const dark = useDarkMode()
  return (
    <BaseContainer
      context={props.context}
      theme={dark ? themes.dark : themes.light}
    >
      {props.children}
    </BaseContainer>
  )
}
