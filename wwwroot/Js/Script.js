
function FazPost(url, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }

    document.getElementById("env").value = "Enviado"
    return request.responseText
}


function FazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function criarLinha(usuarios){
    linha = document.createElement("tr")
    tdId = document.createElement("td")
    tdName = document.createElement("td")
    tdDoc = document.createElement("td")
    tdAtivo = document.createElement("td")

    tdName.innerHTML = usuarios.name
    tdAtivo.innerHTML = usuarios.ativo
    tdDoc.innerHTML = usuarios.documento
    tdId.innerHTML = usuarios.id


    linha.appendChild(tdName)
    linha.appendChild(tdAtivo)
    linha.appendChild(tdDoc)
    linha.appendChild(tdId)
    return linha
}

function list(){
    data = FazGet("https://localhost:5001/api/fornecedors")
    usuarios = JSON.parse(data)
    console.log(usuarios)
    let tabela = document.getElementById("tabela")
    usuarios.forEach(element => {
        let linha = criarLinha(element)
        tabela.appendChild(linha)
    });
}

function Cad() {
    event.preventDefault()
    var id = getguid();
    var nome = document.getElementById("txt").value
    var documento = document.getElementById("doc").value
    var fornecedor = document.getElementById("tpf").value
    var ativo = document.getElementById("atv").value
    if (ativo == 1) {
        ativo = true;
    }
    else {
        ativo = false;
    }

    let url = "https://localhost:5001/api/fornecedors"

    body = {
        "Id": id,
        "Name": nome,
        "Documento": documento,
        "TipoFornecedor": fornecedor,
        "Ativo": ativo
    }

        FazPost(url, body)

    
   
}

function getguid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  
  function pesquisar(){
    let url = "https://localhost:5001/api/fornecedors/"
    var uid = document.getElementById("pesqui").value 
    url = url.concat(uid)

   data = FazGet(url) 
   usuario = JSON.parse(data)
   console.log(usuario)

   document.getElementById("name").innerHTML = usuario.name
   document.getElementById("documento").innerHTML = usuario.documento
   document.getElementById("id").innerHTML = usuario.id

   if (usuario.ativo == false) {
    document.getElementById("msg").innerHTML = "usuario inativo"
   }
   
 }
  
 function editar(){
    nname = document.getElementById("name").innerHTML
    ddocumento = document.getElementById("documento").innerHTML
    iid = document.getElementById("id").innerHTML

   var namee = document.createElement("input")
   namee.setAttribute("type", "text");
   namee.setAttribute("value", nname);
   namee.setAttribute("id", "naame")
   var documentoo = document.createElement("input")
   documentoo.setAttribute("type", "text");
   documentoo.setAttribute("value", ddocumento);
   documentoo.setAttribute("id", "doocumento")

   
   document.body.appendChild(namee);
   document.body.appendChild(documentoo);
   
    console.log(nname, ddocumento, iid)
//0564c41b-57b9-4254-b791-021705d5bdc5
 }

 function editado() {

    let url = "https://localhost:5001/api/fornecedors/"
    var uid = document.getElementById("id").innerHTML 
    url = url.concat(uid)

    console.log(url)

    var nome = document.getElementById("naame").value
    var documento = document.getElementById("doocumento").value

    usuario = FazGet(url)
    data = JSON.parse(usuario)

    body = {
        "Id": uid,
        "Name": nome,
        "Documento": documento,
        "TipoFornecedor": data.tipoFornecedor,
        "Ativo": data.ativo
    }
    console.log(body)
    let request = new XMLHttpRequest()
    request.open("PUT", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }
    window.alert("Alteração feita com exito")
    return request.responseText
 }

 function excluir(){

        let url = "https://localhost:5001/api/fornecedors/"
        var uid = document.getElementById("id").innerHTML 
        url = url.concat(uid)
    
        console.log(url)
        usuario = FazGet(url)
        data = JSON.parse(usuario)
    
        body = {
            "Id": uid,
            "Name": data.name,
            "Documento": data.documento,
            "TipoFornecedor": data.tipoFornecedor,
            "Ativo": data.ativo
        }
        console.log(body)
        let request = new XMLHttpRequest()
        request.open("DELETE", url, true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(JSON.stringify(body))
    
        request.onload = function() {
            console.log(this.responseText)
        }
        window.alert("Excluido com exito")
        return request.responseText
     
 }