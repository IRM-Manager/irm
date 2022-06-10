import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

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
