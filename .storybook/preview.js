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