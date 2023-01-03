import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { map, Observable, shareReplay } from 'rxjs';
import { AppPublicSidenavListComponent } from '../app-public-sidenav-list/app-public-sidenav-list.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-app-public-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    AppPublicSidenavListComponent,
    LoadingBarRouterModule,
    MatSidenavModule,
    HeaderComponent,
  ],
  templateUrl: './app-public-sidenav.component.html',
  encapsulation: ViewEncapsulation.Emulated,
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
