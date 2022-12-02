// import { ReportLocation } from "./report-location";

import { ReportLocation } from "../interfaces";

export class Report implements ReportLocation {

  
  constructor(
    uid: string,
    reporterName: string,
    reportedNumber: string,
    pid: number,
    pigBreed: string,
    pigInjured: boolean,
    pigWhereInjured: string,
    pigInjurySeverity: number,
    pigMood: string,
    dateFound: string,
    dateReported: Date,
    locationLat: number,
    locationLong: number,
    locationName: string,
    extraNotes: string,
    status: boolean,
  ) {
    this.locationName = locationName;
    this.latitude = locationLat;
    this.longitude = locationLong;
  }  
  locationName: string;
  latitude: number;
  longitude: number;
}