const service = require('./service');

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = [];

    for (let indice = 0; indice <= this.length - 1; indice++) {
        const resultado = callback(this[indice], indice);
        novoArrayMapeado.push(resultado);
    }

    return novoArrayMapeado;
}


async function main() {
    try {
        const result = await service.obterPessoas('a');

        //Primeira forma - Tradicional com a criação de uma variável auxiliar: 

        // const names   = [];
        // result.results.forEach(element => {
        //     names.push(element.name);
        // });


        //Segunda forma, mais elegante:
        // const names = result.results.map(pessoa => {
        //    return pessoa.name; 
        // });


        //Terceira forma, a mais elegante e em uma linha:
        // const names = result.results.map(pessoa => pessoa.name);

        //Quarta forma, criação de um map personalizado
        const names = result.results.meuMap((pessoa, indice) => `${indice} - ${pessoa.name}`)

        console.log('names', names);
    } catch (error) {
        console.error('DEU RUIM', error);
    }
}

main();