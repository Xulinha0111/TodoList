//Criar um array para armazenar dados
let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []; /*lê o localstorage*/
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco)); /*grava os dados do array 'banco' no localstorage, convertendo para JSON*/


//Criar uma função anônima (arrow function)
const inputItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item'); //criei uma classe com nome todo_item para o label
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}> 
        <section> ${tarefa} </section>
        <input type="button" value="X" data-indice=${indice}>
        `; //no html, passar o parâmetro para item
    document.getElementById(`todoList`).appendChild(item);
}

const atualizaItem = () => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco();
    atualizaView();
}

const atualizaView = () => {
    limpaTela();
    const banco = getBanco();
    banco.forEach((item, indice) => inputItem(item.tarefa, item.status, indice));
}

const limpaTela = () => {
    const lista = document.getElementById('todoList');
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }
}

const insereItem = (event) => {
    const tecla = event.key;
    const valor = event.target.value;

    if(tecla === 'Enter') {
        const banco = getBanco();
        banco.push({'tarefa': valor, 'status': ''});
        setBanco(banco);
        atualizaView();
        event.target.value = '';
    }
}

const removeItem = () => {
    const banco = getBanco();
    banco.splice(indice, 1); 
    setBanco();
    atualizaView();
}

document.getElementById('newItem').addEventListener('keypress', insereItem);
document.getElementById('todoList').addEventListener('click', removeItem);

atualizaView();