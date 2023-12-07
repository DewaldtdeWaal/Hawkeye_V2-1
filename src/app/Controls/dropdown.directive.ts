import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appdropdown]',
})

export class DropDownDirective
{
    @HostBinding('class.drop-down-open') isopen = false;
    
    @HostListener("document:click",['$event']) toggleOpen(event: Event)
    {
        this.isopen = this.elref.nativeElement.contains(event.target) ? !this.isopen:false;
    }

    constructor(private elref:ElementRef)
    {

    }
}