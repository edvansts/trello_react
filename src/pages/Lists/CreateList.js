import React, { Component } from 'react';

// import { Container } from './styles';

export default class CreateList extends Component {

    criarLista(){
        let listName = window.prompt("Digite o nome da lista a ser criada: ")
        while(listName==null || listName===''){
            alert('Nome inválido')
            listName = window.prompt("Digite o nome da lista a ser criada: ")
        }
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "dsc=28fd1368a49529e316be607054730eee4c24351eca77532ae02410d9a1ba80e6");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("https://api.trello.com/1/lists?name="+listName+"&idBoard="+sessionStorage.getItem('idBoard')+"&key="+localStorage.getItem('apiKey')+"&token="+localStorage.getItem('trello_token'), requestOptions)
        .then(response => response.text())
        .then(result => console.log(result),window.location.href="http://localhost:3000/lists")
        .catch(error => console.log('error', error));
    }

    render() {
        return <button class="btn btn-outline-primary" onClick={this.criarLista.bind(this)}>Criar Lista</button>
    }
}
