import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  projects$ = of([
    { title: 'Fredstoftevej', date: '2020-09-12', description: 'Jordforbedring på marken' },
    { title: 'Fanøvej', date: '2021-09-12', description: 'Støjvold langs motorvejen' },
    { title: 'Degnemosen', date: '2019-09-12', description: 'Jordforbedring på marken' },
    { title: 'Egedal', date: '2020-09-12', description: 'Jordforbedring på marken' },
    { title: 'Ballerup', date: '2020-09-12', description: 'Jordforbedring på marken' },
    { title: 'Taastrup', date: '2020-09-12', description: 'Jordforbedring på marken' },
    { title: 'Fredstoftevej', date: '2020-09-12', description: 'Jordforbedring på marken' },
    { title: 'Fanøvej', date: '2020-09-12', description: 'Støjvold langs motorvejen' },
    { title: 'Degnemosen', date: '2020-09-12', description: 'Jordforbedring på marken' },
    { title: 'Egedal', date: '2020-09-12', description: 'Jordforbedring på marken' },
    { title: 'Ballerup', date: '2020-09-12', description: 'Jordforbedring på marken' },
    { title: 'Taastrup', date: '2020-09-12', description: 'Jordforbedring på marken' },
    { title: 'Fredstoftevej', date: '2020-09-12', description: 'Jordforbedring på marken' },
  ]);

  constructor() { }

}
