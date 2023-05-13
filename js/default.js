var check_usuario = true;

$(document).ready(function(){
    alertas();
});

function carregarConteudo(caminho){
    // $("#principal").die();
    $("#principal").load(caminho+"/view/index.php", function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success"){
           
        }
        if(statusTxt == "error"){
            //criaAlerta("Erro: " + xhr.status + ": " + xhr.statusText);
        }
    });
}

function alertas(){
    $(".alerta").click(function(){
        $(this).addClass("active");
        var tipo = $(this).attr("data-tipo");
        var texto = parseInt($(this).attr("data-texto"));
        switch(texto){
            case 1:
                $("#alerta p").text("Deseja realmente apagar este pedido?");
            break;
            case 2:
                $("#alerta p").text("Deseja imprimir este pedido?");
            break;
            case 3:
                $("#alerta p").text("Deseja realmente apagar esta notificação?");
            break;
            case 4:
                $("#alerta p").text("Deseja realmente apagar este lançamento?");
            break;
            default:
                $("#alerta p").text("Oie...???");
        }
        if(tipo == 0){
            $("#alerta .opcoes").addClass("hide");
            $("#alerta").addClass("active");
            setTimeout(function(){
                $("#alerta").removeClass("active");
            }, 3000)
        }else if(tipo == 1){
            $("#alerta .opcoes").removeClass("hide");
            $("#alerta").addClass("active");
        }
    });
    $("#alerta .cancelar").click(function(){
        $("#alerta").removeClass("active");
        setTimeout(function(){
            $("#alerta p").empty();
            $("#alerta .opcoes").addClass("hide");
        }, 400)
        $(".alerta").removeClass("active");
    });
}

function criaAlerta(tipo, text, tempo){
    $("#alerta p").empty();
    $("#alerta p").text(text);

    if(tipo == 0){
        $("#alerta .opcoes").addClass("hide");
        $("#alerta").addClass("active");
        setTimeout(function(){
            $("#alerta").removeClass("active");
        }, tempo)
    }else if(tipo == 1){
        $("#alerta .opcoes").removeClass("hide");
        $("#alerta").addClass("active");
    }
}

function deslogar(){
    var dadosajax = {'ACAO' : 'DESLOGAR'};
    pageurl = '../control/login.php';
    $.ajax({
        url: pageurl,
        data: dadosajax,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function(){
            criaAlerta(0,"Falha ao Deslogar!",2000);
        },
        success: function(response){ 
            if(response.status == 0){
                window.location.href="../login.php";
            }else{
                criaAlerta(0,"Status - " + response.status + " | Mensagem - " + response.mensagem,2000);
            }
        }
    });
}