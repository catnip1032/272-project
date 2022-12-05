import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordModalComponent } from './password-modal/password-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private https: HttpClient,
    public dialog: MatDialog,
    ) {}

  showPasswordDialog(passwordSuccessCallback: Function, passwordSFailureCallback: Function) {
    this.dialog.open(PasswordModalComponent, {
      data: { "onSuccess": passwordSuccessCallback, "onFailure": passwordSFailureCallback}
    });
    // this.dialog.afterAllClosed.subscribe((data: any) => {
    //   dialogClosedCallback(data);
    // })
  }

  hashPassword(passwordGiven: string){
    return this.https.get(`https://api.hashify.net/hash/md5/hex?value=${passwordGiven}`)
  }
}
