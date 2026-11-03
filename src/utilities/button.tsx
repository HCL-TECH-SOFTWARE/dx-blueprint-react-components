/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

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

