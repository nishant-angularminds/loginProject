import { Component, OnInit } from '@angular/core';
import { SellerlocalstorageapiService } from '../../services/sellerlocalstorageapi.service';
import { SellerapiService } from '../../services/sellerapi.service';
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
    private localObject: SellerlocalstorageapiService,
    private apiObject: SellerapiService,
    private routerObject: Router
  ) {}

  ngOnInit(): void {

  }

  logoutData() {
    this.localObject.removeToken();
  }


}
