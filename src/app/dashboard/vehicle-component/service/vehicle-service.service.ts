import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleServiceService {
  regMessage: string | undefined;
  private subject = new Subject<any>();
  constructor() {}

  setRegMessage(data: any) {
    this.regMessage = data;
  }

  getRegMessage() {
    return this.regMessage;
  }

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
