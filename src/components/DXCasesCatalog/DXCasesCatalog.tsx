import "./DXCasesCatalog.scss";
import React from "react";
import DXCaseCard, { CaseCardProps } from "../DXCaseCard/DXCaseCard";

export interface CasesCatalogProps {
    items: CaseCardProps[];
}

const DXCasesCatalog = ( props: CasesCatalogProps ) => {
    const renderItems = ( items: CaseCardProps[] ) => {
        return items.map( ( item: CaseCardProps, index: number ) => (
            <li key={index}>
                <DXCaseCard {...item} key={index} />
            </li>
        ) );
    };
    return (
        <div className="dxCasesCatalog">
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
