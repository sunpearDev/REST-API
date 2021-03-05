import React, { Component } from 'react'
import Title from '../components/Title.js'
import axios from 'axios'
import Table from '../components/Table.js'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.getData = this.getData.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.emptyOther = this.emptyOther.bind(this)
        this.state = {
            data: [],
            province: 'ha-noi',
            page: 1,
            nameCompany: '',
            taxCode: ''
        }
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getData(e) {
        e.preventDefault()
        let url = 'https://thongtindoanhnghiep.co/api/company' + (this.state.taxCode !== '' ?
            ('/' + this.state.taxCode) :
            '?' + (this.state.province !== '' ? '&l=' + this.state.province : '')
            + (this.state.page !== '' ? '&p=' + this.state.page : '')
            + (this.state.nameCompany !== '' ? '&k=' + this.state.nameCompany : ''))
        console.log(url)
        axios.get(url
            , {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            })
            .then(res => {
                if (this.state.taxCode !== '') {
                    this.setState({ data: [res.data] })
                }
                else
                    this.setState({ data: res.data.LtsItems })
            })


    }
    emptyOther() {
        this.setState({
            province:'',
            page:'',
            nameCompany:''
        })
    }
    render() {
        return (
            <>
                <Title title='Thông tin doanh nghiệp' />
                <form onSubmit={this.getData}>
                    <div className="form-group">
                        <label>Tỉnh:</label>
                        <input type="text" className="form-control" name="province" onChange={this.handleChange} value={this.state.province} />
                    </div>
                    <div className="form-group">
                        <label>Trang:</label>
                        <input type="text" className="form-control" name="page" onChange={this.handleChange} value={this.state.page} />
                    </div>
                    <div className="form-group">
                        <label>Tên:</label>
                        <input type="text" className="form-control" name="nameCompany" onChange={this.handleChange} value={this.state.nameCompany} />
                    </div>
                    <div className="form-group">
                        <label>Mã số thuế:</label>
                        <input type="text" className="form-control" name="taxCode" onClick={this.emptyOther} onChange={this.handleChange} value={this.state.taxCode} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <Table data={this.state.data} />

            </>
        )
    }
}
