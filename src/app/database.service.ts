import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportLocation } from './models/report-location';
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
    this.https.get<Report>(`http://272.selfip.net/apps/MKLodzwb4r/collections/reports/documents/`)
    .subscribe((data: any) => {
      data = JSON.parse(data);
      return data;
    });
  }

  updateReportById(id: string, report: Report) {
    var stringifiedReport = JSON.stringify(report);
    this.https.put<ReportLocation>(`http://272.selfip.net/apps/MKLodzwb4r/collections/reports/documents/${id}`, stringifiedReport)
    .subscribe((data:any) => {
      data = JSON.parse(data);
      return data;
    });
  }

  removeReportById(id: string) {
    this.https.delete(`http://272.selfip.net/apps/MKLodzwb4r/collections/reports/documents/${id}`);
  }

}
