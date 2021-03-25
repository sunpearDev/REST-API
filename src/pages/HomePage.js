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
            taxCode: '',
            totalRow: 0
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
                else {
                    this.setState({ data: res.data.LtsItems })
                    this.setState({ totalRow: res.data.Option.TotalRow })
                }

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
                    <a href="https://www.facebook.com/sleepy.jul2905">
                        <li>
                            <div className="avatar"><img src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-9/154496399_3667273010053894_4649204393099460959_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=NaTvCxzlDl8AX9tUE6e&_nc_ht=scontent.fsgn5-7.fna&oh=3cc8a6ef38728d001482703b42a6d643&oe=60715B00" /></div>
                            <p>Lý Nhật Hào</p><p>DH51703353</p><p>LỚP: D17_TH08</p>
                        </li>
                    </a>

                    <a href="https://www.facebook.com/btnguyen99">
                        <li>
                            <div className="avatar"><img src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-9/153382356_2841746282710673_1669244806076206060_o.jpg?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=JgQ1UAUdpVMAX87DHSt&_nc_ht=scontent-sin6-2.xx&oh=68f2f6c0a79711890345d4c78e0b4510&oe=606FAF70" /></div>
                            <p>Bùi Thanh Nguyên</p><p>DH51703823</p><p>LỚP: D17_TH08</p></li>
                    </a>
                    <a href="https://www.facebook.com/Nemo07">
                        <li>
                            <div  className="avatar"><img src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-1/c0.80.320.320a/p320x320/60394531_1307635276055883_6668883093018902528_o.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=tJYZWM1i0-0AX9y64fn&_nc_ht=scontent-sin6-2.xx&tp=27&oh=182b82d670e7e3154b5e0c0aa56c5e3e&oe=606F8C82"/></div>
                            <p>Trương Hải Hoàng Phương</p><p>DH51703996</p><p>LỚP: D17_TH08</p></li>
                    </a>
                    <a href="https://www.facebook.com/sun.pear.7">
                        <li>
                            <div className="avatar"><img  src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-9/97528110_2573285292925059_6621520654694875136_o.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=j2M7PmaJHUcAX8xR_CR&_nc_ht=scontent-sin6-2.xx&oh=76889059f55253d208140408d523c45e&oe=60724D94" /></div>
                            <p>Lê Quang Nhựt</p><p>DH51703886</p><p>LỚP: D17_TH07</p>
                        </li>
                    </a>
                </ul>
                <h1 className="title">Thông tin doanh nghiệp</h1>
                <form onSubmit={this.getData}>
                    <div className="form-group">
                        <label>Tỉnh:</label>
                        <select name="province" onChange={this.handleChange}>
                            {this.state.province === '' ? <option value='' selected>Toàn quốc</option> :
                                <option value=''>Toàn quốc</option>}
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
                <div>Đã tìm thấy {this.state.totalRow} rows</div>
                <Table data={this.state.data} />

            </>
        )
    }
}
