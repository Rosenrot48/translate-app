import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {

  newWord: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewWordComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.newWord = fb.group({
      word: ['', Validators.required],
      translate: ['', Validators.required]
    })
  }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }
  add() {
    if (this.newWord.controls['translate'].value.length === 0) {
      return;
    }
    this.dialogRef.close({word: this.newWord.controls['word'].value, translate: this.newWord.controls['translate'].value});
  }
}
