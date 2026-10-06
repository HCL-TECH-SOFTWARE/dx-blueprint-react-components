import React, { useEffect, useRef } from "react";
import "./DXEmptyState.scss";
import DXButton from "../DXButton/DXButton";
import { IconButtonProps, ImageProps } from "../../utilities";

export interface EmptyStateProps {
    title: string;
    text?: string;
    image?: ImageProps;
    primaryButton?: IconButtonProps;
    secondaryButton?: IconButtonProps;
}
const DXEmptyState = ( props: EmptyStateProps ) => {
    const infoRef = useRef<HTMLDivElement>( null );

    useEffect( () => {
        if ( infoRef.current ) {
            infoRef.current.style.textAlign = props.image?.url ? "left" : "center";
        }
    }, [props.image?.url] );

    const renderButtons = () => {
        return (
            <>
                {
                    props.primaryButton &&
                    <DXButton
                        displayType="primary"
                        {...props.primaryButton}
                    />
                }
                {
                    props.secondaryButton &&
                    <DXButton
                        displayType="secondary"
                        {...props.secondaryButton}
                    />
                }
            </>
        );
    };

    return (
        <div className="dxEmptyState" data-testid="dxEmptyState">
            {props.image?.url &&
                <div className="dxEmptyState__image">
                    <img
                        src={props.image.url}
                        alt={props.image.altText}
                        data-testid="dxEmptyState__image"
                    />
                </div>
            }
            <div className="dxEmptyState__info" ref={infoRef}>
                <h5 data-testid="dxEmptyState__title" className="dxEmptyState__title">
                    {props.title && props.title}
                </h5>
                {
                    props.text &&
                    <p data-testid="dxEmptyState__text" className="dxEmptyState__text">
                        {props.text && props.text}
                    </p>
                }
                {
                    ( props.primaryButton || props.secondaryButton ) &&
                    <div data-testid="dxEmptyState__buttons" className="dxEmptyState__infoButtons">
                        {renderButtons()}
                    </div>
                }
            </div>
        </div>
    );
};

export default DXEmptyState;
