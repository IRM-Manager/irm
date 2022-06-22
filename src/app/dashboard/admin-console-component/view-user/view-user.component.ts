import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdminServiceService } from '../service/admin-service.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  formData = new FormData();
  image: any;
  filename: any;
  datas: any;

  constructor(
    private sanitizer: DomSanitizer,
    private service: AdminServiceService,
    private router: Router
  ) {
    this.datas = this.service.getAdminMessage();
    if (this.datas) {
    } else {
      this.router.navigate([`/dashboard/dashboard5/admin-console`]);
    }
  }

  ngOnInit(): void {}

  edit() {
    this.router.navigate([`/dashboard/dashboard5/edit-user`]);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.formData = formData;
      this.filename = file.name;
      this.image = URL.createObjectURL(event.target.files[0]);
    }
  }

  displayImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
}
