import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

@Component({
  selector: 'nid-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('olMap', {static: true}) olMapElement!: ElementRef<HTMLDivElement>;
  ngOnInit() {
    const map = new Map({
      target: this.olMapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }
}
