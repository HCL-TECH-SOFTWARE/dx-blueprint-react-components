import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";
import DXInteractiveTabs, { InteractiveTabsProps } from "./DXInteractiveTabs";
import { eventItemsArgs } from "./DXInteractiveTabs.stories";

// Tests for empty tabs
test( "The component should render an empty view if an empty tabs array is set", () => {
    let props: InteractiveTabsProps = {
        tabs: []
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    const body = container.querySelector( ".dxEmptyState" );
    expect( body ).toBeInTheDocument();
} );

test( "If the component is rendered with an array but the array is then deleted it should render the empty view", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            { label: "Tab 1", content: {} },
            { label: "Tab 2", content: {} },
        ]
    };
    const { rerender } = render( <DXInteractiveTabs {...props} /> );

    props = {
        tabs: []
    };
    rerender( <DXInteractiveTabs {...props} /> );

    const body = document.querySelector( ".dxEmptyState" );
    expect( body ).toBeInTheDocument();
} );

// Tests for the tabs
test( "The component should render the same amount of tabs that the user pass", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            { label: "Tab 1", content: {} },
            { label: "Tab 2", content: {} },
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let tabs = container.querySelector( ".dxInteractiveTabs__tabs" )?.childNodes;
    expect( tabs ).toHaveLength( props.tabs.length );
} );

test( "If the user clicks on the second tab and it gets deleted from the array, the first one should have the class 'dxInteractiveTabs__tab--active'", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            { label: "Tab 1", content: {} },
            { label: "Tab 2", content: {} },
        ]
    };
    const { rerender } = render( <DXInteractiveTabs {...props} /> );
    let tab = document.querySelector( ".dxInteractiveTabs__tabs" )?.childNodes[1] as HTMLElement;
    await userEvent.click( tab );

    props = {
        tabs: [
            { label: "Tab 1", content: {} }
        ]
    };

    rerender( <DXInteractiveTabs {...props} /> );

    let firstTab = document.querySelector( ".dxInteractiveTabs__tabs" )?.childNodes[0];
    expect( firstTab ).toHaveClass( "dxInteractiveTabs__tab--active" );
} );

test( "On the first render the firt tab should have the class 'dxInteractiveTab__tab--active'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            { label: "Tab 1", content: {} },
            { label: "Tab 2", content: {} },
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let tab = container.querySelector( ".dxInteractiveTabs__tabs" )?.childNodes[0];
    expect( tab ).toHaveClass( "dxInteractiveTabs__tab--active" );
} );

test( "If the user clicks on the second tab, the first one should have the class 'dxInteractiveTabs__tab'", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            { label: "Tab 1", content: {} },
            { label: "Tab 2", content: {} },
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let tab = container.querySelector( ".dxInteractiveTabs__tabs" )?.childNodes[1] as HTMLElement;
    await userEvent.click( tab );
    let firstTab = container.querySelector( ".dxInteractiveTabs__tabs" )?.childNodes[0];
    expect( firstTab ).toHaveClass( "dxInteractiveTabs__tab" );
} );

test( "If the user clicks on the second tab, it should have the class 'dxInteractiveTabs__tab--active'", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            { label: "Tab 1", content: {} },
            { label: "Tab 2", content: {} },
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let tab = container.querySelector( ".dxInteractiveTabs__tabs" )?.childNodes[1] as HTMLElement;
    await userEvent.click( tab );
    let secondTab = container.querySelector( ".dxInteractiveTabs__tabs" )?.childNodes[1];
    expect( secondTab ).toHaveClass( "dxInteractiveTabs__tab--active" );
} );

// Tests fot default message on no content or info
test( "If the user does not pass any media valid prop, a message 'No valid media property was passed' should be render", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            { label: "Tab 1", content: {} },
        ]
    };
    const { getByText } = render( <DXInteractiveTabs {...props} /> );
    expect( getByText( "No valid media property was passed" ) ).toBeInTheDocument();
} );

test( "If the user does not pass any info valid prop, a message 'No valid info property was passed' should be render", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            { label: "Tab 1", content: {} },
        ]
    };
    const { getByText } = render( <DXInteractiveTabs {...props} /> );
    expect( getByText( "No valid info property was passed" ) ).toBeInTheDocument();
} );

// Tests for media
test( "If the user passes the video prop for the content, it will render the element 'iframe'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    video: {
                        url: "test",
                        title: "the title"
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let iframe = document.querySelector( ".dxInteractiveTabs__media" )?.childNodes[0] as HTMLElement;
    expect( iframe.tagName ).toEqual( "IFRAME" );
} );

test( "If the user passes the video prop for the content, it will render with the configured 'max-height'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    video: {
                        url: "test",
                        title: "the title"
                    }
                }
            }
        ],
        maxMediaHeight: "50px"
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let iframe = document.querySelector( ".dxInteractiveTabs__media" )?.childNodes[0] as HTMLElement;
    expect( iframe ).toHaveStyle( "max-height: " + props.maxMediaHeight );
} );

test( "If the user passes the image prop for the content, it will render the element 'img'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    image: {
                        url: "test",
                        altText: "the title"
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let img = document.querySelector( ".dxInteractiveTabs__media" )?.childNodes[0] as HTMLElement;
    expect( img.tagName ).toEqual( "IMG" );
} );

test( "If the user passes the image prop for the content, it will render the expected src", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    image: {
                        url: "https://images.unsplash.com/photo-1690398388394-6a57f7f4fff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                        altText: "the title"
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let img = document.querySelector( ".dxInteractiveTabs__media" )?.childNodes[0] as HTMLImageElement;
    expect( img.src ).toEqual( props.tabs[0].content.image?.url );
} );

test( "If the user passes the image prop for the content, it will render the expected alt text", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    image: {
                        url: "https://images.unsplash.com/photo-1690398388394-6a57f7f4fff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                        altText: "the title"
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let img = document.querySelector( ".dxInteractiveTabs__media" )?.childNodes[0] as HTMLImageElement;
    expect( img.alt ).toEqual( props.tabs[0].content.image?.altText );
} );

test( "If the user passes the image prop for the content, it will render the default alt text", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    image: {
                        url: "https://images.unsplash.com/photo-1690398388394-6a57f7f4fff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let img = document.querySelector( ".dxInteractiveTabs__media" )?.childNodes[0] as HTMLImageElement;
    expect( img.alt ).toEqual( "interactive-tabs-image-0" );
} );

test( "If the user passes the image prop for the content, it will render with 'max-height: auto'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    image: {
                        url: "https://images.unsplash.com/photo-1690398388394-6a57f7f4fff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let img = document.querySelector( ".dxInteractiveTabs__media" )?.childNodes[0] as HTMLImageElement;
    expect( img ).toHaveStyle( "max-height: auto" );
} );

test( "If the user passes the image prop for the content, it will render with the configured 'max-height'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    image: {
                        url: "https://images.unsplash.com/photo-1690398388394-6a57f7f4fff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    },
                }
            }
        ],
        maxMediaHeight: "50px",
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let img = document.querySelector( ".dxInteractiveTabs__media" )?.childNodes[0] as HTMLImageElement;
    expect( img ).toHaveStyle( "max-height: " + props.maxMediaHeight );
} );

test( "If the user passes the card prop for the info, it will render the element 'dxInteractiveTabs__card'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    textContent: {
                        title: "Lets Get Started!",
                        subtitle: "The first steps you want to know...",
                        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                        button: {
                            label: "Registration information",
                            onClick: function () {}
                        }
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let card = document.querySelector( ".dxInteractiveTabs__info" )?.childNodes[0] as HTMLElement;
    expect( card ).toHaveClass( "dxInteractiveTabs__card" );
} );

test( "If the user passes the accordion prop for the info, it will render the element 'dxInteractiveTabs__accordion'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    accordionCatalog: {
                        items: [
                            {
                                label: "Label 1",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                        ]
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let card = document.querySelector( ".dxInteractiveTabs__info" )?.childNodes[0] as HTMLElement;
    expect( card ).toHaveClass( "dxInteractiveTabs__accordions" );
} );

test( "If the user passes the catalog prop for the content, the element 'dxInteractiveTabs__catalog' will be rendered", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 3
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let catalog = container.querySelector( ".dxInteractiveTabs__catalog" );
    expect( catalog ).toBeInTheDocument();
} );

// Tests for the pagination
test( "If sets on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
                        paginationProps: {
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 3
                    }
                }
            }
        ]
    };

    const { getByText } = render( <DXInteractiveTabs {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "If active on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            activeSet: 6,
                        },
                        elementsPerRow: 3
                    }
                }
            }
        ]
    };

    const { getByText } = render( <DXInteractiveTabs {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "If activeSet on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                        },
                        elementsPerRow: 3
                    }
                }
            }
        ]
    };

    const { getByText } = render( <DXInteractiveTabs {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "if a valid paginationProps is passed, then it should render it", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 3
                    }
                }
            }
        ]
    };

    const { getByTestId } = render( <DXInteractiveTabs {...props} /> );
    const pagination = getByTestId( "pagination" );
    expect( pagination ).toBeInTheDocument();
} );

test( "If a number of the pagination is clicked, the active page element should not be null", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 3
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    // Click on the number 2
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[2].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber ).not.toBeNull();
} );

test( "If a number of the pagination is clicked, the active page should be 2", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 3
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    // Click on the number 2
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[2].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber?.childNodes[0].textContent ).toEqual( "2" );
} );

test( "If the right amount of events are rendered", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 3
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    const events = container.querySelectorAll( ".dxEventItem" );
    let content = props.tabs[0].content;
    expect( events ).toHaveLength( content.catalog?.paginationProps.activeSet as number );
} );

test( "If a pagination set of 5 cards is selected, it should change the amount of accordions rendered", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 3
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    const paginationSet = container.querySelector( ".pagination-items-per-page" ) as HTMLElement;
    await act( async ()=>  {
        await userEvent.click( paginationSet );
        const newOption = screen.getAllByText( /9/ )[1];
        await userEvent.click( newOption );
    });
    const accordions = container.querySelectorAll( ".dxEventItem" );
    expect( accordions ).toHaveLength( 9 );
} );

// Tests for elementsPerRow
test( "if the user does not pass elementsPerRow, the card should have the class col-lg-3", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        }
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let card = container.querySelector( ".dxInteractiveTabs__catalogCol" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "if the user passes elementsPerRow as 0, the card should have the class col-lg-3", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 0
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let card = container.querySelector( ".dxInteractiveTabs__catalogCol" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "if the user passes elementsPerRow as 1, the card should have the class col-lg-12", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 1
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let card = container.querySelector( ".dxInteractiveTabs__catalogCol" );
    expect( card ).toHaveClass( "col-lg-12" );
} );

test( "if the user passes elementsPerRow as 2, the card should have the class col-lg-6", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 2
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let card = container.querySelector( ".dxInteractiveTabs__catalogCol" );
    expect( card ).toHaveClass( "col-lg-6" );
} );

test( "if the user passes elementsPerRow as 3, the card should have the class col-lg-4", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 3
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let card = container.querySelector( ".dxInteractiveTabs__catalogCol" );
    expect( card ).toHaveClass( "col-lg-4" );
} );

test( "if the user passes elementsPerRow as 4, the card should have the class col-lg-3", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    catalog: {
                        items: eventItemsArgs,
                        paginationProps: {
                            sets: ["3", "6", "9"],
                            active: 1,
                            activeSet: 6,
                        },
                        elementsPerRow: 4
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let card = container.querySelector( ".dxInteractiveTabs__catalogCol" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

// Tests for the mediaPosition prop
test( "If the user passes right for the mediaPosition, the element 'dxInteractiveTabs__content--reversed' will be in the document", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    textContent: {
                        title: "Lets Get Started!",
                        subtitle: "The first steps you want to know...",
                        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                        button: {
                            label: "Registration information",
                            onClick: function () {}
                        }
                    }
                }
            }
        ],
        mediaPosition: "right"
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let content = container.querySelector( ".dxInteractiveTabs__content--reversed" );
    expect( content ).toBeInTheDocument();
} );

test( "If the user passes left for the mediaPosition, the element 'dxInteractiveTabs__content' will be in the document", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    textContent: {
                        title: "Lets Get Started!",
                        subtitle: "The first steps you want to know...",
                        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                        button: {
                            label: "Registration information",
                            onClick: function () {}
                        }
                    }
                }
            }
        ],
        mediaPosition: "left"
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let content = container.querySelector( ".dxInteractiveTabs__content" );
    expect( content ).toBeInTheDocument();
} );

test( "If the user passes right for the mediaPosition and a card for the info, the element 'dxInteractiveTabs__card--reversed' will be in the document", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    textContent: {
                        title: "Lets Get Started!",
                        subtitle: "The first steps you want to know...",
                        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                        button: {
                            label: "Registration information",
                            onClick: function () {}
                        }
                    }
                }
            }
        ],
        mediaPosition: "right"
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let content = container.querySelector( ".dxInteractiveTabs__card--reversed" );
    expect( content ).toBeInTheDocument();
} );

test( "If the user passes left for the mediaPosition and a card for the info, the element 'dxInteractiveTabs__card' will be in the document", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    textContent: {
                        title: "Lets Get Started!",
                        subtitle: "The first steps you want to know...",
                        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                        button: {
                            label: "Registration information",
                            onClick: function () {}
                        }
                    }
                }
            }
        ],
        mediaPosition: "left"
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let content = container.querySelector( ".dxInteractiveTabs__card" );
    expect( content ).toBeInTheDocument();
} );

test( "If the user passes right for the mediaPosition and an accordions for the info, the element 'dxInteractiveTabs__accordions--reversed' will be in the document", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    accordionCatalog: {
                        items: [
                            {
                                label: "Label 1",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                        ]
                    }
                }
            }
        ],
        mediaPosition: "right"
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let content = container.querySelector( ".dxInteractiveTabs__accordions--reversed" );
    expect( content ).toBeInTheDocument();
} );

test( "If the user passes left for the mediaPosition and an accordions for the info, the element 'dxInteractiveTabs__accordions' will be in the document", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    accordionCatalog: {
                        items: [
                            {
                                label: "Label 1",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                        ]
                    }
                }
            }
        ],
        mediaPosition: "left"
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let content = container.querySelector( ".dxInteractiveTabs__accordions" );
    expect( content ).toBeInTheDocument();
} );

// Tests for the activeIndex
test( "If the user does not pass the activeIndex prop into the accordion, the first one will have the class 'dxAccordion--display-enabled'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    accordionCatalog: {
                        items: [
                            {
                                label: "Label 1",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                        ]
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let accordions = container.querySelector( ".dxInteractiveTabs__accordions" );
    let firstOne = accordions?.childNodes[0];
    expect( firstOne ).toHaveClass( "dxAccordion--display-enabled" );
} );

test( "If the user pass the activeIndex as -1 for the accordion, none of the components will have the class 'dxAccordion--display-enabled'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    accordionCatalog: {
                        activeIndex: -1,
                        items: [
                            {
                                label: "Label 1",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                            {
                                label: "Label 2",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                            {
                                label: "Label 3",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                        ]
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let accordions = container.querySelector( ".dxInteractiveTabs__accordions" )?.childNodes;
    let flag = 0;
    accordions?.forEach( ( item ) => {
        let acc = item as HTMLElement;
        if ( !acc.classList.contains( "dxAccordion--display-enabled" ) ) {
            flag++;
        }
    } );
    expect( flag ).toBe( props.tabs[0].content.accordionCatalog?.items.length );
} );

test( "If the user pass the activeIndex as 1 for the accordion, the second component will have the class 'dxAccordion--display-enabled'", () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    accordionCatalog: {
                        activeIndex: 1,
                        items: [
                            {
                                label: "Label 1",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                            {
                                label: "Label 2",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                            {
                                label: "Label 3",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                        ]
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let accordions = container.querySelector( ".dxInteractiveTabs__accordions" )?.childNodes as NodeListOf<ChildNode>;
    let secondOne = accordions[1];
    expect( secondOne ).toHaveClass( "dxAccordion--display-enabled" );
} );

test( "If the user pass the activeIndex as 0 for the accordion on the second tab, the first component will have the class 'dxAccordion--display-enabled'", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    textContent: {
                        title: "Lets Get Started!",
                        subtitle: "The first steps you want to know...",
                        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                        button: {
                            label: "Registration information",
                            onClick: function () {}
                        }
                    }
                }
            },
            {
                label: "Tab 2",
                content: {
                    accordionCatalog: {
                        activeIndex: 0,
                        items: [
                            {
                                label: "Label 1",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                            {
                                label: "Label 2",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                            {
                                label: "Label 3",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                        ]
                    }
                }
            }
        ]
    };
    const { container } = render( <DXInteractiveTabs {...props} /> );
    let tab = container.querySelector( '.dxInteractiveTabs__tab' ) as HTMLElement;
    await userEvent.click( tab );
    let accordions = container.querySelector( ".dxInteractiveTabs__accordions" );
    let firstOne = accordions?.childNodes[0];
    expect( firstOne ).toHaveClass( "dxAccordion--display-enabled" );
} );

test( "If the user clicks on the second accordion just that one will have the class of 'dxAccordion--display-enabled'", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    accordionCatalog: {
                        items: [
                            {
                                label: "Label 1",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                            {
                                label: "Label 2",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                            {
                                label: "Label 3",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                        ]
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let accordions = container.querySelector( ".dxInteractiveTabs__accordions" )?.childNodes as NodeListOf<ChildNode>;
    let secondAccordion = accordions[1].childNodes[0].childNodes[0] as HTMLElement;
    await userEvent.click( secondAccordion );
    let newAccordions = container.querySelector( ".dxInteractiveTabs__accordions" )?.childNodes as NodeListOf<ChildNode>;
    let activeIndex = 0;
    newAccordions.forEach( ( item, pos ) => {
        let acc = item as HTMLElement;
        if ( acc.classList.contains( "dxAccordion--display-enabled" ) ) {
            activeIndex = pos;
        }
    } );
    expect( activeIndex ).toBe( 1 );
} );

test( "If the user clicks on the second accordion twice, none of the components will have the class of 'dxAccordion--display-enabled'", async () => {
    let props: InteractiveTabsProps = {
        tabs: [
            {
                label: "Tab 1",
                content: {
                    accordionCatalog: {
                        items: [
                            {
                                label: "Label 1",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                            {
                                label: "Label 2",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                            {
                                label: "Label 3",
                                body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                            },
                        ]
                    }
                }
            }
        ]
    };

    const { container } = render( <DXInteractiveTabs {...props} /> );
    let accordions = container.querySelector( ".dxInteractiveTabs__accordions" )?.childNodes as NodeListOf<ChildNode>;
    let secondAccordion = accordions[1].childNodes[0].childNodes[0] as HTMLElement;
    await userEvent.click( secondAccordion );
    await userEvent.click( secondAccordion );
    let newAccordions = container.querySelector( ".dxInteractiveTabs__accordions" )?.childNodes as NodeListOf<ChildNode>;
    let activeIndex = 0;
    newAccordions.forEach( ( item, pos ) => {
        let acc = item.childNodes[1] as HTMLElement;
        if ( acc.classList.contains( "dxAccordion--display-enabled" ) ) {
            activeIndex = pos;
        }
    } );
    expect( activeIndex ).toBe( 0 );
} );
