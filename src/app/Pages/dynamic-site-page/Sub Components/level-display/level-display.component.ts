import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-level-display',
  templateUrl: './level-display.component.html',
  styleUrls: ['./level-display.component.css']
})
export class LevelDisplayComponent {

  math = Math;

  @Input() structure:any = {
    "value" : 0}

  value = 0
  
}
