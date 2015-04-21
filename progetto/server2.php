<?php
require_once( "sparqllib.php" );
//informazioni riguardanti le annotazioni
urldecode($_GET);

//INPUT SELECT
$annotationClass= $_GET['annotationClass'];
$doc=$_GET['Doc'];
$type= $_GET['type'];


$db = sparql_connect( "http://localhost:3030/ds/query" );
if( !$db ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }

//PREFIX
sparql_ns( "foaf","http://xmlns.com/foaf/0.1/" );
sparql_ns( "aop", "http://vitali.web.cs.unibo.it/AnnOtaria/person/");
sparql_ns( "schema","http://schema.org/");
sparql_ns( "rdfs","http://www.w3.org/2000/01/rdf-schema#");
sparql_ns( "ao","http://vitali.web.cs.unibo.it/AnnOtaria/");
sparql_ns( "oa","http://www.w3.org/ns/oa#");
sparql_ns( "xsd","http://www.w3.org/2001/XMLSchema#");
sparql_ns( "rdf","http://www.w3.org/1999/02/22-rdf-syntax-ns#");


//QUERY
$documento = 	"select ?label ?date ?nameAnnotator ?email ?bodyLabel 
				where{

					?a a oa:Annotation;
					ao:type '".$type."';
					oa:hasTarget ao:".$doc.".
					OPTIONAL{?a rdfs:label ?label}
					OPTIONAL{?a oa:annotatedAt ?date}
					OPTIONAL{?a oa:annotatedBy ?annotatore}
					OPTIONAL{?annotatore a foaf:Person}
					OPTIONAL{?a oa:hasBody ?body}
					OPTIONAL{?annotatore foaf:name ?nameAnnotator}
					OPTIONAL{?annotatore schema:email ?email}
					OPTIONAL{?body a rdf:Statement }
		    		OPTIONAL{?body rdf:object ?object}
		    		OPTIONAL{?object foaf:Person ?person}
		    		OPTIONAL{?person foaf:name ?name}
		    		OPTIONAL{?body rdf:predicate ?predicate }
		    		OPTIONAL{?body rdf:subject ?subject}
		    		OPTIONAL{?body rdfs:label ?bodyLabel}
				}ORDER BY DESC(?data)";

$frammento = "select ?date

	where{
		OPTIONAL{?a a oa:Annotation}
			OPTIONAL{?a rdfs:label      ?label}
			OPTIONAL{?a ao:type         ?type }
		  	OPTIONAL{?a oa:annotatedAt  ?date }
		  	OPTIONAL{?a oa:annotatedBy  ?annotator }
		  	OPTIONAL{?a oa:hasBody      ?body}
		  	OPTIONAL{?a oa:hasTarget    ?target}

		OPTIONAL{?body a rdf:Statement }
		    OPTIONAL{?body rdf:object     ?object}
		    OPTIONAL{?body rdf:predicate  ?predicate }
		    OPTIONAL{?body rdf:subject    ?subject}
		    OPTIONAL{?body rdfs:label     ?bodyLabel}

		OPTIONAL{?target a oa:SpecificResource }
			OPTIONAL{?target oa:hasSelector  ?selector}
		    OPTIONAL{?target oa:hasSource    ao:BMC_Cardiovasc_Disord_2005_Aug_25_5_25_ver1.html.}
		                                                            
		OPTIONAL{?selector a oa:FragmentSelector }
			OPTIONAL{?selector rdf:value  ?idSelection}
			OPTIONAL{?selector oa:end     ?endSelection}
		    OPTIONAL{?selector oa:start   ?startSelection}

	}";
; 

if($annotationClass=="doc"){
	
	$result = sparql_query( $documento ) or die("errore"); 
	if( !$result ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
	echo json_encode($result); 
}else{
	$result = sparql_query( $frammento ) or die("errore"); 
	if( !$result ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
	echo json_encode($result);
	echo "else".$annotationClass;
}

 


/*






?target oa:hasSource ao:BMC_Cardiovasc_Disord_2005_Aug_25_5_25_ver1.html;
ao:type ?tipo;
rdfs:label ?label;
oa:annotatedAt ?data;

.
?annotatore a foaf:Person.
?target oa:hasSelector ?frammento.
?frammento oa:end ?end;
oa:start ?start.
OPTIONAL{?a oa:annotatedBy ?annotatore}
OPTIONAL{?a oa:hasBody ?body}
OPTIONAL{?annotatore foaf:name ?nomeAnnotatore}
OPTIONAL{?annotatore schema:email  ?email}
OPTIONAL{?body rdfs:label ?dato}
}ORDER BY DESC(?data)";
*/
?>