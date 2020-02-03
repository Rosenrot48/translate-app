import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-word-info',
  templateUrl: './word-info.component.html',
  styleUrls: ['./word-info.component.css']
})
export class WordInfoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WordInfoComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close(this.data.word);
  }

}
