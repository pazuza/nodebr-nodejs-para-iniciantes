const axios = require('axios');
const URL = `https://swapi.co/api/people`

async function obterPessoas(nome){
    const url      = `${URL}/?search=${nome}&format=json`;
    const response = await axios.get(url);
    return response.data;
}

//Teste

/*obterPessoas('r2')
.then((resultado) => {
    console.log('resultado', resultado);
})
.catch((error) => {
    console.log('DEU RUIM', error);
}); */

module.exports = {
    obterPessoas
}