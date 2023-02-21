import { ThemeColor, Split } from "./types";
import { DefaultTheme } from 'styled-components';


export const getColor = (color: ThemeColor, theme: DefaultTheme) => {
    const splitted = color.split('.') as Split<typeof color>;
    const main = theme.pallete[splitted[0]];
    return main[splitted[1] as keyof typeof main];
}

export const getPresedColor = (color: ThemeColor, theme: DefaultTheme) => {
    const splitted = color.split('.') as Split<typeof color>;
    const main = theme.pallete[splitted[0]];
    return main.hasOwnProperty('pressed') ? main['pressed' as keyof typeof main] : theme.pallete.primary.pressed;
}