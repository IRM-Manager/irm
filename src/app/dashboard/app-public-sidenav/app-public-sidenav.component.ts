import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-app-public-sidenav',
  templateUrl: './app-public-sidenav.component.html',
  styleUrls: ['./app-public-sidenav.component.scss'],
})
export class AppPublicSidenavComponent implements OnInit {
  headeropened = false;
  windowScrolled?: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild('scroll')
  div!: ElementRef;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver //  @Inject(DOCUMENT) private document: Document
  ) {}

  handleScroll(event: any) {
    if (event.target.scrollTop > 150) {
      this.windowScrolled = true;
    } else {
      this.windowScrolled = false;
    }
  }

  // scrollToTop() {
  //   let d = <HTMLElement>document.querySelector('.mat-sidenav-content');
  //   d.scrollTo({ left: 0, top: 0, behavior: 'smooth'});
  // }

  ngOnInit(): void {
    console.log();
  }
}
