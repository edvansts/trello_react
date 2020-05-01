import React from "react";

export default class CreateCard extends React.Component{
    
    criarCartao(){
        let cardName= window.prompt("Digite o nome do cartão a ser criado: "); 
        while(cardName==null || cardName===''){
            alert('Nome invalido');
            cardName = window.prompt("Digite o nome do cartão a ser criado: ");
        }
        let listName= window.prompt("Digite o nome da lista a ser colocado o cartão: "); 
        while(listName==null || listName===''){
            alert('Nome invalido');
            listName= window.prompt("Digite o nome da lista a ser colocado o cartão: "); 
        }
        fetch("https://api.trello.com/1/boards/"+sessionStorage.getItem('idBoard')+"/lists?key="+localStorage.getItem('apiKey')+"&token="+localStorage.getItem("trello_token"),{method: "GET",})
        .then(response => response.text())
        .then(result => {
            let list = JSON.parse(result);
            list.map(item => {
                if(item.name.toUpperCase()===listName.toUpperCase()){
                    fetch("https://api.trello.com/1/cards?name="+cardName+"&idList="+item.id+"&key="+localStorage.getItem('apiKey')+"&token="+localStorage.getItem("trello_token"),{method: "POST",})
                    .then(response => response.text())
                    .then(result => console.log('Successful creation'),window.location.href="http://localhost:3000/lists")
                    .catch(error => console.log('error', error));
                }
                return console.log('');
            })
            

        })
        .catch(error => console.log('error', error));
    }

    render(){
        return <button onClick={this.criarCartao.bind(this)}>Criar Cartão</button>
    }
}