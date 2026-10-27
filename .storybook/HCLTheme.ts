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
import { create } from 'storybook/theming/create';

export default create( {
    base: 'light',

    brandTitle: 'HCL DX Blueprint',
    brandUrl: 'https://github.com/HCL-TECH-SOFTWARE/dx-blueprint-storybook',
    // brandImage: 'https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-a185b95a-12cc-4252-9140-2b0ba40af651-ohH8Ggv',

    colorPrimary: '#0072C6',
    colorSecondary: '#097dff',

    appBg: '#F4F4F4',
    appContentBg: '#FFFFFF',
    appBorderColor: '#E0E0E0',
    appBorderRadius: 4,

    fontBase: 'NotoSans, "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontCode: 'monospace',

    textColor: '#333333',
    textInverseColor: '#FFFFFF',

    barTextColor: '#999999',
    barSelectedColor: '#0072C6',
    barBg: '#F4F4F4',

    inputBg: '#FFFFFF',
    inputBorder: '#CCCCCC',
    inputTextColor: '#333333',
    inputBorderRadius: 4,
} );