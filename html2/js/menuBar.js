 $(document).ready(function(){
 
/* script implementazione pulsanti*/
		$('#Help').click(function(){
			// create the tab
    	$('<li><a href="#help" data-toggle="tab"><h6>Tab Help</h6></a><span>X</span></li>').appendTo('#tabs');
    	
    	// create the tab content
    	$('#contentmain').append('<div class="tab-pane" id="help"> <h3>Documento Default </h3><p>Lorem ipsum dolor sit amet, qui ex quis tempor persius, eu per minim accusam, est sumo harum melius id. Invenire appellantur duo no. Dicta scripserit necessitatibus est in, sea ad iriure intellegat reprehendunt, an mazim dicit iuvaret mei. Natum posse albucius vim et, quo putent commune dissentiet ne. Odio detracto mel at, vocibus denique at sed, illud ancillae postulant est an. Cum ne fugit altera postulant, omnesque dignissim cotidieque quo cu. Cu dicant rationibus pri, usu illum alterum patrioque no. Est ut errem scripserit, sed eu tation maluisset. Cum diceret detracto honestatis in. Reque mucius possit ea vel, ex tamquam fabellas evertitur mel. Pro dolorem facilisi id. Nam eius exerci utamur ut. Ne alii aeque recusabo eum, has esse meis ullum id. Ex verear commodo usu, eu oporteat dissentiunt nec. Et soluta animal pri, illum probatus explicari eos et, at his dicat tollit. Falli ceteros eu est, sit omnium verear voluptatum te. Mea diam mucius ea, hinc antiopam vix cu.</p></div>');
    	
    	// make the new tab active
    	$('#tabs a:last').tab('show');
		});


		$( "#About" ).click(function() {
			$( "#dialogo" ).dialog( "open" );
		});


		$('#Annotator').click(function(){
			$('#login').dialog( "open" );
			
		});
 });