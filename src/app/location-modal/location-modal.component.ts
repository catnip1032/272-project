import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { ReportLocation } from "../models/report-location"
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent {

  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LocationModalComponent>,
  ){}

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
      // this.locationLatLongValidator
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

  // TODO: create custom validation for location name
  // locationNameValidator(control: FormControl){ 
  //   var response = this.databaseService.getAllLocations();
  //   console.log(response);
  //   // var locations: ReportLocation[] = [];
  //   // 434325: { name: Surrey, lat: 42.343, long: -121.3 }
  //   // var names: string[] = [];
  //   // locations.forEach(location => {
  //   //   names.push(location.name);
  //   // })

  //   // if (names.includes(control.value.trim())){
  //   //   return { name_error: "Location name: " + control.value.trim() + " already exists. Please enter a new location name."}; // invalid
  //   // }
  //   return null; // pass
  // }

  locationLatLongValidator(control: FormControl){
    // var locations: ReportLocation[] = this.databaseService.getAllLocations();
    // // 434325: { name: Surrey, lat: 42.343, long: -121.3 }
    // var latLongs = [];
    // locations.forEach(location => {
    //   latLongs.push(`${location.lat},${location.long}`);
    // })

    // var formControlLatLong = this.form.get("latitudeControl")!; //TODO: check this
    // if (formControlLatLong.value != null) {
    //   let latLong = `${formControlLatLong.value},${control.value.trim()}`;
    //   if (latLongs.includes(latLong)){
    //     return { name_error: "A location with latitude and longitude: " + latLong + " already exists. Please enter a new coordinates."} // invalid
    //   }
    // }
    return null; // pass
  }

  onSubmit(values: any) { // assumes everything valid
    // // get list of locations from DB
    // var locations: ReportLocation[] = this.databaseService.getAllLocations();
    // // add to list of location in DB
    // var newLocation = this.createNewLocation(values);
    // locations.push(newLocation);
    // this.databaseService.setLocations(locations);
    // // update results on the location list selector
    // this.dialogRef.close({data: locations});
    // TODO: set the focused option on the newly created location; see if we need to

    // give feed back that it was added with an alert
    this.openSnackBar("New Location Added!", "X");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  createNewLocation(values: any) {
    var locationName = values.locationNameControl;
    var locationLatitude = values.latitudeControl;
    var locationLongitude = values.longitudeControl;

    return new ReportLocation(locationName, locationLatitude, locationLongitude);
  }
}
