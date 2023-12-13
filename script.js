
document.addEventListener("DOMContentLoaded", function () {
    const chamadoForm = document.getElementById("chamadoForm");
    const mensagensContainer = document.getElementById("mensagensContainer");
    const chamadosList = document.getElementById("chamadosList");

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

    // Adicione lógica aqui para copiar a mensagem para a área de transferência se necessário
}

function adicionarChamado() {
    const nome = document.getElementById("nome").value;
    const numeroChamado = document.getElementById("numeroChamado").value;
    const requisicao = document.getElementById("requisicao").value;

    const chamado = { nome, numeroChamado, requisicao, status: "Pendente" };

    // Adiciona o chamado à lista de chamados
    const chamadosList = document.getElementById("chamadosList");
    const chamadoItem = document.createElement("li");
    chamadoItem.classList.add("chamadoItem");
    chamadoItem.innerHTML = `<div class="chamadoCabecalho">${nome} - Chamado ${numeroChamado}</div>
                             <div>Requisição: ${requisicao}</div>
                             <div>Status: ${chamado.status}</div>
                             <label for="statusSelect${numeroChamado}">Atualizar Status:</label>
                             <select id="statusSelect${numeroChamado}" onchange="atualizarStatus('${numeroChamado}', this.value)">
                                 <option value="Em Andamento">Em Andamento</option>
                                 <option value="Cancelado">Cancelado</option>
                                 <option value="Encerrado">Encerrado</option>
                             </select>`;
    
    chamadosList.appendChild(chamadoItem);

    // Limpa o formulário
    document.getElementById("nome").value = "";
    document.getElementById("numeroChamado").value = "";
    document.getElementById("requisicao").value = "";
}

function atualizarStatus(numeroChamado, novoStatus) {
    // Atualiza o status do chamado na lista
    const chamadosList = document.getElementById("chamadosList");
    const chamadoItems = chamadosList.getElementsByClassName("chamadoItem");

    for (let i = 0; i < chamadoItems.length; i++) {
        const chamadoItem = chamadoItems[i];
        if (chamadoItem.innerText.includes(`Chamado ${numeroChamado}`)) {
            chamadoItem.innerHTML = chamadoItem.innerHTML.replace(/Status: .+/, `Status: ${novoStatus}`);
            break;
        }
    }
}
