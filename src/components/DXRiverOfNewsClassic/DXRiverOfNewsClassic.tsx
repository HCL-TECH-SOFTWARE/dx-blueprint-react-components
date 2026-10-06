import React, { ReactElement } from "react";
import "./DXRiverOfNewsClassic.scss";
import { getLinkIcon, getLinkTarget, LinksProps } from "../../utilities";
import DXNewsCard from "../DXNewsCard";
import { NewsCardProps } from "../DXNewsCard/DXNewsCard";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
export interface RiverOfNewsProps extends BasicComponent {
    title: string;
    riverOfNews: NewsCardProps[];
    allDateFormat?: string;
    viewAllLink: LinksProps;
}
const DXRiverOfNewsClassic = ( props: RiverOfNewsProps ) => {
    const renderNews = function (): ReactElement[] {
        const newsItems: ReactElement[] = [];
        var index = 0;
        props.riverOfNews.forEach( newsItem => {
            index++;
            newsItems.push(
                <li key={`newsCard-${index}`} data-testid={"newsCardItem"}>
                    <DXNewsCard
                        {...newsItem}
                        dateFormat={newsItem.dateFormat || props.allDateFormat}
                    ></DXNewsCard>
                </li>
            );
        } );
        return newsItems;
    };
    return (
        <div className="dxRiverOfNewsClassic">
            <div className="dxRiverOfNewsClassic__topContainer">
                <div className="dxRiverOfNewsClassic__title" data-testid="riverOfNewsTitle">
                    {props.title}
                </div>
                <a
                    data-testid="riverOfNewsAllButton"
                    className="btn btn-outline-secondary dxRiverOfNewsClassic__viewAllButton"
                    href={props.viewAllLink.url}
                    target={getLinkTarget( props.viewAllLink.target )}>
                    {props.viewAllLink.label} {getLinkIcon( props.viewAllLink.target )}
                </a>
            </div>
            <ul className="dxRiverOfNewsClassic__list" data-testid="riverOfNewsListContainer">
                {renderNews()}
            </ul>
            {props._edit && renderEditButton( props._edit )}
        </div> );
};
export default DXRiverOfNewsClassic;
