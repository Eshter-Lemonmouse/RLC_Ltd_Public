import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
// import 

const renderContent = (props)=>{
    return(
        <div>
            <h1>{props}</h1>
        </div>
    );
}

const App = ()=>{
    return(
        renderContent('Hello')
    );
}

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

