export function renderizarEstado(estado, dados) {
    const status = document.querySelector('[role="status"]');

    if (estado === "carregando") {
        status.textContent = "Carregando tarefas...";
        return;
    }

    if (estado === "sucesso") {
        status.textContent = `${dados.length} tarefas carregadas.`;
        return;
    }

    if (estado === "vazio") {
        status.textContent = "Não há tarefas cadastradas.";
        return;
    }

    if (estado === "erro") {
        status.textContent = dados;
    }
}