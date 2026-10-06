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
