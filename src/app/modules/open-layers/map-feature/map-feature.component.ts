import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { LocationService } from 'src/app/core/services/location.service';
import { UnitModulesService } from 'src/app/core/services/unit-modules.service';

@Component({
  selector: 'app-map-feature',
  templateUrl: './map-feature.component.html',
  styleUrls: ['./map-feature.component.scss'],
})
export class MapFeatureComponent implements OnInit {
  feature: any;
  roadName: any;
  roadWard: any;
  roadZone: any;
  contractorName: any;
  status: any;
  length: any;
  locationId: any;
  pqcProgress: any;

  Back() {}
  constructor(
    public dialogRef: MatDialogRef<MapFeatureComponent>,
    private locationService: LocationService,
    private unitService: UnitModulesService,
    private router: Router,
    private _fb: FormBuilder,
    private geolocationservice: GeoLocationService
  ) {
    this.locationService.dataEntrySearchParams.subscribe((result) => {
      this.feature = result.feature;
      console.log(this.feature);
      this.locationId = this.feature['location']._id;
      this.roadName = this.feature['location'].locationName;
      this.roadWard = this.feature['location'].wardname;
      this.roadZone = this.feature['location'].zoneName;
      this.contractorName = this.feature['location'].contractorName;
      this.status = this.feature['location'].status;
      this.length = this.feature['location'].length;
    });
  }
  ngOnInit(): void {
    this.locationService
      .getModulesInLocation(this.locationId)
      .subscribe((result) => {
        debugger;
        console.log(result);

        // Completion of Crust (PQC)
  
        let pqcTarget = Number(result.data.filter(
          (d) => d.module.moduleName === 'Completion of Crust (PQC)'
        )[0].cumulativeQuantity).toFixed(2);

        let length = result.data.filter(
          (d) => d.module.moduleName === 'Completion of Crust (PQC)'
        )[0].location.length;

        this.pqcProgress = ((Number(pqcTarget)/length)*100).toFixed(2);
      });
  }
}
