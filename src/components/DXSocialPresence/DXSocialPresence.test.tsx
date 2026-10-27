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
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import DXSocialPresence from "./DXSocialPresence";

const sizeBig = "big" as const;
const sizeSmall = "small" as const;

test( "If the user pass 'small' on the size prop, the component should have the classes of 'dxSocialPresence__container dxSocialPresence--small'", () => {
    let props = {
        size: sizeSmall,
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            },
            linkedin: {
                display: true,
                url: "https://www.linkedin.com/company/hcltech/",
                target: "_blank"
            },
            twitter: {
                display: true,
                url: "https://x.com/HCLSoftware",
                target: "_blank"
            }
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const component = getByTestId( "social-presence" );
    expect( component ).toHaveClass( "dxSocialPresence__container", "dxSocialPresence--small" );
} );

test( "If the user pass 'big' on the size prop, the component should have the classes of 'dxSocialPresence__container'", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            },
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const component = getByTestId( "social-presence" );
    expect( component ).toHaveClass( "dxSocialPresence__container" );
} );

test( "If the user does not pass a size prop, the default class will be 'dxSocialPresence__container'", () => {
    let props = {
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            },
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const component = getByTestId( "social-presence" );
    expect( component ).toHaveClass( "dxSocialPresence__container" );
} );

test( "If the user does not pass a title, it should be null", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            },
        }
    };
    const { container } = render( <DXSocialPresence {...props} /> );
    const title = container.querySelector( ".dxSocialPresence__title" );
    expect( title ).toBeNull();
} );

test( "If the user does pass a title, it should be in the document", () => {
    let props = {
        title: "Our social media",
        size: sizeBig,
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            }
        }
    };
    const { container } = render( <DXSocialPresence {...props} /> );
    const title = container.querySelector( ".dxSocialPresence__title" );
    expect( title ).toBeInTheDocument();
} );

test( "If the user pass display true for facebook inside socialMediaLinks, it should render the button", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            },
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const facebookBtn = getByTestId( "dxSocialPresence-facebook" );
    expect( facebookBtn ).toBeInTheDocument();

    const facebookIcon = facebookBtn.querySelector( "i.bi-facebook" );
    expect( facebookIcon ).toBeInTheDocument();
} );

test( "If the user pass display false for facebook inside socialMediaLinks, it should be null", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            facebook: {
                display: false,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            },
        }
    };
    const { container } = render( <DXSocialPresence {...props} /> );
    const facebookBtn = container.querySelector( '[data-testid="dxSocialPresence-facebook"]' );
    expect( facebookBtn ).toBeNull();
} );

test( "If does not pass a url for the facebook button, and click it, a console warning should appeared with the message 'ERROR: Cannot redirect to an empty URL'", async () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "",
                target: "_blank"
            }
        }
    };
    const warn = jest.spyOn( console, "warn" );
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const facebookBtn = getByTestId( "dxSocialPresence-facebook" );
    await userEvent.click( facebookBtn );
    expect( warn ).toHaveBeenCalledWith( "ERROR: Cannot redirect to an empty URL" );
    warn.mockRestore();
} );

test( "If the user pass display true for linkedin inside socialMediaLinks, it should render the button", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            linkedin: {
                display: true,
                url: "https://www.linkedin.com/company/hcltech/",
                target: "_blank"
            },
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const linkedinBtn = getByTestId( "dxSocialPresence-linkedin" );
    expect( linkedinBtn ).toBeInTheDocument();

    const linkedinIcon = linkedinBtn.querySelector( "i.bi-linkedin" );
    expect( linkedinIcon ).toBeInTheDocument();
} );

test( "If the user pass display false for linkedin inside socialMediaLinks, it should be null", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            linkedin: {
                display: false,
                url: "https://www.linkedin.com/company/hcltech/",
                target: "_blank"
            },
        }
    };
    const { container } = render( <DXSocialPresence {...props} /> );
    const linkedinBtn = container.querySelector( '[data-testid="dxSocialPresence-linkedin"]' );
    expect( linkedinBtn ).toBeNull();
} );

test( "If does not pass a url for the linkedin button, and click it, a console warning should appeared with the message 'ERROR: Cannot redirect to an empty URL'", async () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            linkedin: {
                display: true,
                url: "",
                target: "_blank"
            }
        }
    };
    const warn = jest.spyOn( console, "warn" );
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const linkedinBtn = getByTestId( "dxSocialPresence-linkedin" );
    await userEvent.click( linkedinBtn );
    expect( warn ).toHaveBeenCalledWith( "ERROR: Cannot redirect to an empty URL" );
    warn.mockRestore();
} );

test( "If the user pass display true for twitter inside socialMediaLinks, it should render the button", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            twitter: {
                display: true,
                url: "https://x.com/HCLSoftware",
                target: "_blank"
            }
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const twitterBtn = getByTestId( "dxSocialPresence-twitter" );
    expect( twitterBtn ).toBeInTheDocument();

    const twitterIcon = twitterBtn.querySelector( "i.bi-twitter-x" );
    expect( twitterIcon ).toBeInTheDocument();
} );

test( "If the user pass display false for twitter inside socialMediaLinks, it should be null", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            twitter: {
                display: false,
                url: "https://x.com/HCLSoftware",
                target: "_blank"
            }
        }
    };
    const { container } = render( <DXSocialPresence {...props} /> );
    const twitterBtn = container.querySelector( '[data-testid="dxSocialPresence-twitter"]' );
    expect( twitterBtn ).toBeNull();
} );

test( "If does not pass a url for the twitter button, and click it, a console warning should appeared with the message 'ERROR: Cannot redirect to an empty URL'", async () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            twitter: {
                display: true,
                url: "",
                target: "_blank"
            }
        }
    };
    const warn = jest.spyOn( console, "warn" );
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const twitterBtn = getByTestId( "dxSocialPresence-twitter" );
    await userEvent.click( twitterBtn );
    expect( warn ).toHaveBeenCalledWith( "ERROR: Cannot redirect to an empty URL" );
    warn.mockRestore();
} );

test( "If the user pass display true for instagram inside socialMediaLinks, it should render the button", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            instagram: {
                display: true,
                url: "https://www.instagram.com/hcl_software/",
                target: "_blank"
            }
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const instagramBtn = getByTestId( "dxSocialPresence-instagram" );
    expect( instagramBtn ).toBeInTheDocument();

    const instagramIcon = instagramBtn.querySelector( "i.bi-instagram" );
    expect( instagramIcon ).toBeInTheDocument();
} );

test( "If the user pass display false for instagram inside socialMediaLinks, it should be null", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            instagram: {
                display: false,
                url: "https://www.instagram.com/hcl_software/",
                target: "_blank"
            }
        }
    };
    const { container } = render( <DXSocialPresence {...props} /> );
    const instagramBtn = container.querySelector( '[data-testid="dxSocialPresence-instagram"]' );
    expect( instagramBtn ).toBeNull();
} );

test( "If does not pass a url for the instagram button, and click it, a console warning should appeared with the message 'ERROR: Cannot redirect to an empty URL'", async () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            instagram: {
                display: true,
                url: "",
                target: "_blank"
            }
        }
    };
    const warn = jest.spyOn( console, "warn" );
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const instagramBtn = getByTestId( "dxSocialPresence-instagram" );
    await userEvent.click( instagramBtn );
    expect( warn ).toHaveBeenCalledWith( "ERROR: Cannot redirect to an empty URL" );
    warn.mockRestore();
} );

test( "If the user pass title prop with a small size, that title should be null", () => {
    let props = {
        size: sizeSmall,
        title: "Title",
        socialMediaLinks: {
            twitter: {
                display: true,
                url: "",
                target: "_blank"
            }
        }
    };
    const { container } = render( <DXSocialPresence {...props} /> );
    const title = container.querySelector( ".dxSocialPresence__title" );
    expect( title ).toBeNull();
} );

test( "If the user pass an url to the facebook prop and clicks on the button, the window.open should be called", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            },
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const facebookBtn = getByTestId( "dxSocialPresence-facebook" );
    await userEvent.click( facebookBtn );
    expect( spyWindowOpen ).toHaveBeenCalled();
} );

test( "If the user pass an url to the linkedin prop and clicks on the button, the window.open should be called", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            linkedin: {
                display: true,
                url: "https://www.linkedin.com/company/hcltech/",
                target: "_blank"
            },
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const linkedinBtn = getByTestId( "dxSocialPresence-linkedin" );
    await userEvent.click( linkedinBtn );
    expect( spyWindowOpen ).toHaveBeenCalled();
} );

test( "If the user pass an url to the twitter prop and clicks on the button, the window.open should be called", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            twitter: {
                display: true,
                url: "https://x.com/HCLSoftware",
                target: "_blank"
            }
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const twitterBtn = getByTestId( "dxSocialPresence-twitter" );
    await userEvent.click( twitterBtn );
    expect( spyWindowOpen ).toHaveBeenCalled();
} );

test( "If the user pass an url to the instagram prop and clicks on the button, the window.open should be called", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            instagram: {
                display: true,
                url: "https://www.instagram.com/hcl_software/",
                target: "_blank"
            }
        }
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const instagramBtn = getByTestId( "dxSocialPresence-instagram" );
    await userEvent.click( instagramBtn );
    expect( spyWindowOpen ).toHaveBeenCalled();
} );

test( "If the user pass 'true' on the light prop, the component should have the color style set to var(--white)", () => {
    let props = {
        size: sizeBig,
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            },
            linkedin: {
                display: true,
                url: "https://www.linkedin.com/company/hcltech/",
                target: "_blank"
            },
            twitter: {
                display: true,
                url: "https://x.com/HCLSoftware",
                target: "_blank"
            }
        },
        light: true
    };
    const { getByTestId } = render( <DXSocialPresence {...props} /> );
    const component = getByTestId( "social-presence" );
    expect( component ).toHaveStyle( { color: "var(--white)" } );
} );
