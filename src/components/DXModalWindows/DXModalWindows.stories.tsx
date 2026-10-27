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

import Button from 'react-bootstrap/Button';
import React from 'react';
import DXModalWindows, { ModalWindowsProps } from "./DXModalWindows";
import { StoryFn } from "@storybook/react-webpack5";

export default {
    component: DXModalWindows,
    title: 'Components/Form Elements/Modal Windows',
    excludeStories: /.*Args$/,
};

// This story shows how to open the modal with an event ('open-modal') with a true value in the detail instead of using the openModal property.
export const DefaultIntegration = ( args: any ) => {
    const openModal = () => {
        dispatchEvent( new CustomEvent( 'open-modal-1' ) );
    };

    return (
        <div id='myApp'>
            <Button
                id='button'
                variant="primary"
                onClick={() => openModal()}
            >
                Open modal
            </Button>
            <DXModalWindows {...args}>
            </DXModalWindows>
        </div>
    );
};

export const DefaultExampleArgs: ModalWindowsProps = {
    index: 1,
    title: "Modal Title",
    text: "Modal text content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non nisi est sit amet facilisis magna. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Habitant morbi tristique senectus et.",
};

DefaultIntegration.args = DefaultExampleArgs;

// These stories show how open the modal with the openModal property.
const Template: StoryFn<typeof DXModalWindows> = ( args ) => <DXModalWindows {...args} />;

export const CompleteConfiguration = ( args: any ) => {
    const openModal = () => {
        dispatchEvent( new CustomEvent( 'open-modal-2' ) );
    };

    return (
        <div id='myApp'>
            <Button
                id='button'
                variant="primary"
                onClick={() => openModal()}
            >
                Open modal
            </Button>
            <DXModalWindows {...args}>
            </DXModalWindows>
        </div>
    );
};
export const IFrame = ( args: any ) => {
    const openModal = () => {
        dispatchEvent( new CustomEvent( 'open-modal-3' ) );
    };

    return (
        <div id='myApp'>
            <Button
                id='button'
                variant="primary"
                onClick={() => openModal()}
            >
                Open modal
            </Button>
            <DXModalWindows {...args}>
            </DXModalWindows>
        </div>
    );
};
export const RichText = ( args: any ) => {
    const openModal = () => {
        dispatchEvent( new CustomEvent( 'open-modal-4' ) );
    };

    return (
        <div id='myApp'>
            <Button
                id='button'
                variant="primary"
                onClick={() => openModal()}
            >
                Open modal
            </Button>
            <DXModalWindows {...args}>
            </DXModalWindows>
        </div>
    );
};

export const ModalWindowsArgs: ModalWindowsProps = {
    index: 2,
    openModal: false,
    title: "Modal Title",
    text: "Modal text content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: {
        url: "https://www.shutterstock.com/image-vector/man-hugging-himself-hearts-on-600w-2057294138.jpg",
        altText: "Man with green shirt"
    },
    unstyledButton: {
        label: "Learn More",
        onClick: () => {}
    },
    primaryButton: {
        label: "Done",
        onClick: () => {}
    },
    secondaryButton: {
        label: "Cancel",
        onClick: () => {}
    },
};

export const ModalWindowsIFrameArgs: ModalWindowsProps = {
    index: 3,
    openModal: false,
    text: "<iframe src='https://example.com'></iframe>",
    title: "Modal Title",
    size: "full-screen"
};

let form = `<form method="post">
    <h3>Payment form</h3>
    <p>Required fields are followed by <strong><span aria-label="required">*</span></strong>.</p>
    <section>
        <h4>Contact information</h4>
        <fieldset>
            <legend>Title</legend>
            <ul>
                <li>
                <label for="title_1">
                    <input type="radio" id="title_1" name="title" value="A">
                    Ace
                </label>
                </li>
                <li>
                <label for="title_2">
                    <input type="radio" id="title_2" name="title" value="K" >
                    King
                </label>
                </li>
                <li>
                <label for="title_3">
                    <input type="radio" id="title_3" name="title" value="Q">
                    Queen
                </label>
                </li>
            </ul>
        </fieldset>
        <p>
            <label for="name">
            <span>Name: </span>
            <strong><span aria-label="required">*</span></strong>
            </label>
            <input type="text" id="name" name="username">
        </p>
        <p>
            <label for="mail">
            <span>E-mail: </span>
            <strong><span aria-label="required">*</span></strong>
            </label>
            <input type="email" id="mail" name="usermail">
        </p>
        <p>
            <label for="pwd">
            <span>Password: </span>
            <strong><span aria-label="required">*</span></strong>
            </label>
            <input type="password" id="pwd" name="password">
        </p>
    </section>
    <section>
        <h4>Payment information</h4>
        <p>
            <label for="card">
            <span>Card type:</span>
            </label>
            <select id="card" name="usercard">
            <option value="visa">Visa</option>
            <option value="mc">Mastercard</option>
            <option value="amex">American Express</option>
            </select>
        </p>
        <p>
            <label for="number">
            <span>Card number:</span>
            <strong><span aria-label="required">*</span></strong>
            </label>
            <input type="tel" id="number" name="cardnumber">
        </p>
        <p>
            <label for="expiration">
            <span>Expiration date:</span>
            <strong><span aria-label="required">*</span></strong>
            </label>
            <input type="text" id="expiration" required="true" placeholder="MM/YY" pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$">
        </p>
    </section>
    <section>
        <p> <button type="submit">Validate the payment</button> </p>
    </section>
</form>`;

export const ModalWindowsRichTextArgs: ModalWindowsProps = {
    index: 4,
    openModal: false,
    text: form,
    title: "Modal Title",
    size: "full-screen",
    disableDisplayFlex: true
};

CompleteConfiguration.args = ModalWindowsArgs;
IFrame.args = ModalWindowsIFrameArgs;
RichText.args = ModalWindowsRichTextArgs;


