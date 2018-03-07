import { Injectable } from '@angular/core';
import { DialogRef, DialogResult, DialogService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApsstrKendoDialogService {

  constructor(private dialogService: DialogService) { }

  confirm(): Observable<DialogResult> {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Please confirm',
      content: 'Are you sure you want to proceed?',
      actions: [
        { text: 'No' },
        { text: 'Yes', primary: true }
      ],
      width: 450,
      height: 200,
      minWidth: 250
    });
    return dialog.result;
  }

  alert(title, content): void {
    this.dialogService.open({
      title,
      content,
      actions: [
        { text: 'Ok', primary: true }
      ],
      width: 450,
      height: 200,
      minWidth: 250
    });
  }

  error(): void {
    this.alert('Ooopss!', 'Some Error has occured');
  }

}
