import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
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
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddLineStringComponent } from '../add-line-string/add-line-string.component';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/core/services/location.service';
import { transform } from 'ol/proj';
import { environment } from 'src/environments/environment';
import { GeoJSON } from 'ol/format';
import Swal from 'sweetalert2';
import { LocationModel } from 'src/app/core/models/ILocation';

@Component({
  selector: 'app-digitize-road',
  templateUrl: './digitize-road.component.html',
  styleUrls: ['./digitize-road.component.scss'],
})
export class DigitizeRoadComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: Map;
  center: Coordinate = [8111403.258440978, 2166113.1415149523];
  zoom: number = 11;
  locationId: string;
  locationModel: LocationModel;
  locationName: string = '';
  locationLength: string = '';

  API_URL = environment.baseUrl;
  layerdata: any;
  roadLayer: any;
  wardLayer: any;

  sourceProjection = 'EPSG:3857';
  destProjection = 'EPSG:4326';
  constructor(
    public matDialog: MatDialog,
    private route: ActivatedRoute,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.locationId = params.get('id');
    });

    this.locationService
      .getLocationById(this.locationId)
      .subscribe((result) => {
        debugger;

        if (result) {
          if (result.status === 200) {
            this.locationModel = result.data[0];
            this.locationName = this.locationModel.locationName.toString();
            this.locationLength = this.locationModel.length.toString();
          }
        }
      });
    this.roadLayer = new VectorSource({
      url: this.API_URL + 'geo/getroadlayer/' + this.locationId,
      format: new GeoJSON(),
    });

    this.wardLayer = new VectorSource({
      url: this.API_URL + 'geo/getwardlayer/' + this.locationId,
      format: new GeoJSON({ geometryName: 'wardfeaturelayer' }),
    });

    this.initializeMap();
  }



  ngAfterViewInit(): void {
    this.map.on('click', (e) => {
      let coordinates = e.coordinate;
      const line = new LineString(coordinates);
      this.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        // if (feature.getGeometry()?.getType() === 'LineString') {
        //   const geometry = feature.getGeometry();
        //   const lineStringGeometry = geometry as LineString;
        //   const coordinates = lineStringGeometry.getCoordinates();
        //   const line = new LineString(coordinates);
        //   const length = line.getLength();
        //   console.log(length, ' :length');
  
        // }

        if (feature.getGeometry()?.getType() === 'MultiPolygon') {
          this.drawLine(e.coordinate);
        }
      });
    });
  }

  drawLine(coordinates: any): void {
    const vectorSource = new VectorSource();
    const draw = new Draw({
      source: vectorSource,
      type: 'LineString',
    });
    draw.on('drawend', (event) => {
      const feature = event.feature;
      const geometry = feature.getGeometry();
      if (geometry.getType() === 'LineString') {
        const lineStringGeometry = geometry as LineString;
        const coordinates = lineStringGeometry.getCoordinates();
        const line = new LineString(coordinates);
        const length = line.getLength();
        console.log(length, ' :length');

        // if (length > this.locationModel.length) {
        //   Swal.fire({
        //     text: 'Digitized Road Must Be Less than Road Length',
        //     icon: 'warning',
        //     confirmButtonText: 'Ok',
        //   }).then((result) => {
        //     if (result.value) {
        //       window.location.reload();
        //     }
        //   });
        // } else {
          const transformedCoordinates = coordinates.map((coord) => {
            return transform(coord, this.sourceProjection, this.destProjection);
          });
          this.openNewComponent(transformedCoordinates);
        // }
      }
    });

    this.map.addInteraction(draw);
    const modify = new Modify({ source: vectorSource });
    this.map.addInteraction(modify);
    const snap = new Snap({ source: vectorSource });
    this.map.addInteraction(snap);
  }

  public onMapReady(event) {
    console.log('Map Ready');
  }

  initializeMap() {
    const raster = new TileLayer({
      source: new OSM(),
    });
    const vectorSource = new VectorSource();
    const roadsLayer = new VectorLayer({
      source: this.roadLayer,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'blue',
          width: 4,
        }),
        // image: new CircleStyle({
        //   radius: 5,
        //   fill: new Fill({
        //     color: 'blue',
        //   }),
        // }),
        // image: new Icon({
        //   anchor: [0.5, 46],
        //   anchorXUnits: 'fraction',
        //   anchorYUnits: 'pixels',
        //   src: 'assets/img/wp.png',
        // }),
      }),
    });

    const wardLayer = new VectorLayer({
      source: this.wardLayer,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'black',
          width: 1,
        }),
      }),
    });

    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [raster, wardLayer, roadsLayer],
      view: new View({
        center: this.center,
        zoom: this.zoom,
      }),
    });

    // const draw = new Draw({
    //   source: vectorSource,
    //   type: 'LineString',
    // });
    // Listen to the drawend event
    // draw.on('drawend', (event) => {
    //   const sourceProjection = 'EPSG:3857'; // Assuming coordinates are in Web Mercator
    //   const destProjection = 'EPSG:4326'; // WGS84, which is latitude and longitude

    //   const feature = event.feature;
    //   const geometry = feature.getGeometry();
    //   if (geometry.getType() === 'LineString') {
    //     const lineStringGeometry = geometry as LineString;
    //     const coordinates = lineStringGeometry.getCoordinates();
    //     const transformedCoordinates = coordinates.map((coord) => {
    //       return transform(coord, sourceProjection, destProjection);
    //     });
    //     this.openNewComponent(transformedCoordinates);
    //   }
    // });
    // this.map.addInteraction(draw);
    // const modify = new Modify({ source: vectorSource });
    // this.map.addInteraction(modify);
    // const snap = new Snap({ source: vectorSource });
    // this.map.addInteraction(snap);
  }

  openNewComponent(coordinates) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '750px';
    dialogConfig.position = {
      top: '100px',
    };
    let obj = {
      locationId: this.locationId,
      coordinates: coordinates,
    };
    this.locationService.getDataEntrySearchParams(obj);
    dialogConfig.panelClass = 'rounded-dialog';
    this.matDialog.open(AddLineStringComponent, dialogConfig);
  }

  undoLastDrawnFeature() {
    const source = this.map.getLayers();
    console.log(source);
  }
}

// const raster = new TileLayer({
//   source: new OSM(),
// });
// const vectorSource = new VectorSource();
// const vectorLayer = new VectorLayer({
//   source: vectorSource,
// });
// this.map = new Map({
//   target: this.mapElement.nativeElement,
//   layers: [raster, vectorLayer],
//   view: new View({
//     center: this.center,
//     zoom: this.zoom,
//   }),
// });
 // ngAfterViewInit(): void {
  //   if (!this.Map) {
  //     this.zone.runOutsideAngular(() => this.initializeMap());
  //   }
  //   setTimeout(() => this.mapReady.emit(this.Map));
  //   var currZoom = this.Map.getView().getZoom();
  //   console.log(currZoom);
  //   this.Map.on('click', (e) => {
  //     console.log(e.coordinate);
  //     var latLon = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
  //     this.Map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
  //       if (feature.getGeometry().getType() === 'MultiPolygon') {
  //         //  console.log(feature.get("wardname"), feature.get("wardnotation"), feature.get("wardcode"));

  //         this.zone.run(() => {
  //           const ward = feature.get('wardnotation');
  //           if (ward) {
  //             const fcParams = {
  //               ward: feature.get('wardnotation'),
  //               wardcode: feature.get('wardcode'),
  //               long: latLon[0],
  //               lat: latLon[1],
  //             };
  //             // this.pointsArr.push(fcParams)
  //             this.geometryService.getFCSearchParams(fcParams);
  //             const dialogConfig = new MatDialogConfig();
  //             //this.node.ward=feature.get("wardnotation")
  //             // The user can't close the dialog by clicking outside its body
  //             dialogConfig.disableClose = true;
  //             dialogConfig.id = 'modal-component';
  //             dialogConfig.height = '950px';
  //             dialogConfig.width = '1500px';
  //             const modalDialog = this.matDialog.open(
  //               AddnodeComponent,
  //               dialogConfig
  //             );
  //             console.log(this.pointsArr);
  //           } else {
  //             alert('Oops...! you are not in Ward boundary');
  //           }
  //         });
  //       }
  //     });
  //   });

  // }

  // ngAfterViewInit(): void {
  //   this.map.on('click', (e) => {
  //     console.log(e.coordinate);
  //     var latLon = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');

  //     // Check if there's a feature at the clicked point
  //     const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => {
  //       return feature;
  //     });

  //     if (feature) {
  //       // Check if the clicked feature is a MultiPolygon
  //       if (feature.getGeometry().getType() === 'MultiPolygon') {
  //         // Draw line on the map
  //         this.drawLine(e.coordinate);
  //       } else {
  //         // Alert user if feature is not a MultiPolygon
  //         alert('Oops...! The clicked feature is not a MultiPolygon.');
  //       }
  //     } else {
  //       // Alert user if no feature found at the clicked point
  //       alert('Oops...! No feature found at the clicked point.');
  //     }
  //   });
  // }

        // console.log(coordinate);
      // const transformedCoordinates = coordinate.map((coord) => {
      //   return transform(coordinate, this.sourceProjection, this.destProjection);
      // });
      // const distance = this.calculateDistance(transformedCoordinates, transformedCoordinates);
