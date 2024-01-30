<script>
import '/public/main.css';
import util from '../lib/util.js';


  const defaultPropertySets = {
        'en' : ['title','image','abstract','line','P27','P569','P19','P570','P20','P26','P103','P106','P101','P135','P136','P69','P800','P172','P108','P463','P166']
  }

export default {
  components: {

  },

  data: function() {
    return { 
      errorMsg: null,
      wikidataPropertyMap: {},
      wikidata: {},
      showMoreAbstract: false,
    }
  },
//default: "Woolf, Virginia, 1882-1941" 

  props: {
    "auth-heading": { type: String, required: false},
    lccn: { type: String, required: false, default: 'n 79041870'},
    qid: { type: String, required: false},
    "max-width": { type: Number, required: false, default: 300},
    type: { type: String, required: false, default: 'name'},
    lang: { type: String, required: false, default: 'en'},
    properties: { type: String, required: false, default: defaultPropertySets['en'].join(',')},
    'circle-avatar-layout': { type: Boolean, required: false, default: false},
  },

  methods: {

    // storeWikidataProperty

  },

  async mounted(){
    
    this.wikidataPropertyMap = await util.storeWikidataProperty(this.properties,this.lang)

    if (this.qid){

    }else if (this.lccn){

      let qid = await util.getQidFromLccn(this.lccn)

      if (qid){

        this.wikidata = await util.requestWikidata(qid, this.properties,this.lang)

      }else{
        this.errorMsg = "Could not resolve Qid from Lccn"  
      }

    }else if (this.authHeading){

      let qid = await util.getQidFromAuthHeading(this.authHeading,this.type)

      if (qid){

        this.wikidata = await util.requestWikidata(qid, this.properties,this.lang)

      }else{
        this.errorMsg = "Could not resolve Qid from Auth Heading"  
      }

    }else{

      this.errorMsg = "No Qid, LCCN or Authorized Heading provided"

    }




  }
}

</script>

<template>
  <aside class="container">
    <template v-if="circleAvatarLayout">
      <section :style="'max-width:' + maxWidth + 'px'">
        <template v-for="prop in properties.split(',')">
          <template v-if="prop == 'title' && circleAvatarLayout">
            <div v-if="wikidata.title" class="title">{{wikidata.title}}</div>
          </template>
          <template v-else-if="prop == 'image' && circleAvatarLayout">
            <div class="thumbnail-round" :style="'background-image: url(' + wikidata.thumbnail + ');'">
              
            </div>
          </template>

        </template>
      </section>


    </template>
    <section class="vanes" :style="'max-width:' + maxWidth + 'px'">
      <div class="error-msg" v-if="errorMsg">{{errorMsg}}</div>



      <template v-for="prop in properties.split(',')">


        <template v-if="prop == 'title' && !circleAvatarLayout">
          <div v-if="wikidata.title" class="title">{{wikidata.title}}</div>
        </template>
        <template v-else-if="prop == 'image' && !circleAvatarLayout">
          <img v-if="wikidata.thumbnail" class="thumbnail" :style="'max-width:' + maxWidth + 'px; max-height:200px;'"  :src="wikidata.thumbnail">
        </template>
        <template v-else-if="prop == 'abstract'">
          <template v-if="wikidata.abstract && wikidata.abstract.length>0">
            <div class="abstract">{{wikidata.abstract[0]}}           <a v-if="showMoreAbstract==false" class="abstract-more" @click.prevent="showMoreAbstract=true" href="#">more...</a></div>
            <div v-if="showMoreAbstract==true" class="abstract">
              <div v-for="a in wikidata.abstract.slice(1)">{{a}}</div>
            </div>

          </template>
        </template>
        <template v-else-if="prop == 'line'"><hr></template>
        <template v-else>
          <div class="plist">

            <div class="p-label" v-if="wikidata.claims && wikidata.claims[prop]">{{wikidataPropertyMap[prop]}}</div>

            <template v-if="wikidata.claims">          
              <div class="p-value" v-for="w in wikidata.claims[prop]">

                <template v-for="c in w">
                  <template v-if="c.qid">
                    <div><a target="_blank" :href="'https://www.wikidata.org/entity/'+c.qid">{{c.label}}</a></div>
                  </template>
                  <template v-else>
                    <span>{{c.label}}</span>            
                  </template>
                </template>
              </div>
            </template>
          </div>
        </template>


          
      </template>


    </section>
  </aside>
</template>

<style>


  .container{
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
  .vanes{
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

</style>
