import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  opened: boolean;

  constructor(
    private dataService: DataService,
    private router: Router
  ) {
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
  logout() {
     if(localStorage.getItem('jwt') !== null) {
       this.opened = false;
       this.toggleSidenav();
       localStorage.removeItem('jwt');
       this.router.navigate(['/login']);
     }
  }
}
