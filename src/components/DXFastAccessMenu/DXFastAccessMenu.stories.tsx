/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXFastAccessMenu, { FastAccessMenuProps } from "./DXFastAccessMenu";

export default {
    title: "Components/Navigation/Fast Access Menu",
    component: DXFastAccessMenu,
    excludeStories: /.*Args$/,
} as Meta<typeof DXFastAccessMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<FastAccessMenuProps> = ( args ) => <DXFastAccessMenu {...args} />;

export const FastAccessMenu = Template.bind( {} );
export const FastAccessMenuChangedIcons = Template.bind( {} );
export const FastAccessMenuNoHeader = Template.bind( {} );

export const FastAccessMenuArgs: FastAccessMenuProps = {
    title: 'Fast access Menu',
    link: { url: "https://hcl-software.com/", label: "Customize Fast Access Menu", target: "_self" },
    items: [
        {
            url: "https://hcl-software.com/",
            label: "-- Title 1"
        },
        {
            url: "https://www.google.com/?hl=es",
            label: "-- Title 2"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 3"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 4"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 5"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 6"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 7"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 8"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 9"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 10"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 11"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 12"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 13"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 14"
        }
    ],
    buttonCustom: {
        url: "https://hcl-software.com/",
        label: "Customize Menu"
    }
};

export const FastAccessMenuNoHeaderArgs: FastAccessMenuProps = {
    items: [
        {
            url: "https://hcl-software.com/",
            label: "-- Title 1"
        },
        {
            url: "https://www.google.com/?hl=es",
            label: "-- Title 2"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 3"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 4"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 5"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 6"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 7"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 8"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 9"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 10"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 11"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 12"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 13"
        },
        {
            url: "https://hcl-software.com/",
            label: "-- Title 14"
        }
    ],
    buttonCustom: {
        url: "https://hcl-software.com/",
        label: "Customize Menu"
    }
};

const FullTemplate: StoryFn<typeof DXFastAccessMenu> = ( args ) =>
    <>
        <div style={{ backgroundColor: "#FFF", position: "sticky", top: "10%" }}>
            <DXFastAccessMenu {...args} />
        </div>
        <p style={{ marginRight: "5%", marginLeft: "5%" }}>
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

export const FastAccessMenuChangedIconsArgs: FastAccessMenuProps = {
    ...FastAccessMenuArgs,
    icons: {
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD",
        header: "ci-Chevron_Right_Duo"
    }
};

FastAccessMenu.args = FastAccessMenuArgs;
FastAccessMenuChangedIcons.args = FastAccessMenuChangedIconsArgs;
FastAccessMenuNoHeader.args = FastAccessMenuNoHeaderArgs;
FullImplementationExample.args = FastAccessMenuNoHeaderArgs;
