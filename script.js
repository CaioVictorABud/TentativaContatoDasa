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

    const chamado = { nome, numeroChamado, requisicao, status: "Pendente" };

   
    const chamadosList = document.getElementById("chamadosList");
    const chamadoItem = document.createElement("li");
    chamadoItem.classList.add("chamadoItem");
    chamadoItem.innerHTML = `<div class="chamadoCabecalho">${nome} - Chamado ${numeroChamado}</div>
                             <div>Requisição: ${requisicao}</div>
                             <div>Status: <span id="status${numeroChamado}">${chamado.status}</span></div>
                             <label for="statusSelect${numeroChamado}">Atualizar Status:</label>
                             <select id="statusSelect${numeroChamado}" onchange="atualizarStatus('${numeroChamado}', this.value)">
                                 <option value="Pendente">Pendente</option>
                                 <option value="Em Andamento">Em Andamento</option>
                                 <option value="Cancelado">Cancelado</option>
                                 <option value="Encerrado">Encerrado</option>
                             </select>`;

    chamadosList.appendChild(chamadoItem);

  
    document.getElementById("nome").value = "";
    document.getElementById("numeroChamado").value = "";
    document.getElementById("requisicao").value = "";
}

function atualizarStatus(numeroChamado, novoStatus) {
    // Atualiza o status do chamado na lista
    const statusSpan = document.getElementById(`status${numeroChamado}`);
    if (statusSpan) {
        statusSpan.innerText = novoStatus;
    }
}
