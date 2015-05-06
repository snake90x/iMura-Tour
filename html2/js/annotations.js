var mode = 'view'; // modalità modifica o visualizza

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

 function addNote(type) {
 		var s = selection();
        console.log(s);
 		var dad = s.anchorNode.parentElement
 		var guida = s.anchorNode.substringData(s.anchorOffset,20)
        console.log(guida);
 		if (compatibleExtremes(s)) {
 			var spanId = 'span-'+ ($('span').length+1)
 			var pos = dad.childNodes.indexOf(s.anchorNode)
 			var n = {
 				type: type,
 				id: spanId,
 				node: dad.id,
 				pos: pos,
 				guide: guida,
 				start: Math.min(s.anchorOffset,s.focusOffset),
 				end: Math.max(s.anchorOffset,s.focusOffset)
 			}
 			//filenotesView[index].data.push(n)
 			//filenotesSave[index].data.push(n)
 			//insertNote(n,true)
            return n;
 		}
 		else {
 			// gestire annotazioni per parti di testo alla cazzo
 			alert("Non puoi fare annotazioni per questo tipo di formattazione del testo")
 		}
 };

function insertNote(note,active) {
    console.log(note);
	var r = document.createRange()
	var node = $('#'+note.node)[0].childNodes[note.pos]
	r.setStart(node,note.start)
	r.setEnd(node,note.end)
	var span = document.createElement('span')
	span.setAttribute('id',note.id)
	span.setAttribute('class',note.type+(active?" edit-"+note.type:''))
	r.surroundContents(span)
	console.log(note.type);
}

function compatibleExtremes(n) {
	return (n.anchorNode === n.focusNode && n.type=='Range')
}
		
NodeList.prototype.indexOf = function(n) { 
	var i=-1; 
	while (this.item(i) !== n) {i++} ; 
	return i 
}	