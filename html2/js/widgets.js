function openWidget(type){
    //case switch all'interno della creazione del widget che, in base alla variabile type costruisce il widget adeguato e eventualmente ogni tipo possibile di dialog del sito. Utilizzare le istanze, una per ogni dialog e il case switch per quella adeguata
    var dialogInstance1 = new BootstrapDialog({
            title: 'Dialog instance 1',
            message: 'Hi Apple!'
    });
    //esecuzione istanza dialogInstance1.open();
    BootstrapDialog.show({
        size: BootstrapDialog.SIZE_SMALL,
        type: BootstrapDialog.TYPE_PRIMARY,
        title: 'Widget Prototipo di '+type,
        message: 'Mi ha chiamato '+type+'</br> Guida: <a href="http://nakupanda.github.io/bootstrap3-dialog/">Bootstrap-dialog</a>'
    });    
}