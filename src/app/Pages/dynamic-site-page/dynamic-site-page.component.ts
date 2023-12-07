import { Component, ViewChild, AfterContentInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-dynamic-site-page',
  templateUrl: './dynamic-site-page.component.html',
  styleUrls: ['./dynamic-site-page.component.css']
})
export class DynamicSitePageComponent implements AfterContentInit {
  @Input() structure:any  = {components:[]} 

  constructor(private http: HttpClient){
  }



  // AskForData()
  // {
  //   const message = {structure: this.structure}
  //   this.http.post<any>("http://139.144.176.232:46568/api/posts",message).subscribe((res) => 
  //   {
  //     this.structure = res.structure
  //   })
  //   setTimeout(this.AskForData,30000)
  // }

  ngAfterContentInit(): void {
  }
}
