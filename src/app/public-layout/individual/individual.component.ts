import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {

  active: any = 'ind';

  constructor(private router: Router, private direct: ActivatedRoute) {
    this.direct.paramMap.subscribe(params => {
      if (params.get('id') === '' || params.get('id') === undefined || params.get('id') === null) {
        this.active = 'ind'
      }
      else if  (params.get('id') == 'non') {
        this.active = 'com'
      }
      else if  (params.get('id') == 'ind') {
        this.active = 'ind'
      }
      else {
        this.active = 'ind'
      }
      
    })
  }

  ngOnInit(): void {
  }

  changeActive(type: string) {
    this.active = type;
  }

  redirectActive() {
    if (this.active == 'ind') {
      this.router.navigate(['/dashboard/taxpayer/ind/individual'])
    }
    else {
      this.router.navigate(['/dashboard/taxpayer/non/business'])
    }
  }


}
