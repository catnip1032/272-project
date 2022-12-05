import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseInterface, ReportLocation } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private https: HttpClient
  ) { }

  getAllLocations() {
    return this.https.get<Object>(`https://272.selfip.net/apps/MKLodzwb4r/collections/locations/documents/`)
  }

  getLocationById(id: string) {
    this.https.get<ReportLocation>(`https://272.selfip.net/apps/MKLodzwb4r/collections/locations/documents/${id}`)
    .subscribe((data:any) => {
      data = JSON.parse(data);
      return data;
    });
  }

  addLocation(location: DatabaseInterface) {
    return this.https.post(`https://272.selfip.net/apps/MKLodzwb4r/collections/locations/documents/`, location)
  }

  removeLocationById(id: string) {
    this.https.delete(`https://272.selfip.net/apps/MKLodzwb4r/collections/locations/documents/${id}`);
  }

  getAllReports() {
    return this.https.get<Object>(`https://272.selfip.net/apps/MKLodzwb4r/collections/reports/documents/`);
  }

  addReport(report: DatabaseInterface) {
    return this.https.post(`https://272.selfip.net/apps/MKLodzwb4r/collections/reports/documents/`, report)
  }

  updateReportById(report: DatabaseInterface) {
    return this.https.put(`https://272.selfip.net/apps/MKLodzwb4r/collections/reports/documents/${report.key}/`, report)

  }

  removeReportById(id: string) {
    return this.https.delete(`https://272.selfip.net/apps/MKLodzwb4r/collections/reports/documents/${id}/`)
  }
}
