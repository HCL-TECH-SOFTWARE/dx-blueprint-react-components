import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXVideo, { VideoProps } from "./DXVideo";
export default {
    title: "Components/Multimedia/Video",
    component: DXVideo,
    excludeStories: /.*Args$/,
    argTypes: {
        dir: { control: 'radio', options: ['ltr', 'rtl'] }
    }
} as Meta<typeof DXVideo>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXVideo> = ( args ) => <DXVideo {...args} />;
export const demoYoutubePlaylists = Template.bind( {} );
export const demoYoutubePlaylistsRTL = Template.bind( {} );
export const demoVimeoShowcases = Template.bind( {} );
export const demoVimeoFolders = Template.bind( {} );
// You can try it with the id list on playlist too. Like 'playlist: "PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K'"
export const listVideosYoutubeArgs = {
    playlist: "https://youtube.com/playlist?list=PLlGPzfcuhqdsx40fp4G6qo0mu3WvgXw2K",
    layout: 'horizontal',
    apiKey: "AIzaSyA_wjkBNPA-S9cOkC_CJ3b0uM6mu_ZFy6A",
    service: 'youtube',
    link: { url: "https://hcl-software.com/" }
} as VideoProps;
// For VIMEO examples, videos must have the option to embed Video enabled on "Anywhere" or on specific domains (including this site) to display.
// BASE22 account vimeo and you can try it with playlist: "https://vimeo.com/manage/folders/2314585" too.
export const listFolderVimeoArgs = {
    playlist: "https://vimeo.com/user/47754478/folder/2314585",
    apiKey: "c4ec7980d8862f2d4cbc31bbd24cbb34",
    layout: 'vertical',
    service: 'vimeo',
    link: { url: "https://hcl-software.com/" }
} as VideoProps;
// User account vimeo and you can try it with playlist: "https://vimeo.com/manage/showcases/10389678/info" too.
export const showCasesVideosVimeoArgs = {
    playlist: "https://vimeo.com/showcase/10389678",
    apiKey: "2b5bd45f01260f2bdf4904c817942825",
    layout: 'vertical',
    service: 'vimeo',
    link: { url: "https://hcl-software.com/" }
} as VideoProps;
demoYoutubePlaylists.args = listVideosYoutubeArgs;
demoYoutubePlaylistsRTL.args = { ...listVideosYoutubeArgs, dir: 'rtl' } as VideoProps;
// Wrap in a dir="rtl" container so the full Storybook viewport reflects RTL layout.
demoYoutubePlaylistsRTL.decorators = [( Story: StoryFn ) => <div dir="rtl"><Story /></div>];
demoVimeoFolders.args = listFolderVimeoArgs;
demoVimeoShowcases.args = showCasesVideosVimeoArgs;
