function listarFAQ(){
    var dadosajax = {
        'ACAO' : 'LISTAR FAQ'
    };
    pageurl = 'control/faq/faqsList.php';
    $.ajax({
        url: pageurl,
        data: dadosajax,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function(){
            $('.lista-body').removeClass("active");
    
        },
        success: function(response){ 
            $('.lista-body').empty();

            if(response.status == 0){
                var i = 0;
                for (i = 0; i < response.lista_faqs.length; i++) {
                    $('.lista-body').append('<li>' +
                        '<h3 class="font cor1-text">' + response.lista_faqs[i].FAQ_PERGUNTA + '</h3>' +
                        '<h6 class="mini-title upper">'+ response.lista_faqs[i].FAQ_NSETOR + '</h6>' +
                        '<p>' + response.lista_faqs[i].FAQ_RESPOSTA + '</p>' +
                         '<div class="opniao" id="btn_faq_'+response.lista_faqs[i].FAQ_COD+'">' +
                            '<span>Esta resposta foi útil para você?</span>'+
                            '<i onclick="util('+ response.lista_faqs[i].FAQ_COD +')" class="material-icons click suave util-'+ response.lista_faqs[i].FAQ_COD +'">thumb_up</i>'+
                            '<i onclick="inutil('+ response.lista_faqs[i].FAQ_COD+')" class="material-icons click suave inutil-'+ response.lista_faqs[i].FAQ_COD +'">thumb_down</i>' +
                        '</div>');   
                }
                if(i == 0){
                    $('.lista-body').append('<li><h3 style="width: 100%;text-align:center;">Nenhum empresa cadastrado.</h3></li>');
                }
            }else{
                $('.lista-body').removeClass("active");
                criaAlerta(0,"Status - " + response.status + " | Mensagem - " + response.mensagem,2000);
                
            }
        }
    });
} listarFAQ();

function listarSTO(){
    var dadosajax = {
        'ACAO' : 'LISTAR STO'
    };
    pageurl = 'control/faq/faqsList.php';
    $.ajax({
        url: pageurl,
        data: dadosajax,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function(){
            $('.lista-body').removeClass("active");
    
        },
        success: function(response){ 
              $('.lista-bod').empty();

            if(response.status == 0){
                var i = 0;
                for (i = 0; i < response.lista_sto.length; i++) {
                    $('.lista-bod').append(
                        '<li class="suave"><h6 class="mini-title upper suave click" onclick="listar_faqs_setor('+ response.lista_sto[i].STO_COD +');">'+ response.lista_sto[i].STO_NOME +'</h6></li>' ); 
                }
            }else{
                $('.lista-body').removeClass("active");
                criaAlerta(0,"Status - " + response.status + " | Mensagem - " + response.mensagem,2000);
                
            }
        }
    });
} listarSTO();

function listar_faqs_setor(cod_setor){
    var dadosajax = {
        'ACAO' : 'LISTAR FAQ STO',
        'STO_COD' : cod_setor
    };
    pageurl = 'control/faq/faqsList.php';
    $.ajax({
        url: pageurl,
        data: dadosajax,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function(){
            $('.lista-body').removeClass("active");
    
        },
        success: function(response){ 
            $('.lista-body').empty();

            if(response.status == 0){
                var i = 0;
                for (i = 0; i < response.lista_faq_sto.length; i++) {
                    $('.lista-body').append('<li>' +
                        '<h3 class="font cor1-text">' + response.lista_faq_sto[i].FAQ_PERGUNTA + '</h3>' +
                        '<h6 class="mini-title upper">'+ response.lista_faq_sto[i].FAQ_NSETOR + '</h6>' +
                        '<p>' + response.lista_faq_sto[i].FAQ_RESPOSTA + '</p>' +
                         '<div class="opniao"  id="btn_faq_' + response.lista_faq_sto[i].FAQ_COD + '">' +
                            '<span>Esta resposta foi útil para você?</span>'+
                            '<i onclick=util('+ response.lista_faq_sto[i].FAQ_COD +') class="material-icons click suave">thumb_up</i>'+
                            '<i onclick=inutil('+ response.lista_faq_sto[i].FAQ_COD+') class="material-icons click suave">thumb_down</i>' +
                        '</div>');   
                }
                if(i == 0){
                    $('.lista-body').append('<li><h3 style="width: 100%;text-align:center;">Nenhum resultado.</h3></li>');
                }
            }else{
                $('.lista-body').removeClass("active");
                criaAlerta(0,"Status - " + response.status + " | Mensagem - " + response.mensagem,2000);
                
            }
        }
    });
}

var duploClickUtil = 0;
var faq_cod_util;
function util(faq_cod){
    faq_cod_util = faq_cod;
    criaAlerta(1,"Deseja realmente dar esta Avaliação?",2000);
    $("#alerta .confirmar").click(function(){
        if(duploClickUtil == 0){
            duploClickUtil = 1;
            var dadosajax = {
                'ACAO' : 'CONTAR FAQ UTIL',
                'FAQ_COD' : faq_cod_util
            };
            pageurl = 'control/faq/faqsList.php';
            $.ajax({
                url: pageurl,
                data: dadosajax,
                type: 'POST',
                cache: false,
                dataType: 'json',
                success: function(response){ 
                    $('.util-' + faq_cod_util).addClass("active");
                    $('#btn_faq_'+ faq_cod_util).addClass("hide");
                    $('.inutil-' + faq_cod_util).removeClass("active");



                    if(response.status == 0){
                        criaAlerta(0,response.mensagem,2000);
                    }else{
                        criaAlerta(0,"Status - " + response.status + " | Mensagem - " + response.mensagem,2000);
                    }
                    duploClickUtil = 0;
                }
            });
        }
    })
}
var duploClickInutil = 0;
var faq_cod_inutil;
function inutil(faq_cod){
    faq_cod_inutil = faq_cod;
    criaAlerta(1,"Deseja realmente dar esta Avaliação?",2000);
    $("#alerta .confirmar").click(function(){
        if(duploClickInutil == 0){
            duploClickInutil = 1;
            var dadosajax = {
                'ACAO' : 'CONTAR FAQ INUTIL',
                'FAQ_COD' : faq_cod_inutil
            };
            pageurl = 'control/faq/faqsList.php';
            $.ajax({
                url: pageurl,
                data: dadosajax,
                type: 'POST',
                cache: false,
                dataType: 'json',
                success: function(response){ 

                    $('.inutil-' + faq_cod_inutil).addClass("active");
                    $('#btn_faq_'+ faq_cod_inutil).addClass("hide");
                    $('.util-' + faq_cod_inutil).removeClass("active");          

                    

                    if(response.status == 0){
                        criaAlerta(0,response.mensagem,2000);
                    }else{
                        criaAlerta(0,"Status - " + response.status + " | Mensagem - " + response.mensagem,2000);
                    }
                    duploClickInutil = 0;
                }
            });
        }
    })
}

$(".form-buscar").submit(function(e){

    e.preventDefault();

    buscar();
    inserirPesquisa();
});


var duploClickBuscar = 0;
function buscar(){

    if (duploClickBuscar == 0) {
        duploClickBuscar = 1;

        var form = document.getElementById('form-buscar');
        var formData = new FormData(form);
        formData.append('ACAO', 'BUSCAR');

        pageurl = 'control/faq/faqsList.php';

        $.ajax({
            url: pageurl,
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            cache: false,
            dataType: 'json',
            error: function (){
                $('.lista-body').removeClass("active");
                criaAlerta(0,"Falha ao buscar Faqs!",2000);
                duploClickBuscar = 0;
            },
            success: function (response){
                $('.lista-body').empty();
                if(response.status == 0){
                    var i = 0;
                    for (i = 0; i < response.lista_faqs.length; i++) {
                        $('.lista-body').append('<li>' +
                            '<h3 class="font cor1-text">' + response.lista_faqs[i].FAQ_PERGUNTA + '</h3>' +
                            '<h6 class="mini-title upper">'+ response.lista_faqs[i].FAQ_NSETOR + '</h6>' +
                            '<p>' + response.lista_faqs[i].FAQ_RESPOSTA + '</p>' +
                             '<div class="opniao" id="btn_faq_'+response.lista_faqs[i].FAQ_COD+'">' +
                                '<span>Esta resposta foi útil para você?</span>'+
                                '<i onclick="util('+ response.lista_faqs[i].FAQ_COD +')" class="material-icons click suave util-'+ response.lista_faqs[i].FAQ_COD +'">thumb_up</i>'+
                                '<i onclick="inutil('+ response.lista_faqs[i].FAQ_COD+')" class="material-icons click suave inutil-'+ response.lista_faqs[i].FAQ_COD +'">thumb_down</i>' +
                            '</div>');   
                    }
                    if(i == 0){
                        $('.lista-body').append('<li><h3 style="width: 100%;text-align:center;">Nenhum empresa cadastrado.</h3></li>');
                    }
                duploClickBuscar = 0;
                }else{
                    $('.lista-body').removeClass("active");
                    criaAlerta(0,"Status - " + response.status + " | Mensagem - " + response.mensagem,2000);
                    
                }
            }
        });

    }

}

function inserirPesquisa(){
      var form = document.getElementById('form-buscar');
      var formData = new FormData(form);
      var pageurl = 'control/faq/createPesquisaFaq.php';
      formData.append('ACAO', 'CREATE PESQUISA');
      

      $.ajax({
        url: pageurl,
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function (){
            alert('Error ao inserir no banco');
        },
        success: function (response){
           
          
        }

      });
}