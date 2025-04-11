const fs = require("fs");
const googleIt = require("google-it");

const SEARCH_TERM = "bhatiyoga";

(async () => {
    try {
        console.log(`Buscando domínios relacionados a "${SEARCH_TERM}"...`);

        const result = await googleIt({
            query: SEARCH_TERM,
            limit: 100  // Ajuste conforme necessário
        });

        console.log(`Número de resultados obtidos: ${result.length}`);

        if (result.length === 0) {
            console.log("Nenhum resultado encontrado. Tente ajustar os termos de busca.");
            return;
        }

        // Extrai e filtra domínios únicos
        const domains = new Set();
        result.forEach(item => {
            try {
                const url = new URL(item.link);
                domains.add(url.hostname);
            } catch (e) {
                console.log(`URL inválida ignorada: ${item.link}`);
            }
        });

        const domainList = Array.from(domains);

        console.log(`Domínios únicos encontrados: ${domainList.length}`);

        fs.writeFileSync("bhatiyoga-domains.txt", domainList.join("\n"), "utf-8");

        console.log("Domínios encontrados:");
        domainList.forEach(domain => console.log(domain));
        console.log("\nLista salva em: bhatiyoga-domains.txt");

    } catch (error) {
        console.error("Ocorreu um erro durante a execução:");
        console.error(error);
    }
})();