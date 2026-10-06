import { BasicComponent } from "../../utilities/BasicComponent/BasicComponent";
import { ImageProps, LinksProps } from "../../utilities";
export interface BlogCardProps extends BasicComponent {
    link: LinksProps;
    date: string;
    image?: ImageProps;
    dateFormat?: string;
    content?: string;
    tags?: string[] | string; // tolerate either; we normalize internally
    summary?: string;
    index?: number;
}
export interface CECNewsCardCatalogProps extends BasicComponent {
    items: BlogCardProps[];
    totalItems?: number;
    filterType?: string;
    paginationProps?: {
        sets: string[];
        active: number;
        activeSet: number;
    };
    summaryLength?: number;
    searchLabel?: string;
    searchPlaceholder?: string;
    hideFilters?: boolean;
    dateFormat?: string;
    elementsPerRow?: number;
    
    tagFilter?: string | string[];
    
    numberOfItems?: number;
}
