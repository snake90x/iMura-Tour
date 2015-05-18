#!/usr/bin/python
# -*- coding: utf-8 -*-

from SPARQLWrapper import SPARQLWrapper

sparql = SPARQLWrapper("http://localhost:3030/ds/query", returnFormat="json")
sparql.setQuery("""
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX sioc: <http://rdfs.org/sioc/ns#>
PREFIX oa: <http://www.w3.org/ns/oa#>

SELECT DISTINCT ?person ?username
WHERE {
    ?person rdf:type foaf:Person .
    ?user
        rdf:type sioc:UserAccount ;
        sioc:account_of ?person .
    OPTIONAL { ?user sioc:name ?username }
    ?annotation
        rdf:type oa:Annotation ;
        oa:annotatedBy ?user
}
ORDER BY ?username
""")

print sparql.query().convert()

