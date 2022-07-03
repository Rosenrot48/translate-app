import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  profileFG: FormGroup;
  hasPersonInfo: boolean;
  constructor(
    private fb: FormBuilder
  ) {
    this.hasPersonInfo = false;
    this.profileFG = fb.group({
      name: [null],
      age: [null],
      numberOfWords: [null],
      studyingLanguage: [null, Validators.required]
    });
  }

  ngOnInit() {
    if (localStorage.getItem('userName') !== null && localStorage.getItem('userAge') !== null) {
      // if (localStorage.getItem('userName') !== null) {
        this.profileFG.get('name').setValue(JSON.parse(localStorage.getItem('userName')));
      // }
      // if (localStorage.getItem('userAge') !== null) {
        this.profileFG.get('age').setValue(JSON.parse(localStorage.getItem('userAge')));
      // }
        this.hasPersonInfo = true;
    }
    if (localStorage.getItem('numberOfWords') !== null) {
      this.profileFG.get('numberOfWords').setValue(JSON.parse(localStorage.getItem('numberOfWords')));
    }
    if (localStorage.getItem('studyingLanguage') !== null) {
      this.profileFG.get('studyingLanguage').setValue(JSON.parse(localStorage.getItem('studyingLanguage')));
    }
  }

  saveSettings() {
    localStorage.setItem('userName', JSON.stringify(this.profileFG.get('name').value));
    localStorage.setItem('userAge', JSON.stringify(this.profileFG.get('age').value));
    localStorage.setItem('numberOfWords', JSON.stringify(this.profileFG.get('numberOfWords').value));
    localStorage.setItem('studyingLanguage', JSON.stringify(this.profileFG.get('studyingLanguage').value));
    this.hasPersonInfo = true;
  }

}
