
// gestione dell'inserimento,salvataggio e visualizzazione delle annotazioni

var notes = {} ; //struttura dati nota
var dataLoaded = 0 ;
var mode = 'view' //modalità modifica o visualizza

$(document).ready(main);

function main() {
		// controllo checkbox principali e bottoni,secondarie e form se sono "cecked" allora assegnano il css
	$('#main').click(function() {
		if (this.checked) 
			$('.main').addClass('text-primary')
		else
			$('.main').removeClass('text-primary')
	})
	$('#sub').click(function() {
		if (this.checked) 
			$('.sub').addClass('text-danger')
		else
			$('.sub').removeClass('text-danger')
	})
	$('#sentence').change(function() {
		var v = this.value
		var s = $('.sentence')
		s.removeClass('bg-warning')
		$(s[v-1]).addClass('bg-warning')
	})
	$('#markSentence').click(function() {
		addNote('sentence')
	})
	$('#markMain').click(function() {
		addNote('main')
	})
	$('#markSub').click(function() {
		addNote('sub')
	})
	$('#markSub').click(function() {
		addNote('sub')
	})
	$('#save').click(function() {
		saveNotes()
	})
	
}



// funzioni richiamate e utilizzate all'interno di main
function load(file,notelist) {
	dataLoaded = 0 ;
	notes.filename = notelist
	$.ajax({
		method: 'GET',
		url: file,
		success: function(d) {
			dataLoaded++ ;
			$('#file').html(d)
			$('#title').html($('#file h1'))
			if (dataLoaded == 2) showNotes()
		},
		error: function(a,b,c) {
			alert('Non ho potuto caricare il file '+file)
		}
	});
	$.ajax({
		method: 'GET',
		url: notelist,
		success: function(d) {
			notes.data = d
			dataLoaded++ ;
			if (dataLoaded == 2) showNotes()
		},
		error: function(a,b,c) {
			alert('Non ho potuto caricare le annotazioni per il file '+file)
			notes.data = []
			dataLoaded++ ;
			if (dataLoaded == 2) showNotes()
		}
	});
}

function saveNotes() {
	$.ajax({
		method: 'POST',
		url: "save.php",
		data: JSON.stringify(notes),
		success: function(d) {
			alert("Note salvate")
		},
		error: function(a,b,c) {
			alert('Non ho potuto salvare le note')
		}
	});
}

function showNotes() {
	for (var i=0; i< notes.data.length; i++) {
		insertNote(notes.data[i],mode=='edit')
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
		var s = selection()
		var dad = s.anchorNode.parentElement
		var guida = s.anchorNode.substringData(s.anchorOffset,20)
		if (compatibleExtremes(s)) {
			var spanId = 'span-'+ ($('#file span').length+1)
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
			notes.data.push(n)
			insertNote(n,true)
		}
}

function insertNote(note,active) {
	var r = document.createRange()
	var node = $('#'+note.node)[0].childNodes[note.pos]
	r.setStart(node,note.start);
	r.setEnd(node,note.end)
	var span = document.createElement('span')
	span.setAttribute('id',note.id)
	span.setAttribute('class',note.type+(active?" edit-"+note.type:''))
	r.surroundContents(span)
}

function compatibleExtremes(n) {
	return (n.anchorNode === n.focusNode && n.type=='Range')
}
		
NodeList.prototype.indexOf = function(n) { 
	var i=-1; 
	while (this.item(i) !== n) {i++} ; 
	return i 
}	
