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

import React, { ReactElement, useEffect, useState } from "react";
import DXChartCard, { ChartCardProps } from "../DXChartCard/DXChartCard";
import "./DXOrgChartBottomUp.scss";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface OrgChartBottomUpProps {
    users: ChartCardProps;
    dropdownOpen?: boolean;
}

const DXOrgChartBottomUp = ( props: ExtendableProps<OrgChartBottomUpProps, "ul"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { users: _users, dropdownOpen: _dropdownOpen, className, ref, ...rest } = props;

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
        <ul {...pickDomProps( rest )} ref={ref} className={classNames( "dxOrgChartBottomUp", className )} data-testid="dxOrgChartBottomUp" role="list" aria-label="list-org-chart">
            {!isLoading && renderCards( props.users ).reverse()}
        </ul>
    );

};

export default DXOrgChartBottomUp;
