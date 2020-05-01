import React from "react";

export default class BoardsContainer extends React.Component{
    
    componentDidMount(){
        if(localStorage.getItem('trello_token') == null || localStorage.getItem('apiKey')==null){
            window.location.href = 'http://localhost:3000';
        }else{
            this.getBoards();
        }
    }
    getBoards(){
                fetch("https://api.trello.com/1/members/me/boards?fields=name,url&key="+localStorage.getItem("apiKey")+"&token="+localStorage.getItem("trello_token"),{ method:"GET", } )
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    let list = JSON.parse(result);
                    list.map((item) => {
                        let elem  = document.createElement('li');
                        elem.classList.add('list-group-item');
                        elem.classList.add('btn-list');
                        elem.setAttribute('board-id', item.id);
                        elem.innerText= item.name;
                        elem.addEventListener('click',(elem => {sessionStorage.setItem('idBoard',item.id);
                        window.location.href = "http://localhost:3000/lists"} ));
                        document.querySelector('.board-group').appendChild(elem);
                        return console.log(elem);
                    })
                })
                .catch(error => console.log('error', error));
    }
    render(){
        return(
            <div className = "board-group">
            </div>
        )
    }
}