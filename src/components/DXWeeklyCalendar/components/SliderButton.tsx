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
import "../DXWeeklyCalendar.scss";

import React from "react";
import { SliderIcons, getIcon } from "../../../utilities";

export interface SliderButtonProps {
    onClick?: any;
    direction: string;
    icons?: SliderIcons;
}
/***
 * TODO: Eventually migrate this component to be global, because it is on every mini catalog
 */
const SliderButton = ( props: SliderButtonProps ) => {
    return (
        <button className={`dxWeeklyCalendar__navBtn ${props.direction === "prev" ? 'dxWeeklyCalendar__navBtn--direction-prev dxWeeklyCalendar__navBtn--display-hide' : 'dxWeeklyCalendar__navBtn--direction-next'}`}
            onClick={props.onClick}
            aria-label={props.direction}
            data-testid={`slider-${props.direction}-button`}>
            <i className={props.direction === "next" ? getIcon( props.icons, "next", 'ci-Chevron_Right' ) : getIcon( props.icons, "prev", 'ci-Chevron_Left' )}></i>
        </button>
    );
};
export default SliderButton;
