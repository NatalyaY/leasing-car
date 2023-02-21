import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        pallete: {
            primary: {
                main: string,
                light: string,
                transparent: string,
                pressed: string,
            },
            secondary: {
                main: string,
                light: string,
                dark: string
            },
            error: {
                main: string
            },
            success: {
                main: string
            }
        },
        radius: {
            large: string,
            medium: string,
            small: string
        },
        margin: {
            xl: string,
            m: string,
            s: string
        }
    }
}