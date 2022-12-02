import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ReportLocation } from './models/report-location';
import { ReportLocation } from "./interfaces"

import { Report } from './models/report';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private https: HttpClient
  ) { }

  getAllLocations() {
    this.https.get<ReportLocation>(`http://272.selfip.net/apps/MKLodzwb4r/collections/locations/documents/`)
    .subscribe((data: any) => {
      data = JSON.parse(data);
      return data;
    });
  }

  getLocationById(id: string) {
    this.https.get<ReportLocation>(`http://272.selfip.net/apps/MKLodzwb4r/collections/locations/documents/${id}`)
    .subscribe((data:any) => {
      data = JSON.parse(data);
      return data;
    });
  }

  addLocation(reportLocation: ReportLocation) {
    var stringifiedReportLocation = JSON.stringify(reportLocation);
    this.https.post<ReportLocation>(`http://272.selfip.net/apps/MKLodzwb4r/collections/locations/documents/`, stringifiedReportLocation)
    .subscribe((data:any) => {
      data = JSON.parse(data)
      return data;
    });
  }

  removeLocationById(id: string) {
    this.https.delete(`http://272.selfip.net/apps/MKLodzwb4r/collections/locations/documents/${id}`);
  }

  getAllReports() {
    return this.https.get<Report>(`http://272.selfip.net/apps/MKLodzwb4r/collections/reports/documents/`);
  }

  updateReportById(report: Report) {
    var stringifiedReport = JSON.stringify(report);
    try{
      this.https.put<ReportLocation>(`http://272.selfip.net/apps/MKLodzwb4r/collections/reports/documents/${report.uid}`, stringifiedReport)
      return true;
    }
    catch {
      return false;
    }
  }

  removeReportById(id: string) {
    this.https.delete(`http://272.selfip.net/apps/MKLodzwb4r/collections/reports/documents/${id}`);
  }

  // TODO: remove the anys
  generateReports(jsonData: any){
    var reports: Report[] = []
    jsonData.forEach((object: any) => {

      let newReport = new Report(
        object.uid,
        object.reporterName,
        object.reportedNumber,
        object.pid,
        object.pigBreed,
        object.pigInjured,
        object.pigWhereInjured,
        object.pigInjurySeverity,
        object.pigMood,
        object.dateFound,
        object.dateReported,
        object.locationLat,
        object.locationLong,
        object.locationName,
        object.extraNotes,
        object.status
      );

      reports.push(newReport);
    });
    // TODO: turn this into a pipe
    return reports;
  }

}
