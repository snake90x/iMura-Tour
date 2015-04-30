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
            BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                type: BootstrapDialog.TYPE_SUCCESS,
                title: 'Success',
                message: 'Documenti caricati con successo',
            });
		},
		error: function(a,b,c) {
			BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                type: BootstrapDialog.TYPE_WARNING,
                title: 'Errore',
                message: 'Non sono stati trovati documenti da caricare',
            });
		}

	});
	
}