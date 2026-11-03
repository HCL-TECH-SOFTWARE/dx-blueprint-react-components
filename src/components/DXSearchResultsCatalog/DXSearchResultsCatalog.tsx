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

import "./DXSearchResultsCatalog.scss";
import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DXPagination from "../DXPagination/DXPagination";
import { getColNumber } from "../../utilities";
import DXStraightCard, { StraightCardProps } from "../DXStraightCard/DXStraightCard";

export interface SearchResultsCatalogProps {
    items: StraightCardProps[],
    paginationProps?: {
        sets: string[],
        active: number,
        activeSet: number;
    },
    elementsPerRow?: number;
}

const hasValidPaginationProps = ( properties: any ) => {
    return properties.paginationProps && 'sets' in properties.paginationProps && properties.paginationProps.sets.length > 0 &&
        'active' in properties.paginationProps && 'activeSet' in properties.paginationProps;
};

/*
** @deprecated: From @version 1.31.0-alpha use DXGenericCatalog instead
*/
const DXSearchResultsCatalog = ( props: SearchResultsCatalogProps ) => {
    // Pagination
    const [active, setActive] = useState( props.paginationProps?.active ? props.paginationProps.active : 0 );
    const [activeSet, setActiveSet] = useState( props.paginationProps?.activeSet ? props.paginationProps.activeSet : 0 );

    /** Pagination logic*/
    const onChangeActive = ( page: number ) => {
        setActive( page );
    };

    const onChangeSet = ( e: any ) => {
        setActiveSet( parseInt( e.target.textContent ) );
        setActive( 1 );
    };

    /** Cards Logic */
    const mapRawData = ( items: any[] ) => {
        let indexOfLastItem = active * activeSet;
        let indexOfFirstItem = indexOfLastItem - activeSet;
        return items.slice( indexOfFirstItem, indexOfLastItem );
    };

    const renderCards = ( items: StraightCardProps[] ) => {
        return (
            <Row>
                {
                    hasValidPaginationProps( props ) ? (
                        mapRawData( items ).map( ( item: any, index: number ) => (
                            <Col xs={12} key={index} className="dxSRCatalog__item" {...getColNumber( props.elementsPerRow ? props.elementsPerRow : 2 )}>
                                <DXStraightCard {...item} />
                            </Col>
                        ) )
                    ) : (
                        items.map( ( item: any, index: number ) => (
                            <Col xs={12} key={index} className="dxSRCatalog__item" {...getColNumber( props.elementsPerRow ? props.elementsPerRow : 2 )}>
                                <DXStraightCard {...item} />
                            </Col>
                        ) )
                    )
                }
            </Row>
        );
    };

    return (
        <div className="dxSRCatalog">
            <div className="dxSRCatalog__container">
                {renderCards( props.items )}
            </div>
            {
                props.paginationProps && hasValidPaginationProps( props ) ? (
                    <DXPagination
                        sets={props.paginationProps.sets}
                        totalItems={props.items.length}
                        active={active}
                        activeSet={activeSet}
                        onChangeActive={onChangeActive}
                        onChangeSet={onChangeSet}
                        totalPages={Math.ceil( props.items.length / activeSet )} />
                ) : null
            }
        </div>
    );
};

export default DXSearchResultsCatalog;
