import React, {Component} from 'react';
import Table from './Table';

class App extends Component {
    // state = {}
    
    render() {
        const characters = [
            {
                "Name": "Charlie",
                "Job": "Janitor"
            },
            {
                "Name": "Mac",
                "Job": "Bouncer"
            },
            {
                "Name": "Dee",
                "Job": "Aspiring actress"
            },
            {
                "Name": "Dennis",
                "Job": "Bartender"
            }
        ];

        return ( 
            <div className="container">
                <Table characterData = {characters} />
            </div>
        );
    }
}

export default App;