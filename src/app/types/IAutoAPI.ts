export interface IAutoAPI {
    _id: string;
    merkNaam: string;
    land: string;
    modellen: [{
        modelNaam: string,
        PI: number,
        prijs: number,
        handling: number,
        bouwjaar: number,
        klasse: string
    }]
}

export class AutoAPI {
    _id: string;
    merkNaam: string;
    land: string;
    modellen: [{
        modelNaam: string,
        PI: number,
        prijs: number,
        handling: number,
        bouwjaar: number,
        klasse: string
    }]
}

