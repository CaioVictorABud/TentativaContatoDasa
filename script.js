document.addEventListener("DOMContentLoaded", function () {
    const chamadoForm = document.getElementById("chamadoForm");

    chamadoForm.addEventListener("submit", function (event) {
        event.preventDefault();
        adicionarChamado();
    });
});

function gerarMensagem() {
    const nome = document.getElementById("nome").value;
    const numeroChamado = document.getElementById("numeroChamado").value;
    const requisicao = document.getElementById("requisicao").value;

    const mensagem = `Bom dia, aqui é do Suporte Dasa, é sobre o seu chamado ${numeroChamado}.\nRequisição: ${requisicao}\nEstá disponível para o atendimento?`;

    const mensagemElement = document.createElement("div");
    mensagemElement.classList.add("mensagem");
    mensagemElement.innerText = mensagem;

    const mensagensContainer = document.getElementById("mensagensContainer");
    mensagensContainer.innerHTML = "";
    mensagensContainer.appendChild(mensagemElement);

    
}

function adicionarChamado() {
    const nome = document.getElementById("nome").value;
    const numeroChamado = document.getElementById("numeroChamado").value;
    const requisicao = document.getElementById("requisicao").value;

    const chamadosList = document.getElementById("chamadosList");
    const chamadoItem = document.createElement("li");

    chamadoItem.classList.add("chamadoItem");

    chamadoItem.innerHTML = `<div class="chamadoCabecalho">${nome} - Chamado ${numeroChamado}</div>
                             <div>Requisição: ${requisicao}</div>
                             <div class="status">Status: <span id="status${numeroChamado}">Sem Status</span></div>
                             <label for="statusSelect${numeroChamado}">Atualizar Status:</label>
                             <select id="statusSelect${numeroChamado}" onchange="atualizarStatus('${numeroChamado}', this.value.toLowerCase())">
                                 <option value="">Sem Status</option>
                                 <option value="pendente">Pendente</option>
                                 <option value="em_andamento">Em Andamento</option>
                                 <option value="cancelado">Cancelado</option>
                                 <option value="encerrado">Encerrado</option>
                             </select>`;

    chamadosList.appendChild(chamadoItem);

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

