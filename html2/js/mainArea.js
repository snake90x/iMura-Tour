$(document).ready(function(){
     
  $('#tab_help').load('a.html');
     
  $('#btnAdd').click(function (e) { //gestisce la creazione e l'attivazione delle nuove tab e del loro contenuto
    	var nextTab = $('#tabs li').size()+1;
  	
    	// create the tab
    	$('<li><a href="#tab'+nextTab+'" data-toggle="tab"><h6>Tab '+nextTab+'</h6></a><span>X</span></li>').appendTo('#tabs');
    	
    	// create the tab content
    	$('#contentmain').append('<div class="tab-pane" id="tab'+nextTab+'"><p>tab' +nextTab+' content</p></div>');
    	
    	// make the new tab active
    	$('#tabs a:last').tab('show');
  });
  $('#tabs').on("click","span",function () { // gestisce rimozione delle tab e il ritorno alla tab help una volta rimosse tutte le altre tab
        var anchor = $(this).siblings('a');
        $(anchor.attr('href')).remove();
        $(this).parent().remove();
        if( $('#tabs li').size()==0){
          $('#Help').click()
        }
            
  });


     $('#btnDoc').click(function()  {
          var nextTab = $('#tabs li').size()+1;
          var tabExist = false;
          var id="tab"+nextTab;
          $("#mainArea ul li a").each(function(i){
               if(this.text=='DOC1'){
                    $(this).tab('show');
                    tabExist=true;
               }
          });
          if(!tabExist){
  	
    	// create the tab
    	$('<li><a href="#'+id+'" data-toggle="tab"><h6>DOC1</h6></a><span>X</span></li>').appendTo('#tabs');
    	
    	// create the tab content
    	$('#contentmain').append('<div class="tab-pane" id="'+id+'"></div>');
    	$('#'+id).load('docs/11voelske.print.html');
    	// make the new tab active
    	$('#tabs a:last').tab('show'); 
          }
     }); 
                                  

});
