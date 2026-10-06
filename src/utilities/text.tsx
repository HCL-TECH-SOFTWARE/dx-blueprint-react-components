export const overflowText = ( word: string, limit: number ) => {
    let ending = "...";
    if ( word.length > limit ) {
        return word.substring( 0, limit - ending.length ) + ending;
    } else {
        return word;
    }
};
