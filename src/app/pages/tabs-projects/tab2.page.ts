import { Component } from '@angular/core';
import { of } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  projects$ = this.storeService.projects$;

  constructor(private storeService: StoreService) { }

}
