document.addEventListener("DOMContentLoaded", function () {
    const chamadoForm = document.getElementById("chamadoForm");

    chamadoForm.addEventListener("submit", function (event) {
        event.preventDefault();
        adicionarChamado();
        carregarChamadosDoLocalStorage();
    });
});

function carregarChamadosDoLocalStorage() {
    const chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    const chamadosList = document.getElementById("chamadosList");

    chamadosList.innerHTML = ""; // Limpa a lista para evitar duplicatas

    // Iterar sobre os chamados na ordem inversa (do mais recente para o mais antigo)
    for (let i = chamados.length - 1; i >= 0; i--) {
        const chamado = chamados[i];
        const chamadoItem = document.createElement("li");
        chamadoItem.classList.add("chamadoItem");

        chamadoItem.innerHTML = `<div class="chamadoCabecalho">${chamado.nome} - Chamado ${chamado.numeroChamado}</div>
                                 <div>Descrição: ${chamado.requisicao}</div>
                                 <div class="status">Status: <span id="status${chamado.numeroChamado}">${chamado.status}</span></div>
                                 <label for="statusSelect${chamado.numeroChamado}">Atualizar Status:</label>
                                 <select id="statusSelect${chamado.numeroChamado}" onchange="atualizarStatus('${chamado.numeroChamado}', this.value.toLowerCase())">
                                     <option value="">Sem Status</option>
                                     <option value="Pendente">Pendente</option>
                                     <option value="em_andamento">Em Andamento</option>
                                     <option value="Cancelado">Cancelado</option>
                                     <option value="Encerrado">Encerrado</option>
                                     <option value="Direcionado">Direcionado</option>
                                 </select>
                                 <button onclick="excluirChamado('${chamado.numeroChamado}')">Excluir</button>`;

        chamadosList.appendChild(chamadoItem);
    }
}


 // Adiciona a contagem dos chamados por dia no menu lateral
 const chamadosPorDia = contarChamadosPorDia(chamados);
 const chamadosMenuList = document.getElementById("chamadosMenuList");
 chamadosMenuList.innerHTML = ""; // Limpa o menu lateral

 for (const data in chamadosPorDia) {
     if (chamadosPorDia.hasOwnProperty(data)) {
         const totalChamados = chamadosPorDia[data];

         // Adiciona o código para exibir os dados no menu lateral
         const listItem = document.createElement("li");
         listItem.innerHTML = `${data}: ${totalChamados} chamados`;
         chamadosMenuList.appendChild(listItem);
     }
 }


function contarChamadosPorDia(chamados) {
 const chamadosPorDia = {};

 chamados.forEach(function (chamado) {
     const data = new Date(chamado.data); // Converte a string de data de volta para um objeto Date
     const dataFormatada = formatarData(data);

     if (chamadosPorDia[dataFormatada]) {
         chamadosPorDia[dataFormatada]++;
     } else {
         chamadosPorDia[dataFormatada] = 1;
     }
 });

 return chamadosPorDia;
}




function gerarMensagem() {
    const nome = document.getElementById("nome").value;
    const numeroChamado = document.getElementById("numeroChamado").value;
    const requisicao = document.getElementById("requisicao").value;

    const mensagem = `Olá, tudo bem? Aqui é do Suporte Dasa, entro em contato sobre o seu chamado ${numeroChamado}.\nDescrição: ${requisicao}\nEstá disponível para o atendimento?`;

    const mensagemElement = document.createElement("div");
    mensagemElement.classList.add("mensagem");
    mensagemElement.innerText = mensagem;

    const mensagensContainer = document.getElementById("mensagensContainer");
    mensagensContainer.innerHTML = "";
    mensagensContainer.appendChild(mensagemElement);

    copiarParaAreaTransferencia(mensagem);

    
}

function adicionarChamado() {
    const nome = document.getElementById("nome").value;
    const numeroChamado = document.getElementById("numeroChamado").value;
    const requisicao = document.getElementById("requisicao").value;

    const chamadosList = document.getElementById("chamadosList");
    const chamadoItem = document.createElement("li");

    chamadoItem.classList.add("chamadoItem");

    chamadoItem.innerHTML = `<div class="chamadoCabecalho">${nome} - Chamado ${numeroChamado}</div>
                             <div>Descrição: ${requisicao}</div>
                             <div class="status">Status: <span id="status${numeroChamado}">Sem Status</span></div>
                             <label for="statusSelect${numeroChamado}">Atualizar Status:</label>
                             <select id="statusSelect${numeroChamado}" onchange="atualizarStatus('${numeroChamado}', this.value.toLowerCase())">
                                 <option value="">Sem Status</option>
                                 <option value="Pendente">Pendente</option>
                                 <option value="em_andamento">Em Andamento</option>
                                 <option value="Cancelado">Cancelado</option>
                                 <option value="Encerrado">Encerrado</option>
                                 <option value="Direcionado">Direcionado</option>
                             </select>`;

    chamadosList.appendChild(chamadoItem);

    salvarChamadoNoLocalStorage(nome, numeroChamado, requisicao);

    // Limpa o formulário
    document.getElementById("nome").value = "";
    document.getElementById("numeroChamado").value = "";
    document.getElementById("requisicao").value = "";
}


function atualizarStatus(numeroChamado, novoStatus) {
    const statusSpan = document.getElementById(`status${numeroChamado}`);
    
    if (statusSpan) {
        console.log(`Antes da atualização - Classes: ${statusSpan.className}`);
        
        // Substituir todas as classes relacionadas ao status
        statusSpan.className = `chamadoItem ${novoStatus.toLowerCase()}`;

        // Atualizar o valor do status no texto
        statusSpan.innerText = novoStatus;

        console.log(`Depois da atualização - Classes: ${statusSpan.className}`);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const toggleThemeButton = document.getElementById("toggleTheme");
    const body = document.body;

    toggleThemeButton.addEventListener("click", function () {
        body.classList.toggle("temaEscuro");
    });
});

document.getElementById('copiarBtn').addEventListener('click', function() {
    // Obtém o horário e a data atuais
    var dataAtual = new Date();
    var horarioAtual = dataAtual.toLocaleTimeString();
    var dataFormatada = dataAtual.toLocaleDateString();
  
    // Monta a mensagem com o horário e a data atuais
    var mensagem = `
  Prezado usuário(a),
  
  Tentativa de Contato sem sucesso, às ${horarioAtual} em ${dataFormatada}. Favor informar outra forma de contato e o melhor horário.
  Favor acessar o link https://dasadesk.dasa.com.br, para consultar o chamado, observe na parte superior do portal possui "Meus incidentes" e "Minhas solicitações" clique na opção em que se encontra seu chamado.
  Após realizar a consulta, verifique se nos comentários do chamado está faltando alguma informação para atuação da equipe ou se já tentaram o contato, caso esteja faltando informações digite uma mensagem e poste que será dado continuidade em seu chamado.
  
  Importante: Lembramos que o chamado permanecerá em status de "Pendente" durante 3 dias úteis e caso não haja retorno das informações solicitadas, dentro deste prazo, o chamado será cancelado.
  
  Obrigado
  Service Desk`;
  
    // Cria um elemento de texto temporário e o adiciona ao corpo do documento
    var tempTextArea = document.createElement('textarea');
    tempTextArea.value = mensagem;
    document.body.appendChild(tempTextArea);
  
    // Seleciona o texto no elemento de texto temporário
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // Para dispositivos móveis
  
    // Copia o texto para a área de transferência
    document.execCommand('copy');
  
    // Remove o elemento de texto temporário
    document.body.removeChild(tempTextArea);
  
    // Exibe uma mensagem informando que a cópia foi realizada
    alert("Mensagem copiada para a área de transferência.");
  });

function copiarParaAreaTransferencia(texto) {
    // Cria um elemento de texto temporário e o adiciona ao corpo do documento
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = texto;
    document.body.appendChild(tempTextArea);

    // Seleciona o texto no elemento de texto temporário
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // Para dispositivos móveis

    // Copia o texto para a área de transferência
    document.execCommand('copy');

    // Remove o elemento de texto temporário
    document.body.removeChild(tempTextArea);

    // Exibe uma mensagem informando que a cópia foi realizada
    alert("Mensagem copiada para a área de transferência.");
}


function salvarChamadoNoLocalStorage(nome, numeroChamado, requisicao) {
    // Obtém os chamados existentes no Local Storage
    const chamados = JSON.parse(localStorage.getItem("chamados")) || [];

    // Adiciona o novo chamado à lista
    chamados.push({
        nome: nome,
        numeroChamado: numeroChamado,
        requisicao: requisicao,
        status: "Sem Status"  // Pode adicionar outros campos se necessário
    });

    // Salva a lista atualizada no Local Storage
    localStorage.setItem("chamados", JSON.stringify(chamados));
}

function excluirChamado(numeroChamado) {
    var confirmacao = confirm("Tem certeza que deseja excluir este chamado?");
    
    if (confirmacao) {
        // Obtém os chamados existentes no Local Storage
        const chamados = JSON.parse(localStorage.getItem("chamados")) || [];

        // Filtra os chamados, removendo o chamado com o númeroChamado correspondente
        const chamadosAtualizados = chamados.filter(chamado => chamado.numeroChamado !== numeroChamado);

        // Atualiza o Local Storage com a lista de chamados atualizada
        localStorage.setItem("chamados", JSON.stringify(chamadosAtualizados));

        // Atualize a interface ou redirecione para uma página de confirmação
        alert("Chamado excluído com sucesso!");

        // Recarrega a lista de chamados na interface
        carregarChamadosDoLocalStorage();
    }
}
