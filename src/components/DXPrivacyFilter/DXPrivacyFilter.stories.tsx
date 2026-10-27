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
import DXPrivacyFilter, { PrivacyFilterProps } from "./DXPrivacyFilter";
import "./DXPrivacyFilterStories.scss";

export default {
    title: "Components/Lists, Catalogs, and Filters/Privacy Filter",
    component: DXPrivacyFilter,
    excludeStories: /.*Args$/,
} as Meta;

const Template: StoryFn<PrivacyFilterProps> = ( args ) => (
    <>
        <DXPrivacyFilter {...args} />
        <div className="testDivs">
            <span data-testid="pf-span" id="paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                dolorem placeat vitae ratione commodi pariatur harum aliquam
                facilis aliquid, nobis eius officiis vero a sapiente, voluptas
                rem totam? Possimus, vitae?
            </span>
        </div>

        <div className="testDivs" style={{ backgroundColor: "lightBlue" }}>
            <div
                className="testDivs"
                style={{
                    backgroundColor: "papayawhip",
                }}
            >
                <h3 className="dxSpecificHeader">This text is an example.</h3>
                <div
                    className="testDivs"
                    style={{ backgroundColor: "lightGray", padding: "2em" }}
                >
                    <h2>Test h2 header. This should not blur.</h2>
                    <h3>Test h3 header. This should not blur.</h3>
                    <h4 className="blurrable">
                        Test h4 header. This is an example
                    </h4>
                    <h5>Test h5 header. This should not blur.</h5>
                    <h6>Test h6 header. This should not blur.</h6>
                </div>
            </div>
            <div
                className="testDivs"
                style={{ backgroundColor: "papayawhip", padding: "2em" }}
            >
                <h3>This text should not blur</h3>
                <div
                    className="dxCustomHeaders"
                    style={{ backgroundColor: "lightGray", padding: "2em" }}
                >
                    <h2>Test h2 header</h2>
                    <h3>Test h3 header</h3>
                    <h4>Test h4 header</h4>
                    <h5>Test h5 header</h5>
                    <h6>Test h6 header</h6>
                </div>
            </div>
        </div>
        <div>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Quisquam libero quo qui magni ullam ea eaque expedita veniam! Ea
                nostrum ab sapiente placeat accusamus porro tenetur officia
                laborum quae enim.
            </p>
        </div>
    </>
);

const ImageTemplate: StoryFn<PrivacyFilterProps> = ( args ) => (
    <>
        <DXPrivacyFilter {...args} />
        <div className="testDivs">
            <img
                className="img1"
                src="https://picsum.photos/seed/picsum/200/300"
            ></img>
            <img id="img1" src="https://picsum.photos/seed/terra/200/300"></img>
            <img id="img3" src="https://picsum.photos/seed/form/200/300"></img>
        </div>
    </>
);

export const DefaultPrivacyFilter = Template.bind( {} );
export const DefaultPrivacyFilterArgs: PrivacyFilterProps = {
    selectors: [
        "#paragraph",
        ".blurrable",
        ".dxCustomHeaders",
        ".dxSpecificHeader",
        "div > p",
    ]
};

DefaultPrivacyFilter.args = DefaultPrivacyFilterArgs;

export const ActivePrivacyFilter = Template.bind( {} );
export const ActivePrivacyFilterArgs: PrivacyFilterProps = {
    isActive: true,
    selectors: [
        "#paragraph",
        ".blurrable",
        ".dxcustomHeaders",
        ".dxSpecificHeader",
        "div > p",
    ]
};

ActivePrivacyFilter.args = ActivePrivacyFilterArgs;

export const ImagePrivacyFilter = ImageTemplate.bind( {} );
export const ImagePrivacyFilterArgs: PrivacyFilterProps = {
    isActive: false,
    selectors: ["#img1", "#img3"],
    inactiveLabel: "Privacy filter: off",
    activeLabel: "Privacy filter: on"
};

ImagePrivacyFilter.args = ImagePrivacyFilterArgs;

export const PrivacyFilterChangedIcons = Template.bind( {} );
export const PrivacyFilterChangedIconsArgs: PrivacyFilterProps = {
    selectors: [
        "#paragraph",
        ".blurrable",
        ".dxCustomHeaders",
        ".dxSpecificHeader",
        "div > p",
    ],
    icons: {
        show: "ci-Add_Plus",
        hide: "ci-Remove_Minus"
    }
};
PrivacyFilterChangedIcons.args = PrivacyFilterChangedIconsArgs;
