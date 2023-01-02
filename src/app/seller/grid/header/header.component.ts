import { Component, OnInit } from '@angular/core';
import { LocalstorageDataService } from 'src/app/services/localstorage-data.service';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private localObject: LocalstorageDataService,
    private apiObject: ApiInfoService,
    private routerObject: Router
  ) {}

  ngOnInit(): void {

  }

  logoutData() {
    this.localObject.removeToken();
  }


}
