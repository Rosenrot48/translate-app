import {AfterContentChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DataService} from "./service/data.service";
import {MatSidenavContent} from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy{
  title = 'translate-app';

  sidenavSubscriber: any;

  @ViewChild('content') matSidenavContent: MatSidenavContent;
  topPositionToStartShowing = 30;
  isShow: boolean;
  isOpened: boolean;
  constructor(
    private dataService: DataService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('ru');
  }
  ngOnInit() {
    this.sidenavSubscriber = this.dataService.currentSidenavStatus
      .subscribe(status => {
        this.isOpened = status;
      });
  }

  ngAfterContentChecked() {
  }
  sidenavToggle() {
    this.dataService.toggleSidenav(false);
  }
  handleScroll(event) {
    (event.path[0].scrollTop >= this.topPositionToStartShowing) ? this.isShow = true : this.isShow = false;
  }

  gotoTop() {
    this.matSidenavContent.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy(): void {
  this.sidenavSubscriber.unsubscribe()
  }
}
