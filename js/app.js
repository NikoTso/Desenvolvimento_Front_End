import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";
import { limparTarefas, renderizarTarefas } from "./renderizacao.js";

async function iniciar() {
    limparTarefas();
    renderizarEstado("carregando");

    try {
        const tarefas = await carregarTarefas();

        if (tarefas.length === 0) {
            renderizarEstado("vazio");
            return;
        }

        renderizarTarefas(tarefas);
        renderizarEstado("sucesso", tarefas);
    } catch (erro) {
        limparTarefas();

        if (erro.name === "FormatoError" || erro.name === "SyntaxError") {
            renderizarEstado("erro", "Os dados recebidos estão em um formato inválido.");
        } else if (erro.name === "TypeError") {
            renderizarEstado("erro", "Falha de rede ao tentar carregar as tarefas. Verifique sua conexão.");
        } else {
            renderizarEstado("erro", "Não foi possível carregar as tarefas.");
        }
    }
}

iniciar();