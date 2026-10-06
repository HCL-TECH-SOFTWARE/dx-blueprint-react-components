import React, { ReactElement, useEffect, useState } from "react";
import DXChartCard, { ChartCardProps } from "../DXChartCard/DXChartCard";
import "./DXOrgChartBottomUp.scss";

export interface OrgChartBottomUpProps {
    users: ChartCardProps;
    dropdownOpen?: boolean;
}

const DXOrgChartBottomUp = ( props: OrgChartBottomUpProps ) => {

    const [isLoading, setLoading] = useState( true );

    useEffect( () => {
        props.users.displayName = "Me";
        setLoading( false );
    }, [props] );

    const renderCards = ( contentItem: ChartCardProps ) => {
        var cards: ReactElement[] = [];
        var nextLevelHtml: ReactElement[] = [];

        // Identify the top-most manager to prevent overlapping menus when toggled
        const isTopManager = !contentItem.manager || !contentItem.manager.displayName;

        cards.push(
            <li key={`li-` + contentItem.id}>
                <DXChartCard
                    key={contentItem.id}
                    {...contentItem}
                    dropdownOpen={( isTopManager && props.dropdownOpen ) || contentItem.dropdownOpen}
                ></DXChartCard>
            </li>
        );

        if ( contentItem.manager && contentItem.manager.displayName ) {
            nextLevelHtml = renderCards( contentItem.manager );
        }

        cards.push( ...nextLevelHtml );
        return cards;
    };

    return (
        <ul className="dxOrgChartBottomUp" data-testid="dxOrgChartBottomUp" role="list" aria-label="list-org-chart">
            {!isLoading && renderCards( props.users ).reverse()}
        </ul>
    );

};

export default DXOrgChartBottomUp;
