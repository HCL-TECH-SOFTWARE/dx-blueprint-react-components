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
