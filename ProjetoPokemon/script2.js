// Usar a pokeapi para mostrar o primeio pokemon da pokedex
// Exibir o número, nome, sprite e uma lista com os tipos do pokemon
// Exibir um botão de proxímo para avançar 1 número
// Exibir um botão de anterior, caso num for > 0, para recuar 1 unidade

const numField = document.getElementById('num');
const nameField = document.getElementById('name');
const typesField = document.getElementById('types');
const spriteField = document.getElementById('sprite');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const error = document.getElementById('error');

let currentNum = 1;
btnPrev.style.display = "none";

async function getPokeData(id) {
    let result;
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
         result =  {
            name : data.name,
            num : data.id,
            sprite : data.sprites.front_default,
            types : data.types
        };
    }catch(error){
        console.log(error);
        result = null;
    }

    return result;

}

async function updateData() {
    const pokeData = await getPokeData(currentNum);
    if (pokeData){
        numField.innerText = pokeData.num;
        nameField.innerText = pokeData.name;
        spriteField.setAttribute('src',pokeData.sprite);
        let typesHtml = '';
        pokeData.types.forEach(type => {
            typesHtml += `<li>${type.type.name}</li>`;
        });
        typesField.innerHTML = typesHtml;
        error.innerText = "";
    }else{
        error.innerText = "Erro ao carregar dados!";
    }
}


btnNext.addEventListener('click', ()=>{
    currentNum++;
    updateData();
    if (currentNum > 0){
        btnPrev.style.display = "inline";
    }
});

btnPrev.addEventListener('click', ()=>{
    currentNum--;
    updateData();
    if (currentNum <= 1){
        btnPrev.style.display = "none";
    }
});

updateData();