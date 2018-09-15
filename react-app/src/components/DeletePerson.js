import React, { Component } from 'react';
import './DeletePerson.css';

class DeletePerson extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({
          data: data
        }));
  }

  delete(row) {
    const request = new Request('http://127.0.0.1:8080/people/' + row.id);
    fetch(request, {
      method: 'delete'
    })
    .then(response => response.json())
      .then(data => this.setState({
        data: data
      }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Person</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, index) => {

              return <Row users={this.state.data} data={item} key={index} row={index} delete={this.delete.bind(this)} />
            })}
          </tbody>
       </table>
      </div>
    );
  }
}

class Row extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.firstname}</td>
        <td>{this.props.data.lastname}</td>
        <td>{this.props.data.city}</td>
        <td><button className="btn btn-success" onClick={() => {this.props.delete(this.props.data)}}>Delete</button></td>
      </tr>
    )
  }
}

export default DeletePerson;
