export async function carregarTarefas() {
    const resposta = await fetch("../dados.json", { cache: "no-store" });

    if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    let dados;

    try {
        dados = await resposta.json();
    } catch {
        const erro = new Error("Os dados recebidos estão em um formato inválido.");
        erro.name = "FormatoError";
        throw erro;
    }

    if (!dados || !Array.isArray(dados.tarefas)) {
        const erro = new Error("Os dados recebidos estão em um formato inválido.");
        erro.name = "FormatoError";
        throw erro;
    }

    return dados.tarefas;
}
