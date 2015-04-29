$(document).ready(main);

function main() {
	$.ajax({
		method: 'GET',
		url: 'database.json',
		success: function(d) {
			for (var i=0; i<d.length; i++) {
                var url=d[i].url,
                    label=d[i].label;
                console.log(url, label)
				$('#doclist').append("<li><a href='#' onclick='openDocs(\""+url+"\", \""+label+"\");return false;'>"+d[i].label+"</a></li>");
			}
            alert("caricato");
		},
		error: function(a,b,c) {
			alert('Nessun documento da mostrare');
		}

	});
	
}