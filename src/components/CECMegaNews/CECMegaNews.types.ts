import type {
    NewsProps,
    NewsItemProps,
    NewsDisplayProps,
    NewsImageModeMega,
} from "../../utilities/cec-types";
export type MegaLayoutPreset =
    | "one-two"
    | "one-three"
    | "one-four"
    | "one-two-two"
    | "one-four-four";
export type MegaHeroPosition = "left" | "top" | "right";
export type MegaImageMode = NewsImageModeMega;
export type MegaNewsItemProps = NewsItemProps & {
    summary?: string;
};
export interface MegaNewsProps
    extends NewsProps,
        NewsDisplayProps<NewsImageModeMega> {
    layout?: MegaLayoutPreset; // default: one-four-four
    heroPosition?: MegaHeroPosition; // default: left
}
