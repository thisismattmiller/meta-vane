
import ignoreList from './ignore.json';


interface WikidataInternalClaimItem {
  qid: string | null,
  label: string | null,
  type: string

}

interface WikidataInternalClaimValue {
  pid: string,
  values: WikidataInternalClaimItem[],
}

interface WikidataInternalClaim {
  [key: string]: WikidataInternalClaimValue
}
interface fromAuthHeadingObj {
  qid: string | null | undefined,
  lccn: string | null | undefined
}
export interface LCCNEnrichmentData {
  authorityType: string[],
}



export interface WikidataInternalData {
  qid: string,
  abstract: string[],
  thumbnail: string,
  claims: WikidataInternalClaim,
  title: string,
  pediaLink: string,
  error: boolean
}

interface WikidataSPARQLResultItem {
  // item: {
  //   type: string,
  //   value: string
  // },
  // itemLabel: {
  //   "xml:lang" : string,
  //   type : string,
  //   value : string
  // },
  // property: {
  //   type: string,
  //   value: string
  // },
  // propertyLabel: {
  //   "xml:lang" : string,
  //   type : string,
  //   value : string
  // },
  [key: string]: {
    "xml:lang" : string,
    type : string,
    value : string
  }
  
}
interface WikidataSPARQLResultResults {
  bindings: WikidataSPARQLResultItem[]
}
interface WikidataSPARQLResult {
  head: object,
  results: WikidataSPARQLResultResults,  
}




export default {


  wikidataSPARQLEndpoint : 'https://query.wikidata.org/sparql',

  
  defaultPropertySets: {
    'en' : 'title,image,abstract,line,P27,P569,P19,P570,P20,P26,P103,P106,P101,P135,P136,P69,P800,P172,P108,P463,P166,P361,P6,P571,P138,P1549,P30,P17,P1376,P610,P1082,P793,P2238,P856,disclaimer'
  },
  

  camel2Dash: function(str: string): string{
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
  },


  
  /*
  *  Keeps the wikidata property label mapping updated and stored in local storage
  *
  */
  storeWikidataProperty: async function(properties: string | string[],lang: string){

    // it comes from the props as a big string comma seperated
    if (typeof(properties) == 'string'){
      properties = properties.split(',')
    }

    // filter out only the wikidata properties
    const regex = new RegExp('^P[0-9]+$', 'i');
    const matchedProperties = properties.filter(e => 
      regex.test(e));
    
    // build the sparql
    const sparql = `
      SELECT ?property ?propertyLabel 
      WHERE 
      {
        VALUES ?property {wd:${matchedProperties.join(' wd:')}}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${lang}". }
      }
    `

    if (localStorage.getItem(`vanes-wikidata-property-label-map-${lang}`) === null){

      // not stored for this one sparql it
      let results = await this.wikiSPARQLQuery(sparql)
      let map: { [key: string]: string; } = {};

      for (let p of results.results.bindings){
        let pNumber: string = p.property.value.split('/')[4]
        map[pNumber] = p.propertyLabel.value
      }
     
      localStorage.setItem(`vanes-wikidata-property-label-map-${lang}`, JSON.stringify({'ts':Math.floor(Date.now()/1000),'map':map}))

      return map
      
    }else{
      
      let needsRefresh = false;
      // we do have it so decode it and see if it is not too old and if it has everything we are looking for
      // if not do the request and store
      let storedJsonAsString: null | string = localStorage.getItem(`vanes-wikidata-property-label-map-${lang}`)
      if (storedJsonAsString == null){
        console.log("Error could not find ", `vanes-wikidata-property-label-map-${lang}`, 'in local storage')
        return false
      }
      let data = JSON.parse(storedJsonAsString)      
      let ts: number = data.ts
      let map = data.map
      if (Math.floor(Date.now()/1000) - ts >= 86400){
        // too old, we need to do it again
        needsRefresh = true
      }
      for (let p of matchedProperties){
        if (Object.keys(map).indexOf(p) == -1){
          needsRefresh = true
        }
      }

      if (needsRefresh){
        let results = await this.wikiSPARQLQuery(sparql)
        let map: { [key: string]: string; } = {};
        for (let p of results.results.bindings){
          map[p.property.value.split('/')[4]] = p.propertyLabel.value
        }
        localStorage.setItem(`vanes-wikidata-property-label-map-${lang}`, JSON.stringify({'ts':Math.floor(Date.now()/1000),'map':map}))
      }
      return map

    }  

  },
  
  /*
  *  Executes a SPARQL query against Wikidata and returns JSON response
  *
  */
  wikiSPARQLQuery: async function(sparql: string): Promise<WikidataSPARQLResult>{

    
    const options = {
        method: 'GET',
        headers: new Headers({'Accept': 'application/sparql-results+json', 'User-Agent': "Vanes - Javascript Knowledge Panel Library"}),
    };


    const response = await fetch(this.wikidataSPARQLEndpoint + '?origin=*&format=json&' + new URLSearchParams({
        query: sparql
    }), options);

    const responseData = await response.json();

    return responseData

  },


   
  /*
  *  Ask the id.loc.gov label service for the Lccn of the Auth heading and then ask for the Qid from wikidata
  *
  */
  getQidFromAuthHeading: async function(authHeading: string,type: string): Promise<fromAuthHeadingObj>{

    let url: string = ""

    if (type == 'names'){
      url = 'https://id.loc.gov/authorities/names/label/' + window.encodeURI(authHeading)
    }else{
      console.error("could not build URL for authheading -> lccn process")
    } 

    let lccn: string | undefined = ''

    const response = await fetch(url,{method: 'HEAD'})
    if (response !== null){
      lccn = response.headers.get('x-uri')!.split('/').pop()
    }else{
      console.error("Could not talk to id.loc.gov service to return the lccn for the label")
    }

    // okay now sparql query for the QID
    let sparql = `
      SELECT ?item ?itemLabel 
      WHERE 
      {
        ?item wdt:P244 "${lccn}".
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `
    let qid = null
    let results = await this.wikiSPARQLQuery(sparql)
    if (results && results.results && results.results.bindings){
      for (let r of results.results.bindings){
        qid = r.item.value.split('/').pop()
        break
      }
    }    
    return {qid: qid, lccn: lccn }

  },
  /*
  *  Ask for the Qid from wikidata via p244
  *
  */
  getQidFromLccn: async function(lccn: string){

    // normalize
    lccn = lccn.replace(/\s+/g,"")

    let qid = null

    // okay now sparql query for the QID
    let sparql = `
      SELECT ?item ?itemLabel 
      WHERE 
      {
        ?item wdt:P244 "${lccn}".
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `
    let results = await this.wikiSPARQLQuery(sparql)
    if (results && results.results && results.results.bindings){
      for (let r of results.results.bindings){
        qid = r.item.value.split('/').pop()
        break
      }
    }
    
    return qid

  },

  /*
  *  Ask for the Qid from wikidata via p244
  *
  */
  requestWikidata: async function(qid: string,properties: string | string[],lang: string): Promise<WikidataInternalData>{


    let results: WikidataInternalData ={
      qid: "",
      abstract: [],
      thumbnail: "",
      claims: {},
      title: "",
      pediaLink: '',
      error: false
    } 
    if (ignoreList.indexOf(qid) > -1){ 
      results.error = true
      return results
    }

    // it comes from the props as a big string comma seperated
    if (typeof(properties) == 'string'){
      properties = properties.split(',')
    }

    // filter out only the wikidata properties
    const regex = new RegExp('^P[0-9]+$', 'i');    
    const PProperties = properties.filter(e => 
      regex.test(e));
    
    // we need info to build the other possible URLs that need to be requested
    let selectStatement: string = ''
    let selectOptional: string[] = []
    let selectLabels: string[] = []

    for (let p of PProperties){
      selectStatement = selectStatement + `(GROUP_CONCAT(DISTINCT(?${p}); separator = "<SEP>") AS ?${p}Uris) (GROUP_CONCAT(DISTINCT(?${p}Label); separator = "<SEP>") AS ?${p}Labels) `
      selectOptional.push(`OPTIONAL{ wd:${qid} wdt:${p} ?${p}. }`)    
      selectLabels.push(`?${p} rdfs:label ?${p}Label .`)
    }

    // let sparql = `
    //   SELECT ?item ?itemLabel ${selectStatement}
    //   WHERE 
    //   {
    //     ${selectOptional.join("\n")}
    //     SERVICE wikibase:label { 
    //       bd:serviceParam wikibase:language "${lang}". 
    //       ?item rdfs:label ?itemLabel .      
    //       ${selectLabels.join("\n")}

    //     }
    //   }
    //   GROUP BY ?item ?itemLabel
    // `
    //   console.log(sparql)
    interface WikidataTmpData {
      qid: string,
      lang: string,
      titleEncoded: string,
      server: string,
      thumbInfoUrl: string,
      articleInfoUrl: string,
      title: string,
      link: string,
      allData: object,

    }
    
    const entityDataResponse = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`);
    const entityDataData = await entityDataResponse.json();
    
    let flags_politician = false
    if (JSON.stringify(entityDataData).indexOf('Q82955') > -1){
      flags_politician = true
    }

    if (entityDataData && entityDataData.entities && entityDataData.entities[qid]){
        // var labels = entityDataData.entities[qid].labels
        var sitelinks = entityDataData.entities[qid].sitelinks
        var data: { [key: string]: WikidataTmpData; } = {};
        var claims = entityDataData.entities[qid].claims
        
        Object.keys(sitelinks).forEach((sl)=>{
            var siteLang : string = sl.split('wiki')[0]
            if (siteLang.indexOf('_old')>-1){
                return false;
            }
            var articleTitle = sitelinks[sl].url.split('/wiki/')[1]
            var articleServer = sitelinks[sl].url.split('/wiki/')[0]
            var wikiThumb = articleServer + '/w/api.php?action=query&titles=' + articleTitle  + '&prop=pageimages&format=json&pithumbsize=640&origin=*'
            var articleText = articleServer + '/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=' + articleTitle + '&origin=*'
            var title = sitelinks[sl].title
            var link = sitelinks[sl].url
            
            if (link.indexOf('wikipedia')>-1){                       
               data[siteLang] = {
                   qid : qid,
                   lang : siteLang,
                   titleEncoded: articleTitle,
                   server: articleServer,
                   thumbInfoUrl: wikiThumb,
                   articleInfoUrl: articleText,
                   title: title,
                   link: link,                   
                   allData: data
               }
            }                    
        })

        
        if (data[lang]){

          // we need to extract the values being used for this item and build a query to grab their labels
          let needLabels: { [key: string]: string | null; } = {};
          interface propertiesAndValuesItem {
            qid: string | null,
            label: string | null,
            type: string,
            rank: string   
          }

          let propertiesAndValues: { [key: string]: propertiesAndValuesItem[]; } = {};


          for (let p of PProperties){
            if (claims[p]){
              propertiesAndValues[p] = []

              for (let c of claims[p]){
        
                if (c.mainsnak.datatype == 'wikibase-item'){
                  
                  if (c.mainsnak && c.mainsnak.datavalue){
                    propertiesAndValues[p].push({
                      qid: c.mainsnak.datavalue.value.id,
                      label: null,
                      type: c.mainsnak.datatype,
                      rank: c.rank
                    })
                  }
                  needLabels[c.mainsnak.datavalue.value.id] = null
                }else if (c.mainsnak.datatype == 'string'){                
                  if (c.mainsnak && c.mainsnak.datavalue){
                    propertiesAndValues[p].push({
                      qid: null,
                      label: c.mainsnak.datavalue.value,
                      type: c.mainsnak.datatype,
                      rank: c.rank
                    })
                  }
                }else if (c.mainsnak.datatype == 'url'){
                  if (c.mainsnak && c.mainsnak.datavalue){
                    propertiesAndValues[p].push({
                      qid: null,
                      label: c.mainsnak.datavalue.value,
                      type: c.mainsnak.datatype,
                      rank: c.rank
                    })
                  }
                }else if (c.mainsnak.datatype == 'time'){
                    if (c.mainsnak && c.mainsnak.datavalue){
                    propertiesAndValues[p].push({
                      qid: null,
                      label: c.mainsnak.datavalue.value.time.split("T")[0].replace("+",''),
                      type: c.mainsnak.datatype,
                      rank: c.rank
                    })
                  }
                }else if (c.mainsnak.datatype == 'external-id'){
                    if (c.mainsnak && c.mainsnak.datavalue){
                    propertiesAndValues[p].push({
                      qid: null,
                      label: c.mainsnak.datavalue.value,
                      type: c.mainsnak.datatype,
                      rank: c.rank
                    })
                  }
                }else if (c.mainsnak.datatype == 'commonsMedia'){
                    if (c.mainsnak && c.mainsnak.datavalue){
                    propertiesAndValues[p].push({
                      qid: null,
                      label: c.mainsnak.datavalue.value,
                      type: c.mainsnak.datatype,
                      rank: c.rank
                    })
                  }
                }else if (c.mainsnak.datatype == 'monolingualtext'){
                    if (c.mainsnak && c.mainsnak.datavalue){
                    propertiesAndValues[p].push({
                      qid: null,
                      label: c.mainsnak.datavalue.value.text,
                      type: c.mainsnak.datatype,
                      rank: c.rank
                    })
                  }
                }else if (c.mainsnak.datatype == 'quantity'){
                    if (c.mainsnak && c.mainsnak.datavalue){
                    propertiesAndValues[p].push({
                      qid: null,
                      label: c.mainsnak.datavalue.value.amount,
                      type: c.mainsnak.datatype,
                      rank: c.rank
                    })
                  }
                }

              }

              

              
            }

          }

          // clean up based on rank, remove depreciated
          // if there is a perfered remove all else
          for (let p in propertiesAndValues){
            propertiesAndValues[p] = propertiesAndValues[p].filter((v)=>{ return (v.rank != 'deprecated') })
            let pref = propertiesAndValues[p].filter((v)=>{ return (v.rank == 'preferred') })
            if (pref.length > 0){
              propertiesAndValues[p] = pref
            }
          }

          
          // build sparql to ask for labels for these qid values, looks like this https://w.wiki/99YB
          let sparql = `
            SELECT ?item ?itemLabel 
            WHERE 
            {              
              VALUES ?item {wd:${Object.keys(needLabels).join(" wd:").trim()}}              
              SERVICE wikibase:label { bd:serviceParam wikibase:language "${lang}". }
            }                         
          ` 


          // we are going to do the SPARQL the Thumbnail and Article abstract at once and resolve them
          let sparqlResultsPromise = this.wikiSPARQLQuery(sparql)


          let articleInfoPromise: Promise<Response> | Promise<null>
          if (data[lang].articleInfoUrl){
            articleInfoPromise = fetch(data[lang].articleInfoUrl)          
          }else{
            articleInfoPromise = Promise.resolve(null)
          }

          let thumbnailPromise: Promise<Response> | Promise<null>
          if (data[lang].thumbInfoUrl){
            thumbnailPromise = fetch(data[lang].thumbInfoUrl)          
          }else{
            thumbnailPromise = Promise.resolve(null)
          }


          const [sparqlResults, articleInfoResponse, thumbnailResponse] = await Promise.all([sparqlResultsPromise, articleInfoPromise, thumbnailPromise]);

          

          let articleInfoResults = await articleInfoResponse!.json()

          if (articleInfoResults && articleInfoResults.query && articleInfoResults.query.pages){
            let keys = Object.keys(articleInfoResults.query.pages)
            results.abstract = articleInfoResults.query.pages[keys[0]].extract.split("\n")
          }

          if (results.abstract[0]){
            // if the first entry is long cut it off and add it to the rest
            if (results.abstract[0].length >= 725){
              let newAbstrct = []
              let first725 = results.abstract[0].substring(0, 725)
              let theRest = results.abstract[0].substring(725)

              newAbstrct.push(first725)
              newAbstrct.push(theRest)

              results.abstract.forEach(function (value, i) {
                if (i != 0){
                  newAbstrct.push(value)
                }
              });            

            }

          }



          let thumbnailResults = await thumbnailResponse!.json()

          if (thumbnailResults && thumbnailResults.query && thumbnailResults.query.pages){
            let keys = Object.keys(thumbnailResults.query.pages)
            if (thumbnailResults.query.pages[keys[0]].thumbnail && thumbnailResults.query.pages[keys[0]].thumbnail.source){
              results.thumbnail = thumbnailResults.query.pages[keys[0]].thumbnail.source
            }
          }


          // fill in labels
          for (let r of sparqlResults.results.bindings){
            let q = r.item.value.split('/').pop()
            let l = r.itemLabel.value
            // look for it in the data
            for (let p in propertiesAndValues){
              for (let c of propertiesAndValues[p]){
                if (c.qid === q){
                  c.label = l
                }
              }
            }

          }
          // add it to the final results
          for (let p in propertiesAndValues){

            let propertyValues: WikidataInternalClaimValue = {
              pid: p,
              values: []
            }    

            for (let c of propertiesAndValues[p]){
              let item: WikidataInternalClaimItem = {
                qid: c.qid,
                label: c.label,
                type: c.type
              }
              propertyValues.values.push(item)
            }

            if (propertyValues.values.length>0){
              results.claims[p] = propertyValues
            }


          }          

          if (flags_politician == true){
            results.abstract = []
          }          

          results.title = data[lang].title
          results.qid = data[lang].qid
          results.pediaLink = data[lang].link
          return results

        }else{
          results.error = true
          return results
        }
    }else{
      results.error = true
      return results
    }




  },

   
  /*
  *  Ask the id.loc.gov for some info about this record
  *
  */
  enrichLCCN: async function(lccn: string, authority: string): Promise<LCCNEnrichmentData>{
    let results: LCCNEnrichmentData = {
      authorityType: []
    }


    
    const madsResponse = await fetch(`https://id.loc.gov/authorities/${authority}/${lccn}.madsrdf.json`);
    const madsData = await madsResponse.json();

    let uri = `http://id.loc.gov/authorities/${authority}/${lccn}`

    for (let graph of madsData){
      if (graph['@id'] == uri){
        if (graph['@type']){
          if (!Array.isArray(graph['@type'])){
            graph['@type'] = [graph['@type']]
          }
          for (let t of graph['@type']){
            t = t.split('#').pop()
            results.authorityType.push(t)
          }
        }
      }


    }
    
    return results
  },  



  



}