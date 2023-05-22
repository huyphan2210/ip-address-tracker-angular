import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

import { Map, Marker } from "maplibre-gl";

import { TrackerService } from "src/services/ip-tracker.service";

import { IPGeo, ILocalIP } from "src/dto/ip-tracker.dto";
@Component({
    styleUrls: ['./main.component.scss'],
    templateUrl: 'main.component.html',
    selector: 'main',
    providers: [TrackerService]
})
export class Main implements AfterViewInit, OnInit {
  constructor(private trackerService: TrackerService) {}

  @ViewChild('map') mapRef: ElementRef<HTMLDivElement> | null = null;

  localIP?: string;

  map: Map | null = null;

  marker?: Marker;

  searchResults = [
    { title: 'Ip Address', content: '' },
    { title: 'Location', content: '' },
    { title: 'Timezone', content: '' },
    { title: 'Isp', content: '' },
  ];

  input = new FormControl('');

  ngOnInit(): void {
    this.localLocation();
  }

  ngAfterViewInit(): void {
    const keyValue = 'O7UQwwJHOhwb3GzvdvU1';
    const baseMap = 'https://api.maptiler.com/maps/streets/style.json?key=' + keyValue;

    this.map = new Map({
      container: this.mapRef!.nativeElement,
      style: baseMap,
      center: [0, 0],
      zoom: 1
    })
  }

  private localLocation() {
    this.trackerService.getLocalIp().subscribe((data: ILocalIP) => {
      this.input.setValue(data.ip);
      this.submitSearch()
    })
  }

  public submitSearch(e?: SubmitEvent): void {
    e?.preventDefault();
    if (this.input.value) {
      this.trackerService.ipTracker(this.input.value).subscribe((data: IPGeo) => {
        this.searchResults[0].content = data.ip;
        this.searchResults[1].content = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
        this.searchResults[2].content = data.location.timezone;
        this.searchResults[3].content = data.isp;
        if (this.map) {
          this.marker?.remove();
          this.marker = new Marker().setLngLat([data.location.lng, data.location.lat]).addTo(this.map);
          this.map.flyTo({
            center: [data.location.lng, data.location.lat],
            zoom: 13
          })
        }
      })
    }
  }
}
