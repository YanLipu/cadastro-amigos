
const rows = []
let idRow = 0;
let isEdit = false;



const verificaForm = () => {
    // $event.preventDefault();
    let dadosAmigo = true;

    const nome = document.getElementById("nome_completo")
    if(nome.value === ""){
        nome.classList.add("erro");
        document.getElementById("erro_nome").style.display = "block";
        dadosAmigo = false;
    }else{
        nome.classList.remove("erro");
        document.getElementById("erro_nome").style.display = "none"
    }

    const link = document.getElementById("link_foto")
    function verificaLink(){
        let checkLink = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        let resultado = document.getElementById("link_foto").value
        if(resultado.match(checkLink)){
            return true
        }else{
            return false
        }
    }
    console.log(verificaLink())
    if(verificaLink() === false){
        link.classList.add("erro");
        if(link.value === ""){
            document.getElementById("erro_link_vazio").style.display = "block"
        }else{
            document.getElementById("erro_link_invalido").style.display = "block";
        }            
        dadosAmigo = false
    }else{
        link.classList.remove("erro")
        document.getElementById("erro_link_vazio").style.display = "none"
        document.getElementById("erro_link_invalido").style.display = "none";
    }

    const telefone = document.getElementById("telefone");
    console.log(telefone.value)
    function telefone_errado(){
        let fone =  /^[0-9]+$/;
        let verificaFone = document.getElementById("telefone").value;
        let tamanhoFone = verificaFone.length;
        if(verificaFone.match(fone) && tamanhoFone === 11){
            return true;
        }else{
            return false;
        }
    };
    if(telefone_errado() === false){
        telefone.classList.add("erro")
        if(telefone.value === ""){
            document.getElementById("erro_telefone_vazio").style.display = "block"
        }else{
            document.getElementById("erro_telefone_invalido").style.display = "block"
        }
        dadosAmigo = false
    }else{
        telefone.classList.remove("erro")
        document.getElementById("erro_telefone_invalido").style.display = "none"
        document.getElementById("erro_telefone_vazio").style.display = "none"
    }

    const vezes = document.getElementById("numero_vezes");
    function vezesNum(){
        let numVezes = /^[0-9]+$/;
        let verificaVezes = document.getElementById("numero_vezes").value;
        if(verificaVezes.match(numVezes)){
            return true;
        }else{
            return false;
        }
    };
    if(vezesNum() === false){
        vezes.classList.add("erro")
        if(vezes.value === ""){
            document.getElementById("erro_vezes_vazio").style.display = "block"
        }else{
            document.getElementById("erro_vezes_invalido").style.display = "block"
        }
        dadosAmigo = false
    }else{
        vezes.classList.remove("erro")
        document.getElementById("erro_vezes_invalido").style.display = "none"
        document.getElementById("erro_vezes_vazio").style.display = "none"
    }

    const pais = document.getElementById("paises");
    if(pais.value === ""){
        pais.classList.add("erro")
        dadosAmigo = false
    }else{
        pais.classList.remove("erro")
    }

    if(dadosAmigo && !isEdit){
        rows.push({
            id: rows.length,
            nome: nome.value,
            foto: link.value,
            telefone: telefone.value,
            churrasco: vezes.value,
            pais: pais.value.toUpperCase()
        })
        const modal = document.getElementById("modal-cadastro")
        modal.classList.remove("mostrar")
        escreveTabela(rows);
        console.log(rows)
        
    }else{
        rows[idRow] = {
            id: rows[idRow].id,
            nome: nome.value,
            foto: link.value,
            telefone: telefone.value,
            churrasco: vezes.value,
            pais: pais.value.toUpperCase()
        }
        isEdit = false
        const modal = document.getElementById("modal-cadastro")
        modal.classList.remove("mostrar")
        escreveTabela(rows)
    }
    document.getElementById("nome_completo").value = '';
    document.getElementById("link_foto").value = '';
    document.getElementById("numero_vezes").value = '';
    document.getElementById("telefone").value = '';
    document.getElementById("paises").value = 'brasil';
    
}

const escreveTabela = (rows) => {
    console.log(rows)
    document.getElementById('tbody').innerHTML = "";
    

    rows.forEach((row, index) =>{
        const tbody = document.getElementById("tbody")
        const tr = document.createElement("tr")

        const td1 = document.createElement("td")
        const img = document.createElement("img")

        const td2 = document.createElement("td")
        td2.innerHTML = row.nome

        const td3 = document.createElement("td")
        const numeroTelefone = row.telefone
        
        td3.innerHTML = numeroTelefone.slice(0, 2) + " " + numeroTelefone.slice(2, 7) + " " + numeroTelefone.slice(7, 11)

        const td4 = document.createElement("td")
        td4.innerHTML = row.churrasco

        const td5 = document.createElement("td")
        td5.innerHTML = row.pais

        const td6 = document.createElement("td")
        const optionEdit = document.createElement("button")
        optionEdit.classList.add("opcao-editar");
        optionEdit.innerHTML = "✏"
        const optionDelete = document.createElement("button")
        optionDelete.classList.add("opcao-deletar");
        optionDelete.innerHTML = "x"
        
        optionEdit.setAttribute("onClick", `estaEditando(${index})`)
        optionDelete.setAttribute("onClick",`estaDeletando(${index})`)

        img.src = row.foto

        td1.appendChild(img)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        td6.appendChild(optionEdit)
        td6.appendChild(optionDelete)
        tr.appendChild(td6)


        tbody.appendChild(tr)
    })
    
}

function estaEditando(index) {
    mostrarModal();
    const row = rows[index]
  
    document.getElementById("link_foto").value = row.foto;
    document.getElementById("nome_completo").value = row.nome;
    document.getElementById("telefone").value = row.telefone;
    document.getElementById("numero_vezes").value = row.churrasco;
    console.log(row.pais)
    document.getElementById("paises").value = row.pais.toLowerCase();

    idRow = index
    isEdit = true
}

function estaDeletando(index){
    rows.splice(index, 1)
    escreveTabela(rows)
}

function limparInutil() {
    document.getElementById("nome_completo").value = '';
    document.getElementById("link_foto").value = '';
    document.getElementById("numero_vezes").value = '';
    document.getElementById("telefone").value = '';

    setNone(nome_completo);
    setNone(link_foto);
    setNone(numero_vezes);
    setNone(telefone)
}

function mostrarModal(){
    const modal = document.getElementById("modal-cadastro")

    modal.classList.add("mostrar")
    modal.addEventListener('click', (e) => {
        console.log(e.target.id)
        if(e.target.id == "modal-cadastro" || e.target.className == "fechar-modal"){
            modal.classList.remove("mostrar")
        }
    });
}

