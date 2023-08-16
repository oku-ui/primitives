import React, { PropsWithChildren } from 'react';
import { DocsContainer as BaseContainer, DocsContainerProps as BaseContainerProps } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';

export const DocsContainer = (
    props: PropsWithChildren<BaseContainerProps>
) => {
    console.log(props.children)
    const dark = useDarkMode();
    return (
        <BaseContainer
            context={props.context}
            theme={dark ? themes.dark : themes.light}
        >
            {props.children}
        </BaseContainer>
    );
};