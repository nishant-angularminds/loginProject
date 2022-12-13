import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataInfoService {
  statusSer: any = false;

  profileAvailable: any = false;

  constructor() {}

  setData(ss: any) {
    this.statusSer = ss;
  }

  getData() {
    return this.statusSer;
  }
}
