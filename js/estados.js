import { renderizarTarefas } from "./renderizacao.js";

export function renderizarEstado(estado, dados = {}) {
    const status = document.querySelector("#status");
    const quadro = document.querySelector(".quadro");

    if (estado === "carregando") {
        status.textContent = "Carregando tarefas...";
        quadro.hidden = true;
        return;
    }

    if (estado === "sucesso") {
        renderizarTarefas(dados);
        quadro.hidden = false;
        status.textContent = `${dados.length} tarefas carregadas.`;
        return;
    }

    if (estado === "vazio") {
        renderizarTarefas([]);
        quadro.hidden = false;
        status.textContent = "Não há tarefas cadastradas.";
        return;
    }

    if (estado === "erro") {
        renderizarTarefas([]);
        quadro.hidden = true;
        status.textContent = dados.mensagem;
    }
}