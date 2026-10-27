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
export default {
    stories: [
        "../docs/!(blocks)/**/*.mdx",
        "../src/components/!(DXOnboarding)/**/*.mdx",
        "../src/**/!(DXOnboarding)/*.stories.mdx",
        "../src/**/!(DXOnboarding)/*.stories.@(js|jsx|ts|tsx)"
    ],
    staticDirs: [
        '../src/static',
        '../public',
        { from: '../docs/assets', to: '/docs' }
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/preset-scss",
        "@storybook/addon-docs",
        "@storybook/addon-webpack5-compiler-babel",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    },
    features: {
        sidebarOnboardingChecklist: false,
        developmentModeForBuild: false,
    },
    docs: {
        defaultName: 'Documentation'
    },
    typescript: {
        reactDocgen: "react-docgen-typescript"
    },
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.md$/,
            type: 'asset/source',
        });
        return config;
    }
};