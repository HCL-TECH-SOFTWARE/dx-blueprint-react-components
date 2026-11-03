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

import React, { ReactElement, useRef, useState } from "react";
import { LinksProps, generateLinkAnchor, getLinkTarget, getLinkIcon, parseContentAndMedia, clickOutsideAlerter, getIcon } from "../../utilities";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./DXQuestionsTabs.scss";
export interface DXQuestionsTabsProps {
    title: string;
    seeOtherLink: LinksProps;
    questionDetailLinkText?: string;
    sections: DXQuestionsTabsSection[];
    icons?: {
        close?: string;
        link?: string;
    };
}
export interface DXQuestionsTabsSection {
    title: string;
    iconName?: string;
    questions: DXQuestionsTabsQuestion[];
}
export interface DXQuestionsTabsQuestion {
    question: string;
    answer: string;
    questionDetailLink: string;
    target?: string;
}
export const charLenghtLimitator = function ( originalString: string, maxLenght: number ) {
    if ( originalString.length > maxLenght ) {
        var newString = originalString.slice( 0, maxLenght );
        newString += "...";
        return newString;
    }
    return originalString;
};
const charLenghtLimitatorRichText = function ( originalString: string, maxLenght: number ) {
    let insideTagProps = false;
    let tagsCount = 0;
    let validTextCount = 0;
    let newString = "";
    for ( let i = 0; i < originalString.length; i++ ) {
        if ( !insideTagProps ) {
            validTextCount++;
        }
        if ( !insideTagProps && tagsCount <= 0 && validTextCount > maxLenght ) {
            break;
        }
        if ( originalString[i] == "<" ) {
            insideTagProps = true;
            if ( originalString[i + 1] == "/" ) {
                tagsCount--;
            } else {
                tagsCount++;
            }
        } else if ( originalString[i] == ">" ) {
            insideTagProps = false;
        }
        newString += originalString[i];
    }
    if ( validTextCount > maxLenght ) {
        newString += "...";
    }
    return newString;
};
const DXQuestionsTabs = ( props: DXQuestionsTabsProps ) => {
    var [selectedSection, setSelectedSection] = useState<DXQuestionsTabsSection>();
    var [selectedQuestion, setSelectedQuestion] = useState<DXQuestionsTabsQuestion>();
    const wrapperRef = useRef( null );
    clickOutsideAlerter( [wrapperRef], () => {
        setSelectedSection( undefined );
        setSelectedSection( undefined );
    } );
    const generateSectionButtons = function ( sections: DXQuestionsTabsSection[] ): ReactElement[] {
        var sectionsHtml: ReactElement[] = [];
        var buttonCounter: number = 0;
        sections.forEach( section => {
            buttonCounter++;
            sectionsHtml.push(
                <li className="dxQuestionsTabs_sectionButton" key={"dxQTButton-" + buttonCounter}>
                    <Button
                        data-testid="dxQTSectionButton"
                        variant="unstyled"
                        onClick={( e ) => {
                            if ( selectedSection != section ) {
                                setSelectedSection( section );
                            } else {
                                setSelectedSection( undefined );
                            }
                            setSelectedQuestion( undefined );
                            e.stopPropagation();
                        }}
                        className={selectedSection == section ? "dxQuestionsTabs__sectionButtonsContainer--active active" : ""}>
                        <i className={section.iconName || "ci-Circle_Help"} />
                        <span>{section.title}</span>
                    </Button>
                    {
                        selectedSection == section &&
                        generateQuestionsContainer( section.questions )
                    }
                    <div
                        data-testid="dxQTQuestionDetailContainer"
                        className={"dxQuestionsTabs__questionDetail"}>
                        {
                            ( selectedSection == section && selectedQuestion ) &&
                            generateQuestionDetail()
                        }
                    </div>
                </li>
            );
        } );
        return sectionsHtml;
    };
    const generateQuestionsContainer = function ( questionArray: DXQuestionsTabsQuestion[] ) {
        var questionsHTML: ReactElement[] = [];
        var questionCounter: number = 0;
        questionArray.forEach( ( question ) => {
            questionCounter++;
            questionsHTML.push(
                <Col
                    key={"dxQTQuestion-" + questionCounter}
                    className={"dxQuestionsTabs__questionCell"} xs={6} sm={4} md={3} lg={3}
                    onClick={() => {
                        setSelectedQuestion( question );
                    }}>
                    <Button data-testid="dxQTQuestionButton" variant="unstyled">
                        <p className="dxQuestionsTabs__questionCellTitle">{charLenghtLimitator( question.question, 32 )}</p>
                    </Button>
                </Col>
            );
        } );
        return (
            <Container fluid
                data-testid="dxQTQuestionsContainer"
                className={"dxQuestionsTabs__questionsContainer" + ( ( selectedSection && !selectedQuestion ) ? " dxQuestionsTabs__questionsContainer--active" : "" )}>
                <Row>
                    {questionsHTML}
                </Row>
                <div className="dxQuestionsTabs__separatorLine dark"></div>
                {generateLinkAnchor(
                    props.seeOtherLink,
                    "dxQuestionsTabs__questionsContainerLink" )}
            </Container>
        );
    };
    const generateQuestionDetail = function () {
        if ( selectedQuestion ) {
            return (
                <div>
                    <span className="dxQuestionsTabs__questionDetailTitle">
                        <div data-testid="dxQTQuestionTitle">{charLenghtLimitator( selectedQuestion.question, 128 )}</div>
                        <Button
                            data-testid="dxQTQuestionClose"
                            variant="unstyled"
                            onClick={() => {
                                setSelectedQuestion( undefined );
                            }}>
                            <i className={getIcon( props.icons, "close", "ci-Close_SM" )}></i>
                        </Button>
                    </span>
                    <div
                        data-testid="dxQTQuestionBody"
                        className="dxQuestionsTabs__questionDetailBody"
                        contentEditable={false}
                    >
                        {
                            parseContentAndMedia(
                                charLenghtLimitatorRichText( selectedQuestion.answer, 250 ),
                                false )
                        }
                    </div>
                    <a
                        data-testid="dxQTQuestionLink"
                        href={selectedQuestion.questionDetailLink}
                        target={getLinkTarget( selectedQuestion.target )}
                        className="dxQuestionsTabs__questionDetailLink">
                        <p>{
                            charLenghtLimitator(
                                props.questionDetailLinkText || "View answer in a separate page"
                                , 70 )
                        }
                            {getLinkIcon( selectedQuestion.target )}</p>
                        <i role={"button"} className={getIcon( props.icons, "link", "ci-Chevron_Right_MD" )}></i>
                    </a>
                </div>
            );
        }
    };
    return (
        <div className="dxQuestionsTabs">
            <div data-testid="dxQTtitle" className="dxQuestionsTabs__title">{charLenghtLimitator( props.title, 64 )}</div>
            <div className="dxQuestionsTabs__separatorLine"></div>
            <div
                ref={wrapperRef}
                className={
                    "dxQuestionsTabs__sectionButtonsContainer"
                    + ( selectedSection ? " dxQuestionsTabs__sectionButtonsContainer--active" : "" )
                }>
                <ul>
                    {generateSectionButtons( props.sections )}
                </ul>
            </div>
        </div>
    );
};
export default DXQuestionsTabs;
