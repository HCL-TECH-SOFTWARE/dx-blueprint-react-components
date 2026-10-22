import React, { ReactElement, useEffect, useState } from "react";
import "./DXRiverOfNewsClassic.scss";
import { getLinkIcon, getLinkTarget, LinksProps } from "../../utilities";
import DXNewsCard from "../DXNewsCard";
import { NewsCardProps } from "../DXNewsCard/DXNewsCard";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import DXPagination from "../DXPagination/DXPagination";

export interface RiverOfNewsProps extends BasicComponent {
    title: string;
    riverOfNews: NewsCardProps[];
    allDateFormat?: string;
    viewAllLink?: LinksProps;
    icons?: {
        header?: string;
    };
    paginationProps?: {
        sets: string[];
        active: number;
        activeSet: number;
    };
    maxVisibleItems?: number;
}


const DXRiverOfNewsClassic = ( props: RiverOfNewsProps ) => {
    const INITIAL_VISIBLE_ITEMS = 6;
    const defaultActiveSet = props.paginationProps?.activeSet || props.maxVisibleItems || 6;
    const [activePage, setActivePage] = useState( props.paginationProps?.active || 1 );
    const [activeSet, setActiveSet] = useState( defaultActiveSet );
    const [isExpandedDropdown, setIsExpandedDropdown] = useState( false );

    useEffect( () => {
        setActivePage( props.paginationProps?.active || 1 );
        setActiveSet( props.paginationProps?.activeSet || props.maxVisibleItems || 6 );
        setIsExpandedDropdown( false );
    }, [props.paginationProps?.active, props.paginationProps?.activeSet, props.maxVisibleItems, props.riverOfNews.length] );

    useEffect( () => {
        const nextTotalPages = Math.max( 1, Math.ceil( props.riverOfNews.length / activeSet ) );
        if ( activePage > nextTotalPages ) {
            setActivePage( nextTotalPages );
        }
    }, [activePage, activeSet, props.riverOfNews.length] );

    const hasValidPaginationProps = () => {
        return !!props.paginationProps &&
            props.paginationProps.sets.length > 0 &&
            props.paginationProps.active > 0 &&
            props.paginationProps.activeSet > 0;
    };

    const changeActivePage = ( page: number ) => {
        setActivePage( page );
    };

    const changeActiveSet = ( e: any ) => {
        const nextActiveSet = Number.parseInt( e.target.textContent, 10 );
        setActiveSet( nextActiveSet );
        setActivePage( 1 );
    };

    const getPaginatedNews = () => {
        const start = ( activePage - 1 ) * activeSet;
        return props.riverOfNews.slice( start, start + activeSet );
    };

    const getVisibleNews = () => {
        return getPaginatedNews().slice( 0, INITIAL_VISIBLE_ITEMS );
    };

    const getHiddenNews = () => {
        return getPaginatedNews().slice( INITIAL_VISIBLE_ITEMS );
    };

    const totalPages = Math.max( 1, Math.ceil( props.riverOfNews.length / activeSet ) );
    const minimumSet = hasValidPaginationProps()
        ? Math.min( ...props.paginationProps!.sets.map( ( set ) => Number.parseInt( set, 10 ) ).filter( ( set ) => !Number.isNaN( set ) ) )
        : defaultActiveSet;
    const shouldRenderPagination = hasValidPaginationProps() && props.riverOfNews.length > minimumSet;

    const renderNews = function (): ReactElement[] {
        const newsItems: ReactElement[] = [];
        var index = 0;
        getVisibleNews().forEach( newsItem => {
            index++;
            newsItems.push(
                <li key={`newsCard-${index}`} data-testid={"newsCardItem"}>
                    <DXNewsCard
                        {...newsItem}
                        dateFormat={newsItem.dateFormat || props.allDateFormat}
                        layout={newsItem.layout || "top"}
                        contentPosition={newsItem.contentPosition || "split"}
                    ></DXNewsCard>
                </li>
            );
        } );

        return newsItems;
    };

    const renderHiddenNews = function (): ReactElement[] {
        const newsItems: ReactElement[] = [];
        var index = INITIAL_VISIBLE_ITEMS;
        getHiddenNews().forEach( newsItem => {
            index++;
            newsItems.push(
                <li key={`newsCard-${index}`} data-testid={"newsCardItemHidden"}>
                    <DXNewsCard
                        {...newsItem}
                        dateFormat={newsItem.dateFormat || props.allDateFormat}
                        layout={newsItem.layout || "top"}
                        contentPosition={newsItem.contentPosition || "split"}
                    ></DXNewsCard>
                </li>
            );
        } );

        return newsItems;
    };

    const hasHiddenNews = getHiddenNews().length > 0;

    const toggleDropdown = () => {
        setIsExpandedDropdown( !isExpandedDropdown );
    };

    return (
        <div className="dxRiverOfNewsClassic">
            <div className="dxRiverOfNewsClassic__topContainer">
                <div className="dxRiverOfNewsClassic__title" data-testid="riverOfNewsTitle">
                    {
                        props.icons?.header &&
                        <i data-testid="riverOfNewsHeaderIcon" className={props.icons.header}></i>
                    }
                    <span className="dxRiverOfNewsClassic__titleText">{props.title}</span>
                </div>
                {
                    props.viewAllLink &&
                    <a
                        data-testid="riverOfNewsAllButton"
                        className="btn btn-outline-secondary dxRiverOfNewsClassic__viewAllButton"
                        href={props.viewAllLink.url}
                        target={getLinkTarget( props.viewAllLink.target )}>
                        {props.viewAllLink.label} {getLinkIcon( props.viewAllLink.target )}
                    </a>
                }
            </div>
            <ul className="dxRiverOfNewsClassic__list" data-testid="riverOfNewsListContainer">
                {renderNews()}
            </ul>
            {
                hasHiddenNews &&
                <>
                    {
                        isExpandedDropdown &&
                        <ul className="dxRiverOfNewsClassic__hiddenList" data-testid="riverOfNewsHiddenListContainer">
                            {renderHiddenNews()}
                        </ul>
                    }
                    <div className="dxRiverOfNewsClassic__dropdownButtonContainer">
                        <button
                            data-testid="riverOfNewsDropdownButton"
                            className="dxRiverOfNewsClassic__dropdownButton"
                            onClick={toggleDropdown}
                            aria-expanded={isExpandedDropdown}
                            aria-label={isExpandedDropdown ? "Show less items" : "Show more items"}
                        >
                            <i className={isExpandedDropdown ? "ci-Caret_Up_MD" : "ci-Caret_Down_MD"}></i>
                        </button>
                    </div>
                </>
            }
            {
                shouldRenderPagination &&
                <div className="dxRiverOfNewsClassic__pagination">
                    <DXPagination
                        sets={props.paginationProps!.sets}
                        totalItems={props.riverOfNews.length}
                        totalPages={totalPages}
                        active={activePage}
                        activeSet={activeSet}
                        onChangeActive={changeActivePage}
                        onChangeSet={changeActiveSet}
                    />
                </div>
            }
            {props._edit && renderEditButton( props._edit )}
        </div> );
};

export default DXRiverOfNewsClassic;
