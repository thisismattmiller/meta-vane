export default {


  wikidataSPARQLEndpoint : 'https://query.wikidata.org/sparql',


  
  /*
  *  Keeps the wikidata property label mapping updated and stored in local storage
  *
  */
  storeWikidataProperty: async function(properties,lang){

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
      let map = {}
      for (let p of results.results.bindings){
        map[p.property.value.split('/')[4]] = p.propertyLabel.value
      }
      localStorage.setItem(`vanes-wikidata-property-label-map-${lang}`, JSON.stringify({'ts':parseInt(Date.now()/1000),'map':map}))

      return map
      


    }else{
      
      let needsRefresh = false;
      // we do have it so decode it and see if it is not too old and if it has everything we are looking for
      // if not do the request and store

      let data = JSON.parse(localStorage.getItem(`vanes-wikidata-property-label-map-${lang}`))      
      let ts = data.ts
      let map = data.map
      if (parseInt(Date.now()/1000) - ts >= 86400){
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
        let map = {}
        for (let p of results.results.bindings){
          map[p.property.value.split('/')[4]] = p.propertyLabel.value
        }
        localStorage.setItem(`vanes-wikidata-property-label-map-${lang}`, JSON.stringify({'ts':parseInt(Date.now()/1000),'map':map}))

      }
      return map

    }

    

  },

  /*
  *  SPARQL queries wikidata for the property list
  *
  */
  getWikidataProperty: function(){


  },

  /*
  *  Executes a SPARQL query against Wikidata and returns JSON response
  *
  */
  wikiSPARQLQuery: async function(sparql){

    
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
  getQidFromAuthHeading: async function(authHeading,type){

    let url

    if (type == 'name'){
      url = 'https://id.loc.gov/authorities/names/label/' + window.encodeURI(authHeading)
    }

    const response = await fetch(url,{method: 'HEAD'})

    let lccn = response.headers.get('x-uri').split('/').pop()

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
    
    return qid

  },
  /*
  *  Ask for the Qid from wikidata via p244
  *
  */
  getQidFromLccn: async function(lccn){


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
  requestWikidata: async function(qid,properties,lang){

    // it comes from the props as a big string comma seperated
    if (typeof(properties) == 'string'){
      properties = properties.split(',')
    }

    // filter out only the wikidata properties
    const regex = new RegExp('^P[0-9]+$', 'i');
    const PProperties = properties.filter(e => 
      regex.test(e));

    
    // we need info to build the other possible URLs that need to be requested

    console.log(PProperties)

    let selectStatement = ""
    let selectOptional = []
    for (let p of PProperties){
      selectStatement = selectStatement + `?${p} ?${p}Label `
      selectOptional.push(`OPTIONAL{ wd:${qid} wdt:${p} ?${p}. }`)
    }
    console.log(selectStatement)

    let sparql = `
      SELECT ?item ?itemLabel ${selectStatement}
      WHERE 
      {
          ${selectOptional.join("\n")}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `

    const entityDataResponse = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`);
    const entityDataData = await entityDataResponse.json();
    console.log(entityDataData)
    
    if (entityDataData && entityDataData.entities && entityDataData.entities[qid]){
        var labels = entityDataData.entities[qid].labels
        var sitelinks = entityDataData.entities[qid].sitelinks
        var data = {}
        
        Object.keys(sitelinks).forEach((sl)=>{
            var lang = sl.split('wiki')[0]
            if (lang.indexOf('_old')>-1){
                return false;
            }
            var articleTitle = sitelinks[sl].url.split('/wiki/')[1]
            var articleServer = sitelinks[sl].url.split('/wiki/')[0]
            var wikiThumb = articleServer + '/w/api.php?action=query&titles=' + articleTitle  + '&prop=pageimages&format=json&pithumbsize=640&origin=*'
            var articleText = articleServer + '/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=' + articleTitle + '&origin=*'
            var title = sitelinks[sl].title
            var link = sitelinks[sl].url
            
            if (link.indexOf('wikipedia')>-1){                       
               data[lang] = {
                   qid : qid,
                   lang : lang,
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
        console.log(data[lang].title)
        if (data[lang]){


          // we are going to do the SPARQL the Thumbnail and Article abstract at once and resolve them
          let sparqlResultsPromise = this.wikiSPARQLQuery(sparql)


          let articleInfoPromise
          if (data[lang].articleInfoUrl){
            articleInfoPromise = fetch(data[lang].articleInfoUrl)          
          }else{
            articleInfoPromise = Promise.resolve()
          }

          let thumbnailPromise
          if (data[lang].thumbInfoUrl){
            thumbnailPromise = fetch(data[lang].thumbInfoUrl)          
          }else{
            thumbnailPromise = Promise.resolve()
          }


          const [sparqlResults, articleInfoResponse, thumbnailResponse] = await Promise.all([sparqlResultsPromise, articleInfoPromise, thumbnailPromise]);


          let articleInfoResults = await articleInfoResponse.json()
          let abstract = null
          if (articleInfoResults && articleInfoResults.query && articleInfoResults.query.pages){
            let keys = Object.keys(articleInfoResults.query.pages)
            abstract = articleInfoResults.query.pages[keys[0]].extract.split("\n")
          }

          let thumbnailResults = await thumbnailResponse.json()
          let thumbnail = null
          if (thumbnailResults && thumbnailResults.query && thumbnailResults.query.pages){
            let keys = Object.keys(thumbnailResults.query.pages)
            if (thumbnailResults.query.pages[keys[0]].thumbnail && thumbnailResults.query.pages[keys[0]].thumbnail.source){
              thumbnail = thumbnailResults.query.pages[keys[0]].thumbnail.source
            }
          }

          const regexDateTest = new RegExp('[0-9]+-[0-9]+-[0-9]+T', 'i');


          let values = {}
          let allValuesAdded = []
          for (let p of sparqlResults.results.bindings){

            for (let k in p){
              if (k.indexOf('Label')==-1){
                if (!values[k]){
                  values[k]  = {pid:k,values:[]}
                }
              }
            }

            for (let k in p){
              if (k.indexOf('Label')==-1){


                let v = {qid:null,label:null}
                if (p[k].type == 'uri'){
                  v.qid=p[k].value.split('/').pop()
                }
                v.label = p[k+'Label'].value
                if (regexDateTest.test(v.label)){
                  v.label = v.label.split("T")[0]
                }
                let checkId = `${k}-${v.qid}-${v.label}`

                if (allValuesAdded.indexOf(checkId) === -1){
                  values[k].values.push(v)
                  allValuesAdded.push(checkId)
                }
                

              }
            }


          }

          

          return {
            'abstract': abstract,
            'thumbnail': thumbnail,
            'claims': values,
            'title': data[lang].title

          }



        }else{
          return false
        }


    }else{

      return false
    }




  }



  



}