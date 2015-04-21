/*docArea*/

$(function() {
	var year = new Date().getFullYear();
	var result ={};
	var s = selection();

	$( "#docArea" ).accordion({
		heightStyle: "fill"
	});

	$.ajax({
		method: 'GET',
		url: 'categorie.json',
		success: function(d) {
				result = d;
		},
		error: function(a,b,c) {
			alert('Errore in get del document')
		}

	});

	$( "#doclist" ).selectable({
		stop: function() {
			$( ".ui-selected", this ).each(function() {
				var index = $( "#doclist li" ).index( this );
				(".ui-selected", this).setAttribute("id", index.toString());
				var url =  "annotaria-td/"+(".ui-selected", this).getAttribute("value");
				addTab(url,index);
				load(index);
			});
		}
	});
	$( "#docannotation" ).selectable({
		stop: function() {
			$( ".ui-selected", this ).each(function() {
				//ogni elemento della lista aprirà la dialog corrispondente al tipo di annotazione
				//eseguire la get una sola volta facendogli ritornare il result.
				//console.log(s.anchorNode.parentElement);
				active = $("#mainArea").tabs("option", "active")
				console.log(active)
				index=$("#mainArea ul>li a").eq(active).attr('href');
				doc_label=$("#mainArea ul>li a").eq(active).html();
				console.log(doc_label)
				if(index!=undefined) {
					var type=(".ui-selected", this).getAttribute("id");
					switch(type) {
						    case "document":
						    		var autori=document.getElementById("hasAuthor"),
										publisher=document.getElementById("hasPublisher");
									$("#hasPublicationYear").attr({
									       "max" : year
									    });
						    		if(autori.options.length == 0 || publisher.options.length==0){
										for (var i=0; i<result.hasAuthor.length; i++) {
											autori.options[autori.options.length] = 
											new Option(result.hasAuthor[i],"hasAuthor");
										}
										for (var i=0; i<result.hasPublisher.length; i++) {
											publisher.options[publisher.options.length] = 
											new Option(result.hasPublisher[i],"hasPublisher");
										}
									}
						        break;
						    case "denotes":
						    		var categoria=document.getElementById("denotazione");
						    		if (denotazione.options.length==0) {
										for (var i=0; i<result.denotazione.length; i++) {
											categoria.options[categoria.options.length] = 
											new Option(result.denotazione[i], result.denotazione[i]);
										}
									}
						        break;
						    case "hasSubject":

						    		var sub=document.getElementById("subject");
						    		if (sub.options.length==0) {
										for (var i=0; i<result.subject.length; i++) {
											sub.options[sub.options.length] = 
											new Option(result.subject[i], "hasSubject");
										}
									}
								break;
							case "cites":
									$("#active_doc").html(doc_label);
						    	break;
						}
					
					$( "#form_"+type ).dialog( "open" );
				}else{
					alert("Devi aprire almeno un documento")
				};
			});
		},
		disabled:true
	});
});
function addCategory(Categoria, id)
{
	console.log(id);
  $.ajax({
      method: 'GET',
      url: 'categorie.json',
      async:false,
      cache:false,
      success: function(d) {
          result.data = d;
      },
      error: function(a,b,c) {
        alert('Errore in get del document')
      }
  });
  if (Categoria=="Altro...") {
    var input = document.createElement("input"),
        select=document.getElementById(id),
        x = document.createElement("img"),
        v = document.createElement("img");
    x.src="images/icon_x.png";
    x.alt="Annulla";
    $(x).addClass("immagine");
    v.src="images/v-icon.gif";
    v.alt="Conferma";
    $(v).addClass("immagine");
    input.type = "text";
    input.id = "new_"+id;
    input.placeholder = "nuova categoria";
    $(input).insertAfter(select);
    $(v).insertAfter(input);
    $(x).insertAfter(v);
    $(x).click(function(){
      select.disabled = false;
      input.parentNode.removeChild(input);
      this.parentNode.removeChild(v);
      this.parentNode.removeChild(this);
    });
    $(v).click(function(){
      select.disabled = false;
      InviaNuovaCategoria(input.value,id);
      input.parentNode.removeChild(input);
      this.parentNode.removeChild(x);
      this.parentNode.removeChild(this);
    });
    select.disabled = true;
  }
}

function InviaNuovaCategoria(value,id)
{
//modifica categorie e fa post
	result.filename="categorie.json";
	var autore=document.getElementById("hasAuthor"),
		editore=document.getElementById("hasPublisher"),
		sub=document.getElementById("subject");
	switch(id){
		case "hasAuthor":
			var dim=result.data.hasAuthor.length;
			result.data.hasAuthor[dim-1]=value;
			result.data.hasAuthor[dim]="Altro...";
			var string = JSON.stringify(result);
			break;
		case "hasPublisher":
			var dim=result.data.hasPublisher.length;
			result.data.hasPublisher[dim-1]=value;
			result.data.hasPublisher[dim]="Altro...";
			var string = JSON.stringify(result);
			break;
		case "subject":
			var dim=result.data.subject.length;
			result.data.subject[dim-1]=value;
			result.data.subject[dim]="Altro...";
			var string = JSON.stringify(result);
			break;
	}
	$.ajax({
	  method: 'POST',
	  url: 'save.php',
	  data: string,
	  success: function(d) {
	    alert("Categoria salvate")
	    $(autore).find('option').remove().end();
	    for (var i=0; i<result.data.hasAuthor.length; i++) {
	        autore.options[autore.options.length] = 
	        new Option(result.data.hasAuthor[i],"hasAuthor");
	    }
	    $(editore).find('option').remove().end();
	    for (var i=0; i<result.data.hasPublisher.length; i++) {
	        editore.options[editore.options.length] = 
	        new Option(result.data.hasPublisher[i],"hasPublisher");
	    }
	    $(sub).find('option').remove().end();
	    for (var i=0; i<result.data.subject.length; i++) {
	        sub.options[sub.options.length] = 
	        new Option(result.data.subject[i],"hasSubject");
	    }
	  },
	  error: function(a,b,c) {
	    alert('Non ho potuto salvare la categoria')
	  }
	});
}
