import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-language-exercises',
  templateUrl: './language-exercises.component.html',
  styleUrls: ['./language-exercises.component.css']
})
export class LanguageExercisesComponent implements OnInit {


  isFinished: boolean;
  numberOfWords: number;
  passWord = 0;
  skipWord = 0;
  trainingPair;
  words: any[] = [];
  settingsFg: FormGroup;
  trainingFG: FormGroup;
  languages: string[] = ['English', 'Russian'];
  isReadyToShow: boolean;

  constructor(
    private fb: FormBuilder
  ) {
    this.isFinished = false;
    if (localStorage.getItem('studyingWords') !== null) {
      this.words = JSON.parse(localStorage.getItem('studyingWords'));
    }
    if (localStorage.getItem('studyingLanguage') !== null && localStorage.getItem('numberOfWords') !== null) {
      this.isReadyToShow = true;
      this.updateFg();
    } else {
      this.isReadyToShow = false;
      this.settingsFg = fb.group({
        numberOfWords: [null, Validators.required],
        studyingLanguage: [null, Validators.required],
      });
    }
  }

  ngOnInit() {
    if (this.isReadyToShow) {
      this.getRandomArrayElement();
    }
  }
  toggleShow() {
    this.isReadyToShow = !this.isReadyToShow;
    localStorage.setItem('studyingLanguage', JSON.stringify(this.settingsFg.get('studyingLanguage').value));
    localStorage.setItem('numberOfWords', JSON.stringify(this.settingsFg.get('numberOfWords').value));
    this.updateFg();
    this.getRandomArrayElement();
  }

  getRandomArrayElement() {
    this.numberOfWords = JSON.parse(localStorage.getItem('numberOfWords'));
    if ((this.passWord + this.skipWord) === this.numberOfWords) {
      console.log('Вы изучили все запланированные слова');
      console.log(`Результат: ${this.passWord}/${this.numberOfWords}`);
      this.isFinished = true;
      return;
    }
    this.trainingPair = this.words[Math.floor(Math.random() * this.words.length)];
    if (this.trainingPair.word === this.trainingFG.get('word').value) {
      this.getRandomArrayElement();
    }
    this.trainingFG.get('word').setValue(this.trainingPair.word);
  }
  checkMatches() {
    if (this.trainingFG.get('translate').value.toLowerCase() === this.trainingPair.translate.toLowerCase()) {
        this.passWord++;
        this.trainingFG.get('translate').setValue('');
        this.getRandomArrayElement();
    }
  }
  skipPair() {
    this.skipWord++;
    this.getRandomArrayElement();
  }
  updateFg() {
    this.trainingFG = this.fb.group({
      word: [''],
      translate: ['']
    });
  }
}
