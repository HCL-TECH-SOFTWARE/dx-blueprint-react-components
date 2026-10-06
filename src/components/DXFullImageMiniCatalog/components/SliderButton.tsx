import "../DXFullImageMiniCatalog.scss";

import React from "react";
import { SliderIcons, getIcon } from "../../../utilities";

export interface SliderButtonProps {
    onClick?: any,
    direction: string;
    icons?: SliderIcons;
}
/***
 * TODO: Eventually migrate this component to be global, because it is on every mini catalog
 */
const SliderButton = ( props: SliderButtonProps ) => {
    return (
        <button className={`dxFullImgMiniC__navBtn ${props.direction === "prev" ? 'dxFullImgMiniC__navBtn--direction-prev dxFullImgMiniC__navBtn--display-hide' : 'dxFullImgMiniC__navBtn--direction-next'}`}
            onClick={props.onClick}
            aria-label={props.direction}
            data-testid={`slider-${props.direction}-button`}>
            <i className={props.direction === "next" ? getIcon( props.icons, "next", 'ci-Chevron_Right' ) : getIcon( props.icons, "prev", 'ci-Chevron_Left' )}></i>
        </button>
    );
};
export default SliderButton;
