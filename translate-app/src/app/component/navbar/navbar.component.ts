import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() navTitle: string;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  sidenavToggle() {
    this.dataService.toggleSidenav(true);
  }

}
