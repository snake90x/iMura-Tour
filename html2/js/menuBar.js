 $(document).ready(function(){
 
/* script implementazione pulsanti*/
		$('#Help').click(function(){
             var tabExist = false;
               $("#mainArea ul li a").each(function(i){
                    if(this.text=="Tab Help"){
                        $(this).tab('show');
                         tabExist=true;
                    }
               });
             if(!tabExist){
               // create the tab
    	$('<li><a href="#tab_help" data-toggle="tab"><h6>Tab Help</h6></a><span>X</span></li>').appendTo('#tabs');
    	
    	// create the tab content
    	$('#contentmain').append('<div class="tab-pane" id="tab_help"></div>');
        $('#tab_help').load('a.html');
    	
    	// make the new tab active
    	$('#tabs a:last').tab('show');
             }
			
		});


		$( "#About" ).click(function() { // da implementare
			$( "#dialogo" ).dialog( "open" );
		});
 });
