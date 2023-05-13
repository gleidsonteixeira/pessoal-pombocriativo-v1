$(document).ready(function(){
    inserirVideo();
    menu();
    expandir();
    showVideo();
    como();
    //banner();
    voltar();
});
$(window).resize(function(){
    
});
$(window).scroll(function(){
    menu();
    voltar();
});
$(window).load(function(){});

function voltar(){
    var a = pageYOffset;
    if(a > 700){
        $(".voltar").addClass("active");
    }else{
        $(".voltar").removeClass("active");
    }
    if(a > 1000){
        $("#redes-sociais").css({"left":"-40px"});
    }else{
        $("#redes-sociais").css({"left":"30px"});
    }
    $(".voltar").click(function(){
        var body = $("html, body");
        body.stop().animate({scrollTop:0}, 500, 'swing');
    });
}
function banner(){
    $(document).on("click", ".passador", function(){
        var banner = $(this).attr("data-banner");
        $("#banner ul li.active").removeClass("active");
        $('#banner ul li[data-banner='+banner+']').addClass("active");
        $(".passador").removeClass("active");
        $(this).addClass("active");
    });

    setInterval(function(){
        var tamanho = $("#banner ul li").length;
        var posicao = $("#banner ul li.active").attr("data-posicao");
        var banner_next = $("#banner ul li.active + li").attr("data-posicao");
        if(posicao < tamanho){
            $("#banner ul li.active").removeClass("active");
            $('#banner ul li[data-posicao='+banner_next+']').addClass("active");
            $(".passador.active").removeClass("active");
            $('.passador[data-posicao='+banner_next+']').addClass("active");
        }else{
            $("#banner ul li.active").removeClass("active");
            $("#banner ul li:nth-child(1)").addClass("active");
            $(".passador.active").removeClass("active");
            $(".passador:nth-child(1)").addClass("active");
        }
    },6000);
}
function click(){
    $(".addBannerClick").click(function(){
        addBannerClick($(this).attr("data-id"),$(this).attr("data-tipo"));
    });
    $(".addBlogClick").click(function(){
        addBlogClick($(this).attr("data-id"),$(this).attr("data-nota"));
        $(".agradecer").addClass("active");
        $(".avaliacao i").addClass("hide");
    });
    $(".addBlogpostClick").click(function(){
        addBlogpostClick($(this).attr("data-id"));
    });

    $(".pesquisa-externa .enviar").click(function(){
        addNotaClick($(".pesquisa-externa i.active").attr("data-id"),"PES", $(".pesquisa-externa textarea").val());
    });

} click();

function addBannerClick(click_id, click_tipo){
    var dadosajax = {
        'ID'   : click_id,
        'TIPO' : 'BLO'
    };
    pageurl = 'control/insertClick.php';
    $.ajax({
        url: pageurl,
        data: dadosajax,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function(){
            console.log("deu pau");
        },
        success: function(response){ 
            if(response == 0){
                console.log("ok");
            }else{
                console.log("deu pau");
            }
        }
    });
}

function addBlogClick(click_id, click_nota){
    var dadosajax = {
        'ID'   : click_id,
        'TIPO' : 'BLO',
        'NOTA' : click_nota
    };
    pageurl = 'https://www.pombocriativo.com/control/insertClick.php';
    $.ajax({
        url: pageurl,
        data: dadosajax,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function(){
            console.log("deu pau");
        },
        success: function(response){ 
            if(response == 0){
                console.log("ok");
            }else{
                console.log("deu pau");
            }
        }
    });
}

function addBlogpostClick(click_id){
    var dadosajax = {
        'ID'   : click_id,
        'TIPO' : 'BLOP'
    };
    pageurl = 'https://www.pombocriativo.com/control/insertClick.php';
    $.ajax({
        url: pageurl,
        data: dadosajax,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function(){
            console.log("deu pau");
        },
        success: function(response){ 
            if(response == 0){
                console.log("ok");
            }else{
                console.log("deu pau");
            }
        }
    });
}

function addNotaClick(click_id, click_tipo, click_mensagem){
    var dadosajax = {
        'ID'   : click_id,
        'TIPO' : click_tipo,
        'MENSAGEM' : click_mensagem
    };
    pageurl = 'control/insertClick.php';
    $.ajax({
        url: pageurl,
        data: dadosajax,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function(){
            console.log("deu pau");
        },
        success: function(response){ 
            if(response == 0){
                $(".pesquisa-externa p").text("Obrigado por participar, você nos faz grande!");
                setTimeout(() => {
                    $(".pesquisa-externa").removeClass("active");
                }, 4000);
                console.log("ok");
            }else{
                console.log("deu pau");
            }
        }
    });
}

// function entrada(){
//     var roll = window.pageYOffset;
//     var scale = roll / 20;
//     if(roll / 10 > 1 && roll / 10 < 8){
//         // $("#entrada object embed").addClass("active");
//         $("#entrada object embed").css({"transform":'scale('+scale+')'});
//         $("#entrada").css({"opacity":"1","visibility":"visible"});
//     }else if(roll == 0){
//         // $("#entrada object embed").removeClass("active");
//         $("#entrada object embed").css({"transform":"scale(1)"});
//     }else if(roll / 10 > 8){
//         $("#entrada").css({"opacity":"0","visibility":"hidden"});
//     }
// }
function quadrado(e){
    return $(e).height($(e).width())
}
function menu(){
    var a=window.pageYOffset;
    if(a>100){
        $("#topo").addClass("active");
    }else{
        $("#topo").removeClass("active");
    };
    $(".mini-menu").click(function(){
        $("#slide-out").addClass("active");
    });
    $("#slide-out .fechar").click(function(){
        $("#slide-out").removeClass("active");
    });
}
function como(){
    $(".como1").click(function(){
        $(".modo ul").removeClass("active");
        $(".modo ul").removeClass("active2");
        $(".text1, .modo-img img.imagem1").addClass("active");
        $(".text2, .text3, .modo-img img.imagem2, .modo-img img.imagem3").removeClass("active");
    });
    $(".como2").click(function(){
        $(".modo ul").removeClass("active2");
        $(".modo ul").addClass("active");
        $(".text2, .modo-img img.imagem2").addClass("active");
        $(".text1, .text3, .modo-img img.imagem1, .modo-img img.imagem3").removeClass("active");
    });
    $(".como3").click(function(){
        $(".modo ul").removeClass("active");
        $(".modo ul").addClass("active2");
        $(".text3, .modo-img img.imagem3").addClass("active");
        $(".text2, .text1, .modo-img img.imagem2, .modo-img img.imagem1").removeClass("active");
    });
}
function expandir(){
    $("#cases ul li a").click(function(){
        $(this).offsetParent().offsetParent().find(".expandir").addClass("active");
    });
    $(".expandir i").click(function(){
        $(this).offsetParent().removeClass("active");
    });
}
function showVideo(){
    $(".video").click(function(){
        $(".video-box").addClass("active");
    });
    $(".video-box i").click(function(){
        $(".video-box").removeClass("active");
    });
}
function inserirVideo(){
    $("#conheca-a-faster .close").click(function(){
        $("#conheca-a-faster .over").empty();
        $("#conheca-a-faster .over").removeClass("active");
        $("#conheca-a-faster .close").css({"display":"none"});
    })
    $("#conheca-a-faster button").click(function(){
        $("#conheca-a-faster .over").addClass("active");
        $("#conheca-a-faster .over").html('<iframe width="850" height="478" src="https://www.youtube.com/embed/f415B2B6_0M?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
        $("#conheca-a-faster .close").css({"display":"block"});
    })
}

