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
import React, { Component } from "react";
import "./DXOnboarding.scss";
import 'intro.js/introjs.css';
import introJs, { IntroJs, Step } from "intro.js";


export interface OnboardingProps {
    steps: OnboardingStep[];
    nextLabel?: string;
    prevLabel?: string;
    doneLabel?: string;
    showBullets?: boolean;
    exitOnEsc?: boolean;
    exitOnOverlayClick?: boolean;
    onComplete?: () => void;
}

interface OnboardingStep extends Step {
    onNextClick?: () => void;
}


export default class DXOnboarding extends Component<OnboardingProps> {
    myIntro: IntroJs;
    introJs: any;
    constructor( props: OnboardingProps ) {
        super( props );
        this.myIntro = introJs();
    }

    render() {
        return ( <></> );
    }

    componentDidMount(): void {
        this.myIntro.setOptions( {
            steps: this.props.steps,
            "prevLabel": this.props.prevLabel || "Back",
            "nextLabel": this.props.nextLabel || "Next",
            "doneLabel": this.props.doneLabel || "Done",
            "buttonClass": "dxOnboarding__button",
            "showBullets": this.props.showBullets || false,
            "tooltipClass": "dxOnboarding__tooltip",
            "exitOnEsc": this.props.exitOnEsc || false,
            "exitOnOverlayClick": this.props.exitOnOverlayClick || false
        } )
            .onbeforechange( async () => {
                await this.onBeforeChange( this.myIntro.currentStep() );
            } )
            .onbeforeexit( () => {
                if ( this.props.onComplete ) {
                    this.props.onComplete?.();
                }
            } )
            .start();
        this.myIntro.goToStepNumber( 1 );
    }

    onExit = () => {
        this.myIntro.exit();
    };

    onBeforeChange = async ( nextIndex: number | undefined ) => {
        if ( nextIndex ) {
            let prevItem = this.props.steps[nextIndex - 1];
            if ( prevItem && prevItem.onNextClick ) {
                prevItem.onNextClick?.();
                //Waiting DOM to update, then doing the especified process in the Docs to update steps for dynamic content steps.
                await new Promise( resolve => setTimeout( resolve, 300 ) );
                if ( this.props.steps && this.props.steps.length > nextIndex ) {
                    //Handle DOM updates onBeforeChange call
                    //@ts-ignore: TS thinks ._options don't exists but this value is accesible in this library, same situation for the following ts-ignore
                    const element = document.querySelector( this.myIntro._options.steps[nextIndex].element );
                    if ( element ) {
                        //@ts-ignore
                        this.myIntro._introItems[nextIndex].element = element;
                        //@ts-ignore
                        this.myIntro._introItems[nextIndex].position = this.myIntro._options.steps[nextIndex].position || 'auto';
                    }
                }
            }
        }

    };
};
