import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import util from './lib/util';
import {WikidataInternalData, LCCNEnrichmentData} from './lib/util';


@customElement('meta-vane')
export class MetaVane extends LitElement {


  // optional (1 of the 3 req) the text heading to lookup the LCCN to lookup the Qid
  @property({ type: String }) authHeading = ""
  // optional (1 of the 3 req) the lccn number, can be normaized or not
  @property({ type: String }) lccn = ""
  // optional (1 of the 3 req) the wikidata qid if known
  @property({ type: String }) qid = ""
  // the language things should appear if available, en, es, de, etc..
  @property({ type: String }) lang = ""
  // a comma delimited string of what to dispaly in the panel, will select the default if not provided
  @property({ type: String }) properties = ""
  // the layout style, allows for expanding and adding different types of layouts
  @property({ type: String }) layout = ""
  @property({ type: String }) authority = ""

  @state() wikidata: WikidataInternalData = {
    qid: '',
    abstract: [],
    thumbnail: '',
    claims: {},
    title: '',
    pediaLink: '',
    error: true    
  }

  @state() showFullAbstract: boolean = false
  @state() wikidataPropertyMap: { [key: string]: string; } = {};
  @state() wikidataPropertyFormatterMap: { [key: string]: string; } = {};
  @state() enhancementData: LCCNEnrichmentData = {
    authorityType: []
  }

  

  constructor() {
    super();
  
    // we are setting the default values, will get overwritten by the attribute properties if provided
    this.properties = util.defaultPropertySets['en']
    this.lang = "en"
    this.authority = 'names'
    this.layout = 'default'
    this.showFullAbstract = false
   

  }

  connectedCallback() {
    super.connectedCallback()  
    
  }
  // willUpdate(changedProperties: PropertyValues<this>) {
  //   console.log(changedProperties)
  // }
  async firstUpdated() {
    

    // load the propery names
    ({labelMap: this.wikidataPropertyMap, formatter: this.wikidataPropertyFormatterMap} =  await util.storeWikidataProperty(this.properties,this.lang))
  
    
    if (this.qid){


    }else if (this.lccn){

      let qid = await util.getQidFromLccn(this.lccn)

      if (qid){
        this.wikidata = await util.requestWikidata(qid, this.properties,this.lang)
      }else{
        console.warn("Meta-vane: Could not resolve ",this.lccn, 'to Wikidata Qid')
      }

      this.enhancementData = await util.enrichLCCN(this.lccn,this.authority)



    }else if (this.authHeading){

      let r = await util.getQidFromAuthHeading(this.authHeading,this.authority)
      
      if (typeof r.lccn == 'string'){
        this.lccn = r.lccn
      }

      if (r.qid){

        this.wikidata = await util.requestWikidata(r.qid, this.properties,this.lang)

      }else{
        console.warn("Meta-vane: Could not resolve ",this.authHeading, 'to Wikidata Qid')
      }

      this.enhancementData = await util.enrichLCCN(this.lccn,this.authority)


    }else{

      // this.errorMsg = "No Qid, LCCN or Authorized Heading provided"

    }


  }

  _moreAbstractClick(e: Event) {
    this.showFullAbstract=true
    e.preventDefault()
    return false
  }
  _wikiThisDisplayClick(e: Event) {
    e.preventDefault()
    return false
  }
  
  
  



  render() {

    // const itemTemplates = [];
    // if (this.properties){
    //   for (const i of this.properties.split(",")) {
    //     itemTemplates.push(html`<p>${i}</p>`);
    //   }
    // }

    let layout = html``

    if (this.layout == 'default'){

      
      

      let image = html``
      let title = html``

        if (this.wikidata.thumbnail != ''){
          let thumbnailStyle = "thumbnail-round"
          if (this.enhancementData.authorityType.indexOf("Geographic") > -1 || this.enhancementData.authorityType.indexOf("CorporateName") > -1) {
            thumbnailStyle = "thumbnail-square"
          }
          
          image = html`<div class="${thumbnailStyle}" style="background-image: url(${this.wikidata.thumbnail});">`
        }
        if (this.wikidata.title != ''){
          title = html`<h1 class="title">${this.wikidata.title}</h1>`
        }

        // the main layout loop, go though and build for each type
      let topContent = []
      let content = []
      let previousProp = ''
      for (let prop of this.properties.split(",")){
        if (prop === 'title'){
          topContent.push(title)
        }else if (prop === 'image'){
          topContent.push(image)
        }else if (prop === 'line'){

          // some rules
          if (previousProp == 'abstract' && this.wikidata.abstract.length == 0){
            continue
          }

          content.push(html`<hr/>`)


        }else if (prop === 'abstract'){
          if (this.wikidata.abstract.length>0){
            if (this.showFullAbstract){
              for (let c of this.wikidata.abstract){
                content.push(html`<div class="abstract">${c}</div>`)
              }
            }else{
              content.push(html`<div class="abstract">${this.wikidata.abstract[0]}...<a href="" @click="${this._moreAbstractClick}">more</a></div>`)
            }
          }

        }else if (prop === 'disclaimer'){

          let sources = []

          if (this.wikidata.qid != null && this.wikidata.qid != ''){
            sources.push(html`<a href="https://www.wikidata.org/entity/${this.wikidata.qid}" target="_blank">Wikidata</a>`)
          }
          if (this.wikidata.abstract != null && this.wikidata.abstract.length >0){
            if (sources.length>0){ sources.push(html`<span>&nbsp;/&nbsp;</span>`) }
            sources.push(html`<a href="${this.wikidata.pediaLink}" target="_blank">Wikipedia</a>`)
          }

          content.push(html`
          <div class="disclaimer">
            Information in this <a href="#" title="Hover to draw a box around the data this statement is referring to" @click="${this._wikiThisDisplayClick}" class="display-trigger">display</a> is provided by the external data sources ${sources} and is not created by the Library of Congress.
          </div>`)
          

        // the wiki properties
        }else{

          if (this.wikidata.claims[prop]){
            let pValues = []
            pValues.push(html`<div class="p-label">${this.wikidataPropertyMap[prop]}</div>`)           
            for (let c of this.wikidata.claims[prop].values){
              
              if (c.qid){
                pValues.push(html`<div class="p-value"><a target="_blank"  href="https://www.wikidata.org/entity/${this.wikidata.qid}#${this.wikidata.claims[prop].pid}">${c.label}</a></div>`)
              }else{
                console.log("c.type",c.type,c)
                if (c.type == 'url'){
                  pValues.push(html`<div class="p-value"><a target="_blank"  href="${c.label}">${c.label}</a></div>`)
                }else if (c.type == 'external-id'){
                  pValues.push(html`<div class="p-value"><a target="_blank"  href="${this.wikidataPropertyFormatterMap[prop].replace('$1',c.label)}">${c.label}</a></div>`)
                  
                  
                }else{
                  pValues.push(html`<div class="p-value">${c.label}</div>`)
                }
                
              }            
            }
            let plist = html`<div class="plist">${pValues}</div>`
            content.push(plist)
          }


        }

        previousProp = prop

      }


      let wikAside = html`
        <div class="display-hilite">
        ${topContent} 
        <div class="content">       
          ${content}
        </div>
        </div>
      `
      if (this.wikidata.qid == ''){
        wikAside = html``
      }



      layout = html`
        <section>
          ${wikAside}
        </section>
        
      
      
      `


    }




    return html`
      ${layout}
    `
  }


  static styles = css`
    :host {
      max-width: 400px;
      padding: 2rem;
      font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
      color: #333;      
      
    }
    .title{
      text-align: center;
      font-size: 1.25em;
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
    img{
      object-fit: cover;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .content{
      border: solid 1px #e1e1e1;
      border-radius: 0.5em;
      padding: 0.25em;
    }
    
    .abstract{
      text-align: justify;
      font-size: 0.85em;
      margin-top: 0.25em;
    }
    .abstract-more{
      font-size: 0.85em;
    
    }
    .thumbnail-round{
      border-radius: 20em;
      height: 250px;
      width: 250px;
      background-size: cover;
        background-position-x: center;
        background-repeat: no-repeat;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1em;
        border: solid 1px #e1e1e1;
    }

    .thumbnail-square{
      border-radius: 0em;
      height: 250px;
      width: 250px;
      background-size: cover;
        background-position-x: center;
        background-repeat: no-repeat;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1em;
        border: solid 1px #e1e1e1;

    }
    
    hr{
      border: none;
      border-top: solid 1px #e1e1e1;
    }
    .plist{
      margin-top: 0.15em;
      margin-bottom: 0.15em;
    }
    div.plist:nth-of-type(even){
      background-color: #fafafa;
    }
    
    .p-label{
      font-style: oblique;
    }
    .p-value{
      text-align: right;
    
    }
    .p-value a{
      color: #333 !important;
      display: inline-block;
      margin-bottom: 0.1em;
      text-decoration: none;
    }
    .p-value a:hover{
      text-decoration: underline;
    }
    .p-value a:focus{
      text-decoration: underline;
    }
    .p-value a:active{
      text-decoration: underline;
    }

    .disclaimer a, .disclaimer a:visited{
      color: #333;
      text-decoration: none;

    }
    .display-hilite{
      padding: 1px;
    }
    .display-hilite:has(.display-trigger:hover) {
      border: dashed 1px red;
      padding: 0;
    }

    .disclaimer{
      font-size:0.9em;
      padding: 1em;
      text-align:center;
      color: tomato;
    }

  `
}

declare global {
  interface HTMLElementTagNameMap {
    'meta-vane': MetaVane
  }
}
