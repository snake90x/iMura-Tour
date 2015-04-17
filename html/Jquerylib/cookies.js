// FUNZIONI PER IL CONTROLLO DEI COOKIES USATI PER IL RICONOSCIMENTO TRAMITE USERNAME.	
var logged=[];
	
function scriviCookie(nomeCookie,mail){
	logged[0]=nomeCookie;
	logged[1]=mail;
	document.cookie="username="+logged[0];
	document.cookie="mail="+logged[1];
}


function leggiCookie(){
	if (document.cookie.length > 0){
		return logged;
	}
}

function cancellaCookie(){
  document.cookie="";
  location.reload();
}
