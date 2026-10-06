import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import moment from "moment";
import { searchVisibleArgs } from "../DXSearchInput/DXSearchInput.stories";
import { portalLogosDefaultArgs } from "../DXPortalLogos/DXPortalLogos.stories";
import { itemsArgs } from "../DXUtilityZone/DXUtilityZone.stories";
import DXNavigationHeader2, { NavigationProps } from "./DXNavigationHeader2";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Navigation/Navigation Header 2",
    component: DXNavigationHeader2,
    excludeStories: /.*Args$/,
} as Meta<typeof DXNavigationHeader2>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<NavigationProps> = ( args ) =>
    <>
        <DXNavigationHeader2 {...args} />
        <div style={{ display: "none" }}>
            <div id="content-1">
                <h3>Test content will be moved inside utility zone</h3>
                <p>Panel 1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto corporis assumenda voluptate consequuntur neque, vero repudiandae error facilis saepe deleniti, nobis tempore totam. Vitae, recusandae ipsa? Numquam corporis repellat enim.</p>
            </div>
            <div id="content-2">
                <h3>Test content will be moved inside utility zone</h3>
                <p>Panel 2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto corporis assumenda voluptate consequuntur neque, vero repudiandae error facilis saepe deleniti, nobis tempore totam. Vitae, recusandae ipsa? Numquam corporis repellat enim.</p>
            </div>
            <div id="content-3">
                <h3>Test content will be moved inside utility zone</h3>
                <p>Panel 3 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto corporis assumenda voluptate consequuntur neque, vero repudiandae error facilis saepe deleniti, nobis tempore totam. Vitae, recusandae ipsa? Numquam corporis repellat enim.</p>
            </div>
            <div id="content-4">
                <h3>Test content will be moved inside utility zone</h3>
                <p>Panel 4 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto corporis assumenda voluptate consequuntur neque, vero repudiandae error facilis saepe deleniti, nobis tempore totam. Vitae, recusandae ipsa? Numquam corporis repellat enim.</p>
            </div>
            <div id="my-content" style={{ padding: "0.6rem" }}>
                <h3>This will be removed and appended inside the menu for demonstration purposes</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam quae perspiciatis consectetur facere esse, reiciendis molestiae voluptatum placeat veniam explicabo iste culpa ullam. Repellat officia, libero nam deserunt at in?</p>
            </div>
        </div>
        <p>{loremIpsim}</p>
    </>;

export const NavigationHeader2 = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args

let startTime = moment().add( 1, "hours" ).toISOString();
let endTime = moment().add( 2, "hours" ).toISOString();

export const NavigationHeader2Args: NavigationProps = {
    portalLogos: portalLogosDefaultArgs,
    searchInput: { ...searchVisibleArgs, showOverlay: true },
    megaMenu: {
        showOverlay: true,
        menuImage: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2024&q=80",
        globalLinks: [
            {
                url: "www.hcl-software.com",
                label: "HCL Software Page",
                target: "_self"
            },
            {
                url: "www.hcl-software.com",
                label: "Home",
                target: "_self"
            },
            {
                url: "www.hcl-software.com",
                label: "Privacy Policy",
                target: "_self"
            },
            {
                url: "www.hcl-software.com",
                label: "Information",
                target: "_self"
            },

        ],
        navigationItems: [
            {
                title: "Home",
                iconClass: "ci-House_01",
                index: 0,
            },
            {
                title: "The office",
                index: 1,
                bannerProps: [
                    {
                        title: "Title",
                        image: "https://images.unsplash.com/photo-1557568192-387504499261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                        body: "Etiam rhoncus rutrum semper. Vestibulum finibus ligula nec hendrerit semper. ",
                        link: {
                            url: "www.hcl-software.com",
                            label: "",
                            target: "_blank"
                        }
                    },
                    {
                        title: "Title",
                        image: "https://images.unsplash.com/photo-1557568192-387504499261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                        body: "Etiam rhoncus rutrum semper. Vestibulum finibus ligula nec hendrerit semper. ",
                    }
                ],
                children: [{
                    title: "Alerts",
                    index: 1,
                    url: "/alerts",
                    target: "_blank"
                }, {
                    title: "Local News",
                    index: 2,
                    url: "/NOT",
                    children: [{
                        title: "Today",
                        index: 1
                    }, {
                        title: "Week",
                        index: 2
                    }
                    ]
                }, {
                    title: "Global News",
                    index: 3,
                    children: [{
                        title: "English",
                        index: 1,
                        url: "https://www.hcl-software.com",
                    }, {
                        title: "Spanish",
                        index: 2,
                        url: "https://www.hcl-software.com",
                        target: "_blank"
                    }
                    ]
                }, {
                    title: "Long Title Item here Long title item here",
                    index: 4,
                    children: [{
                        title: "Long sub item text here long sub item",
                        index: 1
                    }, {
                        title: "Sub item",
                        index: 2
                    }
                    ]
                }, {
                    title: "Item",
                    index: 5,
                }, {
                    title: "Item",
                    index: 6,
                }, {
                    title: "Item",
                    index: 7,
                }, {
                    title: "Item",
                    index: 8,
                }, {
                    title: "Item",
                    index: 9,
                }, {
                    title: "Item",
                    index: 10,
                }, {
                    title: "Item",
                    index: 11,
                    children: [{
                        title: "Sub item",
                        index: 1
                    }]
                }]
            },
            {
                title: "Business",
                url: "https://www.bing.com",
                index: 2,
                children: [{
                    title: "Billing",
                    index: 1
                }, {
                    title: "HR",
                    index: 2,
                    children: [{
                        title: "Timesheets",
                        index: 1
                    }]
                }]
            },
            { title: "Company", url: "https://www.bing.com", index: 3 },
            { title: "Visitors", url: "https://google.com", index: 4 }
        ],
    },
    nextMeeting: {
        title: "My Feed",
        startDateTime: startTime,
        endDateTime: endTime,
        link: {
            label: "",
            url: "https://hcl-software.com/",
            target: "_blank"
        },
    },
    drawer: {
        direction: "right",
        contentId: "#my-content",
        showOverlay: true
    },
    utilityZone: { items: itemsArgs, showOverlay: true, enableIconPanels: true }
};

NavigationHeader2.args = NavigationHeader2Args;

const loremIpsim = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia lacinia mattis. Nam nec mattis dolor. Vestibulum elit elit, euismod vel vulputate sit amet, rutrum vel sapien. Cras viverra felis pellentesque, vestibulum turpis non, sagittis eros. Morbi pharetra turpis vitae efficitur tristique. Nam vehicula lorem in nunc posuere porttitor. Phasellus at lobortis turpis. Vivamus aliquam, est maximus feugiat scelerisque, mauris tortor consectetur nulla, ac accumsan eros nulla sit amet nunc. Suspendisse potenti. Nam vitae turpis varius, lobortis arcu ut, vulputate elit.

Nam bibendum accumsan nibh, quis iaculis nulla laoreet nec. Aenean quis odio congue, tincidunt justo vel, posuere purus. Integer aliquam, sapien at rhoncus placerat, justo ex ullamcorper neque, eget eleifend massa libero nec leo. Suspendisse hendrerit fringilla mollis. Quisque eu nibh eget sem porttitor mollis nec a dui. In sodales gravida scelerisque. Maecenas a efficitur enim, nec sollicitudin magna. Integer ante lorem, faucibus sit amet nunc facilisis, bibendum efficitur libero. Phasellus sed ligula in tellus dignissim rutrum. Aenean vitae placerat odio. Vivamus interdum pharetra feugiat. Nulla dolor ex, blandit nec egestas sed, lacinia in nibh.

Duis nec dolor vel tellus rhoncus interdum. Nullam convallis nibh mauris, ut blandit nunc cursus sed. In iaculis purus sed leo finibus, sed laoreet purus vulputate. Vivamus luctus sagittis magna, non consequat mauris facilisis non. Ut vestibulum, lacus id maximus porttitor, enim odio placerat dolor, vel eleifend orci tellus sit amet nulla. Morbi molestie iaculis arcu sed feugiat. Donec at erat efficitur, tristique augue et, suscipit risus. Nulla fermentum nibh vel nunc dictum feugiat. Sed non metus ultricies, interdum purus ac, tincidunt enim. Nullam efficitur vestibulum ante non pretium. Etiam accumsan diam nunc, et aliquet nunc posuere in. In eu maximus elit. Etiam sed feugiat orci.   `;
