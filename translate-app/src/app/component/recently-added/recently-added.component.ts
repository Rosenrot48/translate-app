import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewWordComponent} from "../new-word/new-word.component";
import {WordInfoComponent} from "../word-info/word-info.component";
import {MatFormField} from "@angular/material/form-field";

export interface Word {
  word: string;
  translate: string;
}


@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit, OnDestroy {
  words: Word[] = [];
  dataSource;
  displayedColumns = ['word', 'translate'];
  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    if (localStorage.getItem('studyingWords') !== null) {
      this.words = JSON.parse(localStorage.getItem('studyingWords'));
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.words);
  }
  ngOnDestroy(): void {
    this.saveToLS();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNewWord(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = null;
    dialogConfig.width = '600px';

    const dialogRef = this.dialog.open(NewWordComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('Слово не было добавлено');
          return;
        }
        const array = this.dataSource.data;
        array.push(result);
        this.dataSource.data = array;
        this.saveToLS();
      })
  }
  showInfo(item) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {word: item};
    dialogConfig.width = '600px';
    dialogConfig.disableClose = false;

    const dialogRef = this.dialog.open(WordInfoComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result  => {
    });
  }
  saveToLS() {
    localStorage.setItem('studyingWords', JSON.stringify(this.dataSource.data));
  }

}
