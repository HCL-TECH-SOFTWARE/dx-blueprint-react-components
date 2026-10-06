import React, { FormEventHandler } from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXNavigationHeaderWithUtilites, { NavigationProps } from "./DXNavigationHeaderWithUtilities";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Navigation/Navigation Header With Utilities",
    component: DXNavigationHeaderWithUtilites,
    excludeStories: /.*Args$/,
} as Meta<typeof DXNavigationHeaderWithUtilites>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXNavigationHeaderWithUtilites> = ( args ) => <DXNavigationHeaderWithUtilites {...args} />;


let handleSubmit = function ( searchValue: string ) {
    window.alert( "Search submit: " + searchValue );
};

let buttonSubmit: FormEventHandler = function ( e ) {
    window.alert( "Clicked!" );
};


export const FirstLevelNavigation = Template.bind( {} );
export const SecondLevelNavigation = Template.bind( {} );
export const ThirdLevelNavigation = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );


// More on args: https://storybook.js.org/docs/react/writing-stories/args

FirstLevelNavigation.args = {
    navigationImage: {
        imageUrl: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES",
        sizeLarge: true,
        imageHeight: 50
    },
    utilities: {
        searchSubmit: handleSubmit,
        buttonText: "Click me!",
        buttonSubmit: buttonSubmit,
        iconSubmit: buttonSubmit,
    },
    navigationItems: [
        { title: "Home", index: 0, url: "/home" },
        { title: "News", index: 1, url: "/news" },
        { title: "My Profile", index: 2, url: "/myProfile", target: "_blank" },
    ]
};

SecondLevelNavigation.args = {
    navigationImage: {
        imageUrl: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES",
    },
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
    utilities: {
        searchSubmit: handleSubmit,
        searchPlaceholder: "Search...",
        buttonText: "Click me!",
        buttonSubmit: buttonSubmit,
        iconSubmit: buttonSubmit,
        iconName: "ci-Info",
    },
    navigationItems: [
        { title: "Home", index: 0 },
        {
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
            title: "News",
            index: 1,
            children: [{
                title: "Alerts",
                index: 1,
                url: "/alerts"
            }, {
                title: "Local News",
                index: 2,
                url: "/NOT",
            }, {
                title: "Global News",
                index: 3,
                target: "_blank"
            }]
        },
        {
            title: "Company",
            index: 2
        },
    ],
};

export const NavigationArgs: NavigationProps = {
    navigationImage: {
        imageUrl: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES",
        sizeLarge: false,
        imageHeight: 50,
        imageWidth: 160
    },
    utilities: {
        searchSubmit: handleSubmit,
        searchPlaceholder: "Search on this site",
        buttonText: "Click me!",
        buttonSubmit: buttonSubmit,
        iconSubmit: buttonSubmit,
    },
    menuImage: "https://pngimg.com/uploads/bokeh/bokeh_PNG27.png",
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
        { title: "Home", index: 0 },
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
};

ThirdLevelNavigation.args = NavigationArgs;
ChangedIcons.args = {
    ...NavigationArgs,
    icons: {
        firstLevel: "ci-Arrow_Down_SM",
        secondLevel: "ci-Arrow_Right_SM",
        search: "ci-Note_Search",
        close: "ci-Close_LG",
    }
};

const FullTemplate: StoryFn<typeof DXNavigationHeaderWithUtilites> = ( args ) =>
    <>
        <DXNavigationHeaderWithUtilites {...args} />
        <p style={{ margin: "5%" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor, arcu at luctus dictum, neque odio viverra lectus, a sodales felis tellus a orci. Quisque varius nisl quis turpis congue ullamcorper. Suspendisse potenti. Mauris elementum ipsum vel sem finibus euismod. Mauris aliquam, leo et auctor semper, orci eros mattis nisl, ut ornare felis ex vel tortor. Aliquam non risus vel turpis finibus tempus sit amet at purus. Suspendisse sit amet cursus justo, ut rhoncus dui. Aliquam malesuada diam ut ligula fringilla, in faucibus ligula maximus. Nunc posuere condimentum neque vel sodales. Praesent lorem diam, rutrum et est quis, malesuada placerat diam. Proin sodales ex ut eleifend pretium. Suspendisse potenti.

            Maecenas ut lorem et enim tempus iaculis. Pellentesque convallis vel augue sed faucibus. Pellentesque id vulputate mauris. Nulla mauris ante, sagittis vestibulum fermentum vel, cursus euismod ligula. Duis et odio vel mauris auctor scelerisque at ut metus. Fusce consectetur nisi et magna porttitor vestibulum. Pellentesque mollis pharetra lacinia. Morbi iaculis faucibus massa. Ut condimentum, elit vulputate bibendum iaculis, lectus leo suscipit eros, sed ultrices eros ante eu nulla. Maecenas massa lacus, vehicula id dignissim eu, mollis dictum orci. Sed non nulla a tellus eleifend mattis.

            Mauris lacinia convallis urna, non vestibulum elit ullamcorper vel. Sed cursus ligula at elit auctor, sit amet eleifend eros pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc ac elit efficitur, aliquam urna vel, convallis ipsum. Vestibulum eget eros et justo tristique posuere. Donec at sodales ante. Sed laoreet porta semper. Nulla vehicula id leo sit amet elementum. Sed felis augue, ornare nec cursus posuere, bibendum eget lacus. Phasellus leo risus, accumsan vitae faucibus sit amet, aliquet at nulla. Nulla consectetur laoreet pulvinar. Vivamus fermentum porttitor ex id pulvinar. Suspendisse ac urna lobortis augue bibendum venenatis. Nunc eleifend suscipit quam, vitae tincidunt neque.

            Etiam vitae lorem iaculis, iaculis sem vel, pellentesque nulla. Sed tincidunt porttitor sem, vel tincidunt dui consequat eget. Praesent faucibus placerat nisi, ut congue quam placerat vitae. Morbi rhoncus dolor lorem, non pretium elit accumsan ac. Nulla facilisi. Integer suscipit ligula sed nulla tincidunt porta. Aliquam rutrum fermentum purus. Integer non lobortis ante. Maecenas hendrerit sem eget posuere finibus. Mauris convallis lectus vulputate mauris facilisis venenatis. Aenean imperdiet venenatis est at tempus.

            Integer sit amet porttitor sapien. Ut et diam sit amet purus fermentum porta quis nec augue. Nullam dictum quis purus et vulputate. Mauris quam ex, volutpat sed blandit sed, hendrerit at sem. Sed purus magna, eleifend sit amet suscipit tristique, placerat vel magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris nec enim vestibulum lacus posuere placerat et non arcu. Sed at bibendum metus. Etiam aliquam consequat ex sed hendrerit. Aliquam erat volutpat. Etiam nec iaculis ipsum, at mattis dui. Cras mattis tempus tincidunt. Sed varius non libero eu hendrerit.

            Quisque porta erat sit amet lacinia rutrum. Quisque eu fringilla neque, ac dapibus tellus. Vestibulum at scelerisque metus. Praesent cursus purus at enim varius hendrerit. Sed vulputate est sed maximus condimentum. Etiam at elementum enim. Suspendisse a augue mi. Sed vitae tellus nec sapien consequat commodo ac quis massa. Praesent non ornare turpis. Sed erat orci, semper vitae iaculis nec, lobortis id dui. Aenean rhoncus hendrerit neque, id ullamcorper tellus. Sed maximus fermentum orci, a varius mauris tempus a. Aliquam faucibus faucibus ex, vitae faucibus felis iaculis nec.

            Vivamus condimentum purus at tellus sollicitudin, id vestibulum quam vestibulum. Nunc vitae arcu vel nibh iaculis malesuada. Etiam rhoncus rutrum semper. Vestibulum finibus ligula nec hendrerit semper. Etiam nisi sem, accumsan in quam sit amet, tincidunt sollicitudin erat. Curabitur in turpis eros. In sapien dolor, tempor commodo viverra ac, molestie id quam.

            Proin faucibus neque a massa blandit suscipit. Sed auctor gravida purus, sed ullamcorper augue tincidunt gravida. Donec eget bibendum dolor, ut auctor ipsum. Nam nec nisl at odio varius vestibulum non vel neque. Integer consequat massa mauris, sit amet luctus tortor hendrerit vel. Fusce porta nisl consectetur suscipit commodo. In porta augue eget ante pellentesque, quis interdum tellus consectetur.

            Pellentesque et porta urna. Ut consectetur tincidunt massa, in tempus sapien tristique nec. Aenean venenatis sem nec semper pulvinar. Duis malesuada nunc in metus pulvinar maximus lacinia et urna. Donec bibendum placerat sapien, laoreet interdum lectus sodales a. Aliquam erat volutpat. Nullam eu nisl eget massa auctor ornare. Nunc ut lectus venenatis nulla accumsan tristique.

            Nulla varius leo tellus, ut pulvinar ligula tincidunt at. Cras maximus diam eget nisl auctor, at sagittis elit blandit. Mauris convallis ipsum ex, euismod accumsan leo vestibulum eget. Maecenas et libero vel massa malesuada lobortis id ut odio. Pellentesque luctus tincidunt commodo. Nunc congue non purus nec mollis. Aenean venenatis arcu erat, vitae sagittis nisi pretium quis. Integer ultricies leo nec tortor bibendum, sed ultrices leo iaculis. Nunc venenatis ante risus, vitae auctor elit faucibus a. Quisque a tincidunt justo. Nullam augue odio, mattis sed hendrerit malesuada, laoreet et nulla. Nunc egestas fringilla felis, ac pellentesque enim. Sed finibus id eros non rutrum.
        </p>
    </>;
export const FullImplementationExample = FullTemplate.bind( {} );
FullImplementationExample.args = NavigationArgs;
