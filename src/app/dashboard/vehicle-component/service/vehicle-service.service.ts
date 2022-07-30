import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleServiceService {
  regMessage: string | undefined;
  setCustomerPlateReg: string | undefined;
  setPlateStatM: string | undefined;
  private subject = new Subject<any>();
  regMessage2: string | undefined;
  private subject2 = new Subject<any>();
  constructor() {}

  // for renew vehicle
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

  // for new vehicle reg
  setRegMessage2(data: any) {
    this.regMessage2 = data;
  }

  getRegMessage2() {
    return this.regMessage2;
  }

  sendClickEvent2() {
    this.subject2.next(null);
  }

  getClickEvent2(): Observable<any> {
    return this.subject2.asObservable();
  }

  // For cusomer reg plate number
  setCustomerPlateRegMessage(data: any) {
    this.setCustomerPlateReg = data;
  }

  getCustomerPlateRegMessage() {
    return this.setCustomerPlateReg;
  }

  // For plate number statistics
  setPlateStat(data: any) {
    this.setPlateStatM = data;
  }

  getPlateStat() {
    return this.setPlateStatM;
  }
}
