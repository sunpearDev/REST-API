import React, { Component } from 'react'

export default class Table extends Component {

  render() {
    var keys = []
    var STT = 1;
    if (this.props.data !== undefined && Array.isArray(this.props.data) && this.props.data.length > 0 && typeof (this.props.data[0]) == "object") {
      Object.keys(this.props.data[0]).map(item => {

        if (this.props.data[0][item] === null || this.props.data[0][item] == '0' || Array.isArray(this.props.data[0][item])) {

        }
        else keys.push(item)

      })

      return (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">STT</th>
              {
                keys.map(col => (
                  <th scope="col" key={col}>{col.charAt(0).toUpperCase() + col.substr(1)}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(item => {
              let result = []
              result.push(<td>{STT++}</td>);
              result.push(<td scope='row'>{item[keys[0]]}</td>)
              for (let i = 1; i < keys.length; i++) {
                result.push(<td>{item[keys[i]]}</td>)
              } 
              return <tr key={item[keys[0]]}>{result}</tr>
            })}
          </tbody>
        </table>
      )
    }
    else return ''
  }
}
