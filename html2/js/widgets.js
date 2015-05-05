function openWidget(type){
    //istanze di ogni alert esistente nel sistema, widget e avvisi
    var currentYear= new Date().getFullYear(), //anno corrente
        hasAuthorWidget = new BootstrapDialog({ //widget autori
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: 'Autore o Autori dell\'articolo',
            message: '<form role="form"><div class="form-group"><label for="'+type+'">Autori:</label><select class="form-control" id="'+type+'"></select></div></form>'
        }),
        hasPublicationYearWidget = new BootstrapDialog({//widget anno pubblicazione
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: 'Anno di pubblicazione',
            message: '<form role="form"><div class="form-group"><label for="'+type+'">Anno compreso tra il 1920 e il '+currentYear+':</label><input type="number" class="form-control" id="'+type+'" min="1920" max="'+currentYear+'"></input></div></form>'
        }),
        hasTitleWidget = new BootstrapDialog({//widget titolo
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: 'Titolo articolo',
            message: '<form role="form"><div class="form-group"><label for="'+type+'">Titolo:</label><input type="text" class="form-control" id="'+type+'" placeholder="inserire titolo"></input></div></form>'
        }),
        hasDOIWidget = new BootstrapDialog({//widget DOI
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: 'DOI dell\'articolo',
            message: '<form role="form"><div class="form-group"><label for="'+type+'">DOI:</label><input type="text" class="form-control" id="'+type+'" placeholder="inserire DOI" maxlenght="80"></input></div></form>'
        }),
        hasURLWidget = new BootstrapDialog({//widget URL
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: 'URL dell\'articolo',
            message: '<form role="form"><div class="form-group"><label for="'+type+'">URL:</label><input type="url" class="form-control" id="'+type+'" placeholder="inserire URL"></input></div></form>'
        }),
        hasCommentWidget = new BootstrapDialog({//widget commento
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: 'Commento',
            message: '<form role="form"><div class="form-group"><textarea class="form-control" rows="5" id="'+type+'" placeholder="inserire commento"></textarea></div></form>'
        }),
        denotesRethoricWidget = new BootstrapDialog({//widget denotes
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: 'Determinare la funzione del brano',
            message: '<form role="form"><div class="form-group"><label for="'+type+'">Funzioni:</label><select class="form-control" id="'+type+'"><option value="sro:Abstract">Abstract</option><option value="deo:Introduction">Introduction</option><option value="deo:Materials">Materials</option><option value="deo:Methods">Methods</option><option value="deo:Results">Results</option><option value="sro:Discussion">Discussion</option><option value="sro:Conclusion">Conclusion</option></select></div></form>'
        }),
        citesWidget = new BootstrapDialog({//widget citazione
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: 'Articolo citato dal brano',
            message: '<form role="form"><div class="form-group"><label for="'+type+'_title">Titolo:</label><input type="text" class="form-control" id="'+type+'_title" placeholder="inserire titolo"></input></div><div class="form-group"><label for="'+type+'_publicationYear">Anno compreso tra il 1920 e il '+currentYear+':</label><input type="number" class="form-control" id="'+type+'_publicationYear" min="1920" max="'+currentYear+'"></input></div><div class="form-group"><label for="'+type+'_Author">Autori:</label><select class="form-control" id="'+type+'_Author"></select></div><div class="form-group"><label for="'+type+'_DOI">DOI:</label><input type="text" class="form-control" id="'+type+'_DOI" placeholder="inserire DOI" maxlenght="80"></input></div><div class="form-group"><label for="'+type+'_URL">URL:</label><input type="url" class="form-control" id="'+type+'_URL" placeholder="inserire URL"></input></div></form>'
        }),
        getDocSucc = new BootstrapDialog({//alert caricamento documenti avvenuto
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_SUCCESS,
            title: 'Success',
            message: 'Documenti caricati con successo'
        }),
        getDocFail = new BootstrapDialog({//alert caricamento documenti fallito
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Errore',
            message: 'Non sono stati trovati documenti da caricare'
        });
    //gestione casi
    switch(type){
        case 'docFail':
            getDocFail.open();
            break;
        case 'docSucc':
            getDocSucc.open();
            break;
        case 'hasPublicationYear':
            hasPublicationYearWidget.open();
            break;
        case 'hasAuthor':
            hasAuthorWidget.open();
            break;
        case 'hasTitle':
            hasTitleWidget.open();
            break;
        case 'hasDOI':
            hasDOIWidget.open();
            break;
        case 'hasURL':
            hasURLWidget.open();
            break;
        case 'hasComment':
            hasCommentWidget.open();
            break;
        case 'denotesRethoric':
            denotesRethoricWidget.open();
            break;
        case 'cites':
            citesWidget.open();
            break;
    }   
}