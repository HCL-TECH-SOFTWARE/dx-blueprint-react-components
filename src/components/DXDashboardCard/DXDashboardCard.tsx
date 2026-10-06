import React, { useEffect, useState } from 'react';
import "./DXDashboardCard.scss";

export interface DashboardCardProps {
    index: number,
    data: string,
    label: string,
    onClick?: Function,
    mainIcon?: string,
    secondaryIcon?: string;
}

const DXDashboardCard = ( props: DashboardCardProps ) => {
    const MAX_DATA_CHARS = 5;

    const [smallCard, setSmallCard] = useState( '' );
    const [dataMax, setDataMax] = useState( '' );

    useEffect( () => {
        setDataMax( props.data.substring( 0, MAX_DATA_CHARS ) );
        if ( !props.mainIcon && !props.secondaryIcon ) {
            setSmallCard( '--small' );

        } else {
            setSmallCard( '' );
        }
    }, [props] );

    return (
        <button id={`dxDashboardCard-${props.index}`} className={`dxDashboardCard${smallCard}`} onClick={() => { props.onClick && props.onClick(); }} data-testid="dx-dashboard-card">
            <p className={`dxDashboardCard${smallCard}__data`} data-testid="dx-dashboard-card-number"> {dataMax}
                {props.mainIcon && <i className={props.mainIcon} data-testid="dx-dashboard-card-number-icon"></i>}
            </p>
            <div className={`dxDashboardCard${smallCard}--labelContainer`} >
                <p className={`dxDashboardCard${smallCard}__label`} data-testid="dx-dashboard-card-label"> {props.label}</p>
                {props.secondaryIcon && <i className={props.secondaryIcon} data-testid="dx-dashboard-card-label-icon"></i>}
            </div>
        </button>
    );
};

export default DXDashboardCard;
