function openWidget(type, id){
    //case switch all'interno della creazione del widget che, in base alla variabile type costruisce il widget adeguato e eventualmente ogni tipo possibile di dialog del sito. Utilizzare le istanze, una per ogni dialog e il case switch per quella adeguata
    var provaWidget = new BootstrapDialog({
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: 'Widget Prototipo di '+id,
            message: 'Mi ha chiamato '+id+'</br> Guida: <a href="http://nakupanda.github.io/bootstrap3-dialog/">Bootstrap-dialog</a>'
        }),
        getDocSucc = new BootstrapDialog({
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_SUCCESS,
            title: 'Success',
            message: 'Documenti caricati con successo'
        }),
        getDocFail = new BootstrapDialog({
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
        case 'prova':
            provaWidget.open();
            break;
    }   
}