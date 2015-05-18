function helpButton(){
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
};
$(document).ready(function(){
     var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
        menuTop = document.getElementById( 'cbp-spmenu-s3' ),
        menuTop2 = document.getElementById( 'cbp-spmenu-s2' ),
        showLeftPush = document.getElementById( 'menu_icon' ),
        showTop = document.getElementById( 'login_icon' ),
        showTop2 = document.getElementById( 'src_icon' ),
        body = document.body;
    
        showTop.onclick = function() {
        console.log("Click")
        classie.toggle( this, 'active' );
        classie.toggle( menuTop, 'cbp-spmenu-open' );
        disableOther( 'showTop' );
        console.log("Click")
     };
    
    showTop2.onclick = function() {
        console.log("Click")
        classie.toggle( this, 'active' );
        classie.toggle( menuTop2, 'cbp-spmenu-open' );
        disableOther( 'showTop' );
        console.log("Click")
     };
     
     showLeftPush.onmouseover = function() {
        classie.toggle( this, 'active' );
        classie.toggle( body, 'cbp-spmenu-push-toright' );
        classie.toggle( menuLeft, 'cbp-spmenu-open' );
        disableOther( 'showLeftPush' );
     };
     
     function disableOther( button ) {
       
        if( button !== 'showTop' ) {
            showTop.disabled = true;
        }
              
        if( button !== 'showLeftPush' ) {
            showLeftPush.disabled = true;
        }
      if( button !== 'showTop2' ) {
            showTop2.disabled = true;
        }
     }
});