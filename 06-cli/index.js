const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main () {
  Commander
    .version('v1')
    .option('-n, --nome [value]', 'Nome do Herói')
    .option('-p, --poder [value]', 'Poder do Herói')
    .option('-i, --id [value]', 'ID do Herói')

    .option('-c, --cadastrar', 'Cadastrar um herói')
    .option('-l, --listar', 'Listar um herói')
    .option('-r, --remover', 'Remover um herói pelo id')
    .option('-a, --atualizar [value]', 'Atualizar um herói pelo id')
    .parse(process.argv)

  const heroi = new Heroi(Commander)

  try {
    if (Commander.cadastrar) {
      delete heroi.id
      const result = await Database.cadastrar(heroi)
      if (!result) {
        console.error('Herói não foi cadastrado!')
        return // Para parar a execução
      }

      console.log('Herói Cadastrado com sucesso!')
    } else if (Commander.listar) {
      const result = await Database.listar()
      console.log('Herói encontrado:', result)
      // result.forEach(element => {
      //     console.log('Herói encontrado:', JSON.stringify(element.nome));
      // });

      return // Para parar a execução
    } else if (Commander.remover) {
      const result = await Database.remover(heroi.id)
      if (!result) {
        console.error('Não foi possível remover o Herói =(')
        return // Para parar a execução
      }

      console.log('Herói removido com sucesso!')
    } else if (Commander.atualizar) {
      const idParaAtualizar = parseInt(Commander.atualizar)
      // remover todas as chaves que estiverem com undefined || null

      // Transforma em string
      const dado = JSON.stringify(heroi)

      // Na hora que transformar em json novamente, vai remover as chaves inválidas
      const heroiAtualizar = JSON.parse(dado)

      const result = await Database.atualizar(idParaAtualizar, heroiAtualizar)
      if (!result) {
        console.error('Não foi possível atualizar o Herói =(')
        return // Para parar a execução
      }

      console.log('Herói atualizado com sucesso!')
    }
  } catch (error) {
    console.error('DEU RUIM', error)
  }
}

main()
