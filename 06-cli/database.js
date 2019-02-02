const {
    readFile,
    writeFile
} = require('fs');

const {
    promisify
} = require('util');

const readFileAsync  = promisify(readFile);
const writeFileAsync = promisify(writeFile);

//Outra forma de obter os dados dos arquivos
// const dadosJson = require('./herois.json');

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString()); //É necessário fazer o parse pq quando o arquivo vem, está um pouco diferente
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));

        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo();
        const id    = heroi.id <= 2 ? heroi.id : Date.now();

        const heroiComID = {
            id,
            ...heroi
        }

        const dadosFinal = [
            ...dados,
            heroiComID
        ]

        const resultado = await this.escreverArquivo(dadosFinal);

        return;
    }

    async listar(id) { //Sempre que tiver await, é necessário o async
        const dados          = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter((item) => (id ? (item.id === id) : true));  //O id foi passado e é true? Se sim usa o item.id e procura quem tem o id específico. Senão manda true, ai pega a lista completa
        return dadosFiltrados;
    }

    async deletar(id){
        console.log(id);
        if(!id){
            return await this.escreverArquivo([])
        }
        
        const dados  = await this.obterDadosArquivo();
        const indice = dados.findIndex((item) => item.id === parseInt(id));

        if(indice === -1){
            throw Error('O usuário informado não existe');
        }

        dados.splice(indice, 1);
        return await this.escreverArquivo(dados);
    }
}

module.exports = new Database();