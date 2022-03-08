import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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

  left_text1!: string;
  left_text2!: string;
  type: any;

  constructor(private dialog: MatDialog, private shared: ToggleNavService, private authService: AuthService,
    private router: Router, private snackBar: MatSnackBar, private httpService: HttpService) {

      this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) { 
          this.currentRoute();
        }
      });

  }

  currentRoute() {
    if (this.router.url == "/dashboard/taxpayer") {
      this.type = "tax";
      this.left_text1 = "Taxpayer Registration";
      this.left_text2 = "Check all the list of registered member";
    }
    else if (this.router.url === "/dashboard/taxpayer/individual"){
      this.type = "reg_tax";
      this.left_text1 = "Individual Taxpayer Registration Form";
      this.left_text2 = "Please fill in the information";
    }
    else if (this.router.url === "/dashboard/taxpayer/business"){
      this.type = "reg_tax";
      this.left_text1 = "Non - Individual Taxpayer Registration Form";
      this.left_text2 = "Please fill in the information";
    }
    else if (this.router.url === "/dashboard"){
      this.type = "tax";
      this.left_text1 = "Dashboard";
      this.left_text2 = "Dashboard";
    }
    else {
      this.type = "tax";
      this.left_text1 = "Taxpayer Registration";
      this.left_text2 = "Check all the list of registered member";
    }
  }

  ngOnInit(): void {
  }


  limit(title: any, limit = 11) {
    if(title === undefined) {
      return ''
    }else {
    const newTitle: any = [];
    if(title.length > limit) {
      title.split('').reduce((acc: any, cur: any) => {
        if(acc + cur.length <= limit) {
          newTitle.push(cur);
        }
        return acc + cur.length;
      }, 0);
      return `${newTitle.join('')}...`;
    }
    return title;
  }
  }

  logout() {
    this.authService.logout()
    this.router.navigate([''])
  }


  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavToggle.emit();
  }  


}
