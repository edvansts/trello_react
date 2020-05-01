import React, { Component } from 'react';

// import { Container } from './styles';

export default class Lists extends Component {
    deletarLista(){
        let listName = window.prompt("Digite o nome da lista a ser arquivada: ");
        while(listName==null || listName===''){
            alert('Nome inválido')
            listName = window.prompt("Digite o nome da lista a ser arquivada: ");
        }
        fetch("https://api.trello.com/1/boards/"+sessionStorage.getItem('idBoard')+"/lists?key="+localStorage.getItem('apiKey')+"&token="+localStorage.getItem("trello_token"),{method: "GET",})
        .then(response => response.text())
        .then(result => {
            let list = JSON.parse(result);
            list.map((item) => {
                if(item.name.toUpperCase()===listName.toUpperCase){
                    fetch("https://api.trello.com/1/lists/"+item.id+"/closed?value=true&key="+localStorage.getItem('apiKey')+"&token="+localStorage.getItem("trello_token"),{method: "PUT",})
                    .then(response => response.text())
                    .then(result => (console.log("Sucessful delete")))
                    .catch(error => console.log('error', error));
                }
                return console.log('');
            })
            })
        .catch(error => console.log('error', error));
    }
    
    render() {
        return <button onClick={this.deletarLista.bind(this)}>Deletar Lista</button> 
    }
}
