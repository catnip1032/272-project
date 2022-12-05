export interface SelectionInterface {
    value: string;
    viewValue: string;
}

export interface ReportLocationSelectionInterface {
    key: string,
    locationName: string,
    latitude: number,
    longitude: number,
} 

export interface DialogData {
    lat: number;
    long: number;
}

export interface ReportLocation {
    locationName: string,
    latitude: number,
    longitude: number,
}

export interface DatabaseInterface {
    key: string,
    data: object,
}

export interface Report {
    key: string,
    reporterName: string,
    reportedNumber: string,
    pid: number,
    pigBreed: string,
    pigInjured: boolean,
    pigWhereInjured: string,
    pigInjurySeverity: number,
    pigMood: string,
    dateFound: string,
    dateReported: string,
    locationLat: string,
    locationLong: string,
    locationName: string,
    extraNotes: string,
    status: boolean,
}
