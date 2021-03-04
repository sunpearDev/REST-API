import React, { Component } from 'react'
import axios from 'axios'

export default class Table extends Component {
  deleteItem = (id) => {
    axios.delete('http://localhost:5000' + window.location.pathname + '/' + id)
      .then(res => {
        console.log(res.data)
        alert(window.location.pathname.charAt(1).toUpperCase() + window.location.pathname.substr(2)+' removed successfully.')
        window.location.reload()
      })
      .catch(err => alert(err))
  }
  render() {
    var key
    if (Array.isArray(this.props.data) && typeof (this.props.data[0]) == "object")
      key = Object.keys(this.props.data[0])
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            {Array.isArray(this.props.data) && typeof (this.props.data[0]) == "object" ?
              Object.keys(this.props.data[0]).map(col => (
                <th scope="col" key={col}>{col.charAt(0).toUpperCase() + col.substr(1)}</th>
              )) : ''}
            <th scope="col">Edit</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(this.props.data) ? this.props.data.map(item => {
            let result = []
            result.push(<td scope='row'>{item[key[0]]}</td>)
            for (let i = 1; i < key.length; i++) {
              result.push(<td>{item[key[i]]}</td>)
            }
            result.push(<td><a href={window.location.pathname + '/editForm/' + item[key[0]]}>Edit</a></td>)
            result.push(<td><a href='#' onClick={() => this.deleteItem(item[key[0]])}>Remove</a></td>)
            return <tr key={item[key[0]]}>{result}</tr>
          }) : ''}
        </tbody>
      </table>
    )
  }
}
