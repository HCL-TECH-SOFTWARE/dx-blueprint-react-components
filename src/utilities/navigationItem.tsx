import { QuickLinksProps } from "../components/DXQuickLinks/DXQuickLinks";


export interface NavigationItemProps {
    title: string;
    url?: string;
    target?: string;
    children?: NavigationItemProps[];
    index: number;
    quickLinks?: QuickLinksProps;

}