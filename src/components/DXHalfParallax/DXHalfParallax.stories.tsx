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
import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXHalfParallax from "./DXHalfParallax";

export default {
    title: "Components/Home Page/Half Parallax",
    component: DXHalfParallax,
    excludeStories: /.*Args$/
} as Meta<typeof DXHalfParallax>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXHalfParallax> = ( args ) => <DXHalfParallax {...args} />;

export const Parallax = Template.bind( {} );

const topImage = "https://images.unsplash.com/photo-1659407490039-27cc03c0b4b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1037&q=80";
const mainImage = "https://images.unsplash.com/photo-1677470712233-8f74f1084e06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2777&q=80";
const regularContent = `
<p>Anchor list example:</p>
<ul>
<li><a href='wwww.duckduckgo.com'> Find out more</a></li>
<li><a href='wwww.duckduckgo.com'> Get additional information</a></li>
<li><a href='wwww.duckduckgo.com'> External resources</a></li>
<li><a href='wwww.duckduckgo.com'> Request information</a></li>
<li><a href='wwww.duckduckgo.com'> Search for resources</a></li>
<li><a href='wwww.duckduckgo.com'> Contact us</a></li>
</ul>
<p>Rich text enables addition of classes to make sure you can work with different layouts in your component.</p>
<div className="row">
    <div className="col-6">
        <p><b>Column list example</b></p>
        <ul>
            <li><a href='wwww.duckduckgo.com'> Find out more</a></li>
            <li><a href='wwww.duckduckgo.com'> Get additional information</a></li>
            <li><a href='wwww.duckduckgo.com'> External resources</a></li>
            <li><a href='wwww.duckduckgo.com'> Request information</a></li>
            <li><a href='wwww.duckduckgo.com'> Search for resources</a></li>
            <li><a href='wwww.duckduckgo.com'> Contact us</a></li>
        </ul>
    </div>
    <div className="col-6">
        <p><b>Column list example</b></p>
        <ul>
            <li><a href='wwww.duckduckgo.com'> Find out more</a></li>
            <li><a href='wwww.duckduckgo.com'> Get additional information</a></li>
            <li><a href='wwww.duckduckgo.com'> External resources</a></li>
            <li><a href='wwww.duckduckgo.com'> Request information</a></li>
            <li><a href='wwww.duckduckgo.com'> Search for resources</a></li>
            <li><a href='wwww.duckduckgo.com'> Contact us</a></li>
        </ul>
    </div>
</div>
`;

Parallax.args = {

    slidesCollection: [
        {
            banner: {
                backgroundColor: '#060503',
                fontColor: '#060503',
                topImage: {
                    url: topImage
                },
                mainImage: {
                    url: mainImage,
                    altText: 'Orchid over a table'
                },
                bottomImage: {
                    url: topImage
                },
                keypad: {
                    background: '#F4B034',
                    buttons: [
                        {
                            url: 'www.google.com',
                            label: 'Main Page'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'Other initiatives'
                        }
                    ]
                },
            },
            content: {
                title: 'Authors can play with headers and content',
                richText: '<p>As a rich text component, the body field allows full control to authors that can define headers, create links, and more. The Banner content type has three different variations: <b>Button List</b>, Multimedia and Regular Content.</p>',
                keypad: {
                    background: '#FAF5C5',
                    buttons: [
                        {
                            url: 'www.google.com',
                            label: 'Find out more'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'Get additional information'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'External resources'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'Submit'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'Sing up'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'Contact us'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'See the agenda'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'More resources'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'Request information'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'Go back'
                        }

                    ]
                },
                backgroundColor: '#F4B034',
                viewMore: {
                    label: 'View more resources',
                    url: 'www.google.com'
                }
            }
        },
        {
            banner: {
                backgroundColor: '#fff',
                mainImage: {
                    url: 'https://images.unsplash.com/photo-1592258898071-7d91ef4f869b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1917&q=80'
                },
                fontColor: '#fff',
                keypad: {
                    buttons: [
                        {
                            url: 'www.google.com',
                            label: 'Default Color Button'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'Main Page'
                        }
                    ]
                }
            },
            content: {
                title: 'Authors can play with headers',
                richText: '<p>As a rich text component, the body field allows full control to authors that can define headers, create links, and more. The Banner content type has three different variations: Button List, Multimedia and <b>Regular Content</b>.</p> ' + regularContent,
                backgroundColor: '#E8F2FF'
            }
        },
        {
            banner: {
                backgroundColor: '#fff',
                mainImage: {
                    url: 'https://images.unsplash.com/photo-1680509146565-5db56c538156?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
                },
                fontColor: '#fff',
                keypad: {
                    background: '#002554',
                    buttons: [
                        {
                            url: 'www.google.com',
                            label: 'Learn More'
                        },
                        {
                            url: 'www.duckduckgo.com',
                            label: 'Get Started'
                        }
                    ]
                }
            },
            content: {
                title: 'Authors have freedom to add different messages',
                richText: "<p style='color: white;'>As the piece of content has three different options, authors have the ability to connect different messages through this channel. For the <b>multimedia</b> option, authors can embed YouTube and Vimeo videos to the piece of content.</p> <iframe width='100%' height='315' src='https://www.youtube.com/embed/axNnKy-jfWw' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe> <p style='color: white;'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in eros quam. Integer nulla arcu, varius nec dui dictum, cursus malesuada mi. Maecenas nec pulvinar lectus, facilisis aliquet dui. Nunc id porta sapien.<p/>",
                fontColor: '#fff',
                backgroundColor: '#002554',
                viewMore: {
                    label: 'View more resources',
                    url: 'www.google.com'
                }
            }
        }

    ]
};



