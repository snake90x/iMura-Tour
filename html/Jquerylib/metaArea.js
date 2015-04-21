var tabs;
var IdAnnotationCount = 0;
var buffer;
buffer = new Array();
$(document).ready(function(){
/* implementazione di meta area come una tab JQuery*/
	tabs = $( "#metaArea" ).tabs({
	    activate: function(event, ui) {
			controllotab();
		}
	});
});
function modifica() {
	var tabTemplate = "<li><a href='#{href}' data-toggle='tab' id='showNew'>#{label}</a> </li>";
	var title = "Nuove Annotazioni";
	var id = "modifica",
	li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, title ) ),
	tabContentHtml = "<div id='metadiv1'><ul id='docTempAnnotation'></ul></div>"+
					  "</br>"+
					  "<button type='button' class='btn btn-success' id='save'>Salva Nota</button>"+
					  "<button type='button' class='btn btn-warning' id='saveall'>Salva Tutto</button></div>";
	var tabNameExists = false;
	$('#metaArea ul li a').each(function(i) {
		if (this.text == title) {
			tabNameExists = true;
		} 
	});
	
	if (tabNameExists == false){
		tabs.find( ".ui-tabs-nav" ).append( li );
		tabs.append( "<div id='" + id + "'>" + tabContentHtml + "</div>" );
		tabs.tabs( "refresh" );
		tabs.tabs( "option", "active", -1 );

		$('#markSentence').click(function() {
			// recupero la tab corrente tramite href 
			var idd,subs;
			var active = $("#mainArea").tabs("option", "active");
     		idd=$("#mainArea ul>li a").eq(active).attr('href');
     		subs=idd.substring(6);
			addNote('sentence',subs)
		})
		$('#markMain').click(function() {
			// recupero la tab corrente tramite href 
			var idd,subs;
			var active = $("#mainArea").tabs("option", "active");
     		idd=$("#mainArea ul>li a").eq(active).attr('href');
     		subs=idd.substring(6);
			addNote('main',subs)
		})
		$('#markSub').click(function() {
			// recupero la tab corrente tramite href 
			var idd,subs;
			var active = $("#mainArea").tabs("option", "active");
     		idd=$("#mainArea ul>li a").eq(active).attr('href');
     		subs=idd.substring(6);
			addNote('sub',subs)
		})
		$('#save').click(function() {
			var active = $("#mainArea").tabs("option", "active");
     		idd=$("#mainArea ul>li a").eq(active).attr('href');
     		subs=idd.substring(6);
			saveNotes(subs,true)
		})
		$('#saveall').click(function() {
			saveNotes(666,false)
		})
	}     
}

function addAnnotation (annotation){
	var annotation=annotation,
	idtemp,
	dial = "form_"+annotation.annotations[0].type;
	var active = $("#mainArea").tabs("option", "active"),
	title=$("#mainArea ul>li a").eq(active).html(),
	idd=$("#mainArea ul>li a").eq(active).attr('href'),
    subs=idd.substring(6),   //indice tab attiva che corrisponde anche all'indice della struttura fileNotesSave relativa a quello specifico articolo
	ifdoc=annotation.annotations[0].type,
	type=annotation.annotations[0].body.label,
	label=annotation.annotations[0].label,
	target=title;
	if(ifdoc=='hasAuthor'){
		type='document';
		dial='form_document';
		label="Annotazione sull' intero documento";
	}
	else if(label == "Entità"){
		dial="form_denotes";
		}
	var annotationTemplate = "<li id='#{IdAnnotationCount}' class='"+subs+"'>"+
							"<span class='type'> #{type}</span>"+
							"</br><span class='annlabel'> #{label}</span>"+
							"</br><span class='doc'>#{doc}</span></br>"+
							"<a href='#'><i class='fa fa-floppy-o fa-2x'></i></a>"+"   "+
							"<a onclick='modannotation("+dial+",this.parentNode,this.id)'><i class='fa fa-cog fa-spin fa-2x'></i></a>"+"   "+
							"<a onclick='deletezzz(this.parentNode,this.id)'><i class='fa fa-times fa-2x'></i></a></li>",
	li = $( annotationTemplate.replace( /#\{IdAnnotationCount\}/g, IdAnnotationCount ).replace( /#\{type\}/g, type ).replace( /#\{label\}/g, label ).replace( /#\{doc\}/g, title));
	$('#docTempAnnotation').append(li);
	idtemp = $(li).index();
	buffer[idtemp] = annotation;
	IdAnnotationCount++;
}
function deletezzz(x,id) {
	x.parentNode.removeChild(x);
	buffer[id]=null;
}
function modannotation (dial,x,id) {
	$(dial).dialog('open');
	buffer[id]=null;
	x.parentNode.removeChild(x);
}