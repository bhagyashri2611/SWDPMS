import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-weighted-cell-renderer',
  template: `
  <div class="progress-bar-container" *ngIf="params.data.status != 'Completed'">
    <div class="progress-label">{{ params.data.weightedProgress }}%</div>
    <div> <progress id="file" value="{{params.data.weightedProgress}}" max="100"></progress> </div>
  </div>

  <div class="progress-bar-container" *ngIf="params.data.status == 'Completed'" style="background-color: #D6EAF8;">
    <div class="progress-label"> 100%</div>
    <div> <progress id="file" value=100  max="100"></progress> </div>
  </div>
`,
styles: [
    `
      .progress-bar-container {
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        // background: #ddd;
      }
  
      .progress-bar {
        height: 3px;
        background-color: green;
      }
  
      .progress-label {
        margin-left: 5px;
      }
    `,
  ],
})
export class WeightedCellRendererComponent implements ICellRendererAngularComp {
    params: any;
  
    agInit(params: any): void {
      this.params = params;
      this.params.data.weightedProgress = Number(this.params.data.weightedProgress)
     // console.log("Prams", this.params)
    }
  
  
    refresh(): boolean {
      return false;
    }
  }
  