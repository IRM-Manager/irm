import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Output() public publicsidenavToggle = new EventEmitter();

  constructor(private dialog: MatDialog, private shared: ToggleNavService, private authService: AuthService,
    private router: Router, private snackBar: MatSnackBar, private httpService: HttpService) { }

  ngOnInit(): void {
  }


  // limit(title: any, limit = 15) {
  //   if(title === undefined) {
  //     return ''
  //   }else {
  //   const newTitle: any = [];
  //   if(title.length > limit) {
  //     title.split('').reduce((acc: any, cur: any) => {
  //       if(acc + cur.length <= limit) {
  //         newTitle.push(cur);
  //       }
  //       return acc + cur.length;
  //     }, 0);
  //     return `${newTitle.join('')}...`;
  //   }
  //   return title;
  // }
  // }

  logout() {
    this.authService.logout()
    this.router.navigate([''])
  }


  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavToggle.emit();
  }  


}
