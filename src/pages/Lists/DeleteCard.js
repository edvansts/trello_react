import React, { Component } from 'react';

// import { Container } from './styles';

export default class Lists extends Component {

    deletarCartao()  {
        let cardName = window.prompt("Digite o nome do cartão a ser excluido: ");
        while(cardName==null || cardName===''){
            alert('Nome Invalido')
            cardName = window.prompt("Digite o nome do cartão a ser excluido: ");
        }
        console.log(this.props.lists)
        this.props.lists.map(item => {
            fetch("https://api.trello.com/1/lists/"+item.id+"/cards?key="+localStorage.getItem('apiKey')+"&token="+localStorage.getItem("trello_token"),{method: "GET",})
            .then(response => response.text())
            .then(result => {
                let list = JSON.parse(result);
                list.map((item) => {
                    if(item.name.toUpperCase()===cardName.toUpperCase()){
                        fetch("https://api.trello.com/1/cards/"+item.id+"?key="+localStorage.getItem('apiKey')+"&token="+localStorage.getItem("trello_token"),{method: "DELETE",})
                        .then(response => response.text())
                        .then(result => { console.log("Sucessful delete")
                        window.location.href = 'http://localhost:3000/lists';
                        })
                        .catch(error => console.log('error', error));
                    }
                    return console.log('')
                })
            
            })
            .catch(error => console.log('error', error));
            return console.log('')
        })
    }
    render() {
        return(
            <div>
                <button class="btn btn-outline-primary" onClick={this.deletarCartao.bind(this)}>Deletar Cartão</button>
            </div>
        ) 
    }
}
