import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserAuthenticationService } from '../user-authentication.service';
import { Router } from '@angular/router';
import { SiteStorageService } from '../site-storage.service';
import { CommunicationService } from '../communication.service';
import { HeirarchyEditor } from '../heirarchy-editor.service';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent implements OnDestroy, AfterContentInit {
  userdata:any = {}
  pages = []
  disablenavigation:any = false
  copyofuserdata:any = null
  sitestructure:any = null
  links:any = []
  currentpage:any =  "mainpage"
  title:any = "Main Page"
  variableData:any = null
  fontsize:any = 15;
  timer:any =  null;
  private tokenlistener: Subscription = null;
  pageheirarchy:any = {}

  constructor(private http: HttpClient, private userauth:UserAuthenticationService, private router: Router, private siteStorage:SiteStorageService,private commservice:CommunicationService, private heirarchyservice:HeirarchyEditor)
  {
  }

  ngAfterContentInit(): void {


    //
    this.userdata = this.siteStorage.getStructure()
    if(this.userdata)
    {
      this.pageheirarchy = this.heirarchyservice.GetStructure(this.userdata.pages)
      this.UpdateLinks()
      this.GetPageVariables(this.http)
    }
    else
    {
      this.GetUserData(this.http)
    }

    this.tokenlistener = this.userauth.getAuthListener().subscribe((isauthenticated)=>
    {

      if(isauthenticated || this.userauth.isAuthenticated())
      {

      }
      else
      {
        this.router.navigate(["/Login"])
      }
    })
  }

  LogOut()
  {
    this.userauth.logout()
  }

  DiscardDeveloperChanges()
  {
    var str = JSON.stringify( this.userdata)

    this.copyofuserdata= {}

    this.copyofuserdata = JSON.parse(str)

    this.disablenavigation = false
  }

  SaveDeveloperChanges(event:any)
  {
    this.userdata = event
    this.disablenavigation = false;
    this.UpdateLinks()
  }

  PageChanged()
  {
    this.disablenavigation = true;
  }

  async GetUserData(http:HttpClient)
  {
    const message = {requesttype: "user data", user:this.userauth.email}
    this.http.post<any>("http://" + this.commservice.ipaddressorhostname + ":3004/api/posts",message).subscribe((res) =>
    {
      this.userdata = res.userdata

      this.UpdateLinks()
      this.GetPageVariables(http)
      this.pageheirarchy = this.heirarchyservice.GetStructure(this.userdata.pages);
    })
  }

  UpdateLinks()
  {
    this.links = []
      var page:[{pageName:""}] = this.userdata.pages

      // for(var item = 0; item < page.length; item++)
      // {
      //   this.links.push({pagename:page[item].pageName, navpage:"site"})
      // }
      if(this.userdata.admin)
      {
        this.links.push({pagename:"Page Assignments",navpage:"assignment"})
        this.links.push({pagename:"User Management",navpage:"usermanagement"})
      }
      if(this.userdata.developer)
      {
        this.links.push({pagename:"Page Developer", navpage:"development"})
        this.links.push({pagename:"Driver Creation", navpage:"drivercreation"})
      }
      if(this.userdata.superuser)
      {

        this.links.push({pagename:"SVG Drawing", navpage:"svgdrawing"})
      }
      this.links.push({pagename:"Settings", navpage:"usersettings"})
  }

  changepage(event:any)
  {
    for(var i = 0;i < this.userdata.pages.length; i++)
    {
      if(this.userdata.pages[i].pageName == event.pagename)
      {
        this.sitestructure = this.userdata.pages[i]
        if(this.variableData != null && this.sitestructure != null)
          this.SetSiteStructureVariables(this.sitestructure,this.variableData)
        break;
      }
    }

    if(event.navpage == "development")
    {
      var str = JSON.stringify( this.userdata)

      this.copyofuserdata = JSON.parse(str)
    }

    this.fontsize = 15// (event.pagename.length/((event.pagename.length*event.pagename.length) * 0.01))

    this.title = event.pagename
    this.currentpage = event.navpage
  }

  async GetPageVariables(http:HttpClient)
  {
    const message = {requesttype: "variable information", user:this.userauth.email}
    http.post<any>("http://" + this.commservice.ipaddressorhostname + ":3004/api/posts",message).subscribe((res) =>
    {
      this.variableData = res
      if(this.variableData != null && this.sitestructure != null)
        this.SetSiteStructureVariables(this.sitestructure,this.variableData)

    })

    this.timer = setTimeout(() => {this.GetPageVariables(http)},60000)
  }

  SetSiteStructureVariables(sitestructure:any,variableData:any)
  {
    if(sitestructure.components != undefined)
    {
      for(var i = 0 ; i < sitestructure.components.length; i++)
      {
        this.SetSiteStructureVariables(sitestructure.components[i],variableData)
      }
    }

    if(sitestructure.driverName != undefined)
    {


      if(sitestructure.componentType == "borehole_pump")
      {


        if(variableData[sitestructure.driverName] != undefined)
        {
          if(sitestructure.tagNames != undefined)
          {
            if(sitestructure.values == undefined)
            {
              sitestructure.values = []
            }

            for(var i = 0;i < sitestructure.tagNames.length; i++)
            {
              if(variableData[sitestructure.driverName][sitestructure.tagNames[i]] != undefined)
              {
                sitestructure.values.push(variableData[sitestructure.driverName][sitestructure.tagNames[i]])
              }
            }
          }
        }


      }
      else if(sitestructure.componentType == "marshal" || sitestructure.componentType == "stringlist")
      {
        if(variableData[sitestructure.driverName] != undefined)
          if(variableData[sitestructure.driverName][sitestructure.tagName] != undefined)
            sitestructure["value"] = variableData[sitestructure.driverName][sitestructure.tagName]

        sitestructure["descriptions"] = variableData.lists[sitestructure.tagName]
      }
      else
      {
        if(variableData[sitestructure.driverName] != undefined)
          if(variableData[sitestructure.driverName][sitestructure.tagName] != undefined)
            sitestructure["value"] = variableData[sitestructure.driverName][sitestructure.tagName]
      }


    }
  }

  TakeMeHome()
  {

    this.pageheirarchy = this.heirarchyservice.GetStructure(this.userdata.pages)
    this.changepage({pagename:"Main Page",navpage:"mainpage"});
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
    this.tokenlistener.unsubscribe();
  }
}
