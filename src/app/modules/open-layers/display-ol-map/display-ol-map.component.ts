import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import { Transform } from 'ol/transform';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Draw, Modify, Snap } from 'ol/interaction';
import { LineString } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapFeatureComponent } from '../map-feature/map-feature.component';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/core/services/location.service';
import { transform } from 'ol/proj';
import { GeoJSON } from 'ol/format';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-display-ol-map',
  templateUrl: './display-ol-map.component.html',
  styleUrls: ['./display-ol-map.component.scss'],
})
export class DisplayOlMapComponent {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: Map;
  center: Coordinate = [8111403.258440978, 2166113.1415149523];
  zoom: number = 11;
  locationId: string;
  API_URL = environment.baseUrl;
  layerdata: any;
  sourceL: any;
  wardLayer: any;
  roadName: any;
  roadStatus: any;
  roadWard: any;
  roadZone: any;
  contractorName: any;
  status: any;
  length: any;
  constructor(
    public matDialog: MatDialog,
    private route: ActivatedRoute,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.locationId = params.get('id');
      this.sourceL = new VectorSource({
        url: this.API_URL + 'geo/getroadlayer',
        format: new GeoJSON(),
      });

      this.wardLayer = new VectorSource({
        url: this.API_URL + 'geo/getwardlayer',
        format: new GeoJSON({ geometryName: 'wardfeaturelayer' }),
      });
    });
    this.initializeMap();
  }

  initializeMap() {
    const raster = new TileLayer({
      source: new OSM(),
    });
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: this.sourceL,

      style: (feature) => {
        const roadStatus = feature.get('location').status;
        let strokeColor;
        switch (roadStatus) {
          case 'Completed':
            strokeColor = 'green';
            break;
          case 'Not Started':
            strokeColor = 'red';
            break;
          case 'In Progress':
            strokeColor = 'orange';
            break;
          case 'On Hold':
            strokeColor = 'blue';
            break;
          case 'Started':
            strokeColor = 'blue';
            break;
          default:
            strokeColor = 'black'; // Default color for unknown status
        }

        return new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: strokeColor,
            width: 4,
          }),
        });
      },

      // style: new Style({
      //   fill: new Fill({
      //     color: 'rgba(255, 255, 255, 0.2)',
      //   }),
      //   stroke: new Stroke({
      //     color: 'blue',
      //     width: 4,
      //   }),

      // }),
    });

    const wardLayer = new VectorLayer({
      source: this.wardLayer,

      style: (feature) => {
        // let data = feature.getProperties
        // let ward = data['properties'].wardname;
        // console.log(ward);
        
        return new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: 'black',
            width: 1,
          }),
          // text: new Text({
          //   textAlign: 'center',
          //   textBaseline: 'middle',
          //   font: '12px Cambria',
          //   //text: "ABC", // Assuming 'wardName' is the property name for labeling
          //   fill: new Fill({ color: 'black' }),
          //   stroke: new Stroke({ color: 'white', width: 0.5 }),
          //   offsetX: 0,
          //   offsetY: 0,
          //   placement: 'point',
          //   overflow: true,
          // }),
        });
      },
    });

    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [raster, wardLayer, vectorLayer],
      view: new View({
        center: this.center,
        zoom: this.zoom,
      }),
    });

    // Listen to the drawend event
    this.map.on('click', (e) => {
      var latLon = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
      let fcParams = {};
      const coordinate = e.coordinate;
      this.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        if (feature.getGeometry()?.getType() === 'MultiLineString') {
          const data = feature.getProperties();
          this.layerdata = data;
          console.log(feature.getProperties());
          this.roadName = data['location'].locationName;
          this.roadWard = data['location'].wardname;
          this.roadZone = data['location'].zoneName;
          this.contractorName = data['location'].contractorName;
          this.status = data['location'].status;
          this.length = data['location'].length;
          this.openNewComponent(data);
          // content.innerHTML = '<p>Location Name:</p><code>' + ward + '</code>';
          // overlay.setPosition(coordinate);
        }
      });
    });
  }
  showTooltip() {
    // Assuming you have a tooltip element reference
    debugger;
    const tooltipElement = document.getElementById('tooltipContent');

    // Display the tooltip programmatically
    tooltipElement.style.display = 'block';
  }
  
  openNewComponent(feature) {
    debugger;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '320px';
    dialogConfig.width = '400px';
    dialogConfig.position = {
      top: '250px',
    };
    let obj = {
      feature:feature
    };
    this.locationService.getDataEntrySearchParams(obj);
    dialogConfig.panelClass = 'rounded-dialog';
    this.matDialog.open(MapFeatureComponent, dialogConfig);
  }

}
function getTextFunction(arg0: string) {
  throw new Error('Function not implemented.');
}
