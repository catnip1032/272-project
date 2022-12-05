import { Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';
import { DatabaseInterface, Report } from '../interfaces';
import { MoreDetailsModalComponent } from '../more-details-modal/more-details-modal.component';
import { compare, generateReports } from '../utilities';

/**
 * @title Piggy sorting
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() showFormCard: boolean = false;

  piggyReports: Report[] = [];
  reportData: Report[] = [];

  constructor(
    private databaseService: DatabaseService,
    private authenticationService: AuthenticationService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.renderReports();
  }

  renderReports() {
    var reportSubscription = this.databaseService.getAllReports();
    reportSubscription.subscribe((data: any) => {
      this.piggyReports = generateReports(data);
      this.reportData = this.piggyReports.slice();
    });
  }

  sortData(sort: Sort) {
    const data = this.piggyReports.slice();
    if (!sort.active || sort.direction === '') {
      this.reportData = data;
      return;
    }

    this.reportData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'locationName':
          return compare(a.locationName, b.locationName, isAsc);
        case 'reporterName':
          return compare(a.reporterName, b.reporterName, isAsc);
        case 'dateReported':
          return compare(a.dateReported, b.dateReported, isAsc);
        default:
          return 0;
      }
    });
  }

  changePigStatus(event:any, report: Report) {
    var onPasswordDialogSuccessClose = () => {
      var newStatus = event.checked ? true : false;
      var databaseInterfaceReport: DatabaseInterface = {
        "key": report.key,
        "data": {
          "reporterName": report.reporterName,
          "reportedNumber": report.reportedNumber,
          "pid": report.pid,
          "pigBreed": report.pigBreed,
          "pigInjured": report.pigInjured,
          "pigWhereInjured": report.pigWhereInjured,
          "pigInjurySeverity": report.pigInjurySeverity,
          "pigMood": report.pigMood,
          "dateFound": report.dateFound,
          "dateReported": report.dateReported,
          "locationLat": report.locationLat,
          "locationLong": report.locationLong,
          "locationName": report.locationName,
          "extraNotes": report.extraNotes,
          "status": newStatus,
        }
      }
      this.databaseService.updateReportById(databaseInterfaceReport)
      .subscribe((data)=> {
        console.log(data);
        this.snackbar.open("Password correct. Status Update Success!", "X")
      })
    }
    
    var onPasswordDialogFailureClose = () => {
      report.status = report.status ? false : true;
      this.snackbar.open("Status Update Cancelled.", "X")
    }
    
    this.authenticationService.showPasswordDialog(onPasswordDialogSuccessClose, onPasswordDialogFailureClose);
  }

  deleteReport(key: string) {
    var onPasswordDialogSuccessClose = () => {
      this.databaseService.removeReportById(key)
      .subscribe((data)=> {
        console.log(data);
        this.renderReports();
        this.snackbar.open("Password correct. Delete Success!", "X")
        window.location.reload();
      })
    }

    var onPasswordDialogFailureClose = () => {
      this.snackbar.open("Delete Cancelled.", "X")
    }
    this.authenticationService.showPasswordDialog(onPasswordDialogSuccessClose, onPasswordDialogFailureClose);
  }

  showMoreDetails(report: Report) {
    try{
      // format date & time reported
      var reportedDate = new Date(parseInt(report.dateReported));
      var formattedReportedDate = reportedDate.getFullYear() + '-' +('0' + (reportedDate.getMonth()+1)).slice(-2)+ '-' +  ('0' + reportedDate.getDate()).slice(-2) + ' '+reportedDate.getHours()+ ':'+('0' + (reportedDate.getMinutes())).slice(-2)+ ':'+reportedDate.getSeconds();
      report.dateReported = formattedReportedDate;

      // format date found
      var foundDate = new Date(report.dateFound);
      var formattedFoundDate = foundDate.getFullYear() + '-' +('0' + (foundDate.getMonth()+1)).slice(-2)+ '-' +  ('0' + foundDate.getDate()).slice(-2);
      report.dateFound = formattedFoundDate;

      var dialogRef = this.dialog.open(MoreDetailsModalComponent,{data: report});
    }
    catch(e: any) {
      console.log(e.toString());
    }
  }
}


