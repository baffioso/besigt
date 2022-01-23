import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw-info',
  templateUrl: './draw-info.component.html',
  styleUrls: ['./draw-info.component.css']
})
export class DrawInfoComponent implements OnInit {
  @Input() properties: { [x: string]: any };

  constructor() { }

  ngOnInit() {
  }

}
