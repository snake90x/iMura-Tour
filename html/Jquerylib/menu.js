//Gestione delle select dinamiche della finestra form_denotes

var result={};
var categorie={};

function InviaDati(value, type)
{
  switch(type){
    case 0:
      //modifica sia result sia categorie e fa post
      categorie.filename="categorie.json"
      var dim=categorie.data.denotazione.length;
      categorie.data.denotazione[dim-1]=value;
      categorie.data.denotazione[dim]="Altro...";
      var arr = [" ", "altro..."];
      result.filename="sotto-categorie.json"
      result.data[value]=(arr);
      var string = JSON.stringify(categorie);
      var string2 = JSON.stringify(result);
      var denotes=document.getElementById("denotazione");
      $.ajax({
          method: 'POST',
          url: 'save.php',
          data: string,
          success: function(d) {
            alert("Categoria salvate")
            $(denotes).find('option').remove().end();
            for (var i=0; i<categorie.data.denotazione.length; i++) {
                denotes.options[denotes.options.length] = 
                new Option(categorie.data.denotazione[i], categorie.data.denotazione[i]);
            }
          },
          error: function(a,b,c) {
            alert('Non ho potuto salvare la categoria')
          }
      });
      $.ajax({
          method: 'POST',
          url: "save.php",
          data: string2,
          success: function(d) {
            alert("Array inizializzato")
          },
          error: function(a,b,c) {
            alert("Non ho potuto inizializzare array")
          }
      });
      break;

    case 1:
      //modifica sotto-categorie e fa post
      result.filename="sotto-categorie.json"
      var cat = document.getElementById("denotazione").value;
      var dim=result.data[cat].length;
      result.data[cat][dim-1]=value;
      result.data[cat][dim]="altro...";
      var string = JSON.stringify(result);
      $.ajax({
          method: 'POST',
          url: "save.php",
          data: string,
          success: function(d) {
            alert("Sotto categoria salvate")
            SetLinguaggi(cat);
          },
          error: function(a,b,c) {
            alert('Non ho potuto salvare la sotto-categoria')
          }
      });
      break;
  }
}
function SetLinguaggi(Linguaggi)
{
  var linguaggioBox = document.getElementById("Info");
  switch(Linguaggi){
  case "Luogo":
          $(linguaggioBox).find('option').remove().end();
          for (var i=0; i<result.data[Linguaggi].length; i++) {
            linguaggioBox.options[linguaggioBox.options.length] = 
            new Option(result.data[Linguaggi][i], "denotesPlace");
          }
          break;
  case "Persona":
          $(linguaggioBox).find('option').remove().end();
          for (var i=0; i<result.data[Linguaggi].length; i++) {
            linguaggioBox.options[linguaggioBox.options.length] = 
            new Option(result.data[Linguaggi][i], "denotesPerson");
          }
          break;
  case "Malattia":
          $(linguaggioBox).find('option').remove().end();
          for (var i=0; i<result.data[Linguaggi].length; i++) {
            linguaggioBox.options[linguaggioBox.options.length] = 
            new Option(result.data[Linguaggi][i], "denotesDesease");
          }
          break;
  case "Altro...":
          var input = document.createElement("input"),
          select=document.getElementById("denotazione"),
          select1=document.getElementById("Info"),
          x = document.createElement("img"),
          v = document.createElement("img");
          x.src="images/icon_x.png";
          x.alt="Annulla";
          $(x).addClass("immagine");
          v.src="images/v-icon.gif";
          v.alt="Conferma";
          $(v).addClass("immagine");
          input.type = "text";
          input.id = "new_cat"
          input.placeholder = "nuova categoria";
          $(input).insertAfter(select);
          $(v).insertAfter(input);
          $(x).insertAfter(v);
          $(x).click(function(){
            select.disabled = false;
            input.parentNode.removeChild(input);
            this.parentNode.removeChild(v);
            this.parentNode.removeChild(this);
          });
          $(v).click(function(){
            select.disabled = false;
            InviaDati(input.value, 0);
            input.parentNode.removeChild(input);
            this.parentNode.removeChild(x);
            this.parentNode.removeChild(this);
          });
          select.disabled = true;
          $(select1).find('option').remove().end();
          break;
  default:
          $(linguaggioBox).find('option').remove().end();
              for (var i=0; i<result.data[Linguaggi].length; i++) {
                linguaggioBox.options[linguaggioBox.options.length] = 
                new Option(result.data[Linguaggi][i], result.data[Linguaggi][i]);
              }
          break;
  }
}

function GetLinguaggi(Categoria)
{
  $.ajax({
      method: 'GET',
      url: 'sotto-categorie.json',
      async:false,
      cache:false,
      success: function(d) {
          result.data = d;
      },
      error: function(a,b,c) {
        alert('Errore in get del document')
      }
  });
  $.ajax({
    method: 'GET',
    url: 'categorie.json',
    async:false,
    cache:false,
    success: function(d) {
        categorie.data = d;
    },
    error: function(a,b,c) {
      alert('Errore in get del document')
    }

  });
  SetLinguaggi(Categoria);
}

function newSubject(Categoria)
{
  if (Categoria=="altro...") {
    var input = document.createElement("input"),
        select=document.getElementById("Info"),
        select1=document.getElementById("denotazione"),
        x = document.createElement("img"),
        v = document.createElement("img");
    x.src="images/icon_x.png";
    x.alt="Annulla";
    v.src="images/v-icon.gif";
    v.alt="Conferma";
    input.type = "text";
    input.id = "new_sub"
    input.placeholder = "nuova voce";
    $(input).insertAfter(select);
    $(v).insertAfter(input);
    $(x).insertAfter(v);
    $(x).click(function(){
      select.disabled = false;
      select1.disabled = false;
      input.parentNode.removeChild(input);
      this.parentNode.removeChild(v);
      this.parentNode.removeChild(this);
    });
    $(v).click(function(){
      select.disabled = false;
      select1.disabled = false;
      InviaDati(input.value, 1);
      input.parentNode.removeChild(input);
      this.parentNode.removeChild(x);
      this.parentNode.removeChild(this);
    });
    select.disabled = true;
    select1.disabled = true;
  }
}
