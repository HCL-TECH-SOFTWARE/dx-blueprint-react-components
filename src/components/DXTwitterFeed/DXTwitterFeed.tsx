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

import React, { useEffect, useState } from 'react';
import "./DXTwitterFeed.scss";
import Spinner from 'react-bootstrap/Spinner';

export interface TwitterFeedProps {
    title?: string,
    description?: string,
    type: "profile" | "tweet" | "list",
    url: string,
    options?: any,
}

const DXTwitterFeed = ( props: TwitterFeedProps ) => {
    const [scriptLoaded, setScriptLoaded] = useState( false );
    const [isFeedLoading, setIsFeedLoading] = useState( true );

    useEffect( () => {
        const script = document.createElement( 'script' );
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        script.addEventListener( 'load', () => setScriptLoaded( true ) );
        document.body.appendChild( script );

        return () => {
            document.body.removeChild( script );
        };
    }, [] );

    useEffect( () => {
        if ( !scriptLoaded ) return;
        if ( ( window as any ).twttr ) {
            switch ( props.type ) {
                case "profile":
                    ( window as any ).twttr.widgets.createTimeline(
                        {
                            sourceType: "profile",
                            screenName: getScreenName( props.url )
                        },
                        document.getElementById( "dxTwitterFeed__container--profile" ),
                        props.options ? { ...props.options } : { chrome: "noheader nofooter noborders transparent" }
                    ).then( () => setIsFeedLoading( false ) );
                    break;
                case "list":
                    ( window as any ).twttr.widgets.createTimeline(
                        {
                            sourceType: "list",
                            ownerScreenName: getScreenName( props.url ),
                            slug: getListSlug( props.url )
                        },
                        document.getElementById( "dxTwitterFeed__container--list" ),
                        props.options ? { ...props.options } : { chrome: "noheader nofooter noborders transparent" }
                    ).then( () => setIsFeedLoading( false ) );
                    break;
                case "tweet":
                    ( window as any ).twttr.widgets.createTweet(
                        getTweetId( props.url ),
                        document.getElementById( "dxTwitterFeed__container--tweet" ),
                        { ...props.options }
                    ).then( () => setIsFeedLoading( false ) );;
                    break;
                default:
                    break;
            }
        }
    }, [scriptLoaded] );

    const getScreenName = ( url: string ): string => {
        let pathname = new URL( url ).pathname.split( '/' );
        return pathname[1];
    };

    const getListSlug = ( url: string ): string => {
        let pathname = new URL( url ).pathname.split( '/' );
        return pathname[3];
    };

    const getTweetId = ( url: string ): string => {
        let pathname = new URL( url ).pathname.split( '/' );
        return pathname[3];
    };

    return (
        <div className='dxTwitterFeed' data-testid="twitter-feed">
            {props.title && <h3 className='dxTwitterFeed__title' data-testid="twitter-feed-title">{props.title}</h3>}
            {props.description && <p className='dxTwitterFeed__description' data-testid="twitter-feed-description">{props.description}</p>}
            <Spinner animation="border" variant="primary" className={( isFeedLoading ? "dxTwitterFeed__spinner" : "dxTwitterFeed__spinner--hidden" )} data-testid="twitter-feed-spinner" />
            <div className="dxTwitterFeed__container" id={"dxTwitterFeed__container--" + props.type} data-testid="twitter-feed-container">
            </div>
        </div>
    );
};

export default DXTwitterFeed;

