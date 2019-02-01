const {
    readFile
} = require('fs');

const {
    promisify
} = require('util');

const readFileAsync = promisify(readFile);

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

    escreverArquivo() {

    }

    async listar(id) { //Sempre que tiver await, é necessário o async
        const dados          = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter( (item) => (id ? (item.id === id): true));  //O id foi passado e é true? Se sim usa o item.id e procura quem tem o id específico. Senão manda true, ai pega a lista completa
        return dadosFiltrados;
        }
    }

    module.exports = new Database();