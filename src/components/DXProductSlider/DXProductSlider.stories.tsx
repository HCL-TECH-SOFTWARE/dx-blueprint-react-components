import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXProductSlider, { ProductSliderProps } from "./DXProductSlider";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Lists, Catalogs, and Filters/Product Slider",
    component: DXProductSlider,
    excludeStories: /.*Args$/,
} as Meta<typeof DXProductSlider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<ProductSliderProps> = ( args ) => <DXProductSlider {...args} />;

export const ProductSlider = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const ProductSliderArgs: ProductSliderProps = {
    items: [
        {
            category: "Category Title",
            title: "Product title up to 3 lines are allowed in this section",
            body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolor em que laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
            image: {
                url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2948&q=80"
            },
            button: {
                label: "View more",
                onClick: () => { console.log( "Clicked!" ); },
                icon: {
                    class: "ci-Chevron_Right",
                    position: "right"
                }
            }
        },
        {
            category: "2",
            title: "Product title up to 3 lines are allowed in this section",
            body: "Lorem ipsum, lorem ipsum, lorem ipsum",
            image: {
                url: "https://images.unsplash.com/photo-1541873676-a18131494184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2662&q=80"
            },
            button: {
                label: "Button action",
                onClick: () => { console.log( "Clicked!" ); },
                icon: {
                    class: "ci-Chevron_Right",
                    position: "right"
                }
            }
        },
        {
            category: "3",
            title: "Product title up to 3 lines are allowed in this section",
            body: "Lorem ipsum, lorem ipsum, lorem ipsum",
            image: {
                url: "https://images.unsplash.com/photo-1634176866089-b633f4aec882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80"
            },
            button: {
                label: "View more",
                onClick: () => { console.log( "Clicked!" ); },
                icon: {
                    class: "ci-Chevron_Right",
                    position: "right"
                }
            }
        },
        {
            category: "4",
            title: "Product title",
            body: "Lorem ipsum, lorem ipsum, lorem ipsum",
            image: {
                url: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80"
            },
            button: {
                label: "View more",
                onClick: () => { console.log( "Clicked!" ); },
                icon: {
                    class: "ci-Chevron_Right",
                    position: "right"
                }
            }
        }
    ]
};

export const ProductSliderChangedIconsArgs = {
    ...ProductSliderArgs,
    icons: {
        scroll: "ci-Arrow_Circle_Down"
    }
};


ProductSlider.args = ProductSliderArgs;
ChangedIcons.args = ProductSliderChangedIconsArgs;
