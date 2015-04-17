from flask import Flask, render_template, redirect, request


import json
import urlparse
import re
import string
import os
from SPARQLWrapper import SPARQLWrapper, JSON
import BeautifulSoup
from rdflib.plugins.sparql import sparql
from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore

app = Flask(__name__)

prefix = """
PREFIX  ao: <http://vitali.web.cs.unibo.it/AnnOtaria/>
PREFIX  aop: <http://vitali.web.cs.unibo.it/AnnOtaria/person/>
PREFIX  dc: <http://purl.org/dc/elements/1.1>
PREFIX  dcterms: <http://purl.org/dc/terms/>
PREFIX  fabio: <http://purl.org/spar/fabio/>
PREFIX  foaf: <http://xmlns.com/foaf/0.1/>
PREFIX  frbr: <http://purl.org/vocab/frbr/core#>
PREFIX  oa: <http://www.w3.org/ns/oa#>
PREFIX dbpedia:<http://dbpedia.org/resource/>
PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> 
PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX  schema: <http://schema.org/>
PREFIX  sem: <http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#>
PREFIX  xml: <http://www.w3.org/XML/1998/namespace>
PREFIX  xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX  cito: <http://www.purl.org/spar/cito/>
PREFIX  skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX  aon: <http://vitali.web.cs.unibo.it/AnnOtaria/annotation/>
"""
#[JESKY] REDIRECT ALLA PAGINA PRINCIPALE + RECUPERO ELEMENTI GIA ESISTENTI NEL SISTEMA.

#Redirect alla pagina principale.
@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

#[JESKY e ANDRE]Route che mi serve per vedere se la persona che desidero associare,
#sia gia stata associata in passato.
@app.route('/caricapersona', methods=['GET'])	#url + metodo GET
def getPersone():
	sparql = SPARQLWrapper("http://localhost:3030/data/query")	#il mio endpoint
	sparql.setQuery("""
    PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX  ao: <http://vitali.web.cs.unibo.it/AnnOtaria/>
    PREFIX  oa: <http://www.w3.org/ns/oa#>
	PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  
	    
	    SELECT DISTINCT (COALESCE(?label,?object) AS ?risultato)
	    WHERE{
                ?annotation a oa:Annotation;
                ao:type ?type;
                oa:hasBody ?body.
                FILTER REGEX(?type, "denotesPerson", "i").
                ?body a rdf:Statement;
                rdf:object ?object.
                OPTIONAL{?body rdfs:label ?label}
	    }
	    ORDER BY (?risultato)
	""")
	sparql.setReturnFormat(JSON)		
	results = sparql.query().convert()
	results = results['results']['bindings']
	results = json.dumps(results)

	return results

#[JESKY e ANDRE]Route che mi serve per vedere se il luogo che desidero associare,
#sia gia stato associato in passato.
@app.route('/caricaluogo', methods=['GET'])	#url + metodo GET
def getLuogo():
    sparql = SPARQLWrapper("http://localhost:3030/data/query")	#il mio endpoint
    sparql.setQuery("""
	PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX  ao: <http://vitali.web.cs.unibo.it/AnnOtaria/>
    	PREFIX  oa: <http://www.w3.org/ns/oa#>
	PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	    
	    SELECT DISTINCT (COALESCE(?label,?object) AS ?risultato)
	    WHERE{
                ?annotation a oa:Annotation;
                ao:type ?type;
                oa:hasBody ?body.
                FILTER REGEX(?type, "denotesPlace", "i").
                ?body a rdf:Statement;
                rdf:object ?object.
                OPTIONAL{?body rdfs:label ?label}
	    }
	    ORDER BY (?risultato)
    """)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    results = results['results']['bindings']
    results = json.dumps(results)

    return results


#[JESKY e ANDRE]Route che mi serve per vedere se la malattia che desidero associare,
#sia gia stata associata in passato.
@app.route('/caricamalattia', methods=['GET'])	#url + metodo GET
def getMalattie():
    sparql = SPARQLWrapper("http://localhost:3030/data/query")	#il mio endpoint
    sparql.setQuery("""
      PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX  ao: <http://vitali.web.cs.unibo.it/AnnOtaria/>
	    PREFIX  oa: <http://www.w3.org/ns/oa#>
	    PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

	    SELECT DISTINCT (COALESCE(?label,?object) AS ?risultato)
	    WHERE{
                ?annotation a oa:Annotation;
                ao:type ?type;
                oa:hasBody ?body.
                FILTER REGEX(?type, "denotesDisease", "i").
                ?body a rdf:Statement;
                rdf:object ?object.
                OPTIONAL{?body rdfs:label ?label}
	    }
	    ORDER BY (?risultato)
    """)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    results = results['results']['bindings']
    results = json.dumps(results)

    return results

#[JESKY e ANDRE]Route che mi serve per vedere se gli argomenti che desidero associare,
#siano stati associati in passato.
@app.route('/caricaargomento', methods=['GET'])	#url + metodo GET
def getArgomenti():
	sparql = SPARQLWrapper("http://localhost:3030/data/query")	#il mio endpoint
	sparql.setQuery("""
    PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX  ao: <http://vitali.web.cs.unibo.it/AnnOtaria/>
    PREFIX  oa: <http://www.w3.org/ns/oa#>
	PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  
	    
	    SELECT DISTINCT (COALESCE(?label,?object) AS ?risultato)
	    WHERE{
                ?annotation a oa:Annotation;
                ao:type ?type;
                oa:hasBody ?body.
                FILTER REGEX(?type, "hasSubject", "i").
                ?body a rdf:Statement;
                rdf:object ?object.
                OPTIONAL{?body rdfs:label ?label}
	    }
	    ORDER BY (?risultato)
	""")
	sparql.setReturnFormat(JSON)
	results = sparql.query().convert()
	results = results['results']['bindings']
	results = json.dumps(results)

	return results



#[ANDRE E SHADI]Carica TUTTE le annotazioni sull'intero documento.

@app.route('/LoadAnnotation/<url>', methods=['GET'])
def getAnnotation(url):
    
    sparql = SPARQLWrapper("http://localhost:3030/data/query")
    sparql.setQuery("""

    PREFIX  oa: <http://www.w3.org/ns/oa#>
    PREFIX  ao: <http://vitali.web.cs.unibo.it/AnnOtaria/>
    PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX  aon: <http://vitali.web.cs.unibo.it/AnnOtaria/annotation/>
    PREFIX  foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX  schema: <http://schema.org/>

    SELECT DISTINCT ?type ?timestamp ?author ?target ?object (COALESCE(?label1, "Label non disponibile") AS ?label) (COALESCE(?name, "Name non disponibile") AS ?annotator) (COALESCE(?email, "Email non disponibile") AS ?mail)
    WHERE{
    ?ann a oa:Annotation;
    ao:type ?type;
    oa:annotatedAt ?timestamp;
    oa:annotatedBy ?author;
    oa:hasTarget ?target.
    FILTER regex(str(?target), \"""" + url + """\", "i").
    ?ann oa:hasBody ?body.
    ?body a rdf:Statement;
    rdf:object ?object.
    OPTIONAL {?body rdfs:label ?label1}.
    }
    ORDER BY DESC(?timestamp)

    """)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    results = results['results']['bindings']
    results = json.dumps(results)

    return results



#[ANDRE E SHADI]Carica TUTTE le annotazioni sul frammento.
@app.route('/loadAnnFrag/<url>', methods=['GET'])
def getFragments(url):
    if "(" in url:
        url,b = url.split('(')
    sparql = SPARQLWrapper("http://localhost:3030/data/query")
    sparql.setQuery("""

    PREFIX  oa: <http://www.w3.org/ns/oa#>
    PREFIX  ao: <http://vitali.web.cs.unibo.it/AnnOtaria/>
    PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX  aon: <http://vitali.web.cs.unibo.it/AnnOtaria/annotation/>
    PREFIX  foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX  schema: <http://schema.org/>

    SELECT ?type ?timestamp ?author ?div ?fragEnd ?fragStart ?object (COALESCE(?label1, "Label non disponibile") AS ?label) (COALESCE(?name, "Name non disponibile") AS ?annotator) (COALESCE(?email, "Email non disponibile") AS ?mail)
    WHERE{
    ?ann a oa:Annotation;
    ao:type ?type;
    oa:annotatedAt ?timestamp;
    oa:annotatedBy ?author;
    oa:hasTarget ?target;
    oa:hasBody ?body.
    ?target a oa:SpecificResource;
    oa:hasSelector ?fragment;
    oa:hasSource ?document.
    ?fragment a oa:FragmentSelector;
    rdf:value ?div;
    oa:end ?fragEnd;
    oa:start ?fragStart.
    FILTER regex(str(?document), \"""" + url + """\", "i").
    ?body a rdf:Statement;
    rdf:object ?object.
    OPTIONAL {?body rdfs:label ?label1}
    }
    ORDER BY DESC(?timestamp)

    """)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    results = results['results']['bindings']
    results = json.dumps(results)

    return results

#[ANDRE E SHADI]Carica mail e nome dell'autore
@app.route('/InformazioniAutore/<autore>', methods=['GET'])
def info(autore):

    sparql = SPARQLWrapper("http://localhost:3030/data/query")
    sparql.setQuery("""

    PREFIX  oa: <http://www.w3.org/ns/oa#>
    PREFIX  ao: <http://vitali.web.cs.unibo.it/AnnOtaria/>
    PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX  aon: <http://vitali.web.cs.unibo.it/AnnOtaria/annotation/>
    PREFIX  foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX  schema: <http://schema.org/>

    SELECT ?author (COALESCE(?name, "Nome non disponibile") AS ?annotator) (COALESCE(?email, "Email non disponibile") AS ?mail)
    WHERE{
    OPTIONAL{ 
              ?author foaf:name ?name;
              schema:email ?email.
              FILTER regex(str(?author),  \"""" + autore + """\", "i")
            }
    }
    LIMIT 1
    """)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    results = results['results']['bindings']
    results = json.dumps(results)
    

    return results

    
@app.route('/salvaTripleStore', methods=['POST'])
def salvatriple():
    annotazionejson = request.json
    sparql = SPARQLWrapper("http://localhost:3030/data/update")
    insert = """INSERT DATA {"""
    for annotazione in annotazionejson:
        #annotazioni sul documento
        if (annotazione["docOrFrag"] == "documento"): 
            subject,end = annotazione["target"].split('.') #prende solo la parte prima di .html
            inizio = """[a  oa:Annotation ;
                        rdfs:label "{label}";
                        ao:type "{tipo}";    
                        oa:annotatedAt "{data}";
                        oa:annotatedBy  aop:{autore};
                        """.format(label = creaLabel(annotazione["type"]), tipo = annotazione["type"], data = annotazione["provenance"]["time"], autore = annotazione["provenance"]["author"].encode('utf-8').replace(" ", "-"))
            corpo = """ 
                    oa:hasBody [ a rdf:Statement ;
                                    rdf:object     {oggetto};
                                    rdf:predicate  {predicate};
                                    rdf:subject    ao:{soggetto};
                                    rdfs:label     "{label}"
                                  ] ;
                                  """.format(oggetto = riempiOggetto(annotazione["type"], annotazione["body"]["object"]), predicate = annotazione["body"]["predicate"], soggetto = subject, label = annotazione["body"]["object"].encode('utf-8'))  
            target = """ oa:hasTarget ao:{urldoc} 
                        ]. """.format(urldoc = annotazione["target"])
            
        #annotazioni sul frammento
        else:
            subject,end = annotazione["target"]["source"].split('.') #prende solo la parte prima di .html
            inizio = """[a  oa:Annotation ;
                        rdfs:label "{label}";
                        ao:type "{tipo}";    
                        oa:annotatedAt "{data}";
                        oa:annotatedBy  aop:{autore};
                        """.format(label = creaLabel(annotazione["type"]), tipo = annotazione["type"], data = annotazione["provenance"]["time"], autore = annotazione["provenance"]["author"].encode('utf-8').replace(" ", "-"))
            if(annotazione["type"] == "cites"): 
                myLabel = annotazione["labelcitazione"].encode('utf-8') 
            else:
                myLabel = annotazione["body"]["object"].encode('utf-8')
            corpo = """ 
                    oa:hasBody [ a rdf:Statement ;
                                    rdf:object     {oggetto};
                                    rdf:predicate  {predicate};
                                    rdf:subject    ao:{soggetto};
                                    rdfs:label     "{label}"
                                  ] ;
                                  """.format(oggetto = riempiOggetto(annotazione["type"], annotazione["body"]["object"]), predicate = annotazione["body"]["predicate"], soggetto = subject, label = myLabel)  
            target = """  oa:hasTarget  [ a  oa:SpecificResource ;
                                          oa:hasSelector  [ a   oa:FragmentSelector;
                                                            rdf:value  "{idnodo}";
                                                            oa:end    {end};
                                                            oa:start   {start}
                                                          ];
                                          oa:hasSource    ao:{source}
                                        ]
                          ]. """.format(idnodo = annotazione["target"]["node"], end = annotazione["target"]["end_off"], start = annotazione["target"]["start_off"], source = annotazione["target"]["source"])     
            
            
        query = prefix + insert + inizio + corpo + target + "}"
        print query
        sparql.setQuery(query)
        sparql.method = 'POST'
        sparql.query()
    
    
    return query
    

def creaLabel(tipo):
    if (tipo=="hasAuthor"):
        label="Autore"
    if (tipo=="hasPublisher"):
        label="Editore"
    if (tipo=="hasPublicationYear"):
        label="Anno di pubblicazione"
    if (tipo=="hasTitle"):
        label="Titolo"
    if (tipo=="hasAbstract"):
        label="Abstract"
    if (tipo=="hasShortTitle"):
        label="Titolo Corto"
    if (tipo=="hasComment"):
        label="Commento" 
    if (tipo=="denotesPerson"):
        label="Persona"  
    if (tipo=="denotesPlace"):
        label="Luogo" 
    if (tipo=="denotesDisease"):
        label="Malattia"
    if (tipo=="hasSubject"):
        label="Argomento"
    if (tipo=="relatesTo"):
        label="DBPedia"
    if (tipo=="hasClarityScore"):
        label="Chiarezza"
    if (tipo=="hasOriginalityScore"):
        label="Originalita"
    if (tipo=="hasFormattingScore"):
        label="Formattazione"
    if (tipo=="cites"):
        label="Citazione"      
    return label
      
    


    
@app.route('/salvaTripleStore2', methods=['POST'])
def salvatriple2():
    annotazione = request.json
    sparql = SPARQLWrapper("http://localhost:3030/data/update")
    query = ""
    insert = "INSERT DATA {"
    for annRow in annotazione:
        # flag = annRow["discriminant"]
        if (annRow["label"] == "persona"): #  or annRow["label"] == "luogo" or annRow["label"] == "malattia" or annRow["label"] == "argomento" or annRow["label"] == "DBPedia" or annRow["label"] == "chiarezza" or annRow["label"] == "Originalita" or annRow["label"] == "Presentazione" or annRow["label"] == "Citazione" or annRow["label"] == "Commento" and flag == "fragment"):
            if(annRow["label"] == "Citazione"):
                myObject = annRow["body"]["urlCitazione"]
                myLabel = annRow["body"]["titleCitazione"]
            else:
                myObject = annRow["body"]["oggetto"]
                myLabel = annRow["body"]["label"]  
            intestazione = """
            [  a oa:Annotation;
               rdfs:label "{label}";
               ao:type "{tipo}";    
               oa:annotatedAt "{provenance}";
               oa:annotatedBy  aop:{autore};
            """.format(label = annRow["label"], tipo = annRow["type"], provenance = annRow["provenance"]["time"], autore = annRow["provenance"]["author"].encode('utf-8').replace(" ", "_"))
            body = """
               oa:hasBody [ a   rdf:Statement;
                                rdf:object      {oggetto};
                                rdf:predicate   {predicate};
                                rdf:subject     <ao:{subjectBody}>;
                                rdfs:label  "{reslabel}"
                           ];
            """.format(oggetto = riempiOggetto(annRow["type"], myObject).encode('utf-8'), predicate = annRow["body"]["predicate"], subjectBody = annRow["body"]["subjectBody"], reslabel = myLabel.encode('utf-8'))
            target = """  oa:hasTarget  [ a  oa:SpecificResource ;
                                          oa:hasSelector  [ a   oa:FragmentSelector;
                                                            rdf:value  "{value}";
                                                            oa:end    "{end}";
                                                            oa:start   "{start}"
                                                          ];
                                          oa:hasSource    ao:{source}
                                        ]
                          ]. """.format(value = annRow["target"]["start_id"], end = annRow["target"]["end_off"], start = annRow["target"]["start_off"], source = annRow["target"]["source"].encode('utf-8'))
            query = prefix+insert+intestazione+body+target+"}"
            sparql.setQuery(query)
            sparql.method = 'POST'
            sparql.query()
        else:
            intestazione = """
              [ a  oa:Annotation ;
                rdfs:label "{label}";
                ao:type "{tipo}";
                oa:annotatedAt "{time}";
                oa:annotatedBy aop:{autore};
            """.format(label = annRow["label"], tipo = annRow["type"], time = annRow["provenance"]["time"], autore = annRow["provenance"]["author"].encode('utf-8').replace(" ", "-"))
            body = """   oa:hasBody [ a rdf:Statement ;
                                    rdf:object     {oggetto};
                                    rdf:predicate  {predicate};
                                    rdf:subject    ao:{soggetto};
                                    rdfs:label     "{label}"
                                  ] ;
            """.format(oggetto = riempiOggetto(annRow["type"], annRow["body"]["label"]).encode('utf-8') , predicate = annRow["body"]["predicate"], soggetto = annRow["body"]["subjectBody"], label = annRow["body"]["label"].encode('utf-8'))
            target = """
                        oa:hasTarget  ao:{source}
                    ].
                    """.format(source = annRow["target"].encode('utf-8'))
            query = prefix+insert+intestazione+body+target+"}"
            sparql.setQuery(query)
            sparql.method = 'POST'
            sparql.query()
            
    return query


#Definisce il tipo dell'annotazioni e formatta l'oggetto.
def riempiOggetto(tipo, oggetto):
    risultato = "errore"
    oggetto = oggetto.replace(" ", "_")
    if(tipo == "denotesPerson" or tipo == "hasAuthor"):
       risultato = "aop:"+oggetto
       #registra la persona dopo l'annotazione
       registraAnnotatore(oggetto, "false")
    if(tipo == "denotesPlace" or tipo == "relatesTo"):
       risultato = "<http://dbpedia.org/resource/"+oggetto+">"
       definizioneSkos(risultato, oggetto)
    if(tipo == "denotesDisease"):
       risultato = "<http://icd10data.com/"+oggetto+">"
       definizioneSkos(risultato, oggetto)
    if(tipo == "hasSubject"):
       risultato = "<http://thes.bncf.firenze.sbn.it/"+oggetto+">"
       definizioneSkos(risultato, oggetto)
    if(tipo == "hasClarityScore" or tipo == "hasFormattingScore" or tipo=="hasOriginalityScore"):
       oggetto = oggetto.lower()
       risultato = "<http://annotaria.web.cs.unibo.it/score/"+oggetto+">"
    if(tipo == "cites"):
       risultato = "<"+oggetto+">"
    if(tipo == "hasComment" or tipo == "hasTitle" or tipo == "hasAbstract" or tipo == "hasShortTitle"):
       oggetto = oggetto.replace("_", " ")
       risultato = '"'+oggetto+'"'+"^^xsd:string"
    if(tipo == "hasPublisher"):
       risultato = "<http://vitali.web.cs.unibo.it/AnnOtaria/organization/"+oggetto+">"
    if(tipo == "hasPublicationYear"):
       oggetto = oggetto.replace("_", " ")
       risultato = '"'+oggetto+'"'+"^^xsd:gYear"
    return risultato


#Verifica se la risorsa e gia presente nel nostro Sistema
@app.route('/registraAnnotatore/<author>+<mail>', methods=['POST'])
def registraAnnotatore(author, mail):
    sparql = SPARQLWrapper("http://localhost:3030/data/update")  
    query = prefix

    #Name dev'essere parsato con 1 solo space.
    #Caso in cui il dato provenga da riempiOggetto.
    autoreSingleSpace = author.replace("_", " ")
    words = autoreSingleSpace.split()
    autoreSingleSpace = ""
    counter = 0
    for word in words:
        if(counter > 0):
            autoreSingleSpace += " "
        autoreSingleSpace += word
        counter += 1

    #Caso in cui si tratta di un inserimento di un annotazione autore
    if(mail  == "false"):
	aop = 'aop:' + author
        query += """
            INSERT DATA{
              """ + aop + """ a foaf:Person;
              foaf:name \"""" + autoreSingleSpace + """\"^^xsd:string.
            }"""
    else:
       #Caso Normale, i dati vengono da JS
       autoreParsed = author.replace(" ", "_")
       aop = 'aop:' + autoreParsed

       query += """
            INSERT DATA{
              """ + aop + """ a foaf:Person;
              foaf:name \"""" + autoreSingleSpace + """\"^^xsd:string;
              schema:email  \"""" + mail + """\"^^xsd:string.
            }"""
    sparql.setQuery(query)
    sparql.method = 'POST'
    sparql.query()
    return query
	
	

	
#Definisce il tipo dell'annotazioni e formatta l'oggetto.  
def definizioneSkos(risultato, oggetto):
    flag = "false"
    if (flag == "false"):
	sparql = SPARQLWrapper("http://localhost:3030/data/update")
        query = prefix
        oggetto = oggetto.replace("_", " ")
        query += """
        INSERT DATA{
          """ + risultato + """ a skos:concept;
          rdfs:label \"""" + oggetto + """\"^^xsd:string.
        }"""
        sparql.setQuery(query)
        sparql.method = 'POST'
        sparql.query()

#Carica TUTTI gli autori dal sistema (a cui fa fronte una Risorsa).
@app.route('/caricaAutore', methods=['GET'])
def getAutore():
	sparql = SPARQLWrapper("http://localhost:3030/data/query")
	sparql.setQuery("""
        PREFIX  oa: <http://www.w3.org/ns/oa#>

        SELECT DISTINCT ?person
        WHERE{
        ?ann a oa:Annotation;
        oa:annotatedBy ?person.
        }
        ORDER BY DESC(?person)
	""")
	sparql.setReturnFormat(JSON)
	results = sparql.query().convert()
	results = results['results']['bindings']
	results = json.dumps(results)

	return results

#DBPedia
@app.route('/caricaDBPedia/<tipo>', methods=['GET'])
def getDpPedia(tipo):
    sparql = SPARQLWrapper("http://it.dbpedia.org/sparql/")
    sparql.setQuery("""
	PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>

	SELECT ?uri ?label WHERE {
 		?uri rdfs:label ?label .
 		FILTER REGEX(?label, \"""" + tipo + """\", \"i")
	} ORDER BY  ?label
	LIMIT 20""")
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    results = results['results']['bindings']
    results = json.dumps(results)

    return results



if __name__ == '__main__':
    app.run(debug=True)
