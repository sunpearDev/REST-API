import React, { Component } from 'react'
import Title from '../components/Title.js'
import axios from 'axios'
import Table from '../components/Table.js'
import './HomePage.css'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.getData = this.getData.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.emptyOther = this.emptyOther.bind(this)
        this.state = {
            data: [],
            provinces: [],
            province: '',
            page: 1,
            nameCompany: '',
            taxCode: ''
        }
    }
    componentDidMount() {
        axios.get('https://thongtindoanhnghiep.co/api/city').then(res => {
            let tempProvinces = []
            res.data.LtsItem.map(item => {
                tempProvinces.push({ id: item.SolrID.substr(1), name: item.Title })
            })
            this.setState({ provinces: tempProvinces })
        })
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
            province: '',
            page: '',
            nameCompany: ''
        })
    }
    render() {
        return (
            <>

                <h1 className="title-group">Nhóm 3</h1>
                <ul className="members">
                    <li><h4>Lý Nhật Hào</h4><p>DH51703353</p></li> 
                    <li><h4>Bùi Thanh Nguyên</h4><p>DH51703823</p></li>
                    <li><h4>Trương Hải Hoàng Phương</h4><p>DH51703996</p></li>
                    <li><h4>Lê Quang Nhựt</h4><p>DH51703886</p></li>
                </ul>
                <h1 className="title">Thông tin doanh nghiệp</h1>
                <form onSubmit={this.getData}>
                    <div className="form-group">
                        <label>Tỉnh:</label>
                        <select name="province" onChange={this.handleChange}>
                            <option value=''>Toàn quốc</option>
                            {this.state.provinces.map(item => (
                                <option value={item.id} >{item.name}</option>
                            ))}
                        </select>
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
