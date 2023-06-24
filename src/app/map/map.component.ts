import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Feature} from 'ol';
import {Point} from 'ol/geom';
import {fromLonLat} from 'ol/proj';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/Circle';

@Component({
  selector: 'nid-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('olMap', {static: true}) olMapElement!: ElementRef<HTMLDivElement>;
  map!: Map;
  source!: VectorSource;
  ngOnInit() {
    this.map = new Map({
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
    this.addLayer();
  }

  addLayer() {
    (this.source = new VectorSource()),
      this.map.addLayer(
        new VectorLayer({
          source: this.source,
          zIndex: 11,
        })
      );
    this.addFeatures();
  }

  addFeatures() {
    const feature = new Feature({
      geometry: new Point(fromLonLat([-98.2079378, 19.0215759], 'EPSG:3857')),
    });
    feature.setStyle(
      new Style({
        // TODO: Change style to use another color
        image: new CircleStyle({
          stroke: new Stroke({color: 'aqua', width: 3}),
          fill: new Fill({color: 'blue'}),
          radius: 7,
        }),
      })
    );

    this.source.addFeature(feature);
  }
}
