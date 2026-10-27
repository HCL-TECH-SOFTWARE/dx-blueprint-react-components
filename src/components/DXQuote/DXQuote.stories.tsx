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
import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXQuote from "./DXQuote";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/General/Quote",
    component: DXQuote,
    excludeStories: /.*Args$/,
} as Meta<typeof DXQuote>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXQuote> = ( args ) => <DXQuote {...args} />;

export const FullQuote = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const NoImageQuote = Template.bind( {} );
export const MinimalistQuote = Template.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args
FullQuote.args = {
    index: 1,
    body: "I met a traveller from an antique land who said: two vast and trunkless legs of stone stand in the desert. Near them, on the sand, half sunk, a shattered visage lies, whose frown, and <span style='color: black'><em>wrinkled</em> lip, and sneer of cold command</span>, tell that its sculptor well those passions read which yet survive, stamped on <strong>these</strong> lifeless things.",
    thumbnail: { url: "https://cpb-us-w2.wpmucdn.com/sites.udel.edu/dist/b/8050/files/2018/06/shelley2.jpg" },
    authorName: "Percy Shelley"
};

ChangedIcons.args = {
    ...FullQuote.args,
    icons: {
        quoteOpen: "ci-Chat_Add",
        quoteClose: "ci-Chat_Remove",
    }
};

NoImageQuote.args = {
    index: 2,
    body: "The hand that mocked them and the heart that fed. And on the pedestal these words appear: My name is Ozymandias, king of kings. Look on my works, ye Mighty, and despair!",
    authorName: "Percy Shelley",
    paddingDesktop: "35px"
};

MinimalistQuote.args = {
    index: 3,
    body: "Nothing beside remains. Round the decay of that colossal wreck, boundless and bare, the lone and level sands <a style='text-decoration: underline' href='https://en.wikipedia.org/wiki/Ozymandias' target='_blank'>stretch <em>far</em> away</a>.",
    hideQuotes: true,
    paddingDesktop: "70px",
    paddingMobile: "10px 0"
};
