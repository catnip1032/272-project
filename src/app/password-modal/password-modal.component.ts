import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.css']
})
export class PasswordModalComponent {
  showPasswordInput = false;
  passwordFormControl = new FormControl()
  password = "";
  
  constructor(
    public dialogRef: MatDialogRef<PasswordModalComponent>,
    private snackbar: MatSnackBar,
    private authenticationServce: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  onContinue() {
    this.showPasswordInput = true;
  }

  onClose() {
    this.data.onFailure();
    this.dialogRef.close();
  }

  onSubmitPassword() {
    var onValidPasswordCallback = () => {
      this.data.onSuccess();
    };
    this.validatePassword(this.password, onValidPasswordCallback);
  }

  validatePassword(passwordGiven: string, onValidPasswordCallback: Function) {
    let validHash = "84892b91ef3bf9d216bbc6e88d74a77c";
    this.authenticationServce.hashPassword(passwordGiven)
    .subscribe((data: any)=> {
      let givenHash = data.Digest;
      if (validHash === givenHash) {
        console.log("password hashes match");
        onValidPasswordCallback();
        this.dialogRef.close();
      } else {
        this.snackbar.open("Password Incorrect! Try Again.", "X", {
          duration: 3000
        });
      }
    });
  }
}
