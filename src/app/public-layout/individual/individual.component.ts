import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Person } from '../shared/form';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnDestroy, OnInit {

  active: any = 'ind';
  left_text!: string;

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router, private direct: ActivatedRoute, 
    private authService: AuthService, private http: HttpClient) {
    this.direct.paramMap.subscribe(params => {
      if (params.get('id') === '' || params.get('id') === undefined || params.get('id') === null) {
        this.active = 'ind'
        this.left_text = "Tax Registration of Individuals"
      }
      else if  (params.get('id') == 'non') {
        this.active = 'com';
        this.left_text = "Tax Registration of Business"

      }
      else if  (params.get('id') == 'ind') {
        this.active = 'ind';
        this.left_text = "Tax Registration of Individuals"
      }
      else {
        this.active = 'ind';
        this.left_text = "Tax Registration of Individuals"
      }
      
    })
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.datas = Person;
    // this.http.get<any[]>('data/data.json')
    //   .subscribe((data: any) => {
    //     this.persons = (data as any).data;
    //     // Calling the DT trigger to manually render the table
    //     this.dtTrigger.next
    //   });
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
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


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
