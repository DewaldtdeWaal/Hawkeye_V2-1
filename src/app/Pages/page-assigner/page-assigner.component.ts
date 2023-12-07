import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, Input } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { UserAuthenticationService } from 'src/app/user-authentication.service';

@Component({
  selector: 'app-page-assigner',
  templateUrl: './page-assigner.component.html',
  styleUrls: ['./page-assigner.component.css']
})
export class PageAssignerComponent implements AfterContentInit {

  @Input() customers:any = []
  @Input() pages:any = null
  heir:any = {}
  displayheir:any = {}

  pageassignments:any = null
  users:any = []

  currentuser:any = ""
  disableuserchange:any = false
  saveable:any = false

  constructor(private http:HttpClient, private userauth: UserAuthenticationService, private commservice:CommunicationService)
  {
    
  }

  ngAfterContentInit(): void {
    this.GetUserData()

    this.SetStructure()

    this.displayheir = this.heir
  }


  SetupNavigationTree(currentNode,page,itemArray,itemIndex)
  {
    if(itemArray.length > itemIndex)
    {
      if(currentNode[itemArray[itemIndex]] == undefined)
      {
        currentNode[itemArray[itemIndex]] = {}
      }
      var newitemIndex = itemIndex + 1
      currentNode.showchildren = false
      this.SetupNavigationTree(currentNode[itemArray[itemIndex]],page,itemArray,newitemIndex)
    }
    else
    {
      currentNode.showchildren = false
      if(currentNode.items == undefined)
      {
        currentNode.items = {}
      }
      currentNode.items[page.pageName] = {}
      currentNode.items[page.pageName].enable = false
      currentNode.items[page.pageName].page = page

    }
  }

  async GetUserData()
  {
    const message = {requesttype: "get page assignments", customers:this.customers}
    this.http.post<any>("http://" + this.commservice.ipaddressorhostname + ":3004/api/posts",message).subscribe((res) => 
    {
      this.pageassignments = res
      this.users = []
      for(var user of this.pageassignments)
      {
        this.users.push(user.email)
      }
    })
  }

  SetStructure()
  {
    this.displayheir = null
    this.heir = {}

    for(var i = 0; i < this.pages.length; i++)
    {
      var itemArray = []
      if(this.pages[i].pageheirarchy)
        itemArray = Array.from(this.pages[i].pageheirarchy)
      itemArray.splice(0,0,this.pages[i].customer)
      this.SetupNavigationTree(this.heir,this.pages[i],itemArray,0)
    }
  }

  UpdateSiteSelections(updateItemName)
  {
    this.currentuser = updateItemName
    for(var user of this.pageassignments)
    {
      if(user.email == updateItemName)
      {
        
        this.SetStructure()


        this.SetNavigationTree(this.heir,user.pages)
        var toremove:any = []
        for(var site in this.heir)
        {
          var found = false
          for(var x in user.pages)
          {
            if(site == x)
            {
              found = true
            }
          }

          if(!found && site != "showchildren" && site != "enable")
          {
            toremove.push(site)
          }
        }

        for(var item of toremove)
        {
          delete this.heir[item]
        }

        this.displayheir = this.heir
        break
      }
    }
  }

  SetNavigationTree(structure,pages)
  {
    for(var object in structure)
    {
      if(object != 'items' && object != "showchildren")
        this.SetNavigationTree(structure[object],pages)
    }
    if(structure.items != undefined)
    {
      for(var pageItem in structure.items)
      {
        for(var userCustomer in pages)
        {
          if(userCustomer == structure.items[pageItem].page.customer)
          {
            var idmatch = false

            for(var pageid of pages[userCustomer])
            {
              if(pageid == structure.items[pageItem].page.id)
              {
                idmatch = true
              }
            }

            if(idmatch)
            {
              structure.items[pageItem].enable = true
              break;
            }
            else
            {
              structure.items[pageItem].enable = false
            }
            
          }
        }
      }
    }
  }

  BuildUserPages(structure,pages)
  {
    for(var object in structure)
    {
      if(object != 'items' && object != "showchildren")
        this.BuildUserPages(structure[object],pages)
    }
    if(structure.items != undefined)
    {
      for(var pageItem in structure.items)
      {
        if(structure.items[pageItem].enable)
        {
          var customer = structure.items[pageItem].page.customer
          if(pages[customer] == undefined)
          {
            pages[customer] = []
          }

          pages[customer].push(structure.items[pageItem].page.id)
        }
      }
    }
  }

  UpdateUser()
  {
    var out = {}
    this.BuildUserPages(this.displayheir,out)

    for(var cust of this.customers)
    {
      var exists = false 

      for(var omer in out)
      {
        if(cust == omer)
        {
          exists = true
          break
        }
      }
      if(!exists)
      {
        out[cust] = []
      }
    }
    
    for(var user of this.pageassignments)
    {
      if(user.email == this.currentuser)
      {

        for(var customer in out)
        {
          if(user.pages[customer])
          {
            user.pages[customer] = out[customer]
          }
        }

        this.saveable = true
        this.disableuserchange = false
        this.currentuser = ""
        break;
      }
    }

  }

  HeirarchyValueChanged()
  {
    if(this.currentuser != "")
    {
      this.disableuserchange = true
      this.saveable = false
    }
  }
  
  SaveUsers()
  {
    const message = {requesttype: "set page assignments", user:this.userauth.email ,assignments:this.pageassignments}
    this.http.post<any>("http://" + this.commservice.ipaddressorhostname + ":3004/api/posts",message).subscribe((res) => 
    {
      //add code to tell parent that page was saved and we can now navigate again
    })
    this.saveable = false
  }
}
