var apiToken = "1dab282cc4388dc0e06b09fbc178156c";

function autenticar() {
    alert("Voce sera redirecionado para pagina de Login!");
    window.location = "login.html";
}


function autenticarMoodle(event) {
    // parando event default
    event.preventDefault();
    console.log("Fazendo a autenticação");

    // lenado dados do formulário
    let $ = document.querySelector.bind(document);
    inputUsuario = $('#usuario');
    inputSenha = $('#senha');

    // montando Objeto
    var formData = new FormData();
    formData.append('apitoken', apiToken);
    formData.append('usuario', inputUsuario.value);
    formData.append('senha', inputSenha.value);
    

    // Display the key/value pairs
    for (var par of formData.entries()) {
        console.log(par[0]+ ' => ' + par[1]); 
    }

    // criando nova instância do objeto responsável pelas requisições
    let xhr = new XMLHttpRequest();
    // abringo nova requisição para inserir novo objeto
    xhr.open("POST", "http://www.ifspcapivari.com.br/api/v1/autenticar/usuario", true);
    // definindo tipo de conteúdo
    xhr.setRequestHeader("Content-type", "application/json");
    // definindo comportamento a cada mudança de estado da requisição
    xhr.onreadystatechange = () => {
        // verificar se conexão foi concluída
        if (xhr.readyState === 4) {
            // verificar se ouve êxito
            if (xhr.status === 200) {
                // resetando formulário
                inputUsuario.value = "";
                inputSenha.value = "";
                inputUsuario.focus();
                alert('Negociação enviada com sucesso');
            } else {
                alert('Não foi possível enviar a negociação: ' + xhr.responseText);
            }
            var data = JSON.parse(this.responseText);
            console.log(data);
        }
    }
    // transformando objeto em JSON e enviando requisição
    xhr.send(JSON.stringify(formData));
    

}