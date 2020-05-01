import React from "react";

export default class Login extends React.Component{
   

    logar(){
        localStorage.setItem('apiKey','5cfefbf6a07c3abf02a1e33d893cb7d5');
        window.Trello.authorize({
            type: 'popup',
            name: 'Start Aplication',
            scope: {
            read: 'true',
            write: 'true' },
            expiration: '30days',
            success: () => window.location.href = 'http://localhost:3000/boards',
        });
        //let elem = document.createElement('li');
        //elem.innerText = this.state.apiKey;
        //document.querySelector(".list").appendChild(elem);
    }
    render(){
        return(
            <div>
                <button onClick={this.logar.bind(this)}>Login</button>
                
            </div>
        )  
    } 
    
}