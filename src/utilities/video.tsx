import React from "react";

export const getVideoFormat = ( url: string, className?: string, testId?: string, videoRef?: React.RefObject<HTMLVideoElement> ) => {
    const videoRegex = /[^\/\\&\?]+\.\w{2,4}(?=([\?\/&].*$|$))/g;
    const videoExt = url.match( videoRegex );
    if ( videoExt && videoExt.length > 0 && videoExt[videoExt.length - 1].includes( ".mp4" ) ) {
        return (
            <video ref={videoRef} className={className} loop={true} autoPlay={true} playsInline={true} data-testid={testId ? testId : null}>
                <source type="video/mp4" src={url} />
            </video>
        );
    }
    if ( videoExt && videoExt.length > 0 && videoExt[videoExt.length - 1].includes( ".webm" ) ) {
        return (
            <video ref={videoRef} className={className ? className : undefined} loop={true} autoPlay={true} playsInline={true} data-testid={testId ? testId : null}>
                <source type="video/webm" src={url} />
            </video>
        );
    }
    if ( videoExt && videoExt.length > 0 && videoExt[videoExt.length - 1].includes( ".ogg" ) ) {
        return (
            <video ref={videoRef} className={className ? className : undefined} loop={true} autoPlay={true} playsInline={true} data-testid={testId ? testId : null}>
                <source type="video/ogg" src={url} />
            </video>
        );
    }
    return (
        <p>Unsopported video format passed</p>
    );
};
