import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.css']
})
export class AddressInfoComponent {
  @Input() properties: { [x: string]: any }

  oisUrl(properties: { [x: string]: any }): string {
    return `http://gis.frederiksberg.dk/vaerktoejer/ois-link.html?komnr=${properties.kommunekode}&ejdnr=${properties.esrejendomsnr}`
  }

  dinGeoUrl(properties: { [x: string]: any }): string {
    return `https://www.dingeo.dk/adresse/${properties.postnr}-${properties.postnrnavn}/${properties.vejnavn}-${properties.husnr}/`
  }

}
