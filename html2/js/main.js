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
				$('#doclist').append("<li><a href='#' onclick='load(\""+url+"\", \""+label+"\");return false;'>"+d[i].label+"</a></li>");
			}
            openWidget('docSucc');
		},
		error: function(a,b,c) {
			openWidget('docFail');
        }
	});
}

function load(file, label){
    $.ajax({
        method:'GET',
        url:file,
        success: function(d){
            openDocs(d,label);
        },
        error: function(a,b,c){
            openWidget('docFail');
        }
    });
}