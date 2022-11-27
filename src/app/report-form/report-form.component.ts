import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PigBreed, Location, InjuryLocation, PigMood } from '../interfaces';
import { LocationModalComponent } from '../location-modal/location-modal.component';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  constructor(public dialog: MatDialog) {}

  showInjurySection = false;

  form: FormGroup = new FormGroup({
    reporterNameControl: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
    reporterNumberControl: new FormControl('',[
      Validators.required,
      Validators.minLength(9),
    ]),
    pidControl: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
    breedFormControl: new FormControl('',[
      Validators.required,
    ]),
    pigInjuredControl: new FormControl(false, [
      Validators.required,
    ]),
    injuryLocationFormControl: new FormControl('N/A',[
      Validators.required,
    ]),
    injurySeverityControl: new FormControl('N/A',[
      Validators.required,
    ]),
    pigMoodFormControl: new FormControl('',[
      Validators.required,
    ]),
    locationFormControl: new FormControl('',[
      Validators.required,
    ]),
    datePickerControl: new FormControl('',[
      Validators.required,
    ]),
    extraNotesControl: new FormControl(),
  });

  pigMoods: PigMood[] = [
    {value: "confused-0", viewValue: "Confused"},
    {value: "sad-0", viewValue: "Sad"},
    {value: "happy-0", viewValue: "Happy"},
    {value: "calm-0", viewValue: "Calm"},
  ]

  injuryLocations: InjuryLocation[] = [
    {value: "head-0", viewValue: "Head"},
    {value: "neck-1", viewValue: "Neck"},
    {value: "shoulders-2", viewValue: "Shoulders"},
    {value: "frontlegs-3", viewValue: "Front Legs"},
    {value: "rearlegs-4", viewValue: "Rear Legs"},
    {value: "stomach-5", viewValue: "Stomach"},
    {value: "back-6", viewValue: "Back"},
    {value: "butt-7", viewValue: "Butt"},
    {value: "tail-8", viewValue: "Tail"},
    {value: "hooves-9", viewValue: "Hooves"},
  ];

  locations: Location[] = [];

  pigBreeds: PigBreed[] = [
    {value: "unknown-0", viewValue: "Unknown"},
    {value: 'banza-1', viewValue: 'Banza'},
    {value: 'basque-2', viewValue: 'Basque'},
    {value: 'berkshire-3', viewValue: 'Berkshire'},
    {value: 'celtic-4', viewValue: 'Celtic'},
    {value: 'chesterWhite-5', viewValue: 'ChesterWhite'},
    {value: 'duroc-6', viewValue: 'Duroc'},
    {value: 'gascon-7', viewValue: 'Gascon'},
    {value: 'hampshire-8', viewValue: 'Hampshire'},
    {value: 'kele-9', viewValue: 'Kele'},
    {value: 'landrace-10', viewValue: 'Landrace'},
    {value: 'livny-11', viewValue: 'Livny'},
    {value: 'polandChina-12', viewValue: 'PolandChina'},
    {value: 'potBellied-13', viewValue: 'PotBellied'},
    {value: 'spotted-14', viewValue: 'Spotted'},
    {value: 'welsh-14', viewValue: 'Welsh'},
    {value: 'yorkshire-14', viewValue: 'Yorkshire'},
  ];
  
  openDialog() {
    this.dialog.open(LocationModalComponent);
  }

 onInjuryToggle(toggle: MatSlideToggleChange) {
  if (this.showInjurySection && !toggle.checked) {
    this.showInjurySection = false;
  } else if (!this.showInjurySection && toggle.checked){
    this.showInjurySection = true;
  }
 }

  onSubmit(values: any) {
    
  // dateReported: Date - SET AFTER
  // status: boolean - SET AFTER

    // get values
    // create report


    console.log(values);    // TODO
  }
}
