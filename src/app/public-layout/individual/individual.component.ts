import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {

  active: string = 'ind';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changeActive(type: string) {
    this.active = type;
  }

  redirectActive() {
    if (this.active == 'ind') {
      this.router.navigate(['/dashboard/taxpayer/individual'])
    }
    else {
      this.router.navigate(['/dashboard/taxpayer/business'])
    }
  }


}
