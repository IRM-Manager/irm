import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-vehicle-approval-review',
  templateUrl: './vehicle-approval-review.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-approval-review.component.scss'],
})
export class VehicleApprovalReviewComponent implements OnInit {
  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}
}
