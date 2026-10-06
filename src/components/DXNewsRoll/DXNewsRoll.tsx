import React, { ReactElement } from "react";
import { ImageProps, LinksProps, getIcon } from "../../utilities";
import "./DXNewsRoll.scss";

export interface NewsRollProps {
    newsRollItems: NewsRollItem[];
    icons?: {
        link?: string;
    };
}

export interface NewsRollItem extends LinksProps {
    primaryImage: ImageProps;
    secondaryImage?: ImageProps;
}

const DXNewsRoll = ( props: NewsRollProps ) => {

    const renderNews = function (): ReactElement[] {
        const children: ReactElement[] = [];
        var id = 0;

        props.newsRollItems.forEach( ( newsItem ) => {
            children.push(
                <div className="dxNewsRoll__card" key={id++}>
                    <div className="dxNewsRoll__banner">
                        <img
                            className="dxNewsRoll__primaryImage"
                            data-testid="newsRollPrimaryImage"
                            src={newsItem.primaryImage.url}
                            alt={newsItem.primaryImage.altText || ""}
                            {...( !newsItem.primaryImage.altText && { role: "presentation" } )}
                        ></img>
                        {
                            newsItem.secondaryImage &&
                            <img
                                className="dxNewsRoll__secondaryImage"
                                data-testid="newsRollSecondaryImage"
                                src={newsItem.secondaryImage.url}
                                alt={newsItem.secondaryImage.altText || ""}
                                {...( !newsItem.secondaryImage.altText && { role: "presentation" } )}
                            ></img>
                        }
                    </div>
                    <a className="dxNewsRoll__link" data-testid="newsRollLink" href={newsItem.url} target={newsItem.target} role="link">
                        <div className="dxNewsRoll__title" data-testid="newsRollTitle">
                            {newsItem.label}
                        </div>
                        <i data-testid="newsRoll_icon" className={`${getIcon( props.icons, "link", "ci-Chevron_Right" )} dxNewsRoll__icon`} ></i>
                        <i data-testid="newsRoll_icon" className={`${getIcon( props.icons, "link", "ci-Chevron_Right" )} dxNewsRoll__icon`} ></i>
                    </a>
                </div>
            );
        } );

        return children;
    };

    return (
        <div className="dxNewsRoll">
            <div className="dxNewsRoll__gradient"></div>
            <div className="dxNewsRoll__main" data-testid="newsRoll">
                {renderNews()}
            </div>
        </div>
    );
};

export default DXNewsRoll;
