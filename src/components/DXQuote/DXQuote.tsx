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

import "./DXQuote.scss";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ImageProps, getIcon, purifyAndParseHTML } from "../../utilities";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface QuoteProps {
    index: number;
    body: string;
    thumbnail?: ImageProps;
    authorName?: string;
    hideQuotes?: boolean;
    paddingDesktop?: string;
    paddingMobile?: string;
    icons?: {
        quoteOpen?: string;
        quoteClose?: string;
    };
}

const getCustomPadding = ( quoteId: number, paddingDesktop: string | undefined, paddingMobile: string | undefined ) => {
    //regular expression to test a proper padding value
    let regex = /^(((((\d+(\.\d)?(px|em|rem|%|cm|ch|in|pc|pt|mm|ex))|0)[ ]){0,3}((\d+(\.\d)?(px|em|rem|%|cm|ch|in|pc|pt|mm|ex))|0))|inherit|initial|revert|revert-layer|unset)$/i;

    let verifiedPaddingDesktop: string, verifiedPaddingMobile: string;
    verifiedPaddingDesktop = paddingDesktop ? ( regex.test( paddingDesktop.trim() ) ? paddingDesktop.trim() : "0" ) : "0";
    verifiedPaddingMobile = paddingMobile ? ( regex.test( paddingMobile.trim() ) ? paddingMobile.trim() : "0" ) : "0";

    return `
      #dxquote-${quoteId} {
        padding: ${verifiedPaddingDesktop};
      }

      @media (max-width: 767px) {
        #dxquote-${quoteId} {
          padding: ${verifiedPaddingMobile};
        }
      }`;
};

const DXQuote = ( props: ExtendableProps<QuoteProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { index: _index, body: _body, thumbnail: _thumbnail, authorName: _authorName, hideQuotes: _hideQuotes, paddingDesktop: _paddingDesktop, paddingMobile: _paddingMobile, icons: _icons, className, ref, ...rest } = props;

    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxQuote", className )} id={`dxquote-${props.index}`} data-testid="quote-item">
            <style>{getCustomPadding( props.index, props.paddingDesktop, props.paddingMobile )}</style>
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        <div className="dxQuote__body" data-testid="quote-body">
                            {
                                !props.hideQuotes &&
                                <i
                                    className={getIcon( props.icons, "quoteOpen", "ci-Double_Quotes_L" )}
                                    data-testid="quotes-quoteOpen"
                                />
                            }
                            {purifyAndParseHTML( props.body )}
                            {
                                !props.hideQuotes &&
                                <i
                                    className={getIcon( props.icons, "quoteClose", "ci-Double_Quotes_R" )}
                                    data-testid="quotes-quoteClose"
                                />
                            }
                        </div>
                    </Col>
                    {
                        props.thumbnail ?
                            <Col xs={12}>
                                <div className="dxQuote__imgContainer">
                                    <img className="dxQuote__img" data-testid="quote-image" src={props.thumbnail.url} alt={props.thumbnail.altText ? props.thumbnail.altText : ( props.authorName?.trim() ? props.authorName.trim() : "Author Image" )}>
                                    </img>
                                </div>
                            </Col>
                            :
                            <></>
                    }
                    {
                        props.authorName ?
                            <Col xs={12}>
                                <p className="dxQuote__name" data-testid="quote-name">{props.authorName.trim()}</p>
                            </Col>
                            :
                            <></>
                    }
                </Row>
            </Container>
        </div>
    );
};

export default DXQuote;
