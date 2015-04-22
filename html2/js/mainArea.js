$(document).ready(function(){
  $('#btnAdd').click(function (e) {
    	var nextTab = $('#tabs li').size()+1;
  	
    	// create the tab
    	$('<li><a href="#tab'+nextTab+'" data-toggle="tab"><h6>Tab '+nextTab+'</h6></a><span>X</span></li>').appendTo('#tabs');
    	
    	// create the tab content
    	$('#contentmain').append('<div class="tab-pane" id="tab'+nextTab+'"><p>tab' +nextTab+' content</p></div>');
    	
    	// make the new tab active
    	$('#tabs a:last').tab('show');
  });
  $('#tabs').on("click","span",function () {
        var anchor = $(this).siblings('a');
        $(anchor.attr('href')).remove();
        $(this).parent().remove();
        if( $('#tabs li').size()==0){
          $('#Help').click()
        }
            
  });


  //   $('#btnDoc').click(function()  {
  // $("#contentmain").load("/docs/11beel.print.html"); 
//     }); 
                                  

});