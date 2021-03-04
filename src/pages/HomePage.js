import React, { Component } from 'react'
import Title from '../components/Title.js'
import axios from 'axios'
import Table from '../components/Table.js'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {

        axios.get('https://thongtindoanhnghiep.co/api/company?l=ha-noi&p=1', {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(res=>{
            
            this.setState({data: res.data.LtsItems})
        })
    }
    render() {
        return (
            <>
                <Title title='Claim Today' />
                <Table data={this.state.data}/>

            </>
        )
    }
}
