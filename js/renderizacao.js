const CONFIGURACAO = {
    fazer: {
        seletor: ".coluna--fazer ul",
        nome: "A fazer"
    },
    andamento: {
        seletor: ".coluna--andamento ul",
        nome: "Em andamento"
    },
    revisao: {
        seletor: ".coluna--revisao ul",
        nome: "Em revisão"
    },
    concluida: {
        seletor: ".coluna--concluida ul",
        nome: "Concluída"
    }
};

function criarParagrafo(texto, classe = "") {
    const p = document.createElement("p");
    if (classe) {
        p.className = classe;
    }
    p.textContent = texto;
    return p;
}

function criarTarefa(tarefa) {
    const li = document.createElement("li");
    const article = document.createElement("article");
    article.className = "tarefa";

    const titulo = document.createElement("h3");
    titulo.className = "tarefa__titulo";
    titulo.textContent = tarefa.titulo;

    article.append(
        titulo,
        criarParagrafo(`Projeto: ${tarefa.projeto}`),
        criarParagrafo(`Responsável: ${tarefa.responsavel}`)
    );

    const prioridade = criarParagrafo(
        `Prioridade: ${tarefa.prioridade}`,
        `tarefa__prioridade tarefa__prioridade--${tarefa.prioridade}`
    );

    article.append(
        prioridade,
        criarParagrafo(`Prazo: ${tarefa.prazo}`, "tarefa__prazo")
    );

    li.appendChild(article);
    return li;
}

export function limparTarefas() {
    Object.values(CONFIGURACAO).forEach(({ seletor }) => {
        const lista = document.querySelector(seletor);
        if (lista) {
            lista.replaceChildren();
        }
    });
}

export function renderizarTarefas(tarefas) {
    limparTarefas();

    tarefas.forEach(tarefa => {
        const configuracao = CONFIGURACAO[tarefa.status];

        if (!configuracao) {
            return;
        }

        const lista = document.querySelector(configuracao.seletor);

        if (lista) {
            lista.appendChild(criarTarefa(tarefa));
        }
    });
}
