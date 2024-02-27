import { assert, expect, test } from 'vitest'
import util from '../src//lib/util';

// testing storeWikidataProperty and wikiSPARQLQuery, that it can communicate to wikidata sparql endpoint
test('storeWikidataProperty and wikiSPARQLQuery // means Wikidata SPARQL works', async () => {
    let result = await util.storeWikidataProperty(util.defaultPropertySets['en'],'en')
    expect(result.labelMap.P569).toBe('date of birth')
})

test('getQidFromAuthHeading // means id.loc.gov label service works and Wikidata SPARQL works', async () => {
    let result = await util.getQidFromAuthHeading('Deleuze, Gilles, 1925-1995','names')
    expect(result.qid).toBe('Q184226')
    expect(result.lccn).toBe('n79006797')
})

test('getQidFromLccn //  Wikidata SPARQL works', async () => {
    let result = await util.getQidFromLccn('n79006797')
    expect(result).toBe('Q184226')
})

test('requestWikidata //  Wikidata special data page', async () => {
    let result = await util.requestWikidata('Q184226',util.defaultPropertySets['en'],'en')
    expect(result.pediaLink).toBe('https://en.wikipedia.org/wiki/Gilles_Deleuze')
})
