import {
    accordionCards,
    appCards,
    basicCards,
    cardButtons,
    directoryCards,
    eventCards,
    eventItemCard,
    fullImageCards,
    jiraTaskCards,
    newsCards,
    profileCards,
    projectCards,
    socialCards,
    straightCards,
} from "./CatalogItems";
describe( "accordionCards", () => {
    it( "has 16 items", () => {
        expect( accordionCards ).toHaveLength( 16 );
    } );
    it( "every item has a non-empty label and subject", () => {
        accordionCards.forEach( ( card ) => {
            expect( card.label ).toBeTruthy();
            expect( card.subject ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( accordionCards[0].label ).toBe( "Label 1" );
        expect( accordionCards[0].subject ).toBe( "Site use" );
        expect( accordionCards[0]._search ).toBe( "Label 1" );
        expect( accordionCards[0].active ).toBe( true );
    } );
    it( "last item has expected label", () => {
        expect( accordionCards[15].label ).toBe( "Label 16" );
    } );
} );
describe( "basicCards", () => {
    it( "has 12 items", () => {
        expect( basicCards ).toHaveLength( 12 );
    } );
    it( "every item has a non-empty subject and title label", () => {
        basicCards.forEach( ( card ) => {
            expect( card.subject ).toBeTruthy();
            expect( card.title.label ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( basicCards[0].title.label ).toBe( "Real Madrid bought a new superstar" );
        expect( basicCards[0].subject ).toBe( "Sports" );
        expect( basicCards[0].scope ).toBe( "national" );
        expect( basicCards[0].cover.altText ).toBeTruthy();
        expect( basicCards[0].title.url ).toBeTruthy();
    } );
    it( "last item has expected field values", () => {
        expect( basicCards[11].title.label ).toBe( "Unfortunate injury for Barcelona superstar" );
        expect( basicCards[11].scope ).toBe( "international" );
    } );
} );
describe( "appCards", () => {
    it( "has 12 items", () => {
        expect( appCards ).toHaveLength( 12 );
    } );
    it( "every item has a non-empty label and topic", () => {
        appCards.forEach( ( card ) => {
            expect( card.label ).toBeTruthy();
            expect( card.topic ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( appCards[0].label ).toBe( "Messenger" );
        expect( appCards[0].topic ).toBe( "Communication" );
        expect( appCards[0]._search ).toBeTruthy();
    } );
    it( "last item has expected field values", () => {
        expect( appCards[11].label ).toBe( "Trips" );
        expect( appCards[11].topic ).toBe( "Social Services" );
    } );
} );
describe( "cardButtons", () => {
    it( "has 11 items", () => {
        expect( cardButtons ).toHaveLength( 11 );
    } );
    it( "every item has a non-empty header and topic", () => {
        cardButtons.forEach( ( card ) => {
            expect( card.header ).toBeTruthy();
            expect( card.topic ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( cardButtons[0].header ).toBe( "Card button title 1" );
        expect( cardButtons[0].topic ).toBe( "Sports" );
        expect( cardButtons[0].img.altText ).toBeTruthy();
        expect( cardButtons[0].link ).toBeTruthy();
    } );
    it( "last item has expected header and topic", () => {
        expect( cardButtons[10].header ).toBe( "Card button title 11" );
        expect( cardButtons[10].topic ).toBe( "Lifestyle" );
    } );
} );
describe( "directoryCards", () => {
    it( "has 12 items", () => {
        expect( directoryCards ).toHaveLength( 12 );
    } );
    it( "every item has a non-empty title and department", () => {
        directoryCards.forEach( ( card ) => {
            expect( card.title ).toBeTruthy();
            expect( card.department ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( directoryCards[0].title ).toBe( "Janet Kavandi" );
        expect( directoryCards[0].department ).toBe( "Human Resources" );
        expect( directoryCards[0].index ).toBe( 1 );
        expect( directoryCards[0].subtitle.label ).toBe( "Human Resources" );
        expect( directoryCards[0].email.label ).toBe( "janet.kavandi@hcl-software.com" );
        expect( directoryCards[0].phone.label ).toBe( "773-936-3804" );
        expect( directoryCards[0].primaryButtons[0].label ).toBe( "View Profile" );
        expect( directoryCards[0].secondaryButtons[0].label ).toBe( "View in chart" );
    } );
    it( "second item has expected field values", () => {
        expect( directoryCards[1].title ).toBe( "Joe Foo" );
        expect( directoryCards[1].department ).toBe( "Finance" );
        expect( directoryCards[1].email.label ).toBe( "joe.foo@hcl-software.com" );
    } );
} );
describe( "profileCards", () => {
    it( "has 12 items", () => {
        expect( profileCards ).toHaveLength( 12 );
    } );
    it( "every item has a non-empty name and role", () => {
        profileCards.forEach( ( card ) => {
            expect( card.name ).toBeTruthy();
            expect( card.role ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( profileCards[0].name ).toBe( "John Doe" );
        expect( profileCards[0].role ).toBe( "Software Developer" );
        expect( profileCards[0]._search ).toBe( "John Doe Software Developer" );
        expect( profileCards[0].image?.altText ).toBe( "John Doe Profile Picture" );
    } );
    it( "first item twitter display is true", () => {
        expect( profileCards[0].socialMedia?.socialMediaLinks.twitter?.display ).toBe( true );
    } );
    it( "first item linkedin display is true", () => {
        expect( profileCards[0].socialMedia?.socialMediaLinks.linkedin?.display ).toBe( true );
    } );
    it( "last item has expected field values", () => {
        expect( profileCards[11].name ).toBe( "Bertrand McGlynn" );
        expect( profileCards[11].role ).toBe( "Project Manager" );
        expect( profileCards[11].image?.altText ).toBe( "Bertrand McGlynn Profile Picture" );
    } );
} );
describe( "straightCards", () => {
    it( "has 12 items", () => {
        expect( straightCards ).toHaveLength( 12 );
    } );
    it( "every item has a non-empty title label and entryType", () => {
        straightCards.forEach( ( card ) => {
            expect( card.title.label ).toBeTruthy();
            expect( card.entryType ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( straightCards[0].title.label ).toBe( "Football: World Cup 2022" );
        expect( straightCards[0].entryType ).toBe( "International" );
        expect( straightCards[0].year ).toBe( "2022" );
        expect( straightCards[0].subtitle ).toBeTruthy();
        expect( straightCards[0].title.url ).toBeTruthy();
    } );
    it( "second item has expected field values", () => {
        expect( straightCards[1].title.label ).toBe( "NBA Finals 2023" );
        expect( straightCards[1].entryType ).toBe( "Domestic" );
        expect( straightCards[1].year ).toBe( "2023" );
    } );
} );
describe( "fullImageCards", () => {
    it( "has 12 items", () => {
        expect( fullImageCards ).toHaveLength( 12 );
    } );
    it( "every item has a non-empty subject and image altText", () => {
        fullImageCards.forEach( ( card ) => {
            expect( card.subject ).toBeTruthy();
            expect( card.image.altText ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( fullImageCards[0].subject ).toBe( "Grammar" );
        expect( fullImageCards[0].image.altText ).toBe( "Paradaise" );
        expect( fullImageCards[0].subtitle ).toBeTruthy();
        expect( fullImageCards[0].link ).toBeTruthy();
        expect( fullImageCards[0].dateFormat ).toBeTruthy();
        expect( fullImageCards[0].description ).toBeTruthy();
    } );
} );
describe( "eventCards", () => {
    it( "has 12 items", () => {
        expect( eventCards ).toHaveLength( 12 );
    } );
    it( "every item has a non-empty month and eventName label", () => {
        eventCards.forEach( ( card ) => {
            expect( card.month ).toBeTruthy();
            expect( card.eventName.label ).toBeTruthy();
        } );
    } );
    it( "every item has eventTime24hrFormat set to true", () => {
        eventCards.forEach( ( card ) => {
            expect( card.eventTime24hrFormat ).toBe( true );
        } );
    } );
    it( "first item has expected field values", () => {
        expect( eventCards[0].foodServed ).toBe( "coffee" );
        expect( eventCards[0].month ).toBe( "October" );
        expect( eventCards[0].eventName.label ).toBe( "Event 1" );
        expect( eventCards[0].variant ).toBe( "river" );
        expect( eventCards[0].eventName.url ).toBeTruthy();
    } );
} );
describe( "eventItemCard", () => {
    it( "has 6 items", () => {
        expect( eventItemCard ).toHaveLength( 6 );
    } );
    it( "every item has a non-empty eventName and month", () => {
        eventItemCard.forEach( ( card ) => {
            expect( card.eventName ).toBeTruthy();
            expect( card.month ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( eventItemCard[0].eventName ).toBe( "Earth Day Fest" );
        expect( eventItemCard[0].month ).toBe( "April" );
        expect( eventItemCard[0].eventDate ).toBe( "4/22/23" );
        expect( eventItemCard[0].variant ).toBe( "event" );
        expect( eventItemCard[0].dateFormat ).toBe( "MM/DD/YY" );
        expect( eventItemCard[0].link.url ).toBeTruthy();
    } );
    it( "last item has expected field values", () => {
        expect( eventItemCard[5].eventName ).toBe( "AI Governance Summit" );
        expect( eventItemCard[5].month ).toBe( "November" );
    } );
} );
describe( "newsCards", () => {
    it( "has 9 items", () => {
        expect( newsCards ).toHaveLength( 9 );
    } );
    it( "every item has a non-empty link label and month", () => {
        newsCards.forEach( ( card ) => {
            expect( card.link.label ).toBeTruthy();
            expect( card.month ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( newsCards[0].link.label ).toBe( "Press release for February 2023" );
        expect( newsCards[0].month ).toBe( "January" );
        expect( newsCards[0].contentType ).toBe( "PRESS RELEASE" );
        expect( newsCards[0].date ).toBeTruthy();
        expect( newsCards[0].link.url ).toBeTruthy();
    } );
    it( "last item has expected link label", () => {
        expect( newsCards[8].link.label ).toBe( "The Press Release for March 2024" );
    } );
} );
describe( "projectCards", () => {
    it( "has 4 items", () => {
        expect( projectCards ).toHaveLength( 4 );
    } );
    it( "every item has a non-empty name and department", () => {
        projectCards.forEach( ( card ) => {
            expect( card.name ).toBeTruthy();
            expect( card.department ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( projectCards[0].name ).toBe( "Project Name 1" );
        expect( projectCards[0].department ).toBe( "Research and Development" );
        expect( projectCards[0].manager.name ).toBe( "Janet Kavandi" );
        expect( projectCards[0].manager.profileLink ).toBeTruthy();
        expect( projectCards[0].tags[0] ).toBeTruthy();
        expect( projectCards[0].action.label ).toBe( "View project" );
        expect( projectCards[0].action.icon.class ).toBe( "ci-Link" );
        expect( projectCards[0].members[0].name ).toBeTruthy();
        expect( projectCards[0].img?.altText ).toBeTruthy();
    } );
    it( "last item has expected field values", () => {
        expect( projectCards[3].name ).toBe( "Project Name 4" );
        expect( projectCards[3].department ).toBe( "Human Resources" );
        expect( projectCards[3].manager.name ).toBe( "Kevin Powell" );
    } );
} );
describe( "socialCards", () => {
    it( "has 10 items", () => {
        expect( socialCards ).toHaveLength( 10 );
    } );
    it( "every item has a non-empty title label and authorText", () => {
        socialCards.forEach( ( card ) => {
            expect( card.title.label ).toBeTruthy();
            expect( card.authorText ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( socialCards[0].title.label ).toBe( "The Beauty of Autumn" );
        expect( socialCards[0].category ).toBe( "Outdoors" );
        expect( socialCards[0].authorText ).toBe( "By Joel, 12 HOURS AGO" );
        expect( socialCards[0].body ).toBeTruthy();
        expect( socialCards[0].likes.label ).toBe( 138 );
        expect( socialCards[0].comments.label ).toBe( 25 );
        expect( socialCards[0].image.altText ).toBeTruthy();
        expect( socialCards[0].sticker.altText ).toBeTruthy();
    } );
    it( "last item has expected field values", () => {
        expect( socialCards[9].title.label ).toBe( "How to Start a Podcast" );
        expect( socialCards[9].likes.label ).toBe( 10 );
        expect( socialCards[9].comments.label ).toBe( 3 );
    } );
} );
describe( "jiraTaskCards", () => {
    it( "has 4 items", () => {
        expect( jiraTaskCards ).toHaveLength( 4 );
    } );
    it( "every item has a non-empty department and _search", () => {
        jiraTaskCards.forEach( ( card ) => {
            expect( card.department ).toBeTruthy();
            expect( card._search ).toBeTruthy();
        } );
    } );
    it( "first item has expected field values", () => {
        expect( jiraTaskCards[0].department ).toBe( "Research and Development" );
        expect( jiraTaskCards[0]._search ).toBeTruthy();
        expect( jiraTaskCards[0].tasks ).toHaveLength( 4 );
        expect( jiraTaskCards[0].tasks[0].title.label ).toBe( "Create Workspace Spreadsheet" );
        expect( jiraTaskCards[0].tasks[0].id ).toBe( "ID-00" );
        expect( jiraTaskCards[0].tasks[0].status.label ).toBe( "In progress" );
        expect( jiraTaskCards[0].tasks[0].status.color ).toBe( "#4698FF" );
    } );
    it( "last item has expected field values", () => {
        expect( jiraTaskCards[3].department ).toBe( "Human Resources" );
        expect( jiraTaskCards[3].tasks[0].id ).toBe( "ID-0123" );
    } );
} );
