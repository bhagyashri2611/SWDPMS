import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-widget',
  templateUrl: './number-widget.component.html',
  styleUrls: ['./number-widget.component.scss']
})
export class NumberWidgetComponent {
  @Input() sm: string;
  @Input() text: string;
  @Input() value: any;
  @Input() borderClass: string = "4"; 
}
