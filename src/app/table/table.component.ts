import {AfterViewInit, Component, Input} from '@angular/core';
import {Sort} from '@angular/material/sort';
import { DatabaseService } from '../database.service';
import { Report } from '../models/report';


export interface PiggyReport {
  location: string;
  piggyName: string;
  reportedBy: string;
  timeReported: number;
  status: string;
}

/**
 * @title Piggy sorting
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit{
  @Input() showFormCard: boolean = false;

  // piggyReports: PiggyReport[] = [
  //   {location: "P Sherman walliby way Sidney", piggyName: 'Hydrogen', reportedBy: "Someone", timeReported: Date.now(), status: "Found"},
  //   {location: "Opera House", piggyName: 'Helium', reportedBy: "ANother someone", timeReported: Date.now(), status: "Dead"},
  //   {location: "A park", piggyName: 'Barium', reportedBy: "Spongebob", timeReported: Date.now(), status: "Sad"},
  //   {location: "Prague", piggyName: 'Carbon', reportedBy: "Patrick", timeReported: Date.now(), status: "Missing"},
  // ];

  piggyReports: PiggyReport[] = [];

  reportData: PiggyReport[];


  constructor(
    private databaseService: DatabaseService
  ) {
    var reportSubscription = this.databaseService.getAllReports();
    reportSubscription.subscribe((data: any) => {
      data = JSON.parse(data);
      let reports = this.databaseService.generateReports(data);
      
    });
    
    this.reportData = this.piggyReports.slice();
  }
  ngAfterViewInit(): void {
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
        case 'location':
          return compare(a.location, b.location, isAsc);
        case 'piggyName':
          return compare(a.piggyName, b.piggyName, isAsc);
        case 'reportedBy':
          return compare(a.reportedBy, b.reportedBy, isAsc);
        case 'timeReported':
          return compare(a.timeReported, b.timeReported, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }

  changePigStatus(report: Report) {
    var oldStatus = report.status;
    var updateSuccess = this.databaseService.updateReportById(report);
    if (updateSuccess) {
      // update list of piggy reports
      // get the switch text
      // change the switch text
    } else {
      // log an error
    }

  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
