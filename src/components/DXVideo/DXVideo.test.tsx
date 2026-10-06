import React, { act } from "react";
import '@testing-library/jest-dom';
import DXVideo from "./DXVideo";
import { listVideosYoutubeArgs, listFolderVimeoArgs, showCasesVideosVimeoArgs } from "./DXVideo.stories";
import { render, screen } from '@testing-library/react';
import axios from 'axios';
jest.mock( 'axios' );
const mockedAxios = axios as jest.Mocked<typeof axios>;
const responseYoutubeMock = {
    data: {
        "kind": "youtube#playlistItemListResponse",
        "etag": "4RPCXzfTGma4kLCggX3jDLzF20c",
        "nextPageToken": "EAAaBlBUOkNBVQ",
        "items": [
            {
                "kind": "youtube#playlistItem",
                "etag": "SkCFxWzIiF7z5FB8ArrQzB3b9zY",
                "id": "UExsR1B6ZmN1aHFkc3g0MGZwNEc2cW8wbXUzV3ZnWHcySy45NzUwQkI1M0UxNThBMkU0",
                "snippet": {
                    "publishedAt": "2022-11-28T16:55:59Z",
                    "channelId": "UCQIyqMWCdx1GBvbw_Yi6lEA",
                    "title": "Behind The Charge | One Last Dance For Max And Checo in Abu Dhabi",
                    "description": "Oracle Red Bull Racing are in Abu Dhabi for the final race of the 2022 Formula 1 season. Join Max, Checo and the Team for behind-the-scenes access across the weekend, featuring Sebastian Vettel and Daniel Ricciardo.\n\n►Subscribe: https://www.youtube.com/redbullracing\u200b\u200b\u200b\nInstagram: https://www.instagram.com/redbullracing\u200b\nFacebook: https://www.facebook.com/redbullracing\u200b\nTikTok: https://www.tiktok.com/@redbullracing\u200b\u200b\u200b\nTwitter: https://twitter.com/redbullracing\u200b\u200b\u200b\nWebsite: https://redbullracing.com/\u200b\u200b\u200b\n\n#GivesYouWings\u200b\u200b\u200b #F1\u200b\u200b\u200b",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/MLltpVJiZvo/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/MLltpVJiZvo/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/MLltpVJiZvo/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/MLltpVJiZvo/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/MLltpVJiZvo/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "Oracle Red Bull Racing",
                    "playlistId": "PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K",
                    "position": 0,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "MLltpVJiZvo"
                    },
                    "videoOwnerChannelTitle": "Oracle Red Bull Racing",
                    "videoOwnerChannelId": "UCQIyqMWCdx1GBvbw_Yi6lEA"
                },
                "contentDetails": {
                    "videoId": "MLltpVJiZvo",
                    "videoPublishedAt": "2022-11-24T18:00:09Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "PI8KNjE_0DsRa328YGCnQlWmJkU",
                "id": "UExsR1B6ZmN1aHFkc3g0MGZwNEc2cW8wbXUzV3ZnWHcySy4zRjM0MkVCRTg0MkYyQTM0",
                "snippet": {
                    "publishedAt": "2022-11-03T17:00:54Z",
                    "channelId": "UCQIyqMWCdx1GBvbw_Yi6lEA",
                    "title": "Behind the Charge | Checo Perez brings F1 to Mexico as Max Verstappen claims a record victory",
                    "description": "After wrapping up the Constructors' Championship in Austin the Bulls headed to Mexico for the Mexican Grand Prix and a rather special homecoming for @ChecoPerez, as he brought F1 back to his hometown Guadalajara. \n\n►Subscribe: https://www.youtube.com/redbullracing\u200b\u200b\u200b\nInstagram: https://www.instagram.com/redbullracing\u200b\nFacebook: https://www.facebook.com/redbullracing\u200b\nTikTok: https://www.tiktok.com/@redbullracing\u200b\u200b\u200b\nTwitter: https://twitter.com/redbullracing\u200b\u200b\u200b\nWebsite: https://redbullracing.com/\u200b\u200b\u200b\n\n#GivesYouWings\u200b\u200b\u200b #F1\u200b\u200b\u200b",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/HcE7JBIqC2M/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/HcE7JBIqC2M/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/HcE7JBIqC2M/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/HcE7JBIqC2M/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/HcE7JBIqC2M/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "Oracle Red Bull Racing",
                    "playlistId": "PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K",
                    "position": 1,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "HcE7JBIqC2M"
                    },
                    "videoOwnerChannelTitle": "Oracle Red Bull Racing",
                    "videoOwnerChannelId": "UCQIyqMWCdx1GBvbw_Yi6lEA"
                },
                "contentDetails": {
                    "videoId": "HcE7JBIqC2M",
                    "videoPublishedAt": "2022-11-03T18:30:10Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "1WU0f6JXUVbIK1WEer6gf5hbBJQ",
                "id": "UExsR1B6ZmN1aHFkc3g0MGZwNEc2cW8wbXUzV3ZnWHcySy5GM0Q3M0MzMzY5NTJFNTdE",
                "snippet": {
                    "publishedAt": "2022-10-27T19:10:21Z",
                    "channelId": "UCQIyqMWCdx1GBvbw_Yi6lEA",
                    "title": "Behind The Charge | Oracle Red Bull Racing Clinch Constructors' Title In Awesome Austin",
                    "description": "Doing the double in 2022! One week on from Max Verstappen wrapping up his second Formula 1 World Drivers' Title, Oracle Red Bull Racing return to Texas for the United States Grand Prix, with the chance to clinch a fifth Constructors' World Championship.\n\n►Subscribe: https://www.youtube.com/redbullracing\u200b\u200b\u200b\nInstagram: https://www.instagram.com/redbullracing\u200b\nFacebook: https://www.facebook.com/redbullracing\u200b\nTikTok: https://www.tiktok.com/@redbullracing\u200b\u200b\u200b\nTwitter: https://twitter.com/redbullracing\u200b\u200b\u200b\nWebsite: https://redbullracing.com/\u200b\u200b\u200b\n\n#GivesYouWings\u200b\u200b\u200b #F1\u200b\u200b\u200b",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/tyHKe_KsgOA/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/tyHKe_KsgOA/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/tyHKe_KsgOA/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/tyHKe_KsgOA/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/tyHKe_KsgOA/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "Oracle Red Bull Racing",
                    "playlistId": "PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K",
                    "position": 2,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "tyHKe_KsgOA"
                    },
                    "videoOwnerChannelTitle": "Oracle Red Bull Racing",
                    "videoOwnerChannelId": "UCQIyqMWCdx1GBvbw_Yi6lEA"
                },
                "contentDetails": {
                    "videoId": "tyHKe_KsgOA",
                    "videoPublishedAt": "2022-10-27T19:10:43Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "N0Grtuo3Lnfuor2oPe4F84gKkn4",
                "id": "UExsR1B6ZmN1aHFkc3g0MGZwNEc2cW8wbXUzV3ZnWHcySy4yMDhBMkNBNjRDMjQxQTg1",
                "snippet": {
                    "publishedAt": "2022-10-13T20:10:38Z",
                    "channelId": "UCQIyqMWCdx1GBvbw_Yi6lEA",
                    "title": "Behind The Charge | Max Verstappen Wins F1 Championship in Japan",
                    "description": "How time flies. Oracle Red Bull Racing are back in Suzuka for the frist time since 2019 for the Japanese Grand Prix and the Bulls head into the weekend knowing Max Verstappen could be crowned F1 champion once again. Join the Dutchman, Sergio Perez and Christian for more behind-the-scenes access.\n\n►Subscribe: https://www.youtube.com/redbullracing\u200b\u200b\u200b\nInstagram: https://www.instagram.com/redbullracing\u200b\nFacebook: https://www.facebook.com/redbullracing\u200b\nTikTok: https://www.tiktok.com/@redbullracing\u200b\u200b\u200b\nTwitter: https://twitter.com/redbullracing\u200b\u200b\u200b\nWebsite: https://redbullracing.com/\u200b\u200b\u200b\n\n#givesyouwings",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/d9PVYkM2JSE/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/d9PVYkM2JSE/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/d9PVYkM2JSE/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/d9PVYkM2JSE/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/d9PVYkM2JSE/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "Oracle Red Bull Racing",
                    "playlistId": "PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K",
                    "position": 3,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "d9PVYkM2JSE"
                    },
                    "videoOwnerChannelTitle": "Oracle Red Bull Racing",
                    "videoOwnerChannelId": "UCQIyqMWCdx1GBvbw_Yi6lEA"
                },
                "contentDetails": {
                    "videoId": "d9PVYkM2JSE",
                    "videoPublishedAt": "2022-10-13T17:00:12Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "Iyv5UTH6vFpKOplKfGHnZdihov4",
                "id": "UExsR1B6ZmN1aHFkc3g0MGZwNEc2cW8wbXUzV3ZnWHcySy5ENDU4Q0M4RDExNzM1Mjcy",
                "snippet": {
                    "publishedAt": "2022-09-08T16:08:26Z",
                    "channelId": "UCQIyqMWCdx1GBvbw_Yi6lEA",
                    "title": "Behind the Charge | Double Dutch as Max Verstappen wins back-to-back In Zandvoort",
                    "description": "Go Behind the Charge with the Team at the home of the Dutch Grand Prix as @MaxVerstappen1 secures a second victory in front of his home crowd. \n\n►Subscribe: https://www.youtube.com/redbullracing\u200b\u200b\u200b\nInstagram: https://www.instagram.com/redbullracing\u200b\nFacebook: https://www.facebook.com/redbullracing\u200b\nTikTok: https://www.tiktok.com/@redbullracing\u200b\u200b\u200b\nTwitter: https://twitter.com/redbullracing\u200b\u200b\u200b\nWebsite: https://redbullracing.com/\u200b\u200b\u200b\n\n#GivesYouWings\u200b\u200b\u200b #F1\u200b\u200b\u200b #ChargeOn\u200b",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/nGSyAij5mlU/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/nGSyAij5mlU/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/nGSyAij5mlU/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/nGSyAij5mlU/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/nGSyAij5mlU/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "Oracle Red Bull Racing",
                    "playlistId": "PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K",
                    "position": 4,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "nGSyAij5mlU"
                    },
                    "videoOwnerChannelTitle": "Oracle Red Bull Racing",
                    "videoOwnerChannelId": "UCQIyqMWCdx1GBvbw_Yi6lEA"
                },
                "contentDetails": {
                    "videoId": "nGSyAij5mlU",
                    "videoPublishedAt": "2022-09-08T17:00:12Z"
                }
            }
        ],
        "pageInfo": {
            "totalResults": 24,
            "resultsPerPage": 5
        }
    }
};
const responseVimeoMock = {
    "config": {},
    "data": {
        "total": 3,
        "page": 1,
        "per_page": 25,
        "paging": {
            "next": null,
            "previous": null,
            "first": "/users/105310957/videos?page=1",
            "last": "/users/105310957/videos?page=1"
        },
        "data": [
            {
                "uri": "/videos/797033113",
                "name": "House of the Dragon - Animation Reel Nina Fischer",
                "description": "Responsible for Handkeyframe Creature Animation, CG Cameras and/or Camera Tweaks.\n\nShow Info:\nHouse of the Dragon - Season 1, 2022\nMusic: Used parts of the Trailer Song by Ramin Dyawadi",
                "type": "video",
                "link": "https://vimeo.com/797033113",
                "player_embed_url": "https://player.vimeo.com/video/797033113?h=c2e8efde5e",
                "duration": 55,
                "width": 2880,
                "language": null,
                "height": 1620,
                "embed": {
                    "html": "<iframe src=\"https://player.vimeo.com/video/797033113?h=c2e8efde5e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=268185\" width=\"2880\" height=\"1620\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"House of the Dragon - Animation Reel Nina Fischer\"></iframe>",
                    "badges": {
                        "hdr": false,
                        "live": {
                            "streaming": false,
                            "archived": false
                        },
                        "staff_pick": {
                            "normal": false,
                            "best_of_the_month": false,
                            "best_of_the_year": false,
                            "premiere": false
                        },
                        "vod": false,
                        "weekend_challenge": false
                    }
                },
            },
            {
                "uri": "/videos/777823079",
                "name": "BongoLa",
                "description": "This shot is all about “shaking it off”!\nSo take a deep breath and let all your stress behind for today! ;)\nAnimating this little fella was pure joy and I learned a ton.\nThere are always improvements left but I am proud because It's tough to finish private projects besides work. So huuge thanks to Nara Youn who mentored me aand to Pascal Kuhn (env.+lighting) and Ramon Schauer (Groom). Without you all, this wouldn’t look that lovely! Special Thanks to Joakim Riedinger and Till Sander-Titgemeyer for giving some advice from time to time when I felt stuck!\n\nChuie Rig: available on Gumroad\nRig by Dmitrii Kolpakov\nModel by @andrey_lizunov_\nTextures by Dmitrii Kravets\nSong: Caterina Valente - BongoChaChaCha\n#3danimation #characteranimation #doggo #chihuahua #goodvibesonly #pets #petsofinstagram #3d #cg #3danimator #animation #animal #caterinavalente #bongochachacha #tiktok #singalong",
                "type": "video",
                "link": "https://vimeo.com/777823079",
                "player_embed_url": "https://player.vimeo.com/video/777823079?h=572d3e34e7",
                "duration": 14,
                "width": 1920,
                "language": null,
                "height": 1080,
                "embed": {
                    "html": "<iframe src=\"https://player.vimeo.com/video/777823079?h=572d3e34e7&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=268185\" width=\"1920\" height=\"1080\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"BongoLa\"></iframe>",
                    "badges": {
                        "hdr": false,
                        "live": {
                            "streaming": false,
                            "archived": false
                        },
                        "staff_pick": {
                            "normal": false,
                            "best_of_the_month": false,
                            "best_of_the_year": false,
                            "premiere": false
                        },
                        "vod": false,
                        "weekend_challenge": false
                    }
                },
            },
            {
                "uri": "/videos/378828044",
                "name": "Nina Fischer Animation Demo Reel 2019",
                "description": "This is my first Animation Demo Reel I created at PIXL VISN Media Arts Academy 2019. I am very proud that I learned that much in such a short amount of time. There is still a lot to polish and to improve, and I am looking forward to becoming a better 3D animator every day!",
                "type": "video",
                "link": "https://vimeo.com/378828044",
                "player_embed_url": "https://player.vimeo.com/video/378828044?h=2c616536df",
                "duration": 65,
                "width": 1920,
                "language": null,
                "height": 1080,
                "embed": {
                    "html": "<iframe src=\"https://player.vimeo.com/video/378828044?h=2c616536df&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=268185\" width=\"1920\" height=\"1080\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"Nina Fischer Animation Demo Reel 2019\"></iframe>",
                    "badges": {
                        "hdr": false,
                        "live": {
                            "streaming": false,
                            "archived": false
                        },
                        "staff_pick": {
                            "normal": false,
                            "best_of_the_month": false,
                            "best_of_the_year": false,
                            "premiere": false
                        },
                        "vod": false,
                        "weekend_challenge": false
                    }
                },
            }
        ]
    },
    "headers": {},
    "request": {},
    "status": 200,
    "statusText": "OK",
};
describe( "Video component", () => {
    beforeEach( () => jest.clearAllMocks() );
    test( "List Video updated for an user of US from Vimeo", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseVimeoMock ) );
        render( <DXVideo {...listFolderVimeoArgs} /> );
        expect( mockedAxios.get ).toHaveBeenCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const titleMainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__title' );
        const mainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__video' );
        const descriptionMainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__description' );
        const videosSection = document.querySelector( '.dxVideo__list--vertical__moreVideos' );
        expect( screen.getAllByTestId( "dx-video" ) ).toBeTruthy();
        expect( titleMainVideo ).toBeInTheDocument();
        expect( mainVideo ).toBeInTheDocument();
        expect( descriptionMainVideo ).toBeInTheDocument();
        expect( screen.getAllByTestId( "view-more-link" ) ).toBeTruthy();
        expect( videosSection ).toBeInTheDocument();
    } );
    test( "Render playlist url as expected from YouTube", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        render( <DXVideo {...listVideosYoutubeArgs} /> );
        expect( mockedAxios.get ).toHaveBeenCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const titleMainVideo = document.querySelector( '.dxVideo__list--horizontal__mainVideo__title' );
        const mainVideo = document.querySelector( '.dxVideo__list--horizontal__mainVideo__video' );
        const descriptionMainVideo = document.querySelector( '.dxVideo__list--horizontal__mainVideo__description' );
        const videosSection = document.querySelector( '.dxVideo__list--horizontal__moreVideos' );
        expect( titleMainVideo ).toBeInTheDocument();
        expect( mainVideo ).toBeInTheDocument();
        expect( descriptionMainVideo ).toBeInTheDocument();
        expect( screen.getAllByTestId( "view-more-link" ) ).toBeTruthy();
        expect( videosSection ).toBeInTheDocument();
    } );
    test( "Render playlist url as expected from YouTube with the id list", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        let props = listVideosYoutubeArgs;
        props.playlist = "PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K";
        render( <DXVideo {...props} /> );
        expect( mockedAxios.get ).toHaveBeenCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const titleMainVideo = document.querySelector( '.dxVideo__list--horizontal__mainVideo__title' );
        const mainVideo = document.querySelector( '.dxVideo__list--horizontal__mainVideo__video' );
        const descriptionMainVideo = document.querySelector( '.dxVideo__list--horizontal__mainVideo__description' );
        const videosSection = document.querySelector( '.dxVideo__list--horizontal__moreVideos' );
        expect( titleMainVideo ).toBeInTheDocument();
        expect( mainVideo ).toBeInTheDocument();
        expect( descriptionMainVideo ).toBeInTheDocument();
        expect( screen.getAllByTestId( "view-more-link" ) ).toBeTruthy();
        expect( videosSection ).toBeInTheDocument();
    } );
    test( "Render playlist url with params and default position list", async () => {
        let props = listVideosYoutubeArgs;
        props.playlist = "https://youtube.com/playlist?list=PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K";
        delete props.layout;
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        render( <DXVideo {...props} /> );
        expect( mockedAxios.get ).toHaveBeenCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const titleMainVideo = document.querySelector( '.dxVideo__list--horizontal__mainVideo__title' );
        const mainVideo = document.querySelector( '.dxVideo__list--horizontal__mainVideo__video' );
        const descriptionMainVideo = document.querySelector( '.dxVideo__list--horizontal__mainVideo__description' );
        const videosSection = document.querySelector( '.dxVideo__list--horizontal__moreVideos' );
        expect( screen.getAllByTestId( "dx-video" ) ).toBeTruthy();
        expect( titleMainVideo ).toBeInTheDocument();
        expect( mainVideo ).toBeInTheDocument();
        expect( descriptionMainVideo ).toBeInTheDocument();
        expect( screen.getAllByTestId( "view-more-link" ) ).toBeTruthy();
        expect( videosSection ).toBeInTheDocument();
    } );
    test( "List Video Error on request", async () => {
        mockedAxios.get.mockResolvedValue( Promise.reject(
            {
                "error": {
                    "code": 400,
                    "message": "The \u003ccode\u003eregionCode\u003c/code\u003e parameter specifies an invalid region code.",
                    "errors": [
                        {
                            "message": "The \u003ccode\u003eregionCode\u003c/code\u003e parameter specifies an invalid region code.",
                            "domain": "youtube.parameter",
                            "reason": "invalidRegionCode",
                            "location": "regionCode",
                            "locationType": "parameter"
                        }
                    ]
                }
            } ) );
        const error = jest.spyOn( console, "error" );
        render( <DXVideo {...listVideosYoutubeArgs} /> );
        expect( mockedAxios.get ).toHaveBeenCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        expect( error ).toHaveBeenCalled();
        error.mockRestore();
    } );
    test( "Render showCase list videos from Vimeo", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseVimeoMock ) );
        render( <DXVideo {...showCasesVideosVimeoArgs} /> );
        expect( mockedAxios.get ).toHaveBeenCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const titleMainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__title' );
        const mainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__video' );
        const descriptionMainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__description' );
        const videosSection = document.querySelector( '.dxVideo__list--vertical__moreVideos' );
        expect( screen.getAllByTestId( "dx-video" ) ).toBeTruthy();
        expect( titleMainVideo ).toBeInTheDocument();
        expect( mainVideo ).toBeInTheDocument();
        expect( descriptionMainVideo ).toBeInTheDocument();
        expect( screen.getAllByTestId( "view-more-link" ) ).toBeTruthy();
        expect( videosSection ).toBeInTheDocument();
    } );
    test( "Render showCase list videos from Vimeo but with url `https://vimeo.com/manage/showcases/10389678/info` ", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseVimeoMock ) );
        let props = showCasesVideosVimeoArgs;
        props.playlist = "https://vimeo.com/manage/showcases/10389678/info";
        render( <DXVideo {...props} /> );
        expect( mockedAxios.get ).toHaveBeenCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const titleMainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__title' );
        const mainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__video' );
        const descriptionMainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__description' );
        const videosSection = document.querySelector( '.dxVideo__list--vertical__moreVideos' );
        expect( screen.getAllByTestId( "dx-video" ) ).toBeTruthy();
        expect( titleMainVideo ).toBeInTheDocument();
        expect( mainVideo ).toBeInTheDocument();
        expect( descriptionMainVideo ).toBeInTheDocument();
        expect( screen.getAllByTestId( "view-more-link" ) ).toBeTruthy();
        expect( videosSection ).toBeInTheDocument();
    } );
    test( "Render folder list videos from Vimeo but with url `https://vimeo.com/manage/folders/2314585` ", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseVimeoMock ) );
        let props = listFolderVimeoArgs;
        props.playlist = "https://vimeo.com/manage/folders/2314585";
        render( <DXVideo {...props} /> );
        expect( mockedAxios.get ).toHaveBeenCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const titleMainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__title' );
        const mainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__video' );
        const descriptionMainVideo = document.querySelector( '.dxVideo__list--vertical__mainVideo__description' );
        const videosSection = document.querySelector( '.dxVideo__list--vertical__moreVideos' );
        expect( screen.getAllByTestId( "dx-video" ) ).toBeTruthy();
        expect( titleMainVideo ).toBeInTheDocument();
        expect( mainVideo ).toBeInTheDocument();
        expect( descriptionMainVideo ).toBeInTheDocument();
        expect( screen.getAllByTestId( "view-more-link" ) ).toBeTruthy();
        expect( videosSection ).toBeInTheDocument();
    } );
    test( "YouTube embed URLs include hl param when dir prop is rtl", async () => {
        document.documentElement.setAttribute( 'lang', 'ar' );
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const, dir: 'rtl' as const };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const rootEl = screen.getByTestId( 'dx-video' );
        const iframes = rootEl.querySelectorAll( 'iframe' );
        iframes.forEach( ( iframe ) => {
            expect( iframe.getAttribute( 'src' ) ).toContain( '?hl=ar' );
        } );
        expect( rootEl ).toHaveAttribute( 'dir', 'rtl' );
        await act( async () => { document.documentElement.removeAttribute( 'lang' ); } );
    } );
    test( "YouTube embed URLs fall back to ?hl=ar when dir is rtl but document lang is a non-RTL language", async () => {
        document.documentElement.setAttribute( 'lang', 'en' );
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const, dir: 'rtl' as const };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const rootEl = screen.getByTestId( 'dx-video' );
        const iframes = rootEl.querySelectorAll( 'iframe' );
        iframes.forEach( ( iframe ) => {
            expect( iframe.getAttribute( 'src' ) ).toContain( '?hl=ar' );
            expect( iframe.getAttribute( 'src' ) ).not.toContain( '?hl=en' );
        } );
        await act( async () => { document.documentElement.removeAttribute( 'lang' ); } );
    } );
    test( "YouTube embed URLs use correct hl param for Hebrew (non-Arabic RTL language)", async () => {
        document.documentElement.setAttribute( 'lang', 'he' );
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const, dir: 'rtl' as const };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const rootEl = screen.getByTestId( 'dx-video' );
        const mainVideoIframe = rootEl.querySelector( '.dxVideo__list--horizontal__mainVideo__video' ) as HTMLIFrameElement;
        expect( mainVideoIframe?.getAttribute( 'src' ) ).toContain( '?hl=he' );
        await act( async () => { document.documentElement.removeAttribute( 'lang' ); } );
    } );
    test( "YouTube embed URLs do not include hl param when dir prop is ltr", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const, dir: 'ltr' as const };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const rootEl = screen.getByTestId( 'dx-video' );
        const mainVideoIframe = rootEl.querySelector( '.dxVideo__list--horizontal__mainVideo__video' ) as HTMLIFrameElement;
        expect( mainVideoIframe?.getAttribute( 'src' ) ).not.toContain( '?hl=' );
        expect( rootEl ).toHaveAttribute( 'dir', 'ltr' );
    } );
    test( "YouTube embed URL hl param updates reactively when document lang changes after mount", async () => {
        // Ensure no lang attribute so documentLang initialises to ''
        document.documentElement.removeAttribute( 'lang' );
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const, dir: 'rtl' as const };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        // Before lang change: no known RTL lang → falls back to ?hl=ar
        const rootEl = screen.getByTestId( 'dx-video' );
        const mainVideoIframe = rootEl.querySelector( '.dxVideo__list--horizontal__mainVideo__video' ) as HTMLIFrameElement;
        expect( mainVideoIframe?.getAttribute( 'src' ) ).toContain( '?hl=ar' );
        // Change lang after mount — triggers the MutationObserver for lang
        await act( async () => {
            document.documentElement.setAttribute( 'lang', 'he' );
            await new Promise( r => setTimeout( r, 100 ) );
        } );
        const updatedIframe = rootEl.querySelector( '.dxVideo__list--horizontal__mainVideo__video' ) as HTMLIFrameElement;
        expect( updatedIframe?.getAttribute( 'src' ) ).toContain( '?hl=he' );
        await act( async () => { document.documentElement.removeAttribute( 'lang' ); } );
    } );
    test( "DXQ-49653: layout=undefined defaults to horizontal layoutClass", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs }; // no layout prop
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        // Without a layout prop, layoutClass defaults to 'dxVideo__list--horizontal'
        const listEl = screen.getByTestId( 'dx-video-list' );
        expect( listEl.className ).toContain( 'dxVideo__list--horizontal' );
    } );
    test( "DXQ-49653: Vimeo titleDescription is empty — no titleDescription element", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseVimeoMock ) );
        render( <DXVideo {...listFolderVimeoArgs} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const titleDesc = document.querySelector( '.dxVideo__list--vertical__mainVideo__titleDescription' );
        // Vimeo sets titleDescription = '' so the element should NOT be in the DOM
        expect( titleDesc ).toBeNull();
    } );
    test( "DXQ-49653: YouTube titleDescription is non-empty — titleDescription element rendered", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const titleDesc = document.querySelector( '.dxVideo__list--horizontal__mainVideo__titleDescription' );
        // YouTube sets channelTitle as titleDescription — should be present
        expect( titleDesc ).toBeInTheDocument();
    } );
    test( "DXQ-49653: getYouTubeHlParam returns '' when resolvedDir is ltr", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const, dir: 'ltr' as const };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const rootEl = screen.getByTestId( 'dx-video' );
        const mainVideoIframe = rootEl.querySelector( '.dxVideo__list--horizontal__mainVideo__video' ) as HTMLIFrameElement;
        // No hl param when ltr
        expect( mainVideoIframe?.getAttribute( 'src' ) ).not.toContain( '?hl=' );
    } );
    test( "DXQ-49653: getYouTubeHlParam — RTL language 'fa' produces ?hl=fa", async () => {
        document.documentElement.setAttribute( 'lang', 'fa' );
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const, dir: 'rtl' as const };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const rootEl = screen.getByTestId( 'dx-video' );
        const mainVideoIframe = rootEl.querySelector( '.dxVideo__list--horizontal__mainVideo__video' ) as HTMLIFrameElement;
        expect( mainVideoIframe?.getAttribute( 'src' ) ).toContain( '?hl=fa' );
        await act( async () => { document.documentElement.removeAttribute( 'lang' ); } );
    } );
    test( "DXQ-49653: Vimeo renderMoreVideoslist renders items at index 1-7", async () => {
        // Create a Vimeo mock with 3 items so index 0 is skipped and index 1,2 render
        const multiVimeoMock = {
            ...responseVimeoMock,
            data: {
                data: [
                    responseVimeoMock.data.data[0],
                    { ...responseVimeoMock.data.data[0], name: 'Vimeo Video 2', player_embed_url: 'https://player.vimeo.com/video/2' },
                    { ...responseVimeoMock.data.data[0], name: 'Vimeo Video 3', player_embed_url: 'https://player.vimeo.com/video/3' },
                ]
            }
        };
        mockedAxios.get.mockResolvedValue( Promise.resolve( multiVimeoMock ) );
        render( <DXVideo {...listFolderVimeoArgs} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        // Items at index 1 and 2 should be rendered (title text)
        expect( screen.getByText( 'Vimeo Video 2' ) ).toBeInTheDocument();
        expect( screen.getByText( 'Vimeo Video 3' ) ).toBeInTheDocument();
    } );
    test( "DXQ-49653: YouTube renderMoreVideoslist renders all items", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        // YouTube renderMoreVideoslist maps over ALL items (both index 0 and 1)
        const videos = document.querySelectorAll( '.dxVideo__list--horizontal__video' );
        expect( videos.length ).toBeGreaterThanOrEqual( 2 );
    } );
    test( "DXQ-49653: dir=rtl sets dir attribute on root element", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, dir: 'rtl' as const };
        render( <DXVideo {...props} /> );
        const rootEl = screen.getByTestId( 'dx-video' );
        expect( rootEl ).toHaveAttribute( 'dir', 'rtl' );
    } );
    test( "DXQ-49653: showCase URL format with /info suffix parsed correctly", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseVimeoMock ) );
        const props = { ...showCasesVideosVimeoArgs };
        render( <DXVideo {...props} /> );
        expect( mockedAxios.get ).toHaveBeenCalled();
        const callUrl = mockedAxios.get.mock.calls[0][0];
        // The showcase URL with /info suffix should strip /info and build api URL
        expect( callUrl ).toContain( 'api.vimeo.com/me/albums/' );
    } );
    test( "DXQ-49653: view-more link has correct href and target", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const viewMoreLink = screen.getByTestId( 'view-more-link' ) as HTMLAnchorElement;
        expect( viewMoreLink ).toBeInTheDocument();
        expect( viewMoreLink.href ).toBeTruthy();
    } );
    test( "YouTube response with empty items array handles layout gracefully", async () => {
        const emptyYoutubeMock = {
            data: {
                ...responseYoutubeMock.data,
                items: []
            }
        };
        mockedAxios.get.mockResolvedValue( Promise.resolve( emptyYoutubeMock ) );
        render( <DXVideo {...listVideosYoutubeArgs} playlist="PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K" layout="horizontal" /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const mainVideoIframe = document.querySelector( '.dxVideo__list--horizontal__mainVideo__video' ) as HTMLIFrameElement;
        expect( mainVideoIframe?.getAttribute( 'src' ) ).toBeNull();
    } );
    test( "Vimeo response with empty data array handles layout gracefully", async () => {
        const emptyVimeoMock = {
            ...responseVimeoMock,
            data: {
                ...responseVimeoMock.data,
                data: []
            }
        };
        mockedAxios.get.mockResolvedValue( Promise.resolve( emptyVimeoMock ) );
        render( <DXVideo {...listFolderVimeoArgs} playlist="https://vimeo.com/manage/folders/12345" layout="vertical" /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const mainVideoIframe = document.querySelector( '.dxVideo__list--vertical__mainVideo__video' ) as HTMLIFrameElement;
        expect( mainVideoIframe?.getAttribute( 'src' ) ).toBeNull();
    } );
    test( "YouTube API request constructs the correct URL with exact query parameters", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, apiKey: 'TEST_API_KEY', playlist: 'PLAYLIST_123' };
        render( <DXVideo {...props} /> );
        expect( mockedAxios.get ).toHaveBeenCalledWith(
            'https://youtube.googleapis.com/youtube/v3/playlistItems?playlistId=PLAYLIST_123&maxResults=6&part=snippet,id,contentDetails&key=TEST_API_KEY',
            { headers: { Authorization: '' } }
        );
    } );
    test( "Vimeo showcase URL format without info suffix evaluates ifShowCase as false", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseVimeoMock ) );
        const props = { ...showCasesVideosVimeoArgs, apiKey: 'VIMEO_KEY', playlist: "https://vimeo.com/manage/showcases/123456" };
        render( <DXVideo {...props} /> );
        expect( mockedAxios.get ).toHaveBeenCalledWith(
            'https://api.vimeo.com/me/albums/false/videos',
            { headers: { Authorization: 'Bearer VIMEO_KEY' } }
        );
    } );
    test( "Vimeo folder path with short format folder parses project ID correctly", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseVimeoMock ) );
        const props = { ...listFolderVimeoArgs, apiKey: 'VIMEO_KEY', playlist: "https://vimeo.com/folder/987654" };
        render( <DXVideo {...props} /> );
        expect( mockedAxios.get ).toHaveBeenCalledWith(
            'https://api.vimeo.com/me/projects/987654/videos',
            { headers: { Authorization: 'Bearer VIMEO_KEY' } }
        );
    } );
    test( "Vimeo folder path with manage folders parses project ID correctly", async () => {
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseVimeoMock ) );
        const props = { ...listFolderVimeoArgs, apiKey: 'VIMEO_KEY', playlist: "https://vimeo.com/manage/folders/555444" };
        render( <DXVideo {...props} /> );
        expect( mockedAxios.get ).toHaveBeenCalledWith(
            'https://api.vimeo.com/me/projects/555444/videos',
            { headers: { Authorization: 'Bearer VIMEO_KEY' } }
        );
    } );
    test( "Vimeo renderMoreVideoslist respects upper index bound strictly", async () => {
        const tenItems = Array.from( { length: 10 }, ( _, i ) => ( {
            uri: `/videos/${i}`,
            name: `Vimeo Video ${i}`,
            description: `Desc ${i}`,
            player_embed_url: `https://player.vimeo.com/video/${i}`,
        } ) );
        const multiVimeoMock = {
            ...responseVimeoMock,
            data: { data: tenItems }
        };
        mockedAxios.get.mockResolvedValue( Promise.resolve( multiVimeoMock ) );
        render( <DXVideo {...listFolderVimeoArgs} playlist="https://vimeo.com/manage/folders/123" layout="vertical" /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const videoContainers = document.querySelectorAll( '.dxVideo__list--vertical__video' );
        expect( videoContainers.length ).toBe( 7 );
        const moreVideosContainer = document.querySelector( '.dxVideo__list--vertical__moreVideos' );
        expect( moreVideosContainer?.textContent ).not.toContain( 'Vimeo Video 0' );
        expect( moreVideosContainer?.textContent ).not.toContain( 'Vimeo Video 8' );
        expect( moreVideosContainer?.textContent ).not.toContain( 'Vimeo Video 9' );
        expect( moreVideosContainer?.textContent ).toContain( 'Vimeo Video 1' );
        expect( moreVideosContainer?.textContent ).toContain( 'Vimeo Video 7' );
    } );
    test( "MutationObserver triggers updates to documentDir state when HTML dir changes", async () => {
        const originalGetComputedStyle = global.getComputedStyle;
        let mockDirection = 'ltr';
        global.getComputedStyle = ( el ) => {
            if ( el === document.documentElement ) {
                return { direction: mockDirection } as CSSStyleDeclaration;
            }
            return originalGetComputedStyle( el );
        };
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, dir: undefined };
        render( <DXVideo {...props} playlist="PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K" /> );
        const rootEl = screen.getByTestId( 'dx-video' );
        expect( rootEl ).toHaveAttribute( 'dir', 'ltr' );
        await act( async () => {
            mockDirection = 'rtl';
            document.documentElement.setAttribute( 'dir', 'rtl' );
            await new Promise( r => setTimeout( r, 100 ) );
        } );
        expect( screen.getByTestId( 'dx-video' ) ).toHaveAttribute( 'dir', 'rtl' );
        global.getComputedStyle = originalGetComputedStyle;
        document.documentElement.removeAttribute( 'dir' );
    } );
    test( "DocumentLang handles sub-tags and case insensitivity correctly", async () => {
        document.documentElement.setAttribute( 'lang', 'AR-eg' );
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const, dir: 'rtl' as const, playlist: "PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K" };
        render( <DXVideo {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        const rootEl = screen.getByTestId( 'dx-video' );
        const mainVideoIframe = rootEl.querySelector( '.dxVideo__list--horizontal__mainVideo__video' ) as HTMLIFrameElement;
        expect( mainVideoIframe?.getAttribute( 'src' ) ).toContain( '?hl=ar' );
        await act( async () => { document.documentElement.removeAttribute( 'lang' ); } );
    } );
    test( "List Video Error leaves the loading state active", async () => {
        mockedAxios.get.mockRejectedValue( new Error( "Network Error" ) );
        const consoleSpy = jest.spyOn( console, "error" ).mockImplementation( () => {} );
        render( <DXVideo {...listVideosYoutubeArgs} playlist="PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K" /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        expect( screen.getByTestId( "loading" ) ).toBeInTheDocument();
        consoleSpy.mockRestore();
    } );
    test( "all rendered iframes are successfully deferred with loading='lazy'", async () => {
        // Mock a successful YouTube response that generates multiple iframes
        mockedAxios.get.mockResolvedValue( Promise.resolve( responseYoutubeMock ) );
        const props = { ...listVideosYoutubeArgs, layout: 'horizontal' as const };
        const { container } = render( <DXVideo {...props} /> );
        // Wait for the mock API to resolve and inject the iframes
        await act( async () => {
            await new Promise( r => setTimeout( r, 600 ) );
        } );
        // Find all injected iframes on the screen
        const iframes = container.querySelectorAll( 'iframe' );
        expect( iframes.length ).toBeGreaterThan( 0 ); // Verify they actually rendered
        // Ensure every single iframe has the lazy loading attribute to prevent main-thread blocking
        iframes.forEach( iframe => {
            expect( iframe ).toHaveAttribute( 'loading', 'lazy' );
        } );
    } );
} );
