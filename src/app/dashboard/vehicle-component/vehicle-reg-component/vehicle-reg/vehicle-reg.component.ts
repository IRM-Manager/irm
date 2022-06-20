import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-vehicle-reg',
  templateUrl: './vehicle-reg.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-reg.component.scss'],
})
export class VehicleRegComponent implements OnInit {
  viewMode = 'detail';
  constructor() {}

  ngOnInit(): void {}
}
