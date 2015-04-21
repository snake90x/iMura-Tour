/*<script src="urlEncode.js"></script>
<script src="jquery.sparql.js"></script>
PREFIX aop:   <http://vitali.web.cs.unibo.it/AnnOtaria/person/>

PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
PREFIX schema: <http://schema.org/>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>
PREFIX ao:    <http://vitali.web.cs.unibo.it/AnnOtaria/>
PREFIX oa:    <http://www.w3.org/ns/oa#>
PREFIX xsd:   <http://www.w3.org/2001/XMLSchema#>
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>


PREFIX aop:   <http://vitali.web.cs.unibo.it/AnnOtaria/person/>
PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
PREFIX schema: <http://schema.org/>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>
PREFIX ao:    <http://vitali.web.cs.unibo.it/AnnOtaria/>
PREFIX oa:    <http://www.w3.org/ns/oa#>
PREFIX xsd:   <http://www.w3.org/2001/XMLSchema#>
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

select ?data ?nomeAnnotatore ?email ?nomeAutore
where{
?a a oa:Annotation;
ao:type "hasAuthor";
oa:annotatedAt ?data ;
oa:hasTarget ao:BMC_Cardiovasc_Disord_2005_Aug_25_5_25_ver1.html.
?annotatore a foaf:Person;
OPTIONAL{?a oa:annotatedBy ?annotatore}
OPTIONAL{?a oa:hasBody ?body}
OPTIONAL{?annotatore foaf:name ?nomeAnnotatore}
OPTIONAL{?annotatore schema:email  ?email}
OPTIONAL{?body rdfs:label ?nomeAutore}
}ORDER BY DESC(?data)




$(document).ready(function() {
          $.sparql("http://gov.tso.co.uk/education/sparql")
            .prefix("sch-ont","http://education.data.gov.uk/def/school/")
            .select(["?name"])
              .where("?school","a","sch-ont:School")
                .where("sch-ont:establishmentName", "?name")
                .where("sch-ont:districtAdministrative", "<http://statistics.data.gov.uk/id/local-authority-district/00HB>")
            .orderby("?name")
            .limit(10)
            .execute(cbfunc);
          return false;
        });





$(document).ready(function(){
	$.sparql("http://localhost:3030/sparql.tpl")
	.prefix ("foaf","http://xmlns.com/foaf/0.1/")
	.prefix ("aop","http://vitali.web.cs.unibo.it/AnnOtaria/person/")
	.prefix ("schema","hhttp://schema.org/")
	.prefix ("rdfs","http://www.w3.org/2000/01/rdf-schema#")
	.prefix ("ao","http://vitali.web.cs.unibo.it/AnnOtaria/")
	.prefix ("oa","http://www.w3.org/ns/oa#")
	.prefix ("xsd","http://www.w3.org/2001/XMLSchema#")
	.prefix ("rdf","http://www.w3.org/1999/02/22-rdf-syntax-ns#")
	.select(["?data ?nomeAnnotatore ?email ?nomeAutore"])
	.where("?a","a","oa:Annotation")
	.where("?a","ao:type","hasAuthor")
	.where("?a","oa:annotatedAt","?data")
	.where("?a","oa:hasTarget","ao:BMC_Cardiovasc_Disord_2005_Aug_25_5_25_ver1.html")
	.where("?annotatore","a","foaf:Person")
		.optional()
		.where("?a","oa:annotatedBy","?annotatore")
		.end()
		.optional()
		.where("?a","oa:hasBody","?body")
		.end()
		.optional()
		.where("?annotatore","schema:email","?email")
		.end()
		.optional()
		.where("?body","rdfs:label","?nomeAutore")
		.end()
		.optional()
		.where("?annotatore","foaf:name","?nomeAnnotatore")
		.end()
	.orderby("?data")
	.execute(cbfunc);
	return false;
});
*/
var cbfunc = function(results) {
$("textarea#results").val(JSON.stringify(results));
};

$(document).ready(function(){
	$.sparql("http://gov.tso.co.uk/education/sparql")
	.prefix ("foaf","http://xmlns.com/foaf/0.1/")
	.prefix ("schema","http://schema.org/")
	.prefix ("rdfs","http://www.w3.org/2000/01/rdf-schema#")
	.prefix ("ao","http://vitali.web.cs.unibo.it/AnnOtaria/")
	.prefix ("oa","http://www.w3.org/ns/oa#")
	.prefix ("xsd","http://www.w3.org/2001/XMLSchema#")
	.prefix ("rdf","http://www.w3.org/1999/02/22-rdf-syntax-ns#")
	.select(["?data"])
	.where("?a","a","oa:Annotation")
	.where("?a","ao:type","hasAuthor")
	.where("?a","oa:annotatedAt","?data")
	.where("?a","oa:hasTarget","ao:BMC_Cardiovasc_Disord_2005_Aug_25_5_25_ver1.html")
	.where("?annotatore","a","foaf:Person")
		.optional()
		.where("?a","oa:annotatedBy","?annotatore")
		.end()
		.optional()
		.where("?a","oa:hasBody","?body")
		.end()
		.optional()
		.where("?annotatore","schema:email","?email")
		.end()
		.optional()
		.where("?body","rdfs:label","?nomeAutore")
		.end()
		.optional()
		.where("?annotatore","foaf:name","?nomeAnnotatore")
		.end()
	.orderby("?data")
	.execute(cbfunc);
	return false;
});
