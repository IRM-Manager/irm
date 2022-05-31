import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
