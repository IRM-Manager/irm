import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { AdminServiceService } from '../service/admin-service.service';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    DateAgoPipe,
  ],
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

  ngOnInit(): void {
    console.log();
  }

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
