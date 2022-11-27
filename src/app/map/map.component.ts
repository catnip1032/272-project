import { Component, AfterViewInit, Input} from '@angular/core';
import * as L from 'leaflet';
import{ icon, Marker } from "leaflet"; 

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

  private map: any;

  private initMap(): void {
    this.map = L.map("map", {
      center: [49.2, -123],
      zoom: 11
    });
    // .setView([49.2, -123], 11);
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      tileSize: 512,
      zoomOffset: -1,
    });

    tiles.addTo(this.map);

    L.marker([49.2276, -123.0076]).addTo(this.map).bindPopup("<b>Metrotown</b><br/>cases reported");
    L.marker([49.1867, -122.8490]).addTo(this.map).bindPopup("<b>SFU Surrey</b><br/>cases reported");
  }

  constructor() { }

  onMapReady(map: L.Map) {
    map.invalidateSize();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}