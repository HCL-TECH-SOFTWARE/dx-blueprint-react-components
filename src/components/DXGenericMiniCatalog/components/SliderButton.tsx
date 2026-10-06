
import React from "react";
import { SliderIcons, getIcon } from "../../../utilities";

export interface SliderButtonProps {
    onClick?: any,
    direction: string;
    icons?: SliderIcons;
}

const SliderButton = ( props: SliderButtonProps ) => {
    return (
        <button
            className={`${"dxGenericMiniCatalog__navbtn"} ${props.direction === "prev" ? `prev  dxGenericMiniCatalog__navbtn--hide` : props.direction}`}
            onClick={props.onClick}
            data-testid={`cbcatalog-slider-${props.direction}-button`}>
            <i className={props.direction === "next" ? getIcon( props.icons, "next", 'ci-Chevron_Right' ) : getIcon( props.icons, "prev", 'ci-Chevron_Left' )}></i>
        </button>
    );
};
export default SliderButton;
