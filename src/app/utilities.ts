import { Report } from "./interfaces";

export function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function generateReports(jsonReports: any) {
    var reports: Report[] = [];
    jsonReports.forEach((report: any) => {
        let data = report.data;
        let newReport: Report = {
            key: report.key,
            reporterName: data.reporterName,
            reportedNumber: data.reportedNumber,
            pid: data.pid,
            pigBreed: data.pigBreed,
            pigInjured: data.pigInjured,
            pigWhereInjured: data.pigWhereInjured,
            pigInjurySeverity: data.pigInjurySeverity,
            pigMood: data.pigMood,
            dateFound: data.dateFound,
            dateReported: data.dateReported,
            locationLat: data.locationLat,
            locationLong: data.locationLong,
            locationName: data.locationName,
            extraNotes: data.extraNotes,
            status: data.status,
        }
        reports.push(newReport);
    })
    
    return reports
}