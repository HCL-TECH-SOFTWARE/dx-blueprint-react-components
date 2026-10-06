import "../DXMiniCatalog.scss";

import React from "react";
import { SliderIcons, getIcon } from "../../../utilities";

export interface SliderButtonProps {
    onClick?: any,
    direction: string;
    icons?: SliderIcons;
}

const SliderButton = ( props: SliderButtonProps ) => {
    return (
        <button className={`dxMiniCatalog__navBtn ${props.direction === "prev" ? 'dxMiniCatalog__navBtn--direction-prev dxMiniCatalog__navBtn--display-hide' : 'dxMiniCatalog__navBtn--direction-next'}`} onClick={props.onClick}
            data-testid={`slider-${props.direction}-button`}
            aria-label={props.direction}>
            <i className={props.direction === "next" ? getIcon( props.icons, "next", 'ci-Chevron_Right' ) : getIcon( props.icons, "prev", 'ci-Chevron_Left' )}></i>
        </button>
    );
};
export default SliderButton;
