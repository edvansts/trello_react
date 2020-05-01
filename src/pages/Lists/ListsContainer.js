import React from "react";
import CreateCard from "./CreateCard"
import CreateList from "./CreateList"
import DeleteCard from "./DeleteCard"
import DeleteList from "./DeleteList"

export default class ListsContainer extends React.Component{
    constructor(){
        super();
        this.state = {
            lists : ''
        }
    }
    componentDidMount(){
        if(localStorage.getItem('trello_token') == null || localStorage.getItem('apiKey')==null){
            window.location.href = 'http://localhost:3000';
        }else{
            this.getLists();
        }

    }
    getLists(){
        fetch("https://api.trello.com/1/boards/"+sessionStorage.getItem('idBoard')+"/lists?key="+localStorage.getItem('apiKey')+"&token="+localStorage.getItem("trello_token"),{method: "GET",})
        .then(response => response.text())
        .then(result => {
          let list = JSON.parse(result);
          this.setState({
            lists: list
            })
          list.map((item) => {
              let elem  = document.createElement('li');
              elem.classList.add('list-group');
              elem.setAttribute('list-id', item.id);
              elem.setAttribute('list-name',item.name);
              elem.innerText= item.name;
              elem.style.font = 'normal 16pt Arial';
              document.querySelector('.row').appendChild(elem);
              this.getListInfo(item.id);
              return console.log(elem)
          })
        })
        .catch(error => console.log('error', error));
    }
    getListInfo(id){
        fetch("https://api.trello.com/1/lists/"+id+"/cards?key="+localStorage.getItem('apiKey')+"&token="+localStorage.getItem("trello_token"),{method: "GET",})
        .then(response => response.text())
        .then(result => {
            let list = JSON.parse(result);
            list.map((item) => {
                let elem  = document.createElement('li');
                elem.classList.add('list-group-item');
                elem.setAttribute('card-id', item.id);
                elem.setAttribute('card-name',item.name);
                elem.innerText= item.name;
                elem.style.font='normal 12pt Arial';
                document.querySelector('.list-group[list-id="'+id+'"]').appendChild(elem);
                return console.log(elem)
            })
            
        })
        .catch(error => console.log('error', error));
    }

    render(){
        return(
            <div>
                <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <CreateCard float="left" />
                    <DeleteCard float="left" lists= {this.state.lists} />
                    <CreateList float="left" />
                    <DeleteList float="left" />
                </div>
                <div className="row">
                </div>
            </div>
        )
    }
}