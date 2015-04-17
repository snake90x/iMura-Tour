// caricamento del database tramite un file json che contiene i documenti con i propri riferimenti

// gestione dell'inserimento,salvataggio e visualizzazione delle annotazioni

var filenotesSave = []; // filenotesSave struttura dati nota destinata al salvataggio, 
var filenotesView = [];	// filenotesView struttura dati nota destinata al caricamento e alla visualizzazione client
var pathnote = [];		// pathnote salva tutti i link ai file json in base agli indici di ogni documento 
var mode = 'view' // modalità modifica o visualizza
var list_docs = [];



$(document).ready(main);

function main() {
	scriviCookie("","");
	
	$.ajax({
		 
		method: 'GET',
		url: 'database.json',
		//type:'json',
		success: function(d) {
			for (var i=0; i<d.length; i++) {
				filenotesView[i]= {};
				filenotesSave[i]= {};
				$('#doclist').append("<li class='ui-widget-content' value='"+d[i].url+"'>"+d[i].label+"</li>")
				pathnote[i]=d[i].notes;
				list_docs[i]=d[i].label;

			}
			$.getScript("Jquerylib/dialogs.js",function(){
				alert("Caricato")
			})
		},
		error: function(a,b,c) {
			alert('Nessun documento da mostrare')
		}

	});
	
}
	/* se è aperta la tab edit passa alla modalità edit in cui sono visualizzate le classi css(per colorare), altrimenti passa alla 
	 modalità view e le rimuove*/
	function controllotab(){
		if($('#annotazioni').attr("aria-hidden")== "false"){ 
			alert("siamo in edit")
			mode = 'edit'
			$('.sentence').addClass('edit-sentence')
			$('.denotesPlace').addClass('edit-denotesPlace')
			$('.sub').addClass('edit-sub')
		}else{
			alert("siamo in annotazioni")
			mode = 'view'
			$('.sentence').removeClass('edit-sentence')
			$('.denotesPlace').removeClass('edit-denotesPlace')
			$('.sub').removeClass('edit-sub')
		}
	};		

// funzioni richiamate e utilizzate all'interno di main

// carica i json delle note
function load(index) {
   
	filenotesView[index].filename = pathnote[index]
	filenotesSave[index].filename=filenotesView[index].filename
	$.ajax({
		cache: false,
		method: 'GET',
		url: pathnote[index],

		success: function(d) {
			
			console.log("successo")
			filenotesView[index].data = d
			filenotesSave[index].data=filenotesView[index].data
			for(var i=0; i< filenotesView[index].data.length; i++){
				console.log(filenotesView[index].data[i].type)
			}
			showNotes(index)
		},
		error: function(a,b,c) {
			
			console.log("errore")
			alert('Non esistono annotazioni per questo articolo')
			filenotesView[index].data = []
			filenotesSave[index].data=filenotesView[index].data
			showNotes(index)
		}
	});



}

function saveNotes(index, type) { //index, indice di tab attiva; type, tipo di salvataggio: FALSE, salvo tutti i file modificati; TRUE, salvo solo il file attivo.
	var url;
	var string;
	if (type) {
		url = "save.php"
		string=JSON.stringify(filenotesSave[index])
	}else{
		url = "saveAll.php"
		string = JSON.stringify(filenotesSave)
	}
	console.log(string)
	$.ajax({
		method: 'POST',
		url: url,
		data: string,
		success: function(d) {
			alert("Note salvate")
		},
		error: function(a,b,c) {
			alert('Non ho potuto salvare le note')
		}
	});
}

function showNotes(index) {
	for (var i=0; i< filenotesView[index].data.length; i++) {
		insertNote(filenotesView[index].data[i],mode=='edit')
	}
	var n = $('.sentence').length
	$('#sentence')[0].max = n
}

function selection() {
	if (window.getSelection) {
		return window.getSelection();
	} else if (document.getSelection) {
		return document.getSelection();
	} else if (document.selection) {
		return document.selection.createRange().text;
	}
}

// function addNote(type,index) {
// 		var s = selection()
// 		var dad = s.anchorNode.parentElement
// 		var guida = s.anchorNode.substringData(s.anchorOffset,20)
// 		if (compatibleExtremes(s)) {
// 			var spanId = 'span-'+ ($('span').length+1)
// 			var pos = dad.childNodes.indexOf(s.anchorNode)
// 			var n = {
// 				type: type,
// 				id: spanId,
// 				node: dad.id,
// 				pos: pos,
// 				guide: guida,
// 				author: author,
// 				date: date,
// 				start: Math.min(s.anchorOffset,s.focusOffset),
// 				end: Math.max(s.anchorOffset,s.focusOffset)
// 			}
// 			//filenotesView[index].data.push(n)
// 			filenotesSave[index].data.push(n)
// 			insertNote(n,true)
// 		}
// 		else {
// 			// gestire annotazioni per parti di testo alla cazzo
// 			alert("Non puoi fare annotazioni per questo tipo di formattazione del testo")
// 		}
// }

function insertNote(note,active) {
	var r = document.createRange()
	var node = $('#'+note.target.node)[0].childNodes[note.target.pos]
	r.setStart(node,note.target.start)
	r.setEnd(node,note.target.end)
	var span = document.createElement('span')
	span.setAttribute('id',note.target.id)
	span.setAttribute('class',note.annotations[0].type+(active?" edit-"+note.annotations[0].type:''))
	r.surroundContents(span)
	console.log(note.annotations[0].type);
}

function compatibleExtremes(n) {
	return (n.anchorNode === n.focusNode && n.type=='Range')
}
		
NodeList.prototype.indexOf = function(n) { 
	var i=-1; 
	while (this.item(i) !== n) {i++} ; 
	return i 
}	