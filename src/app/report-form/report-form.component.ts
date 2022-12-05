import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SelectionInterface, ReportLocationSelectionInterface } from '../interfaces';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements AfterViewInit{
  @Input() showFormCard = false;
  @Output() showFormCardEvent = new EventEmitter();
  locations: ReportLocationSelectionInterface[] = [];
  selectedLocation = "";

  constructor(
    public dialog: MatDialog,
    private databaseService: DatabaseService
    ) {}

  ngAfterViewInit(): void {
    this.databaseService.getAllLocations()
    .subscribe((elements: any)=> {
      elements.forEach((element: any, index: number) => {
        let location = element.data;
        this.locations.push({
          key: element.key,
          locationName: location.name,
          latitude: location.latitude,
          longitude: location.longitude,
        });
      });
    });
  }

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
    ]),
    injurySeverityControl: new FormControl("N/A",[
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

  pigMoods: SelectionInterface[] = [
    {value: "confused-0", viewValue: "Confused"},
    {value: "sad-0", viewValue: "Sad"},
    {value: "happy-0", viewValue: "Happy"},
    {value: "calm-0", viewValue: "Calm"},
  ];

  injuryLocations: SelectionInterface[] = [
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

  pigBreeds: SelectionInterface[] = [
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
    var dialogRef = this.dialog.open(LocationModalComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      let  newLocationIndex = 0;
      // repopulate list
      this.databaseService.getAllLocations()
      .subscribe((elements: any)=> {
        this.locations = [];
        elements.forEach((element: any, index: number) => {
          let location = element.data;
          let value = location.name + "-" + index;
          let viewValue = location.name;
          this.locations.push({
            key: element.key, 
            locationName: location.name,
            latitude: location.latitude,
            longitude: location.longitude,
          });
          if (element.key == result.data) {
            newLocationIndex = index;
          }
        });
        // set the new location to the selection
        this.selectedLocation = this.locations[newLocationIndex].key;
      });
    });
  }

 onInjuryToggle(toggle: MatSlideToggleChange) {
  if (this.showInjurySection && !toggle.checked) {
    this.showInjurySection = false;
  } else if (!this.showInjurySection && toggle.checked){
    this.showInjurySection = true;
  }
 }

  onSubmit(values: any) {
    var latitude = 0;
    var longitude = 0;
    var locationName = "";
    var pigBreed = "";
    var pigInjuryLocation = "";
    var pigsMood = "";
    var dateNow = Date.now().toString();

    this.locations.forEach((location: ReportLocationSelectionInterface)=> {
      if (location.key == values.locationFormControl){
        latitude = location.latitude;
        longitude = location.longitude;
        locationName = location.locationName;
      }
    })

    this.pigBreeds.forEach((breed: SelectionInterface)=> {
      if (breed.value == values.breedFormControl){
        pigBreed = breed.viewValue;
      }
    });

    this.injuryLocations.forEach((injuryLocation: SelectionInterface)=> {
      if (injuryLocation.value == values.injuryLocationFormControl){
        pigInjuryLocation = injuryLocation.viewValue;
      }
    });

    this.pigMoods.forEach((pigMood: SelectionInterface)=> {
      if (pigMood.value == values.pigMoodFormControl){
        pigsMood = pigMood.viewValue;
      }
    });

    let newReport = 
    {
      "key": dateNow,
      "data": {
        "reporterName": values.reporterNameControl,
        "reportedNumber": values.reporterNumberControl,
        "pid": values.pidControl,
        "pigBreed": pigBreed,
        "pigInjured": values.pigInjuredControl,
        "pigWhereInjured": pigInjuryLocation,
        "pigInjurySeverity": values.injurySeverityControl,
        "pigMood": pigsMood,
        "dateFound": values.datePickerControl.toString(),
        "dateReported": dateNow,
        "locationLat": latitude,
        "locationLong": longitude,
        "locationName": locationName,
        "extraNotes": values.extraNotesControl,
        "status": false,
      }
    }

    this.databaseService.addReport(newReport)
    .subscribe((data) => {
      console.log(data);
    });
    this.closeReportForm();
  }

  closeReportForm(){
    this.showFormCard = false;
    this.showFormCardEvent.emit(this.showFormCard);
    window.location.reload();
  }
}
