    $.ajax({
        data: {
            query: "ASK { FILTER(true && false) }",
            "default-graph-uri": "http://dbpedia.org/"
        },
        dataType: "json",
        url: "http://dbpedia.org/sparql",
        statusCode: {
            400: function (error) {
                //Whatever you want to do if there's an error.
            }
        },
        success: function (data) {
            // Just show the returned data as an alert
            alert(JSON.stringify(data));
        }
    });