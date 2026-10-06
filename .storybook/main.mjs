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