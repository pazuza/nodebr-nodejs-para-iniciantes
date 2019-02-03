const {
  readFile,
  writeFile
} = require('fs')

const {
  promisify
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

// Outra forma de obter os dados dos arquivos
// const dadosJson = require('./herois.json');

class Database {
  constructor () {
    this.NOME_ARQUIVO = 'herois.json'
  }

  async obterDadosArquivo () {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
    return JSON.parse(arquivo.toString()) // É necessário fazer o parse pq quando o arquivo vem, está um pouco diferente
  }

  async escreverArquivo (dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))

    return true
  }

  async cadastrar (heroi) {
    const dados = await this.obterDadosArquivo()
    const id = heroi.id <= 2 ? heroi.id : Date.now()

    const heroiComID = {
      id,
      ...heroi
    }

    const dadosFinal = [
      ...dados,
      heroiComID
    ]

    const resultado = await this.escreverArquivo(dadosFinal)

    return resultado
  }

  async listar (id) { // Sempre que tiver await, é necessário o async
    const dados = await this.obterDadosArquivo()
    const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true)) // O id foi passado e é true? Se sim usa o item.id e procura quem tem o id específico. Senão manda true, ai pega a lista completa
    return dadosFiltrados
  }

  async remover (id) {
    if (!id) {
      return await this.escreverArquivo([])
    }

    const dados = await this.obterDadosArquivo()
    const indice = dados.findIndex((item) => item.id === parseInt(id))

    if (indice === -1) {
      throw Error('O herói informado não existe')
    }

    dados.splice(indice, 1) // remove da lista
    return await this.escreverArquivo(dados)
  }

  async atualizar (id, modificacoes) {
    const dados = await this.obterDadosArquivo()
    const indice = dados.findIndex(item => item.id === parseInt(id))

    if (indice === -1) {
      throw Error('O herói informado não existe')
    }

    const atual = dados[indice]
    const objetoAtualizar = {
      ...atual,
      ...modificacoes
    }
    dados.splice(indice, 1) // Remove da lista

    return await this.escreverArquivo([
      ...dados,
      objetoAtualizar
    ]) // Escreve o item na lista novamente, atualizado
  }
}

module.exports = new Database()
