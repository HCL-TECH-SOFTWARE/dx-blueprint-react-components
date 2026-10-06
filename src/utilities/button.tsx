import { FormEventHandler, MouseEventHandler } from "react";
// For all button interfaces the 'label' prop is an optional value.
// Therefore, when used, a fallback value should always be implemented.
export interface ButtonProps {
    label?: string,
    onClick: Function;
}

export interface NumericButtonProps {
    label: number,
    onClick: Function;
}

export interface ButtonMouseHandler {
    label?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface IconButtonProps {
    label: string,
    onClick?: Function | FormEventHandler | MouseEventHandler<HTMLButtonElement>;
    icon?: {
        class: string,
        position?: "left" | "right",
        testId?: string;
    };
    hideLabel?: boolean;
}

