var tituloPost;
function listarPosts(){	
    var dadosajax = {
        'ACAO' : 'LISTAR POSTS'
    };
    pageurl = 'control/blog/postList.php';
    $.ajax({
        url: pageurl,
        data: dadosajax,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function(){
		alert("Error");
        criaAlerta(0,"Status - " + response.status + " | Mensagem - " + response.mensagem,2000);
        },
        success: function(response){ 
            // $('.lista-body').empty();
            if(response.status == 0){
                for (i = 0; i < response.lista_posts.length; i++) {
                    tituloPost = response.lista_posts[i].BLO_TITULO;
                   $('#blog .posts').append(
                        '<article>'+
                            '<a href="blogpost/'+response.lista_posts[i].BLO_TITULO.toLowerCase().replace(/ /g, "-").replace(":", "").replace("?", "")+'/'+response.lista_posts[i].BLO_COD+'">'+
                                '<figure>'+
                                    '<img src="https://www.pombocriativo.com/img/posts/'+ response.lista_posts[i].BLO_IMAGEM +'" alt="'+ response.lista_posts[i].BLO_IMAGEM +'">'+
                                '</figure>'+
                                '<header>'+
                                    '<h6 class="categoria">'+ response.lista_posts[i].BLO_CATEGORIA +' </h6>'+
                                    '<h2 class="font">'+ response.lista_posts[i].BLO_TITULO +'</h2>'+
                                    '<h6 class="mini-title upper">por '+ response.lista_posts[i].BLO_AUTOR +' em '+ response.lista_posts[i].BLO_DATA +'</h6>'+
                                '</header>'+
                                '<p>'+ response.lista_posts[i].BLO_P_TEXTO +'</p>'+
                            '</a>'+
                        '</article>'
                );
                }
                // $('#blog .posts').append(
                // 	'<div class="paginacao">'+
                //         '<ul>'+
                //             '<li class="active">1</li>'+
                //             '<li>2</li>'+
                //             '<li>3</li>' +
                //             '<li>4</li>' +
                //             '<li>5</li>' +
                //             '<li>Última >></li>'+
                //         '</ul>'+
                //         '<h6 class="mini-title upper">pág. 1 de 1000</h6>'+
                //     '</div>'
                // );
                if(i == 0){
                    $('.lista-body').append('<li><h3 style="width: 100%;text-align:center;">Nenhum empresa cadastrado.</h3></li>');
                }
            }else{
                $('.lista-body').removeClass("active");
                criaAlerta(0,"Status - " + response.status + " | Mensagem - " + response.mensagem,2000);
            }
        }
    });
}

function listarUltimosPosts(){	
    var dadosajax = {
        'ACAO' : 'LISTAR POSTS'
    };
    pageurl = 'control/blog/postList.php';
    $.ajax({
        url: pageurl,
        data: dadosajax,
        type: 'POST',
        cache: false,
        dataType: 'json',
        error: function(){
            criaAlerta(0,"Status - " + response.status + " | Mensagem - " + response.mensagem,2000);
        },
        success: function(response){ 
            // $('.lista-body').empty();
            if(response.status == 0){
                for (i = 0; i < 4; i++) {
                    tituloPost = response.lista_posts[i].BLO_TITULO;
                   $('#last-blog .posts').append(
                        '<article>'+
                            '<a href="blogpost/'+response.lista_posts[i].BLO_TITULO.toLowerCase().replace(/ /g, "-").replace(":", "").replace("?", "").replace("á", "a").replace("à", "a").replace("â", "a").replace("ã", "a").replace("ä", "a").replace("é", "e").replace("è", "e").replace("ê", "e").replace("ë", "e").replace("í", "i").replace("ì", "i").replace("î", "i").replace("ï", "i").replace("ó", "o").replace("ò", "o").replace("ô", "o").replace("õ", "o").replace("ö", "o").replace("ú", "u").replace("ù", "u").replace("û", "u").replace("ü", "u").replace("ç", "c")+'/'+response.lista_posts[i].BLO_COD+'">'+
                                '<figure>'+
                                    '<img src="https://www.pombocriativo.com/img/posts/'+ response.lista_posts[i].BLO_IMAGEM +'" alt="'+ response.lista_posts[i].BLO_IMAGEM +'">'+
                                '</figure>'+
                                '<header>'+
                                    '<h6 class="categoria">'+ response.lista_posts[i].BLO_CATEGORIA +' </h6>'+
                                    '<h2 class="font">'+ response.lista_posts[i].BLO_TITULO +'</h2>'+
                                '</header>'+
                                '<p>'+ response.lista_posts[i].BLO_P_TEXTO +'</p>'+
                            '</a>'+
                        '</article>'
                    );
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
}listarUltimosPosts();

var duploClickBuscar = 0;
function buscar(){
    if (duploClickBuscar == 0) {
        duploClickBuscar = 1;

        var form = document.getElementById('form-buscar');
        var formData = new FormData(form);
        formData.append('ACAO', 'BUSCAR');

        pageurl = 'control/blog/postList.php';

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
                criaAlerta(0,"Falha ao buscar Publicações",2000);
                duploClickBuscar = 0;
            },
            success: function (response){
                $('#blog .posts').empty();
                if(response.status == 0){
                    var i = 0;
                    for (i = 0; i < response.lista_posts.length; i++) {
                        $('#blog .posts').append('<article>'+
                        '<a href="blogpost/'+response.lista_posts[i].BLO_TITULO.toLowerCase().replace(/ /g, "-").replace(":", "").replace("?", "")+'/'+response.lista_posts[i].BLO_COD+'">'+
                            '<figure>'+
                                '<img class="responsive-img" src="https://www.pombocriativo.com/img/posts/'+ response.lista_posts[i].BLO_IMAGEM +'" alt="'+ response.lista_posts[i].BLO_IMAGEM +'">'+
                            '</figure>'+
                            '<header>'+
                                '<h6 class="mini-title upper categoria white-text cor1" >'+ response.lista_posts[i].BLO_CATEGORIA +' </h6>'+
                                '<h2 class="font">'+ response.lista_posts[i].BLO_TITULO +'</h2>'+
                                '<h6 class="mini-title upper">por <span class="cor1-text">'+ response.lista_posts[i].BLO_AUTOR +'</span> em <span class="cor1-text">'+ response.lista_posts[i].BLO_DATA +'</span></h6>'+
                            '</header>'+
                            '<p>'+ response.lista_posts[i].BLO_P_TEXTO +'</p>'+
                        '</a>'+
                    '</article>'
                    );   
                    }
                    // $('#blog .posts').append(
                    //     '<div class="paginacao">'+
                    //     '<ul>'+
                    //         '<li class="active">1</li>'+
                    //         '<li>2</li>'+
                    //         '<li>3</li>' +
                    //         '<li>4</li>' +
                    //         '<li>5</li>' +
                    //         '<li>Última >></li>'+
                    //     '</ul>'+
                    //     '<h6 class="mini-title upper">pág. 1 de 1000</h6>'+
                    // '</div>'
                    //     );
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
      var pageurl = 'control/blog/createPesquisaBlog.php';
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

function abrirPost(cod){
    event.preventDefault();
    window.location.href = "blogpost.php?cod="+cod+"&titulo="+tituloPost;
}
$(".form-buscar").submit(function(e){
    e.preventDefault();
    buscar();
    inserirPesquisa();
});