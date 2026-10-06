import React from 'react';
import "./DXPortalLogos.scss";
import { LinksProps, getLinkTarget } from '../../utilities';

export interface PortalLogosProps {
    main: LinkImage,
    secondary?: LinkImage;
}

export interface LinkImage extends LinksProps {
    imageSrc: string;
}

const DXPortalLogos = ( props: PortalLogosProps ) => {

    const renderImageLogo = ( type: any ) => {
        let typeLogo = {} as LinkImage;

        if ( type === 'main' ) {
            typeLogo = props.main;
        } else if ( type === 'secondary' ) {
            typeLogo = props.secondary as LinkImage;
        }

        return (
            <>
                {typeLogo && typeLogo.url &&
                    <div className={"dxPortalLogos__" + type}>
                        <a href={typeLogo?.url}
                            className={"dxPortalLogos__" + type + "Anchor"}
                            target={getLinkTarget( typeLogo?.target )}
                            data-testid="main-link">
                            <img
                                className={"dxPortalLogos__" + type + "Img"}
                                data-testid={typeLogo + "-logo"}
                                alt={typeLogo?.label}
                                src={typeLogo?.imageSrc} />
                        </a>
                    </div>
                }
            </>
        );
    };

    return (
        <div className={"dxPortalLogos"} data-testid="dx-portal-logos">
            {props.main && renderImageLogo( "main" )}
            {props.secondary &&
                <>
                    <span />
                    {props.secondary && renderImageLogo( "secondary" )}
                </>
            }
        </div>
    );
};

export default DXPortalLogos;
