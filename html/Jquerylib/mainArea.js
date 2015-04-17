
//funzione addTab aggiunge una nuova tab al momento del click
var maintabs;
$(function() {
	maintabs = $( "#mainArea" ).tabs();
	
	// close icon: chiude le tabs cliccando la x
		maintabs.delegate( "span.ui-icon-close", "click", function() {
			//funzione dialog salva documento
			var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
			$( "#" + panelId ).remove();
			maintabs.tabs( "refresh" );
		});
	 
		maintabs.bind( "keyup", function( event ) {
			if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
				var panelId = maintabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
				$( "#" + panelId ).remove();
				maintabs.tabs( "refresh" );
			}
		});	

});
function addTab(file,index) {
	var tabTemplate = "<li><span class='ui-icon ui-icon-close' data-toggle='filetab' role='presentation'>Remove Tab</span> <a href='#{href}'>#{label}</a> </li>";
	$.ajax({
		method: 'GET',
		url: file,
		async:false,
		success: function(d) {
			//dataLoaded++ ;
			var title = document.getElementById(index.toString()).innerHTML;
			var id = "tabs-" + index.toString(),
			li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, title ) );
			//if (dataLoaded == 2) showNotes()
			var tabNameExists = false;
			$('#mainArea ul li a').each(function(i) {
				if (this.text == title) {
					tabNameExists = true;	
					this.click();	
				} 
			});
			
			if (tabNameExists == false){
				maintabs.find( ".ui-tabs-nav" ).append( li );
				maintabs.append( "<div id='" + id + "' class = 'Doc'></div>" );
				$('#'+id).html(d);
				maintabs.tabs( "refresh" );
				maintabs.tabs( "option", "active", -1 );
				
			}
		},
		error: function(a,b,c) {
			alert('Non ho potuto caricare il file '+file)
		}
	});		   
}
	