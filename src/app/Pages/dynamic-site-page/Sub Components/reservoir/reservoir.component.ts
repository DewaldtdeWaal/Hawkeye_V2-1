import { Component, HostBinding, Input, OnChanges, SimpleChanges, AfterContentInit, Output } from '@angular/core';

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.css']
})
export class ReservoirComponent implements OnChanges, AfterContentInit {
@Input() level:any = 70;

animationreverse:any = false;

@HostBinding('style.--target-height')
private targetHeight: string = '80px';

@HostBinding('style.--animation-speed')
@Input() animationSpeed: string = '1s';

@HostBinding('style.--height-size')
private heightSize: string = '80px';

@HostBinding('style.--water-color')
@Input() watercolor: any = '#005070';

@HostBinding('style.--water-rim-color')
@Input() waterrimcolor: string = 'lightblue';

@HostBinding('style.--reservoir-color')
@Input() reservoircolor: string = '#DDDDDD';

ngAfterContentInit(): void {
  this.CalcLevel()
}

ngOnChanges(changes: SimpleChanges): void {

 this.CalcLevel()
}

ChangeDirection()
{
  this.animationreverse= !this.animationreverse;
}

CalcLevel()
{
    if(this.level > 100)
    {
      this.level = 100;
    }

    if(this.level < 0)
    {
      this.level = 0;
    }
  
    this.targetHeight = (80 - (this.level/100 * 80)).toString() + "px";
    this.heightSize = (this.level/100 * 80).toString() + "px";
}

}
