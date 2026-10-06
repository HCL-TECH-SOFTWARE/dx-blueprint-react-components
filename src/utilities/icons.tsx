export interface SliderIcons {
    prev?: string;
    next?: string;
}

export interface StateIcons {
    close?: string;
    open?: string;
}

export const getIcon = ( icon: any, value: string, defaultIcon: string ) => {
    if ( icon && icon[value] ) {
        return icon[value];
    } else {
        return defaultIcon;
    }
};
