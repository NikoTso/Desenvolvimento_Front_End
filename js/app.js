import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";

async function iniciarAplicacao() {
    renderizarEstado("carregando");

    try {
        const tarefas = await carregarTarefas();

        if (tarefas.length === 0) {
            renderizarEstado("vazio");
            return;
        }

        renderizarEstado("sucesso", tarefas);
    } catch (erro) {
        let mensagem = "Não foi possível carregar as tarefas.";

        if (erro.name === "TypeError") {
            mensagem = "Erro de rede: não foi possível acessar os dados.";
        } else if (erro.name === "SyntaxError") {
            mensagem = "Erro de formato: o arquivo JSON está inválido.";
        } else if (erro.message.startsWith("HTTP")) {
            mensagem = `Erro de protocolo: o servidor respondeu com ${erro.message}.`;
        } else if (erro.name === "FormatoError") {
            mensagem = "Erro de formato: os dados não possuem a estrutura esperada.";
        }

        renderizarEstado("erro", { mensagem });
    }
}

iniciarAplicacao();