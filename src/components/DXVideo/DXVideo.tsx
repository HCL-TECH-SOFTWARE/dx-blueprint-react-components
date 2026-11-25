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

import React, { useEffect, useState } from "react";
import "./DXVideo.scss";
import { LinksProps } from "../../utilities";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";
export interface VideoProps {
    playlist: string,
    apiKey: string,
    service: 'vimeo' | 'youtube',
    layout?: 'vertical' | 'horizontal' | undefined;
    link: LinksProps;
    /**
     * Text direction. Omit to auto-detect from the document dir attribute.
     * When RTL is active, YouTube embeds include a `?hl=<lang>` parameter
     * derived from the document lang attribute. Falls back to `?hl=ar` when the detected
     * language is not a known RTL language code.
     */
    dir?: 'ltr' | 'rtl';
}
export interface typeResponseVimeo {
    data: [
        {
            uri: '',
            name: '',
            description: '',
            player_embed_url: '',
        }
    ];
}
export interface typeResponseYoutube {
    data: {
        kind: '',
        etag: '',
        items: [
            {
                id: '',
                contentDetails: {
                    videoId: '',
                },
                snippet: {
                    title: '',
                    description: '',
                    channelTitle: '',
                };
            }
        ],
        nextPageToken: '',
        pageInfo: {},
    };
}
// All RTL script languages supported by DX portal (Unicode CLDR RTL list)
const RTL_LANGUAGES = [
    'ar',  // Arabic
    'he',  // Hebrew
    'fa',  // Persian / Farsi
    'ur',  // Urdu
    'ps',  // Pashto
    'ug',  // Uyghur
    'yi',  // Yiddish
    'dv',  // Divehi / Maldivian (Thaana script)
    'sd',  // Sindhi
    'ckb', // Central Kurdish (Sorani, Arabic script)
    'ku',  // Kurdish (when written in Arabic script)
    'azb', // South Azerbaijani
    'mzn', // Mazanderani
    'lrc', // Northern Luri
    'glk', // Gilaki
    'pnb', // Western Punjabi (Shahmukhi script)
    'bal', // Balochi
    'haz', // Hazaragi
    'prs', // Dari (Persian variant used in Afghanistan)
    'nqo', // N'Ko
    'syr', // Syriac
];
const DXVideo = ( props: ExtendableProps<VideoProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { playlist: _playlist, apiKey: _apiKey, service: _service, layout: _layout, link: _link, dir: _dir, className, ref, ...rest } = props;
    const [responseYoutube, setResponseYoutube] = useState( {} as typeResponseYoutube );
    const [responseVimeo, setResponseVimeo] = useState( {} as typeResponseVimeo );
    const [isLoading, setLoading] = useState( true );
    const [documentDir, setDocumentDir] = useState<'ltr' | 'rtl'>( () => {
        if ( typeof document !== 'undefined' ) {
            return getComputedStyle( document.documentElement ).direction as 'ltr' | 'rtl' || 'ltr';
        }
        return 'ltr';
    } );
    const [documentLang, setDocumentLang] = useState<string>( () => {
        if ( typeof document !== 'undefined' ) {
            return document.documentElement.lang?.split( '-' )[0]?.toLowerCase() || '';
        }
        return '';
    } );
    useEffect( () => {
        if ( props.dir ) return;
        const update = () => {
            if ( typeof document !== 'undefined' ) {
                setDocumentDir( getComputedStyle( document.documentElement ).direction as 'ltr' | 'rtl' || 'ltr' );
            }
        };
        update();
        const observer = new MutationObserver( update );
        if ( typeof document !== 'undefined' ) {
            observer.observe( document.documentElement, { attributes: true, attributeFilter: ['dir'] } );
        }
        return () => observer.disconnect();
    }, [props.dir] );
    useEffect( () => {
        const updateLang = () => {
            if ( typeof document !== 'undefined' ) {
                setDocumentLang( document.documentElement.lang?.split( '-' )[0]?.toLowerCase() || '' );
            }
        };
        // Initial lang value is already captured by the useState initialiser above;
        // updateLang() is intentionally not called here to avoid a redundant state set on mount.
        const langObserver = new MutationObserver( updateLang );
        if ( typeof document !== 'undefined' ) {
            langObserver.observe( document.documentElement, { attributes: true, attributeFilter: ['lang'] } );
        }
        return () => langObserver.disconnect();
    }, [] );
    const resolvedDir: 'ltr' | 'rtl' = props.dir ?? documentDir;
    const getYouTubeHlParam = (): string => {
        if ( resolvedDir !== 'rtl' ) return '';
        if ( documentLang && RTL_LANGUAGES.includes( documentLang ) ) {
            return `?hl=${documentLang}`;
        }
        return '?hl=ar';
    };
    useEffect( () => {
        if ( props.service === 'youtube' ) {
            requestApiYouTube();
        }
        if ( props.service === 'vimeo' ) {
            requestApiVimeo();
        }
    }, [props.service, props.apiKey, props.playlist] );
    const requestApiYouTube = () => {
        let playlistId;
        if ( props.playlist.includes( "https://youtube.com/playlist?list=" ) ) {
            playlistId = props.playlist.replace( "https://youtube.com/playlist?list=", "" );
        } else {
            playlistId = props.playlist;
        }
        let urlBase = 'https://youtube.googleapis.com/youtube/v3/playlistItems?playlistId=' + playlistId + `&maxResults=6&part=snippet,id,contentDetails&key=${props.apiKey}`;
        requestApi( urlBase, '' );
    };
    const requestApiVimeo = () => {
        let url = '';
        props.playlist.includes( "https://vimeo.com/showcase/" ) && ( url = `https://api.vimeo.com/me/albums/${props.playlist.split( "showcase/" )[1]}/videos` );
        if ( props.playlist.includes( "https://vimeo.com/manage/showcases/" ) ) {
            let showCase = props.playlist.replace( 'https://vimeo.com/manage/showcases/', '' );
            let ifShowCase = showCase.includes( "/info" ) && showCase.replace( "/info", "" );
            url = `https://api.vimeo.com/me/albums/${ifShowCase}/videos`;
        }
        props.playlist.includes( "folder/" ) && ( url = `https://api.vimeo.com/me/projects/${props.playlist.split( "folder/" )[1]}/videos` );
        props.playlist.includes( "https://vimeo.com/manage/folders/" ) && ( url = `https://api.vimeo.com/me/projects/${props.playlist.split( "folders/" )[1]}/videos` );
        requestApi( url, `Bearer ${props.apiKey}` );
    };
    const renderMainVideo = ( layoutClass: string ) => {
        let title = '';
        let description = '';
        let titleDescription = '';
        let urlEmbed = '';
        if ( props.service === 'youtube' && responseYoutube && responseYoutube.data && responseYoutube.data.items && responseYoutube.data.items.length > 0 ) {
            urlEmbed = `https://www.youtube.com/embed/${responseYoutube.data.items[0].contentDetails.videoId}${getYouTubeHlParam()}`;
            title = responseYoutube.data.items[0].snippet.title;
            titleDescription = responseYoutube.data.items[0].snippet.channelTitle;
            description = responseYoutube.data.items[0].snippet.description;
        }
        if ( props.service === 'vimeo' && responseVimeo && responseVimeo.data && responseVimeo.data.length > 0 ) {
            urlEmbed = responseVimeo.data[0].player_embed_url;
            title = responseVimeo.data[0].name;
            titleDescription = '';
            description = responseVimeo.data[0].description;
        }
        return (
            <div className={`${layoutClass}__mainVideo`}>
                <p className={`${layoutClass}__mainVideo__title`} >{title}</p>
                <iframe className={`${layoutClass}__mainVideo__video`} src={urlEmbed || undefined} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" loading="lazy"></iframe>
                {titleDescription !== '' ? <p className={`${layoutClass}__mainVideo__titleDescription`} > {titleDescription}</p> : null}
                <p className={`${layoutClass}__mainVideo__description`} >{description}</p>
            </div>
        );
    };
    const renderMoreVideoslist = ( layoutClass: string ) => {
        if ( props.service === 'youtube' && responseYoutube && responseYoutube.data && responseYoutube.data.items && responseYoutube.data.items.length > 0 ) {
            return responseYoutube.data.items.map( ( item, index ) => {
                return (
                    <div className={`${layoutClass}__video`} key={index}>
                        <iframe src={`https://www.youtube.com/embed/${item.contentDetails.videoId}${getYouTubeHlParam()}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" loading="lazy"></iframe>
                        <p className={`${layoutClass}__video__title`} >{item.snippet.title}</p>
                    </div>
                );
            } );
        }
        if ( props.service === 'vimeo' && responseVimeo && responseVimeo.data && responseVimeo.data.length > 0 ) {
            return responseVimeo.data.map( ( item, index ) => {
                if ( index > 0 && index < 8 ) {
                    return (
                        <div className={`${layoutClass}__video`} key={index}>
                            <iframe src={`${item.player_embed_url}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" loading="lazy"></iframe>
                            <p className={`${layoutClass}__video__title`} >{item.name}</p>
                        </div>
                    );
                }
            } );
        }
    };
    const renderVideoComponent = () => {
        let layoutClass = props.layout ? `dxVideo__list--${props.layout}` : 'dxVideo__list--horizontal';
        return (
            <div className={`${layoutClass}`} data-testid="dx-video-list" >
                {renderMainVideo( layoutClass )}
                <div className={`${layoutClass}__moreVideos`}>
                    <div className={`${layoutClass}__moreVideos__details`}>
                        <p> Latest videos</p>
                        <a href={props.link.url} target={props.link.target} data-testid="view-more-link">
                            View More
                        </a>
                    </div>
                    {renderMoreVideoslist( layoutClass )}
                </div>
            </div>
        );
    };
    const requestApi = ( url: string, keyToken: string ) => {
        setLoading( true );
        fetch( url, {
            headers: {
                'Authorization': keyToken
            }
        } )
            .then( ( res ) => {
                // fetch only rejects on network failure; a non-2xx status has to be turned into an error here
                if ( !res.ok ) {
                    throw new Error( `Request failed with status ${res.status}` );
                }
                return res.json();
            } )
            .then( ( data ) => {
                if ( props.service === 'youtube' ) {
                    // The component reads the playlist from `.data`, as it did with the previous HTTP client's response wrapper
                    setResponseYoutube( { data } );
                }
                if ( props.service === 'vimeo' ) {
                    setResponseVimeo( data );
                }
                setLoading( false );
            } )
            .catch( ( error ) => {
                console.error( error );
                setLoading( true );
            } );
    };
    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxVideo--loading", className )} data-testid="dx-video" dir={resolvedDir}>
            {isLoading ? (
                <h4 data-testid="loading">Loading...</h4>
            ) : (
                renderVideoComponent()
            )}
        </div>
    );
};
export default DXVideo;
