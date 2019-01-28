const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function (callback) {
    const lista = [];
    
    for (index in this) {
        const item   = this[index];
        const result = callback(item, index, this);
        //0, "", null, undefined === false
        
        if (!result) continue;
        lista.push(item);
    }

    return lista;
}

async function main() {
    try {
        const { results } = await obterPessoas('a');

        // const familiaLars = results.filter(filtered => {
        //     // Por padrão precisa retornar um boolean
        //     // Para informar se deve manter ou remover da lista
        //     // false > remove
        //     // true > mantém
        //     // não encontrou = -1
        //     // encontrou = posicaoNoArray

        //     const result = filtered.name.toLowerCase().indexOf(`lars`) !== -1;
        //     return result;
        // });

        const familiaLars = results.meuFilter( (item, index, lista) => {
            console.log(`index: ${index}/${lista.length}`);
            return item.name.toLowerCase().indexOf(`lars`) !== -1;
        })
        
        const names = familiaLars.map(pessoa => pessoa.name);
        console.log(`names`, names);
    } catch (error) {
        console.error(`DEU RUIM`, error);
    }
}

main();