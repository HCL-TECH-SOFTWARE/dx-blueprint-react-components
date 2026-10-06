import "../src/coolicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/global/_bootstrap-compat.scss";
import "../src/global/_input-inset-compat.scss";
import "./design_system_styles.css";
import "./css/preview/index.css";
import { Title, Subtitle, Description, Controls, Stories } from '@storybook/addon-docs/blocks';

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    options: {
        storySort: {
            order: [
                'Overview',
                [
                    'Introduction',
                    'Principles',
                    'Changelog',
                ],
                'How To',
                [
                    'Get Started',
                    'Install Blueprint',
                    'Remove Blueprint',
                    'Create the Sample Site',
                    'Create a New Site',
                    'Create New Page Components',
                    'Configure Page Components',
                    'Customize the Theme',
                    'Apply Blueprint to a Page',
                    'Create Content',
                    'Edit Content'
                ],
                'Information Architecture',
                'Foundations',
                '*'
            ],
        },
    },
    docs: {
        page: () => (
            <>
                <Title />
                <Subtitle />
                <Description />
                <Controls />
                <Stories />
            </>
        ),
    }
}
export const tags = ['autodocs'];