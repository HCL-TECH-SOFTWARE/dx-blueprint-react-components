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

import "./DXCasesCatalog.scss";
import React from "react";
import DXCaseCard, { CaseCardProps } from "../DXCaseCard/DXCaseCard";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface CasesCatalogProps {
    items: CaseCardProps[];
}

const DXCasesCatalog = ( props: ExtendableProps<CasesCatalogProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { items: _items, className, ref, ...rest } = props;
    const renderItems = ( items: CaseCardProps[] ) => {
        return items.map( ( item: CaseCardProps, index: number ) => (
            <li key={index}>
                <DXCaseCard {...item} key={index} />
            </li>
        ) );
    };
    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxCasesCatalog", className )}>
            <div className="dxCasesCatalog__header">
                <div className="row">
                    <div className="col-5">
                        <p>Case</p>
                    </div>
                    <div className="col-3">
                        <p>Department</p>
                    </div>
                    <div className="col-3">
                        <p>Status</p>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
            <ul>
                {renderItems( props.items )}
            </ul>
        </div>
    );
};

export default DXCasesCatalog;
