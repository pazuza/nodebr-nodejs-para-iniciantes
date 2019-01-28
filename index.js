//0 - Obter um usuário
//1 - Obter o número de telefone de um usuário a partir de seu ID
//2 - Obter o endereço do usuário pelo ID

//Importamos um módulo interno do Node.js
const util               = require( 'util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    //Quando der algum problema -> reject(error)
    //Quando der certo -> resolve

    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                id            : 1,
                nome          : 'Aladin',
                dataNascimento: new Date()
            });
        }, 1000);
    });
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '999999999',
                ddd     : '11'
            });
        }, 2000);
    });
}

function obterEndereco(idUsuario, callback) {
    // return new Promise(function resolverPorimise(resolve, reject) {
    // });
    setTimeout(() => {
        return callback(null, {
            rua   : 'Dos Bobos',
            numero: '0'
        });
    }, 2000);
}

//Para manipular sucesso usamos a função: .then()
//Para manipular erros usamos a função: .catch()
//Retorna a função do usuário -> telefone
const usuarioPromise = obterUsuario();

usuarioPromise
    .then((usuario) => {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(telefone) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id  : usuario.id
                    },
                    telefone: telefone
                }
            });
    })
    .then((result) => {
        const endereco = obterEnderecoAsync(result.usuario.id);
        return endereco.then(function resolverEndereco(endereco){
            return {
                usuario : result.usuario,
                telefone: result.telefone,
                endereco: endereco
            }
        });
    })
    .then((result) => {
        console.log(`
        Nome    : ${result.usuario.nome}
        Endereço: ${result.endereco.rua}, Nº ${result.endereco.numero}
        Telefone: (${result.telefone.ddd}) ${result.telefone.telefone}`);
    })
    .catch((error) => {
        console.error('DEU RUIM:', error);
    });


// obterUsuario(function resolverUsuario(error, usuario) {
//     // se error for: null || "" || 0 === false    
//     if (error) {
//         console.error('DEU RUIM em Usuário', error);
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(errorTelefone, telefone) {
//         if (errorTelefone) {
//             console.error('DEU RUIM em Telefone', errorTelefone);
//             return;
//         }

//         obterEndereco(usuario.id, function resolverTelefone(erroEndereco, endereco) {
//             if (erroEndereco) {
//                 console.error('DEU RUIM em Endereço', erroEndereco);
//                 return;
//             }

//             console.log(`
//                 Nome    : ${usuario.nome},
//                 Endereço: ${endereco.rua}, Nº: ${endereco.numero}
//                 Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `);
//         });
//     });
// });
// const telefone = obterTelefone(usuario.id);
// const endereco = obterEndereco(usuario.id);

// console.log('telefone', telefone);