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

import { AccordionProps } from "../../DXAccordion/DXAccordion";
import { AppCardProps } from "../../DXAppCard/DXAppCard";
import { CardProps } from "../../DXCard/DXCard";
import { CardButtonProps } from "../../DXCardButton/DXCardButton";
import { DirectoryCardProps } from "../../DXDirectoryCard/DXDirectoryCard";
import { EventProps } from "../../DXEvent/DXEvent";
import { EventItemProps } from "../../DXEventItem/DXEventItem";
import { FullImageCardProps } from "../../DXFullImageCard/DXFullImageCard";
import { JiraTaskCardProps } from "../../DXJiraTaskCard/DXJiraTaskCard";
import { NewsCardProps } from "../../DXNewsCard/DXNewsCard";
import { ProfileCardProps } from "../../DXProfileCard/DXProfileCard";
import { ProjectCardProps } from "../../DXProjectCard/DXProjectCard";
import { SocialCardProps } from "../../DXSocialCard/DXSocialCard";
import { StraightCardProps } from "../../DXStraightCard/DXStraightCard";

export const accordionCards: AccordionProps[] = [
    {
        _search: "Label 1",
        subject: "Site use",
        label: "Label 1",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
        active: true
    },
    {
        _search: "Label 2",
        subject: "Operations",
        label: "Label 2",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 3",
        subject: "Hardware",
        label: "Label 3",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 4",
        subject: "Site use",
        label: "Label 4",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 5",
        subject: "Operations",
        label: "Label 5",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 6",
        subject: "Operations",
        label: "Label 6",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 7",
        subject: "Hardware",
        label: "Label 7",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 8",
        subject: "Hardware",
        label: "Label 8",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 9",
        subject: "Operations",
        label: "Label 9",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 10",
        subject: "Site use",
        label: "Label 10",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 11",
        subject: "Hardware",
        label: "Label 11",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 12",
        subject: "Site use",
        label: "Label 12",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 13",
        subject: "Operations",
        label: "Label 13",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 14",
        subject: "Hardware",
        label: "Label 14",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 15",
        subject: "Site use",
        label: "Label 15",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    },
    {
        _search: "Label 16",
        subject: "Operations",
        label: "Label 16",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?",
    }
];

export const basicCards: CardProps[] = [
    {
        title: {
            url: "/l-1",
            label: "Real Madrid bought a new superstar",
        },
        description: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        subject: "Sports",
        country: ["Mexico", "Peru"],
        scope: "national",
        cover: {
            url: "https://images.unsplash.com/photo-1678889284805-5c86fb1dba5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
            altText: "card-cover"
        },
        _search: "Real Madrid bought a new superstar quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        title: {
            url: "/l-2",
            label: "Guess who is the new Lover of Catherina"
        },
        description: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
        subject: "Gossip",
        country: "Mexico",
        scope: "national",
        cover: {
            url: "https://images.unsplash.com/photo-1678625994210-4c02332ec4a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
        _search: "Guess who is the new Lover of Catherina consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
    },
    {
        title: {
            url: "/l-3",
            label: "Stay Down, a really scary movie"
        },
        description: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
        subject: "Cinema",
        country: "Colombia",
        scope: "international",
        cover: {
            url: "https://images.unsplash.com/photo-1678963477436-bc9a2559fa05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
        _search: "Stay Down, a really scary movie et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
        title: {
            url: "/l-4",
            label: "A new stadium is builing downtown Bogota"
        },
        description: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        subject: "Sports",
        country: "Colombia",
        scope: "national",
        cover: {
            url: "https://images.unsplash.com/photo-1678773879525-f6a0d2470b46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
            altText: "card-cover"
        },
        _search: "A new stadium is builing downtown Bogota ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    },
    {
        title: {
            url: "/l-5",
            label: "Aware COVID in the whole Academia crew"
        },
        description: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
        subject: "Gossip",
        country: "Mexico",
        scope: "local",
        cover: {
            url: "https://images.unsplash.com/photo-1603448815301-c2ddb09fc71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            altText: "card-cover"
        },
        _search: "Aware COVID in the whole Academia crew repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    },
    {
        title: {
            url: "/l-6",
            label: "Texas Masacre reboot is making the critics talk"
        },
        description: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
        subject: "Cinema",
        country: "United States",
        scope: "local",
        cover: {
            url: "https://images.unsplash.com/photo-1679209815180-f36856a4ff77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
        _search: "Texas Masacre reboot is making the critics talk ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
    },
    {
        title: {
            url: "/l-7",
            label: "Galaxy Team reclutes Chicharito"
        },
        description: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
        subject: "Sports",
        country: "United States",
        scope: "International",
        cover: {
            url: "https://images.unsplash.com/photo-1659359156896-e0a2dc97c89d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
        _search: "Galaxy Team reclutes Chicharito dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
    },
    {
        title: {
            url: "l-8",
            label: "A new secret is behind the famous actress"
        },
        description: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
        subject: "Gossip",
        country: "Colombia",
        scope: "local",
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
        _search: "A new secret is behind the famous actress dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
    },
    {
        title: {
            url: "/l-9",
            label: "Amanecer en el Valle, very very romantic movie"
        },
        description: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
        subject: "Cinema",
        country: "Mexico",
        scope: "national",
        cover: {
            url: "https://images.unsplash.com/photo-1678509651605-f2c0fa01c49a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            altText: "card-cover"
        },
        _search: "Amanecer en el Valle, very very romantic movie consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
    },
    {
        title: {
            url: "/l-10",
            label: "Gossip around downtown, guess for what"
        },
        description: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
        subject: "Cinema",
        country: "Colombia",
        scope: "local",
        cover: {
            url: "https://images.unsplash.com/photo-1673261544592-ab37b264af40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
        _search: "Gossip around downtown, guess for what consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
    },
    {
        title: {
            url: "/l-10",
            label: "New movie premier is a complete success"
        },
        description: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
        subject: "Cinema",
        country: "Colombia",
        scope: "national",
        cover: {
            url: "https://images.unsplash.com/photo-1695323764691-7a9d17deacc2?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "card-cover"
        },
        _search: "New movie premier is a complete success consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
    },
    {
        title: {
            url: "/l-10",
            label: "Unfortunate injury for Barcelona superstar"
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus luctus accumsan tortor posuere ac ut consequat semper.",
        subject: "Sports",
        country: "Mexico",
        scope: "international",
        cover: {
            url: "https://images.unsplash.com/photo-1697609709300-d7409f2c2459?auto=format&fit=crop&q=80&w=3027&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "card-cover"
        },
        _search: "Unfortunate injury for Barcelona superstar consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
    }
];

export const appCards: AppCardProps[] = [
    {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_Messenger_NewBlurple-399x399-1.webp",
            altText: "app-facebook-messenger"
        },
        topic: "Communication",
        label: "Messenger",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Facebook Messenger Communications Comms"
    },
    {
        media: "ci-Printer",
        label: "Printer",
        topic: "Student Services",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Printer Hardware Services"
    },
    {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/b/b2/WhatsappLogo.svg",
            altText: "whatsapp application"
        },
        topic: "Communication",
        label: "Whatsapp",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Whatsapp Meta Messenger Communications Comms"
    },
    {
        media: "ci-Cookie",
        label: "Cafeteria",
        topic: "Social Services",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Cafeteria Menu Services Food"
    },
    {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Jelli_Mobile_App_Icon.jpg",
            altText: "bubblegum restaurant app"
        },
        label: "Bubblegum Cafe",
        topic: "Social Services",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Bubblegum Cafeteria Menu Services Food"
    },
    {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Logo_Cardit.png",
            altText: "student finance app"
        },
        label: "Financial Services",
        topic: "Student Services",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Financial Services Students Money Expenses"
    },
    {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Pablo_icon.png",
            altText: "student groups app"
        },
        label: "Student Groups",
        topic: "Social Services",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Students Groups Social Activities Events"
    },
    {
        media: "ci-Shopping_Cart_01",
        label: "Store",
        topic: "Social Services",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Shop Merchandise Money Official Products"
    },
    {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Autominuto.png",
            altText: "atlassian app"
        },
        label: "Atlas",
        topic: "Student Services",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Student Services Atlassian"
    },
    {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Peirang_logo_noExif.png",
            altText: "signal app"
        },
        label: "Signal",
        topic: "Communication",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Signal Messenger Communications Comms"
    },
    {
        media: "ci-Book",
        label: "Library",
        topic: "Student Services",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Library Books Student Services Academic"
    },
    {
        media: "ci-Suitcase",
        label: "Trips",
        topic: "Social Services",
        actionFn: function () { console.log( "I was triggered" ); },
        _search: "Trips Student Services Social"
    },
];

export const cardButtons: CardButtonProps[] = [
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            altText: "image-1"
        },
        topic: "Sports",
        header: "Card button title 1",
        _search: "Card button title 1 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede ",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674471361339-2e1e1dbd3e73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
            altText: "image-1"
        },
        topic: "Culture",
        header: "Card button title 2",
        _search: "Card button title 2",
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674485169641-bcb2bf6f1df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "image-1"
        },
        topic: "Culture",
        header: "Card button title 3",
        _search: "Card button title 3 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede ",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674726240969-080afce91514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
            altText: "image-1"
        },
        topic: "Lifestyle",
        header: "Card button title 4",
        _search: "Card button title 4",
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674726253061-baba094ad8c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "image-1"
        },
        topic: "Sports",
        header: "Card button title 5",
        _search: "Card button title 5 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede ",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1673100749940-d9a899cb3968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
            altText: "image-1"
        },
        topic: "Sports",
        header: "Card button title 6",
        _search: "Card button title 6 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede ",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1671790556096-2d5d288c3ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2231&q=80",
            altText: "image-1"
        },
        topic: "Lifestyle",
        header: "Card button title 7",
        _search: "Card button title 7 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede ",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1647088240248-0e3490b180de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            altText: "image-1"
        },
        topic: "Culture",
        header: "Card button title 8",
        _search: "Card button title 8",
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1668620268481-6301db1134f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            altText: "image-1"
        },
        topic: "Culture",
        header: "Card button title 9",
        _search: "Card button title 9 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede ",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1667144383665-a799f22901e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80",
            altText: "image-1"
        },
        topic: "Sports",
        header: "Card button title 10",
        _search: "Card button title 10 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede ",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1669151081280-6cad76c5e420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "image-1"
        },
        topic: "Lifestyle",
        header: "Card button title 11",
        _search: "Card button title 11 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede ",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
];

export const directoryCards: DirectoryCardProps[] = [
    {
        _search: "Human Resources Janet Kavandi",
        department: "Human Resources",
        index: 1,
        title: "Janet Kavandi",
        subtitle: {
            label: "Human Resources",
            url: "https://hcl-software.com",
        },
        email: {
            label: "janet.kavandi@hcl-software.com",
            url: "mailto:janet.kavandi@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Finance Joe Foo",
        department: "Finance",
        index: 2,
        title: "Joe Foo",
        subtitle: {
            label: "Finance",
            url: "https://hcl-software.com",
        },
        email: {
            label: "joe.foo@hcl-software.com",
            url: "mailto:joe.foo@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Development Lucas Jones",
        department: "Development",
        index: 3,
        title: "Lucas Jones",
        subtitle: {
            label: "Development",
            url: "https://hcl-software.com",
        },
        email: {
            label: "lucas.jones@hcl-software.com",
            url: "mailto:lucas.jones@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Human Resources Freddy Boo",
        department: "Human Resources",
        index: 4,
        title: "Freddy Boo",
        subtitle: {
            label: "Human Resources",
            url: "https://hcl-software.com",
        },
        email: {
            label: "freddy.boo@hcl-software.com",
            url: "mailto:freddy.boo@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Finance Jannet Banks",
        department: "Finance",
        index: 5,
        title: "Jannet Banks",
        subtitle: {
            label: "Finance",
            url: "https://hcl-software.com",
        },
        email: {
            label: "jannet.banks@hcl-software.com",
            url: "mailto:jannet.banks@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Development Gustav Brodnick",
        department: "Development",
        index: 6,
        title: "Gustav Brodnick",
        subtitle: {
            label: "Development",
            url: "https://hcl-software.com",
        },
        email: {
            label: "gustav.brodnick@hcl-software.com",
            url: "mailto:gustav.brodnick@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Finance Arthur Mcknight",
        department: "Finance",
        index: 7,
        title: "Arthur Mcknight",
        subtitle: {
            label: "Finance",
            url: "https://hcl-software.com",
        },
        email: {
            label: "arthur.mcknight@hcl-software.com",
            url: "mailto:arthur.mcknight@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Human Resources Ruth Croft",
        department: "Human Resources",
        index: 8,
        title: "Ruth Croft",
        subtitle: {
            label: "Human Resources",
            url: "https://hcl-software.com",
        },
        email: {
            label: "ruth.croft@hcl-software.com",
            url: "mailto:ruth.croft@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Human Resources Samuel Kavandi",
        department: "Human Resources",
        index: 9,
        title: "Samuel Kavandi",
        subtitle: {
            label: "Human Resources",
            url: "https://hcl-software.com",
        },
        email: {
            label: "samuel.kavandi@hcl-software.com",
            url: "mailto:samuel.kavandi@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Development Diego Salazar",
        department: "Development",
        index: 10,
        title: "Diego Salazar",
        subtitle: {
            label: "Development",
            url: "https://hcl-software.com",
        },
        email: {
            label: "diego.salazar@hcl-software.com",
            url: "mailto:diego.salazar@hcl-software.com",
            icon: "ci-Mail",
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone",
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Development Chris Robinson",
        department: "Development",
        index: 11,
        title: "Chris Robinson",
        subtitle: {
            label: "Development",
            url: "https://hcl-software.com",
        },
        email: {
            label: "chris.robinson@hcl-software.com",
            url: "mailto:chris.robinson@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    },
    {
        _search: "Development Susan Grant",
        department: "Development",
        index: 12,
        title: "Susan Grant",
        subtitle: {
            label: "Development",
            url: "https://hcl-software.com",
        },
        email: {
            label: "susan.grant@hcl-software.com",
            url: "mailto:susan.grant@hcl-software.com",
            icon: "ci-Mail"
        },
        phone: {
            label: "773-936-3804",
            url: "tel:+7739363804",
            icon: "ci-Phone"
        },
        primaryButtons: [
            {
                label: "View Profile",
                onClick: () => {}
            },
        ],
        secondaryButtons: [
            {
                label: "View in chart",
                onClick: () => {}
            },
        ]
    }
];

export const profileCards: ProfileCardProps[] = [
    {
        name: 'John Doe',
        role: 'Software Developer',
        _search: 'John Doe Software Developer',
        image: {
            url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            altText: "John Doe Profile Picture",
        },
        socialMedia: {
            socialMediaLinks: {
                twitter: {
                    target: "_blank",
                    url: "#",
                    display: true,
                },
                linkedin: {
                    target: "_blank",
                    url: "#",
                    display: true,
                }
            }
        }
    },
    {
        name: 'Jamey Spinka',
        role: 'Designer',
        _search: 'Jamey Spinka Designer',
        image: {
            url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Jamey Spinka Profile Picture",
        },
        socialMedia: {
            socialMediaLinks: {
                linkedin: {
                    target: "_blank",
                    url: "#",
                    display: true,
                }
            }
        }
    },
    {
        name: 'Mose Schamberger-Rowe',
        role: 'Software Developer',
        _search: 'Mose Schamberger-Rowe Software Developer',
        socialMedia: {
            socialMediaLinks: {
                linkedin: {
                    target: "_blank",
                    url: "#",
                    display: true,
                }
            }
        }
    },
    {
        name: 'Cleveland Mayert',
        role: 'Designer',
        _search: 'Cleveland Mayert Designer',
        image: {
            url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Cleveland Mayert Profile Picture"
        },
        socialMedia: {
            socialMediaLinks: {
                twitter: {
                    target: "_blank",
                    url: "#",
                    display: true,
                }
            }
        }
    },
    {
        name: 'Therese Spencer',
        role: 'Project Manager',
        _search: 'Therese Spencer Project Manager',
        image: {
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Therese Spencer Profile Picture",
        }
    },
    {
        name: 'Bertram Effertz',
        role: 'Designer',
        _search: 'Bertram Effertz Designer',
        image: {
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Bertram Effertz Profile Picture",
        },
        socialMedia: {
            socialMediaLinks: {
                linkedin: {
                    target: "_blank",
                    url: "#",
                    display: true,
                }
            }
        }
    },
    {
        name: 'Ambrose Bruen',
        role: 'Software Developer',
        _search: 'Ambrose Bruen Software Developer',
        image: {
            url: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Ambrose Bruen Profile Picture",
        },
        socialMedia: {
            socialMediaLinks: {
                linkedin: {
                    target: "_blank",
                    url: "#",
                    display: true,
                }
            }
        }
    },
    {
        name: 'Bill Hane',
        role: 'Software Developer',
        _search: 'Bill Hane Software Developer',
        image: {
            url: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Bill Hane Profile Picture",
        }
    },
    {
        name: 'Grayson Bruen',
        role: 'Software Developer',
        _search: 'Grayson Bruen Software Developer',
        image: {
            url: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Grayson Bruen Profile Picture",
        },
        socialMedia: {
            socialMediaLinks: {
                linkedin: {
                    target: "_blank",
                    url: "#",
                    display: true,
                }
            }
        }
    },
    {
        name: 'Tate Hansen',
        role: 'Software Developer',
        _search: 'Tate Hansen Software Developer'
    },
    {
        name: 'Madeline Schulist',
        role: 'Designer',
        _search: 'Madeline Schulist Designer',
        image: {
            url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Madeline Schulist Profile Picture",
        },
        socialMedia: {
            socialMediaLinks: {
                twitter: {
                    target: "_blank",
                    url: "#",
                    display: true,
                },
                linkedin: {
                    target: "_blank",
                    url: "#",
                    display: true,
                }
            }
        }
    },
    {
        name: 'Bertrand McGlynn',
        role: 'Project Manager',
        _search: 'Bertrand McGlynn Project Manager',
        image: {
            url: "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Bertrand McGlynn Profile Picture",
        },
        socialMedia: {
            socialMediaLinks: {
                linkedin: {
                    target: "_blank",
                    url: "#",
                    display: true,
                }
            }
        }
    }
];

export const straightCards: StraightCardProps[] = [
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Football</a>',
        title: {
            label: "Football: World Cup 2022",
            url: "/football-world-cup-2022"
        },
        entryType: "International",
        year: "2022",
        subtitle: "Latest updates and news about the upcoming World Cup in Qatar.",
        _search: "Football: World Cup 2022 Latest updates and news about the upcoming World Cup in Qatar."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Basketball</a>',
        title: {
            label: "NBA Finals 2023",
            url: "/nba-finals-2023"
        },
        entryType: "Domestic",
        year: "2023",
        subtitle: "Get the scoop on the NBA Finals showdown between top teams.",
        _search: "NBA Finals 2023 Get the scoop on the NBA Finals showdown between top teams."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Soccer</a>',
        title: {
            label: "Soccer Transfers: Summer 2023",
            url: "/soccer-transfers-summer-2023"
        },
        entryType: "International",
        year: "2023",
        subtitle: "Stay updated on player transfers in the summer transfer window.",
        _search: "Soccer Transfers: Summer 2023 Stay updated on player transfers in the summer transfer window."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Tennis</a>',
        title: {
            label: "Wimbledon 2023",
            url: "/wimbledon-2023"
        },
        entryType: "International",
        year: "2023",
        subtitle: "Follow the action at the prestigious Wimbledon tennis tournament.",
        _search: "Wimbledon 2023 Follow the action at the prestigious Wimbledon tennis tournament."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Baseball</a>',
        title: {
            label: "MLB Playoffs 2023",
            url: "/mlb-playoffs-2023"
        },
        entryType: "Domestic",
        year: "2023",
        subtitle: "Catch the excitement of the Major League Baseball playoffs this season.",
        _search: "MLB Playoffs 2023 Catch the excitement of the Major League Baseball playoffs this season."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Golf</a>',
        title: {
            label: "The Masters 2023",
            url: "/the-masters-2023"
        },
        entryType: "International",
        year: "2023",
        subtitle: "Stay tuned for the Masters Golf Tournament in 2023.",
        _search: "The Masters 2023 Stay tuned for the Masters Golf Tournament in 2023."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">MMA</a>',
        title: {
            label: "UFC 275: Title Fights",
            url: "/ufc-275-title-fights"
        },
        entryType: "International",
        year: "2022",
        subtitle: "Don't miss the UFC 275 title fights with our live coverage.",
        _search: "UFC 275: Title Fights Don't miss the UFC 275 title fights with our live coverage."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Swimming</a>',
        title: {
            label: "Olympic Trials 2024",
            url: "/olympic-trials-2024"
        },
        entryType: "International",
        year: "2024",
        subtitle: "See who qualifies for the swimming events at the 2024 Olympics.",
        _search: "Olympic Trials 2024 See who qualifies for the swimming events at the 2024 Olympics."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Hockey</a>',
        title: {
            label: "NHL Stanley Cup 2023",
            url: "/nhl-stanley-cup-2023"
        },
        entryType: "Domestic",
        year: "2023",
        subtitle: "The journey to the Stanley Cup in the NHL 2023 season.",
        _search: "NHL Stanley Cup 2023 The journey to the Stanley Cup in the NHL 2023 season."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Cricket</a>',
        title: {
            label: "Cricket World Cup 2023",
            url: "/cricket-world-cup-2023"
        },
        entryType: "International",
        year: "2023",
        subtitle: "Exciting matches and highlights from the Cricket World Cup.",
        _search: "Cricket World Cup 2023 Exciting matches and highlights from the Cricket World Cup."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Athletics</a>',
        title: {
            label: "Olympic Track and Field",
            url: "/olympic-track-and-field"
        },
        entryType: "International",
        year: "2022",
        subtitle: "Keep up with the athletic events at the upcoming Olympics.",
        _search: "Olympic Track and Field Keep up with the athletic events at the upcoming Olympics."
    },
    {
        breadcrumb: '<a href="/one">Main Folder</a> > <a href="/two">Sports</a> > <a href="/three">Cycling</a>',
        title: {
            label: "Tour de France 2023",
            url: "/tour-de-france-2023"
        },
        entryType: "International",
        year: "2023",
        subtitle: "Follow the riders in the prestigious Tour de France cycling race.",
        _search: "Tour de France 2023 Follow the riders in the prestigious Tour de France cycling race."
    }
];

export const fullImageCards: FullImageCardProps[] = [
    {
        subject: "Grammar",
        image: {
            url: "https://images.unsplash.com/photo-1565716665452-2a4e3445b378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Vocabulary Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "Vocabulary Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Grammar",
        image: {
            url: "https://images.unsplash.com/photo-1679487659816-105ae20d4ed5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "News Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "News Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Math",
        image: {
            url: "https://images.unsplash.com/photo-1679503624359-8a1841111961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Square Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "Square Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Grammar",
        image: {
            url: "https://images.unsplash.com/photo-1680484006397-64f3fcd8fc14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Dictionary Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "Dictionary Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Science",
        image: {
            url: "https://images.unsplash.com/photo-1564671546498-09a366692274?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Human body Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "Human body Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Math",
        image: {
            url: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Circle Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "News Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Math",
        image: {
            url: "https://images.unsplash.com/photo-1579106131295-dfab63d39847?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Triangle Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "News Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Science",
        image: {
            url: "https://images.unsplash.com/photo-1680631757284-617846a5ef29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1002&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Materia Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "News Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Grammar",
        image: {
            url: "https://images.unsplash.com/photo-1680267954710-5d1e0c53d5fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Dot Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "News Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Grammar",
        image: {
            url: "https://images.unsplash.com/photo-1680095297939-9435dae8bb47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Questions Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "News Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Math",
        image: {
            url: "https://images.unsplash.com/photo-1679849043239-5ecb74918e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Calculus Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "News Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
    {
        subject: "Grammar",
        image: {
            url: "https://images.unsplash.com/photo-1679946027434-c207e6130a66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1008&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Literature Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD",
        _search: "News Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
    },
];

export const eventCards: EventProps[] = [
    {
        foodServed: "coffee",
        _search: "Coffee October November Event 1 Personal",
        month: "October",
        eventFrom: "2021-10-27T19:00:00",
        eventTo: "2021-11-07T21:00:00",
        eventName: {
            label: "Event 1",
            url: "https://hcl-software.com",
            target: "_self"
        },
        variant: "river",
        eventLocation: "Interior>Level 1>145 Conference Room",
        eventTime24hrFormat: true,
        icons: {
            event: "ci-User_01"
        }
    },
    {
        foodServed: "pizza",
        _search: "Pizza October Event 2 Personal",
        month: "October",
        eventFrom: "2021-10-27T19:00:00",
        eventTo: "2021-11-07T21:00:00",
        eventName: {
            label: "Event 2",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Personal",
        variant: "river",
        eventTime24hrFormat: true,
        icons: {
            event: "ci-User_01"
        }
    },
    {
        foodServed: "hotdog",
        _search: "Hotdog Event 3 September Business",
        month: "September",
        eventFrom: "2021-09-27T19:00:00",
        eventTo: "2021-10-07T21:00:00",
        eventName: {
            label: "Event 3",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Business",
        variant: "river",
        eventLocation: "Interior>Level 1>145 Conference Room",
        eventTime24hrFormat: true,
        icons: {
            event: "ci-User_01"
        }
    },
    {
        foodServed: "cake",
        _search: "Cake Event 4 October Scholar",
        month: "October",
        eventFrom: "2021-10-27T19:00:00",
        eventTo: "2021-11-07T21:00:00",
        eventName: {
            label: "Event 4",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Scholar",
        variant: "river",
        eventTime24hrFormat: true
    },
    {
        foodServed: "coffee",
        _search: "Coffee April Event 5 Personal",
        month: "April",
        eventFrom: "2021-04-27T19:00:00",
        eventTo: "2021-06-07T21:00:00",
        eventName: {
            label: "Event 5",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Personal",
        variant: "river",
        eventLocation: "Interior>Level 1>145 Conference Room",
        eventTime24hrFormat: true,
        icons: {
            event: "ci-User_01"
        }
    },
    {
        foodServed: "pizza",
        _search: "Pizza Event 6 October Business",
        month: "October",
        eventFrom: "2021-10-27T19:00:00",
        eventTo: "2021-11-07T21:00:00",
        eventName: {
            label: "Event 6",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Business",
        variant: "river",
        eventTime24hrFormat: true,
        icons: {
            event: "ci-User_01"
        }
    },
    {
        foodServed: "pizza",
        _search: "Pizza January Event 7 Family",
        month: "January",
        eventFrom: "2021-01-27T19:00:00",
        eventTo: "2021-06-07T21:00:00",
        eventName: {
            label: "Event 7",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Family",
        variant: "river",
        eventLocation: "Interior>Level 1>145 Conference Room",
        eventTime24hrFormat: true,
        icons: {
            event: "ci-User_01"
        }
    },
    {
        foodServed: "hotdog",
        _search: "Hotdog Event 8 March Personal",
        month: "March",
        eventFrom: "2021-03-27T19:00:00",
        eventTo: "2021-05-07T21:00:00",
        eventName: {
            label: "Event 8",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Personal",
        variant: "river",
        eventTime24hrFormat: true,
        icons: {
            event: "ci-User_01"
        }
    },
    {
        foodServed: "coffee",
        _search: "Coffee October Event 9 Scholar",
        month: "October",
        eventFrom: "2021-10-27T19:00:00",
        eventTo: "2021-11-07T21:00:00",
        eventName: {
            label: "Event 9",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Scholar",
        variant: "river",
        eventTime24hrFormat: true
    },
    {
        foodServed: "hotdog",
        _search: "Hotdog October Personal Event 10",
        month: "October",
        eventFrom: "2021-10-27T19:00:00",
        eventTo: "2021-11-07T21:00:00",
        eventName: {
            label: "Event 10",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Personal",
        variant: "river",
        eventTime24hrFormat: true,
        icons: {
            event: "ci-User_01"
        }
    },
    {
        foodServed: "pizza",
        _search: "Pizza February Event 11 Scholar",
        month: "February",
        eventFrom: "2021-02-27T19:00:00",
        eventTo: "2021-11-07T21:00:00",
        eventName: {
            label: "Event 11",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Scholar",
        variant: "river",
        eventLocation: "Interior>Level 1>145 Conference Room",
        eventTime24hrFormat: true
    },
    {
        foodServed: "pizza",
        _search: "Pizza Event 12 Business January",
        month: "January",
        eventFrom: "2021-01-27T19:00:00",
        eventTo: "2021-04-07T21:00:00",
        eventName: {
            label: "Event 12",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Business",
        variant: "river",
        eventTime24hrFormat: true,
        icons: {
            event: "ci-User_01"
        }
    }
];

export const eventItemCard: EventItemProps[] = [
    {
        _search: "Fest Earth Day Official Day",
        variant: "event",
        eventDate: "4/22/23",
        month: "April",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Earth Day Fest",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        _search: "Halloween party The Halloween Horror Night",
        variant: "event",
        eventDate: "10/2/23",
        month: "October",
        dateFormat: "MM/DD/YY",
        eventStartTime: "16:30",
        eventEndTime: "21:30",
        eventName: "The Halloween Horror Night",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        _search: "water sustainability development climate health UN Water Conference",
        variant: "event",
        eventDate: "03/22/23",
        month: "March",
        dateFormat: "MM/DD/YY",
        eventStartTime: "13:00",
        eventEndTime: "14:00",
        eventName: "UN Water Conference",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        _search: "Costume Contest Supehero The Superhero Costume Contest",
        variant: "event",
        eventDate: "04/28/23",
        month: "April",
        dateFormat: "MM/DD/YY",
        eventStartTime: "10:00",
        eventEndTime: "11:00",
        eventName: "The Superhero Costume Contest",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        _search: "new champions innovation entrepreneurship society Annual Meeting of the New Champions",
        variant: "event",
        eventDate: "06/27/23",
        month: "June",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Annual Meeting of the New Champions",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        _search: "artificial intelligence governance ethics policy regulation AI Governance Summit",
        variant: "event",
        eventDate: "11/13/23",
        month: "November",
        dateFormat: "MM/DD/YY",
        eventStartTime: "16:30",
        eventEndTime: "17:30",
        eventName: "AI Governance Summit",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    }
];

export const newsCards: NewsCardProps[] = [
    {
        image: {
            url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
        },
        link: {
            label: "Press release for February 2023",
            url: "www.hcl-software.com"
        },
        date: "01/02/2023",
        month: "January",
        contentType: "PRESS RELEASE",
        _search: "PRESS RELEASE Press release for February 2023"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1675543951612-fa7a538bab16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1741&q=80"
        },
        link: {
            label: "Management events for 2023",
            url: "www.hcl-software.com"
        },
        date: "02/14/2023",
        month: "February",
        _search: "Management events for 2023"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1673101609020-4b5e203885bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
        },
        link: {
            label: "Press release for March 2023",
            url: "www.hcl-software.com"
        },
        date: "01/03/2023",
        month: "March",
        contentType: "PRESS RELEASE",
        _search: "PRESS RELEASE Press release for March 2023"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1673648955339-843515ab12fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        },
        link: {
            label: "Public revenue report for investors and general public",
            url: "www.hcl-software.com"
        },
        date: "03/21/2023",
        month: "March",
        contentType: "PRESS RELEASE",
        _search: "PRESS RELEASE Public revenue report for investors and general public"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1673101075633-1732778c8da9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
        },
        link: {
            label: "Help us make an impact in our community",
            url: "www.hcl-software.com"
        },
        date: "04/04/2023",
        month: "April",
        contentType: "CHARITY EVENT",
        _search: "CHARITY EVENT Help us make an impact in our community"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1647088240248-0e3490b180de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
        },
        link: {
            label: "A small help with big impact",
            url: "www.hcl-software.com"
        },
        date: "04/30/2023",
        month: "April",
        contentType: "SOCIAL EVENT",
        _search: "SOCIAL EVENT A small help with big impact"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1668620268481-6301db1134f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
        },
        link: {
            label: "The Press Release for the opening of our new office",
            url: "www.hcl-software.com"
        },
        date: "01/02/2024",
        month: "January",
        contentType: "PRESS RELEASE",
        _search: "PRESS RELEASE The Press Release for the opening of our new office"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1660950164971-355b1a5c127c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2564&q=80"
        },
        link: {
            label: "Management Events for 2024",
            url: "www.hcl-software.com"
        },
        date: "02/14/2024",
        month: "February",
        _search: "Management Events for 2024"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1629333727718-d72aa3e30477?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
        },
        link: {
            label: "The Press Release for March 2024",
            url: "www.hcl-software.com"
        },
        date: "01/03/2024",
        month: "January",
        contentType: "PRESS RELEASE",
        _search: "PRESS RELEASE The Press Release for March 2024"
    }
];

export const projectCards: ProjectCardProps[] = [
    {
        name: "Project Name 1",
        department: "Research and Development",
        img: {
            url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            altText: "project-image"
        },
        tags: ["Software Development", "Research and Development"],
        _search: "Project Name 1 Software Development Research and Development Janet Kavandi",
        manager: {
            name: "Janet Kavandi",
            profileLink: "/janet-kavandi",
            img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        },
        members: [
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            },
            {
                name: "Sam Wong",
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
            },
            {
                name: "Kevin Powell",
            },
            {
                name: "Laura Tobias",
            },
            {
                name: "Jen Scott",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
            },
        ],
        action: {
            label: "View project",
            icon: {
                class: "ci-Link"
            },
            onClick: () => {}
        }
    },
    {
        name: "Project Name 2",
        department: "Finance",
        img: {
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "project-image"
        },
        tags: ["Finance", "Top Management", "Budget Control"],
        _search: "Project Name 2 Finance Top Management Budget Control Sam Wong",
        manager: {
            name: "Sam Wong",
            profileLink: "#",
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
        },
        members: [
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            },
            {
                name: "Jen Scott",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
            }
        ],
        action: {
            label: "View project",
            icon: {
                class: "ci-Link"
            },
            onClick: () => {}
        }
    },
    {
        name: "Project Name 3",
        department: "Research and Development",
        img: {
            url: "https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "project-image"
        },
        tags: ["Hardware", "Research and Development"],
        _search: "Project Name 3 Hardware Research and Development Janet Kavandi",
        manager: {
            name: "Janet Kavandi",
            profileLink: "/janet-kavandi",
            img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        },
        members: [
            {
                name: "Kevin Powell",
            },
            {
                name: "Laura Tobias",
            },
            {
                name: "Jen Scott",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
            },
        ],
        action: {
            label: "View project",
            icon: {
                class: "ci-Link"
            },
            onClick: () => {}
        }
    },
    {
        name: "Project Name 4",
        department: "Human Resources",
        symbol: "HR",
        tags: ["Human Capital", "Team Development", "Human Resources"],
        _search: "Project Name 1 Human Capital Team Development Human Resources Janet Kavandi",
        manager: {
            name: "Kevin Powell",
            profileLink: "/janet-kavandi",
        },
        members: [
            {
                name: "Janet Kavandi",
                img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            },
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            },
            {
                name: "Sam Wong",
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
            },
            {
                name: "Laura Tobias",
            },
            {
                name: "Jen Scott",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
            },
        ],
        action: {
            label: "View project",
            icon: {
                class: "ci-Link"
            },
            onClick: () => {}
        }
    },
];

export const socialCards: SocialCardProps[] = [
    {
        _search: "Gallery Auttumn Travel Joel A stunning view of the fall season The Beauty of Autumn",
        title: {
            url: "www.hcl-software.com",
            label: "The Beauty of Autumn"
        },
        category: "Outdoors",
        authorText: "By Joel, 12 HOURS AGO",
        body: "A stunning view of the fall season",
        image: {
            url: "https://images.unsplash.com/photo-1543837173-6c26bc89937b?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Image alt"
        },
        sticker: {
            url: "https://images.unsplash.com/photo-1586022045315-1cdd6493045c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Sticker alt"
        },
        likes: {
            label: 138,
            onClick: () => { console.log( "Like button!" ); }
        },
        comments: {
            label: 25,
            onClick: () => { console.log( "Comment button!" ); }
        }
    },
    {
        _search: "Environment fun list article Alex Description goes here. Environment fun facts!",
        title: {
            url: "www.hcl-software.com",
            label: "Environment fun facts!"
        },
        category: "Outdoors",
        authorText: "By Alex, 2 HOURS AGO",
        body: "Description goes here.",
        image: {
            url: "https://images.unsplash.com/photo-1667312950895-306784936a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            altText: "Image alt"
        },
        sticker: {
            url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
            altText: "Sticker alt"
        },
        likes: {
            label: 68,
            onClick: () => { console.log( "Like button!" ); }
        },
        comments: {
            label: 5,
            onClick: () => { console.log( "Comment button!" ); }
        },
        type: "primary"
    },
    {
        _search: "Video vlog relax daily life Liz A peaceful stroll through the park A Walk in the Park",
        title: {
            url: "www.hcl-software.com",
            label: "A Walk in the Park"
        },
        category: "Outdoors",
        authorText: "By Liz, 30 HOURS AGO",
        body: "A peaceful stroll through the park",
        image: {
            url: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Park view"
        },
        sticker: {
            url: "https://images.unsplash.com/photo-1532703321856-d512f3613d54?q=80&w=2777&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Profile picture"
        },
        likes: {
            label: 411,
            onClick: () => { console.log( "Like button!" ); }
        },
        comments: {
            label: 58,
            onClick: () => { console.log( "Comment button!" ); }
        },
        type: "primary"
    },
    {
        _search: "Guide cookies cooking sweet dessert The Ultimate Guide to Baking Cookies Jonathan Learn how to bake the perfect cookies with our step-by-step guide.",
        title: {
            url: "www.hcl-software.com",
            label: "The Ultimate Guide to Baking Cookies"
        },
        cateogry: "Indoors",
        authorText: "By Jonathan, 1 DAY AGO",
        body: "Learn how to bake the perfect cookies with our step-by-step guide.",
        image: {
            url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Cookies"
        },
        sticker: {
            url: "https://images.unsplash.com/photo-1629782846636-775bbb3b4967?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Profile picture"
        },
        likes: {
            label: 921,
            onClick: () => { console.log( "Like button!" ); }
        },
        comments: {
            label: 20,
            onClick: () => { console.log( "Comment button!" ); }
        },
    },
    {
        _search: "Travel Vacation Best Places 2024 Trip Beach Mountains City Samantha The Best Places to Travel in 2024 Discover the top travel destinations for 2024 and start planning your next adventure.",
        title: {
            url: "www.hcl-software.com",
            label: "The Best Places to Travel in 2024"
        },
        category: "Outdoors",
        authorText: "By Samantha, 8 HOURS AGO",
        body: "Discover the top travel destinations for 2024 and start planning your next adventure.",
        image: {
            url: "https://images.unsplash.com/photo-1502301197179-65228ab57f78?q=80&w=2785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Vacation"
        },
        sticker: {
            url: "https://images.unsplash.com/photo-1607349658516-9fb46b47ce53?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Profile picture"
        },
        likes: {
            label: 12,
            onClick: () => { console.log( "Like button!" ); }
        },
        comments: {
            label: 43,
            onClick: () => { console.log( "Comment button!" ); }
        },
    },
    {
        _search: "Health Yoga Stress Relief Exercise Ivan The Benefits of Yoga for Stress Relief Discover how yoga can help you reduce stress and improve your overall well-being.",
        title: {
            url: "www.hcl-software.com",
            label: "The Benefits of Yoga for Stress Relief"
        },
        category: "Indoors",
        authorText: "By Ivan, 1 HOUR AGO",
        body: "Discover how yoga can help you reduce stress and improve your overall well-being.",
        image: {
            url: "https://images.unsplash.com/photo-1591291621164-2c6367723315?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Yoga mat"
        },
        sticker: {
            url: "https://images.unsplash.com/photo-1602520628350-fbf9db1f02ae?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Profile picture"
        },
        likes: {
            label: 10,
            onClick: () => { console.log( "Like button!" ); }
        },
        comments: {
            label: 3,
            onClick: () => { console.log( "Comment button!" ); }
        },
    },
    {
        _search: "DIY Home Decor 2024 List Tips David Spruce up your home with these easy and affordable DIY decor ideas for 2024. The Best DIY Home Decor Ideas for 2024",
        title: {
            url: "www.hcl-software.com",
            label: "The Best DIY Home Decor Ideas for 2024"
        },
        category: "Indoors",
        authorText: "By David, 9 HOURS AGO",
        body: "Spruce up your home with these easy and affordable DIY decor ideas for 2024.",
        image: {
            url: "https://images.unsplash.com/photo-1572048572872-2394404cf1f3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Home Decor"
        },
        sticker: {
            url: "https://images.unsplash.com/photo-1619380916644-8dbef3724106?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Profile picture"
        },
        likes: {
            label: 20,
            onClick: () => { console.log( "Like button!" ); }
        },
        comments: {
            label: 5,
            onClick: () => { console.log( "Comment button!" ); }
        },
    },
    {
        _search: "money electricity bill save tips How to Save Money on Your Electricity Bill Smart Living A practical article that offers some simple and effective ways to reduce your energy consumption and lower your monthly bill.",
        title: {
            url: "www.hcl-software.com",
            label: "How to Save Money on Your Electricity Bill"
        },
        category: "Indoors",
        authorText: "By Smart Living, 4 HOURS AGO",
        body: "A practical article that offers some simple and effective ways to reduce your energy consumption and lower your monthly bill.",
        image: {
            url: "https://images.unsplash.com/photo-1624953187665-7d41d0ade16e?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Savings"
        },
        sticker: {
            url: "https://images.unsplash.com/photo-1460794418188-1bb7dba2720d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Profile picture"
        },
        likes: {
            label: 53,
            onClick: () => { console.log( "Like button!" ); }
        },
        comments: {
            label: 12,
            onClick: () => { console.log( "Comment button!" ); }
        },
    },
    {
        _search: "workout playlist music Michelle The Ultimate Workout Playlist A curated selection of songs that will motivate you and keep you energized during your workout.",
        title: {
            url: "www.hcl-software.com",
            label: "The Ultimate Workout Playlist"
        },
        category: "Indoors",
        authorText: "By Michelle, 2 HOURS AGO",
        body: "A curated selection of songs that will motivate you and keep you energized during your workout.",
        image: {
            url: "https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Playlist"
        },
        sticker: {
            url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Profile picture"
        },
        likes: {
            label: 23,
            onClick: () => { console.log( "Like button!" ); }
        },
        comments: {
            label: 8,
            onClick: () => { console.log( "Comment button!" ); }
        },
    },
    {
        _search: "podcast start guide 2023 tips How to Start a Podcast PodZone A comprehensive guide for beginners who want to create their own podcast.",
        title: {
            url: "www.hcl-software.com",
            label: "How to Start a Podcast"
        },
        category: "Indoors",
        authorText: "By PodZone,  1 HOURS AGO",
        body: "A comprehensive guide for beginners who want to create their own podcast.",
        image: {
            url: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Podcast"
        },
        sticker: {
            url: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Profile picture"
        },
        likes: {
            label: 10,
            onClick: () => { console.log( "Like button!" ); }
        },
        comments: {
            label: 3,
            onClick: () => { console.log( "Comment button!" ); }
        },
    },
];

export const jiraTaskCards: JiraTaskCardProps[] = [
    {
        tasks: [
            {
                title: {
                    url: "",
                    label: "Create Workspace Spreadsheet",
                },
                id: "ID-00",
                text: "Explore Space Suit Costs models Workspace Spreadsheet",
                status: {
                    label: "In progress",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Explore Space Suit Costs models",
                },
                id: "ID-01",
                text: "Some text here",
                status: {
                    label: "done",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Calculate fuel costs for Rocket Booster",
                },
                id: "ID-14",
                text: "Some text here",
                status: {
                    label: "to do",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Work with MKT to release financial plans forecast 2021",
                },
                id: "ID-25",
                text: "Some text here",
                status: {
                    label: "to do",
                    color: "#4698FF"
                }
            }
        ],
        projectInfo: projectCards[0],
        department: "Research and Development",
        _search: "Project Name 1 Software Development Research and Development Janet Kavandi"
    },
    {
        tasks: [
            {
                title: {
                    url: "",
                    label: "Design homepage layout",
                },
                id: "ID-1234",
                text: "Create a responsive and user-friendly design for the website homepage",
                status: {
                    label: "To Do",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Implement login feature	",
                },
                id: "ID-5678",
                text: "Add authentication and authorization functionality to the web app",
                status: {
                    label: "In Progress",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Fix payment bug	",
                },
                id: "ID-9012",
                text: "Resolve the issue that causes payment failure on mobile devices",
                status: {
                    label: "Done",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Write unit tests",
                },
                id: "ID-3456",
                text: "Write and run unit tests for the codebase to ensure quality and reliability	",
                status: {
                    label: "On Hold",
                    color: "#4698FF"
                }
            }
        ],
        projectInfo: projectCards[1],
        department: "Finance",
        _search: "Project Name 2 Finance Top Management Budget Control Sam Wong"
    },
    {
        tasks: [
            {
                title: {
                    url: "",
                    label: "Update documentation",
                },
                id: "ID-7890",
                text: "Update the documentation to reflect the latest changes and features	",
                status: {
                    label: "To Do",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Refactor code",
                },
                id: "ID-2345",
                text: "Improve the code readability and performance by applying best practices",
                status: {
                    label: "In Progress",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Conduct user research",
                },
                id: "ID-6789",
                text: "Gather feedback and insights from potential users to inform design decisions",
                status: {
                    label: "Done",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Design solution implementation",
                },
                id: "ID-5635",
                text: "Design the implementation the solution should comply with",
                status: {
                    label: "Done",
                    color: "#4698FF"
                }
            },
        ],
        projectInfo: projectCards[2],
        department: "Research and Development",
        _search: "Project Name 3 Hardware Research and Development Janet Kavandi"
    },
    {
        tasks: [
            {
                title: {
                    url: "",
                    label: "Deploy to Development",
                },
                id: "ID-0123",
                text: "Deploy the latest version of the web app to the production environment",
                status: {
                    label: "On Hold",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Implement analytics dashboard",
                },
                id: "ID-2145",
                text: "From the user feedback received implement the data dashboard for the analytics page",
                status: {
                    label: "To Do",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Optimize SEO",
                },
                id: "ID-4567",
                text: "Improve the search engine optimization of the website to increase traffic and visibility",
                status: {
                    label: "To Do",
                    color: "#4698FF"
                }
            },
            {
                title: {
                    url: "",
                    label: "Integrate analytics",
                },
                id: "ID-8901",
                text: "Integrate analytics tools to track and measure user behavior and engagement",
                status: {
                    label: "In Progress",
                    color: "#4698FF"
                }
            },
        ],
        projectInfo: projectCards[3],
        department: "Human Resources",
        _search: "Project Name 1 Human Capital Team Development Human Resources Janet Kavandi"
    }
];
