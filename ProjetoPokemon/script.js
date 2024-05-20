const formulario = document.forms[0];
const cep = formulario.elements['cep'];
const logradouro = document.getElementById('logradouro');

formulario.addEventListener('submit', e =>{
    e.preventDefault();
    
    buscaCep(cep.value);
    

});

async function buscaCep(cep){
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    const data = await response.json();

    logradouro.innerText = data.logradouro;

}

const pokeForm = document.forms[1];
const pokemon = document.getElementById('pokemon');
const pokeResult = document.getElementById('pokeResult');


pokeForm.addEventListener('submit', e =>{
    e.preventDefault();
    pokeResult.innerText = 'Buscando...';
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.value}`)
    .then( response =>{
        if(response.status === 404){
            pokeResult.innerText = 'Pokemon não encontrado!';
        }else{
            return response.json();
        }
    }).then( data =>{
        pokeResult.innerHTML = `<img src=${data.sprites.front_default}>`;
    });

});



