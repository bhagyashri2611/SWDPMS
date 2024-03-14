import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-widget',
  templateUrl: './info-widget.component.html',
  styleUrls: ['./info-widget.component.scss']
})
export class InfoWidgetComponent {
  @Input() text1: any;
  @Input() value1: any;
  @Input() text2: any
  @Input() value2: any;
  @Input() percentage: any;
}
