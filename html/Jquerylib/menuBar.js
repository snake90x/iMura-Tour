/**
 * Crea gli onclick per i bottoni del menù.
 */
 $(document).ready(function(){
 
/* script implementazione pulsanti*/
		$('#Help').click(function(){
			alert("Tasto help");
		});


		$( "#About" ).click(function() {
			$( "#dialogo" ).dialog( "open" );
		});


		$('#Annotator').click(function(){
			$('#login').dialog( "open" );
			
		});

		// controllo checkbox principali e bottoni,secondarie e form se sono "cecked" allora assegnano il css
		$('#place').click(function() {
			if (this.checked) 
				$('.denotesPlace').addClass('text-primary')
			else
				$('.denotesPlace').removeClass('text-primary')
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
});