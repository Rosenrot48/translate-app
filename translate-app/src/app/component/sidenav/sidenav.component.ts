import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  opened: boolean;

  constructor(private dataService: DataService) {
    this.opened = false;
    this.dataService.currentSidenavStatus.subscribe( opened => {
      this.opened = opened;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dataService.toggleSidenav(false);
  }
  toggleSidenav() {
    this.dataService.toggleSidenav(false);
  }
}
