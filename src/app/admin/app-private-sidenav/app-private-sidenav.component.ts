import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-app-private-sidenav',
  templateUrl: './app-private-sidenav.component.html',
  styleUrls: ['./app-private-sidenav.component.css']
})
export class AppPrivateSidenavComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // opened = false;
  // opened = true;

  headeropened = false;

}
