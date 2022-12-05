import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent {
  @Output() locationsEvent = new EventEmitter();

  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LocationModalComponent>)
    {}

  form: FormGroup = new FormGroup({
    locationNameControl: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
      this.locationNameValidator
    ]),
    latitudeControl: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
    longitudeControl: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
  });


  locationNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(control.value);
      var response = this.databaseService.getAllLocations();
      console.log(response);
      return response != null ? response : null;
    };
  }

  onSubmit(values: any) { // assumes everything valid
    console.log(values)
    // get list of locations from DB
    this.databaseService.getAllLocations()
    .subscribe((data: any) => {
      let newKey = Date.now().toString()
      let newLocation = 
      {
        "key": newKey,
        "data": 
        {
            "name": values.locationNameControl,
            "latitude": values.latitudeControl.toString(),
            "longitude": values.longitudeControl.toString()
        }
      }
      this.databaseService.addLocation(newLocation)
      .subscribe((newLocation: any)=> {
        // send back name of new location
        this.dialogRef.close({data: newLocation.key})
        // give feed back that it was added with an alert
        this.openSnackBar("New Location Added!", "X");
      })
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
