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

import React, { FormEventHandler } from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXNavigationHeaderMobile, { MobileNavigationProps } from './DXNavigationHeaderMobile';
import { itemsArgs } from "../DXUtilityZone/DXUtilityZone.stories";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Navigation/Navigation Header Mobile",
    component: DXNavigationHeaderMobile,
    excludeStories: /.*Args$/,
} as Meta<typeof DXNavigationHeaderMobile>;

const Template: StoryFn<typeof DXNavigationHeaderMobile> = ( args: MobileNavigationProps ) => <DXNavigationHeaderMobile {...args} />;

let handleSubmit: FormEventHandler<Element> = ( e ) => {
    e.preventDefault();
    alert( 'You clicked submit.' );
};

const hclSoftwareLogoWhite = "data:image/svg+xml," + encodeURIComponent(
    `<svg width="114" height="11" viewBox="0 0 114 11" fill="none" xmlns="http://www.w3.org/2000/svg">` +
    `<path d="M18.6739 0.418478H20.2129V10.8804H18.6739V6.1875H13.539V10.8804H12V0.418478H13.539V4.8125H18.6739V0.418478Z" fill="#FFFFFF"/>` +
    `<path d="M27.0918 11C24.4281 11 22.0456 9.23641 22.0456 5.64946C22.0456 2.0625 24.4577 0.298914 27.0918 0.298914C29.4447 0.298914 31.3092 1.7337 31.5904 3.78125H29.9774C29.7998 2.55571 28.5864 1.67391 27.0918 1.67391C25.0792 1.67391 23.6142 3.06386 23.6142 5.64946C23.6142 8.23505 25.0644 9.625 27.0918 9.625C28.6308 9.625 29.8442 8.74321 30.007 7.51766H31.5756C31.3536 9.56522 29.489 11 27.0918 11Z" fill="#FFFFFF"/>` +
    `<path d="M34.7369 10.8804C33.7899 10.8804 33.2571 10.3424 33.2571 9.38587V0.418478H34.7961V9.50543H39.8423V10.8804H34.7369Z" fill="#FFFFFF"/>` +
    `<path d="M44.462 11C42.0795 11 40.4813 9.53533 40.4073 7.27853H42.923C42.9821 8.16033 43.5741 8.72826 44.462 8.72826C45.2463 8.72826 45.7494 8.35462 45.7494 7.77174C45.7494 6.00815 40.6736 7.60734 40.6736 3.34783C40.6736 1.56929 42.183 0.298914 44.2992 0.298914C46.6077 0.298914 48.1319 1.62908 48.1615 3.67663H45.6754C45.6162 3.00408 45.1131 2.57065 44.2992 2.57065C43.6481 2.57065 43.2189 2.88451 43.2189 3.34783C43.2189 5.30571 48.3835 3.49728 48.3835 7.7269C48.3835 9.71467 46.8445 11 44.462 11Z" fill="#FFFFFF"/>` +
    `<path d="M53.1158 11C50.7925 11 49.1204 9.34103 49.1204 7.11413C49.1204 4.88723 50.7925 3.22826 53.1158 3.22826C55.4391 3.22826 57.1113 4.88723 57.1113 7.11413C57.1113 9.34103 55.4391 11 53.1158 11ZM51.562 7.11413C51.562 8.19022 52.1836 8.90761 53.1158 8.90761C54.0481 8.90761 54.6696 8.19022 54.6696 7.11413C54.6696 6.03804 54.0481 5.32065 53.1158 5.32065C52.1836 5.32065 51.562 6.03804 51.562 7.11413Z" fill="#FFFFFF"/>` +
    `<path d="M58.9333 10.8804V5.38043H57.5571V3.34783H58.9333V1.82337C58.9333 0.747283 59.6733 0 60.7387 0H63.4172V2.03261H61.375V3.34783H63.4172V5.38043H61.375V10.8804H58.9333Z" fill="#FFFFFF"/>` +
    `<path d="M66.8788 10.8804C65.7245 10.8804 65.0734 10.2228 65.0734 9.05707V5.38043H63.6972V3.34783H65.0734V1.2106H67.5151V3.34783H69.3945V5.38043H67.5151V8.84783H69.3945V10.8804H66.8788Z" fill="#FFFFFF"/>` +
    `<path d="M72.2345 10.8804L69.7485 3.34783H72.1901L73.3 7.42799L74.3951 3.34783H76.5852L77.695 7.42799L78.7901 3.34783H81.2318L78.7457 10.8804H76.6592L75.5049 6.74049L74.3211 10.8804H72.2345Z" fill="#FFFFFF"/>` +
    `<path d="M83.8465 11C82.4555 11 81.4641 9.99864 81.4641 8.74321C81.4641 7.26359 82.5295 6.36685 84.0981 6.36685H85.1636C85.5483 6.36685 85.7555 6.09783 85.7555 5.73913C85.7555 5.29076 85.3855 4.9769 84.7196 4.9769C83.9057 4.9769 83.6098 5.48505 83.595 6.0231H81.4641C81.5232 4.49864 82.6627 3.22826 84.8676 3.22826C86.7322 3.22826 88.1824 4.33424 88.1824 6.03804V10.8804H85.7555V9.9538C85.5631 10.5815 84.8084 11 83.8465 11ZM83.7726 8.62364C83.7726 9.01223 84.0981 9.28125 84.5273 9.28125C85.3116 9.28125 85.7555 8.62364 85.7555 7.9212V7.86141H84.5125C84.0833 7.86141 83.7726 8.17527 83.7726 8.62364Z" fill="#FFFFFF"/>` +
    `<path d="M89.5048 5.1712C89.5048 4.09511 90.2448 3.34783 91.3102 3.34783H94.2402V5.38043H91.9465V10.8804H89.5048V5.1712Z" fill="#FFFFFF"/>` +
    `<path d="M94.4974 7.11413C94.4974 5.3356 95.5628 3.22826 98.2413 3.22826C101.068 3.22826 102 5.38043 102 6.96467C102 7.30842 101.985 7.51766 101.97 7.69701H96.8355C96.9834 8.53397 97.5014 9.01223 98.3893 9.01223C99.0552 9.01223 99.5139 8.7731 99.6471 8.26495H102C101.689 9.93886 100.224 11 98.3893 11C95.7108 11 94.4974 8.89266 94.4974 7.11413ZM96.8355 6.23234H99.5879C99.5435 5.58967 99.0848 4.9769 98.2413 4.9769C97.457 4.9769 96.9982 5.32065 96.8355 6.23234Z" fill="#FFFFFF"/>` +
    `</svg>`
);

const createSections = ( count: number ) => Array.from( { length: count }, ( _, index ) => ( {
    title: "Section",
    index,
    showChevron: true,
} ) );

const createSubcategories = ( count: number, sectionCount: number ) => Array.from( { length: count }, ( _, index ) => ( {
    title: "Subcategory",
    index,
    showChevron: true,
    children: createSections( sectionCount ),
} ) );

const categoryNavigationItems = [
    { title: "Home", index: 0, url: "/home" },
    { title: "Category 1", index: 1, children: createSubcategories( 3, 4 ) },
    { title: "Category 2", index: 2, children: createSubcategories( 3, 4 ) },
    { title: "Category 3", index: 3, children: createSubcategories( 5, 4 ) },
    { title: "Category 4", index: 4, children: createSubcategories( 4, 9 ) }
];

const categoryNavigationArgs: MobileNavigationProps = {
    navigationImage: hclSoftwareLogoWhite,
    searchSubmit: handleSubmit,
    utilityZone: { items: itemsArgs },
    navigationItems: categoryNavigationItems,
};

export const FirstLevelNavigationMobile = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );

FirstLevelNavigationMobile.args = {
    navigationLevel: 1,
    navigationImage: hclSoftwareLogoWhite,
    searchSubmit: handleSubmit,
    utilityZone: { items: itemsArgs },
    navigationItems: categoryNavigationItems
};

export const SecondLevelNavigationMobile = Template.bind( {} );
SecondLevelNavigationMobile.args = {
    ...categoryNavigationArgs,
    navigationLevel: 2,
};

export const ThirdLevelNavigationMobile = Template.bind( {} );
ThirdLevelNavigationMobile.args = {
    ...categoryNavigationArgs,
    navigationLevel: 3,
};

ChangedIcons.args = {
    ...categoryNavigationArgs,
    icons: {
        search: "ci-Note_Search",
        navigationBack: "ci-Arrow_Left_MD",
        navigationFoward: "ci-Arrow_Right_MD",
        close: "ci-Close_LG",
        menu: "ci-More_Grid_Big"
    }
};

const FullTemplate: StoryFn<typeof DXNavigationHeaderMobile> = ( args: MobileNavigationProps ) =>
    <>
        <DXNavigationHeaderMobile {...args} />
        {false && <p style={{ maxWidth: 390, margin: "5% 0", padding: "0 19px", boxSizing: "border-box" }}>
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
        </p>}
    </>;
export const FullImplementationExample = FullTemplate.bind( {} );
FullImplementationExample.args = {
    navigationImageWidth: 100,
    navigationImage: hclSoftwareLogoWhite,
    searchSubmit: handleSubmit,
    utilityZone: { items: itemsArgs },
    navigationItems: categoryNavigationItems,
};
