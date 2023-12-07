
export class SiteStorageService
{
    siteStructure = null

    setStructure(structure)
    {
        this.siteStructure = structure
    }

    getStructure()
    {
        return this.siteStructure
    }   
}