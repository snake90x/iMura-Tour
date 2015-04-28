$(document).ready(function(){
	var //menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
		menuTop = document.getElementById( 'cbp-spmenu-s3' ),
		//showLeft = document.getElementById( 'showLeft' ),
		showTop = document.getElementById( 'Annotator' ),
		body = document.body;
    
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

	/*showLeft.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
		disableOther( 'showLeft' );
	};
	showRight.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
		disableOther( 'showRight' );
	};*/
	showTop.onclick = function() {
        console.log("Click")
		classie.toggle( this, 'active' );
		classie.toggle( menuTop, 'cbp-spmenu-open' );
		disableOther( 'showTop' );
        console.log("Click")
	};
	/*showBottom.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuBottom, 'cbp-spmenu-open' );
		disableOther( 'showBottom' );
	};
	showLeftPush.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( body, 'cbp-spmenu-push-toright' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
		disableOther( 'showLeftPush' );
	};
	showRightPush.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( body, 'cbp-spmenu-push-toleft' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
		disableOther( 'showRightPush' );
	};
*/
	function disableOther( button ) {
		/*if( button !== 'showLeft' ) {
			classie.toggle( showLeft, 'disabled' );
		}
		if( button !== 'showRight' ) {
			classie.toggle( showRight, 'disabled' );
		}*/
		if( button !== 'showTop' ) {
			classie.toggle( showTop, 'disabled' );
		}/*
		if( button !== 'showBottom' ) {
			classie.toggle( showBottom, 'disabled' );
		}
		if( button !== 'showLeftPush' ) {
			classie.toggle( showLeftPush, 'disabled' );
		}
		if( button !== 'showRightPush' ) {
			classie.toggle( showRightPush, 'disabled' );
		}*/
	}
});