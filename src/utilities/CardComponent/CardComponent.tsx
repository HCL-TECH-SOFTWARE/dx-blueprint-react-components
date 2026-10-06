export interface CardComponent {
    _search?: string;
    index?: number;
    [x: string]: any;
}

function isCard( object: any ): object is CardComponent {
    return '_search' in object;
}
