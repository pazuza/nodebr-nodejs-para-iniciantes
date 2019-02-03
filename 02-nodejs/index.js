// 0 - Obter um usuário
// 1 - Obter o número de telefone de um usuário a partir de seu ID
// 2 - Obter o endereço do usuário pelo ID

function obterUsuario (callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    })
  }, 1000)
}

function obterTelefone (idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '946258545',
      ddd: '11'
    })
  }, 2000)
}

function obterEndereco (idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Dos Bobos',
      numero: '0'
    })
  }, 2000)
}

function resolverUsuario (error, usuario) {
  console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario (error, usuario) {
  // se error for: null || "" || 0 === false
  if (error) {
    console.error('DEU RUIM em Usuário', error)
    return
  }

  obterTelefone(usuario.id, function resolverTelefone (errorTelefone, telefone) {
    if (errorTelefone) {
      console.error('DEU RUIM em Telefone', errorTelefone)
      return
    }

    obterEndereco(usuario.id, function resolverTelefone (erroEndereco, endereco) {
      if (erroEndereco) {
        console.error('DEU RUIM em Endereço', erroEndereco)
        return
      }

      console.log(`
                Nome    : ${usuario.nome},
                Endereço: ${endereco.rua}, Nº: ${endereco.numero}
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
    })
  })
})
// const telefone = obterTelefone(usuario.id);
// const endereco = obterEndereco(usuario.id);

// console.log('telefone', telefone);
