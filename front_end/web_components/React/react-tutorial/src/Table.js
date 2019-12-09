import React, { Component } from 'react';
// import App from './App';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
            </tr>
        </thead>
    );
}

const TableBody = (props) => {
    const rows = props.charaterData.map((row,index) => {
        return (
            <tr key={index}>
                <td>{row.Name}</td>
                <td>{row.Job}</td>
            </tr>
        );
    });
    return (<tbody>{rows}</tbody>);
}

class Table extends Component {
    render() {
        const {charaterData} = this.props;
        return (
            <table>
                <TableHeader/>
                <TableBody charaterData={charaterData}/>
            </table>
        );
    }
}

export default Table;