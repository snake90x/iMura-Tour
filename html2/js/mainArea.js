var id=0;//id sequenziale delle diverse tab aperte dall'utente, cresce sempre
$(document).ready(function(){
  $('#tab_help').load('a.html');
  $('#tabs').on("click","span",function () { 
      // gestisce rimozione delle tab e il ritorno alla tab help una volta rimosse tutte le altre tab
        var anchor = $(this).siblings('a');
        $(anchor.attr('href')).remove();
        $(this).parent().remove();
        if( $('#tabs li').size()==0){
          helpButton();
        }    
  });
});
function openDocs (docCont, doclabel) {
    console.log("dentro opendocs")
    //gestisce la creazione e l'attivazione delle nuove tab e del loro contenuto, parametro corrisponde all'url del documento
    var content = docCont,
        label=doclabel,
        tabExist = false;

    $("#mainArea ul li a").each(function(i){
           if(this.text==label){
                $(this).tab('show');
                tabExist=true;
           }
    });
    if(!tabExist){
        // create the tab
        $('<li><a href="#tab-'+id+'" data-toggle="tab"><h6>'+label+'</h6></a><span>X</span></li>').appendTo('#tabs');
        // create the tab content
        $('#contentmain').append('<div class="tab-pane" id="tab-'+id+'"></div>');
        // make the new tab active
        $('#tab-'+id).html(content);
        $('#tabs a:last').tab('show');
        id++;
    }
};
