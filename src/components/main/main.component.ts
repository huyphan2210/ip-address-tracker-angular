import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Map } from "maplibre-gl";
@Component({
    styleUrls: ['./main.component.scss'],
    templateUrl: 'main.component.html',
    selector: 'main'
})
export class Main implements AfterViewInit {
    @ViewChild('map') mapRef: ElementRef<HTMLDivElement> | null = null;

    map: Map | null = null;

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
}