import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-private-sidenav-list',
  templateUrl: './app-private-sidenav-list.component.html',
  styleUrls: ['./app-private-sidenav-list.component.css']
})
export class AppPrivateSidenavListComponent implements OnInit {

  @Output() PrivatesidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onPrivateSidenavClose = () => {
    this.PrivatesidenavClose.emit();
  } 

}
