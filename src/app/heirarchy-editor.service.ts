export class HeirarchyEditor
{  
    GetStructure(pages)
    {
      var heir = {}
      for(var i = 0; i < pages.length; i++)
      {
        var itemArray = []
        if(pages[i].pageheirarchy)
          itemArray = Array.from(pages[i].pageheirarchy)
        itemArray.splice(0,0,pages[i].customer)
        this.SetupNavigationTree(heir,pages[i],itemArray,0)
      }

      return heir
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
  
    SelectNavigationChildren(structure,pages)
    {
      for(var object in structure)
      {
        if(object != 'items' && object != "showchildren")
          this.SelectNavigationChildren(structure[object],pages)
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

    
    GetLevelObjects(structure, items, index)
    {
      var output = []
      if(index < items.length)
      {

        for(var stItem in structure)
        {
          if(stItem == items[index])
          {
            output = this.GetLevelObjects(structure[stItem],items,index+1)
            break
          }
        }

      }
      else
      {
        for(var item in structure)
        {
          if(item != "showchildren" && item != "items")
            output.push(item)
        }
      }
      return output
    }
}