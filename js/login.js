$(document).on("click",".form .loginBtn",function(e){
    login();
});

var duploClickLogin = 0;
function login(){
    event.preventDefault();
    if(duploClickLogin == 0){
        duploClickLogin = 1;
        var formData = {
            'ACAO':"LOGIN",
            'LOGIN':$(".form #email").val(),
            'SENHA':$(".form #senha").val()
        };
        var pageurl = 'control/login.php';
        $.ajax({
            url: pageurl,
            data: formData,
            type: 'POST',
            cache: false,
            dataType: 'json',
            error: function(){
                criaAlerta(0,"Falha ao tentar logar!",2000);
                duploClickLogin = 0;
            },
            success: function(response){ 
                if(response.status == 0){
                    window.location.href = response.redirect;
                }else{
                    criaAlerta(0,response.mensagem,4000);
                }
                duploClickLogin = 0;
            }
        });
    }
}