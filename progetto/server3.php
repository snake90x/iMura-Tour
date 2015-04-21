<?php
require_once( "sparqllib.php" );
 
$db = sparql_connect( "http://localhost:3030/ds/query" );
if( !$db ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
sparql_ns( "foaf","http://xmlns.com/foaf/0.1/" );
sparql_ns( "aop", "http://vitali.web.cs.unibo.it/AnnOtaria/person/");
sparql_ns( "schema","http://schema.org/");
sparql_ns( "rdfs","http://www.w3.org/2000/01/rdf-schema#");
sparql_ns( "ao","http://vitali.web.cs.unibo.it/AnnOtaria/");
sparql_ns( "oa","http://www.w3.org/ns/oa#");
sparql_ns( "xsd","http://www.w3.org/2001/XMLSchema#");
sparql_ns( "rdf","http://www.w3.org/1999/02/22-rdf-syntax-ns#");
$documento = 	"select  ?label ?date ?nameAnnotator ?email ?bodyLabel
				where{
					?a a oa:Annotation;
					 ao:type 'hasAuthor';
					oa:hasTarget ao:BMC_Cardiovasc_Disord_2005_Aug_25_5_25_ver1.html.
					OPTIONAL{?a rdfs:label ?label}
					OPTIONAL{?a oa:annotatedAt ?data}
					OPTIONAL{?a oa:annotatedBy ?annotatore}
					OPTIONAL{?annotatore a foaf:Person}
				
					OPTIONAL{?a oa:hasBody ?body}
					OPTIONAL{?annotatore foaf:name ?nomeAnnotatore}
					OPTIONAL{?annotatore schema:email  ?email}
					OPTIONAL{?body a rdf:Statement }
		    		OPTIONAL{?body rdf:object     ?object}
		    		OPTIONAL{?object foaf:Person ?person}
		    		OPTIONAL{?person foaf:name ?name}
		    		OPTIONAL{?body rdf:predicate  ?predicate }
		    		OPTIONAL{?body rdf:subject    ?subject}
		    		OPTIONAL{?body rdfs:label     ?bodyLabel}

				}ORDER BY DESC(?data)";
$prova = "select distinct ?qualcosa where{?a a ?qualcosa.}";
				$result = sparql_query( $documento ) or die("errore"); 
if( !$result ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
 
$fields = sparql_field_array( $result );
 
print "<p>Number of rows: ".sparql_num_rows( $result )." results.</p>";
print "<table class='example_table'>";
print "<tr>";
foreach( $fields as $field )
{
	print "<th>$field</th>";
}
print "</tr>";
while( $row = sparql_fetch_array( $result ) )
{
	print "<tr>";
	foreach( $fields as $field )
	{
		print "<td>$row[$field]</td>";
	}
	print "</tr>";
}
print "</table>";


?>