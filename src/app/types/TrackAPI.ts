export interface ITrackAPI {
    _id: string;
    naam: string;
    land: string;
}

export class TrackAPI {
    _id: string;
    naam: string;
    land: string;

    constructor(obj: ITrackAPI) {
        Object.assign(this, obj)
    }
}





