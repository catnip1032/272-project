import { Component, AfterViewInit, Input} from '@angular/core';
import * as L from 'leaflet';
import{ icon, Marker } from "leaflet"; 
import { DatabaseService } from '../database.service';
import { Report } from '../interfaces';
import { generateReports } from '../utilities';

const iconRetinaUrl = "assets/marker-icon-2x.png";
const iconUrl = "assets/marker-icon.png";
const shadowUrl = "assets/marker-shadow.png";
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25,41],
  iconAnchor: [12,41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41,41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input() showFormCard: boolean = false;
  locations: string[] = []


  constructor(
    private databaseService: DatabaseService,
  ){}

  private map: any;

  private initMap(): void {
    this.map = L.map("map", {
      center: [49.2, -123],
      zoom: 11
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      tileSize: 512,
      zoomOffset: -1,
    });

    tiles.addTo(this.map);

    this.drawPigMarkers();
  }

  onMapReady(map: L.Map) {
    map.invalidateSize();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  drawPigMarkers(){
    this.databaseService.getAllReports()
    .subscribe((data: any) => {
      let reports = generateReports(data);
      reports.forEach((report: Report) => {
        let lat = parseFloat(report.locationLat);
        let long = parseFloat(report.locationLong);
        let locationName = report.locationName;
        this.locations.push(locationName);
        let numberOfCasesAtLocation = 0;
        this.locations.forEach((location)=> {
          if (location === locationName){
            numberOfCasesAtLocation += 1;
          }
        });
        L.marker([lat, long]).addTo(this.map).bindPopup(`<b>${locationName}</b><br/>${numberOfCasesAtLocation} Pig(s) reported`);
      });
    });
  }
}