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
import DXProfileInfo, { ProfileInfoProps } from "./DXProfileInfo";

export default {
    title: "Components/General/Profile Info",
    component: DXProfileInfo,
    excludeStories: /.*Args$/,
} as Meta<typeof DXProfileInfo>;;

const Template: StoryFn<ProfileInfoProps> = ( args ) => <DXProfileInfo {...args} />;

export const ProfileInfoExpanded = Template.bind( {} );
export const ProfileInfoCollapsed = Template.bind( {} );
export const ProfileInfoNoImage = Template.bind( {} );
export const ProfileInfoChangedIcon = Template.bind( {} );


export const UserProfileExpandedArgs: ProfileInfoProps = {
    image: {
        url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        altText: "John Doe profile image"
    },
    fullName: "John Doe",
    jobTitle: "Senior Designer",
    department: "Delivery and Operations",
    location: "Monterrey N.L.",
    office: "HCL Software Office",
    email: {
        label: "jonh.doe@hcl-software.com",
        url: "mailto:jonh.doe@hcl-software.com"
    },
    phone: {
        label: "84390-938399",
        url: "tel:84390-938399"
    },
    address: "Torre Martel III, Prolongación Los Soles Poniente #200, Piso 3, Col, Valle Oriente, 66260 San Pedro Garza García, N.L.",
    primaryButton: {
        label: "Connect on Teams",
        onClick: () => console.log( "Triggered Event" )
    },
    secondaryButton: { label: "Get rewards", target: "_blank", url: "https://www.google.com" },
    socialPresence: {
        title: "View my profiles",
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
            },
            instagram: {
                display: true,
                url: "https://www.instagram.com/hcl_software/",
                target: "_blank"
            }
        }
    },
    optionalButtons: [
        {
            label: "Regular button",
            onClick: function () {
                console.log( "I was called" );
            }
        },
        {
            label: "Icon button",
            icon: {
                class: "ci-Add_Plus",
                position: "right"
            }
        }
    ],
    iframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
    editAction: function () {
        console.log( "Edit button" );
    }
};

export const UserProfileCollapsedArgs: ProfileInfoProps = {
    image: {
        url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        altText: "Paradaise"
    },
    fullName: "John Doe",
    jobTitle: "Senior Designer",
    department: "Delivery and Operations",
    email: {
        label: "jonh.doe@hcl-software.com",
        url: "mailto:jonh.doe@hcl-software.com"
    },
    phone: {
        label: "84390-938399",
        url: "tel:84390-938399"
    },
    address: "Torre Martel III, Prolongación Los Soles Poniente #200, Piso 3, Col, Valle Oriente, 66260 San Pedro Garza García, N.L.",
    primaryButton: {
        label: "Connect on Teams",
        onClick: () => console.log( "Triggered Event" )
    },
    secondaryButton: { label: "Get rewards", target: "_blank", url: "https://www.google.com" },
    socialPresence: {
        size: "small",
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            },
            linkedin: {
                display: false,
                url: "https://www.linkedin.com/company/hcltech/",
                target: "_blank"
            },
            twitter: {
                display: true,
                url: "https://x.com/HCLSoftware",
                target: "_blank"
            },
            instagram: {
                display: false,
                url: "https://www.instagram.com/hcl_software/",
                target: "_blank"
            }
        }
    },
    enableCollapsed: true
};

export const UserProfileInfoNoImageArgs: ProfileInfoProps = {
    fullName: "John Doe",
    jobTitle: "Senior Designer",
    department: "Delivery and Operations",
    location: "Monterrey N.L.",
    office: "HCL Software Office",
    email: {
        label: "jonh.doe@hcl-software.com",
        url: "mailto:jonh.doe@hcl-software.com"
    },
    phone: {
        label: "84390-938399",
        url: "tel:84390-938399"
    },
    address: "Torre Martel III, Prolongación Los Soles Poniente #200, Piso 3, Col, Valle Oriente, 66260 San Pedro Garza García, N.L.",
    primaryButton: {
        label: "Connect on Teams",
        onClick: () => console.log( "Triggered Event" )
    },
    secondaryButton: { label: "Get rewards", target: "_blank", url: "https://www.google.com" },
    socialPresence: {
        title: "View my profiles",
        size: "small",
        socialMediaLinks: {
            facebook: {
                display: true,
                url: "https://www.facebook.com/HCLSW",
                target: "_blank"
            },
            linkedin: {
                display: false,
                url: "https://www.linkedin.com/company/hcltech/",
                target: "_blank"
            },
            twitter: {
                display: true,
                url: "https://x.com/HCLSoftware",
                target: "_blank"
            },
            instagram: {
                display: false,
                url: "https://www.instagram.com/hcl_software/",
                target: "_blank"
            }
        }
    }
};

ProfileInfoExpanded.args = UserProfileExpandedArgs;
ProfileInfoCollapsed.args = UserProfileCollapsedArgs;
ProfileInfoNoImage.args = UserProfileInfoNoImageArgs;
ProfileInfoChangedIcon.args = {
    ...UserProfileExpandedArgs,
    enableCollapsed: true,
    icons: {
        toggle: "ci-Arrow_Down_SM",
        edit: "ci-Edit_Pencil_01"
    }
};
