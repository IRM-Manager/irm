import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { MdaDialogComponent } from '../mda-dialog/mda-dialog.component';
import { MdaServiceService } from '../service/mda-service.service';

@Component({
  selector: 'app-mda-sidenav-list',
  templateUrl: './mda-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./mda-sidenav-list.component.scss'],
})
export class MdaSidenavListComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    public shared: ToggleNavService,
    private _location: Location,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private service: MdaServiceService
  ) {}

  payeeBack() {
    this._location.back();
  }

  routeRedirect() {
    this.onPublicHeaderToggleSidenav();
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(MdaDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  saveMda() {
    this.httpService.getAuthSingle(BaseUrl.mda_list).subscribe((data: any) => {
      this.service.setMdaMessage(data?.data);
    });
  }

  ngOnInit(): void {
    this.saveMda();
  }

  public onPublicHeaderToggleSidenav = () => {
    this.shared.sendHeaderClickEvent();
  };
}
