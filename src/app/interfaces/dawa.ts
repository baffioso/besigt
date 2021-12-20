export interface ReverseGeocodeResponse {
    id: string;
    vejnavn: string;
    husnr: string;
    adressebetegnelse: string;
    koordinater: [number, number];
    matrikelnr: string;
    ejerlav: {
        kode: number;
        navn: string;
    };
}
