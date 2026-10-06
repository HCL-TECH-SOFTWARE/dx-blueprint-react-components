import {ProcessedBlogCard} from "../../CECFeaturedStories.types";
import {BasicComponent} from "../../../../utilities/BasicComponent/BasicComponent";
export type LayoutType = 'default' | 'imageLeft';
export interface SlideLayoutProps extends BasicComponent{
    item: ProcessedBlogCard;
    isCurrent: boolean;
    index: number;
    totalSlides: number;
    mode: 'light' | 'dark' | 'none';
    textColor?: string;
    onHoldStart?: () => void;
    onHoldEnd?: () => void;
    className?: string;
    hasImage: boolean;
    imageUrl?: string;
    imageLoaded?: boolean;
    onImageLoad?: () => void;
    onImageError?: ( e: React.SyntheticEvent<HTMLImageElement> ) => void;
}
export interface SlideContentProps {
    item: ProcessedBlogCard;
    textColor?: string;
    mode: 'light' | 'dark' | 'none';
    isImageLeft?: boolean;
    isActive?: boolean;
}
