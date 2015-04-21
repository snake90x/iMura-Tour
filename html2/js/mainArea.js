$(document).ready(function(){
  $('#btnAdd').click(function (e) {
    	var nextTab = $('#tabs li').size();
  	
    	// create the tab
    	$('<li><a href="#tab'+nextTab+'" data-toggle="tab"><h6>Tab '+nextTab+'</h6></a><span>X</span></li>').appendTo('#tabs');
    	
    	// create the tab content
    	$('<div class="tab-pane" id="tab'+nextTab+'">tab' +nextTab+' content</div>').appendTo('#contentmain');
    	
    	// make the new tab active
    	$('#tabs a:last').tab('show');
  });
  $('#tabs').on("click","span",function () {
        var anchor = $(this).siblings('a');
        $(anchor.attr('href')).remove();
        $(this).parent().remove();
  });
});