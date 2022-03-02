import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-private-header',
  templateUrl: './private-header.component.html',
  styleUrls: ['./private-header.component.css']
})
export class PrivateHeaderComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  @Output() public PrivatesidenavToggle = new EventEmitter();

  @Output() public PrivateHeadersidenavToggle = new EventEmitter();


  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }


  public onPrivateToggleSidenav = () => {
    this.PrivatesidenavToggle.emit();
  }  

  public onPrivateHeaderToggleSidenav = () => {
    this.PrivateHeadersidenavToggle.emit();
  }  

}
