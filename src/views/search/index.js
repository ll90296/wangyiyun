import React from 'react'
import '../../assets/css/search.css'
// import $ from 'jquery'
import axios from 'axios'

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchList: '',
            songList: [],
            hotList: []

        }
    }
    changeVal(e) {
        this.setState({
            searchList: e.target.value,
        })
    }
    close(e) {
        this.myInput.value = ''
        this.setState({
            searchList: '',
        })
    }
    myInput() {
        console.log(this);
    }
    pushName(name) {
        this.myInput.value = name
        this.setState({
            searchList: name
        })
    }
    componentDidUpdate() {
        if (this.state.searchList != '') {
            axios({
                method: 'get',
                url: 'http://www.localhost:3000/search',
                params: {
                    keywords: this.state.searchList
                }
            }).then(res => {
                let { data: { result } } = res
                this.setState({
                    songList: result.songs
                })
            })
        }
    }
    componentDidMount() {

        axios({
            method: 'get',
            url: 'http://www.localhost:3000/search/hot',
        }).then(res => {
            let { data: { result: { hots } } } = res
            this.setState({
                hotList: hots
            })
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className="search">
                <form action="#">
                    <div className="searchInput">
                        <i></i>
                        <input type="text" ref={(ref)=>{this.myInput = ref}} onChange={this.changeVal.bind(this)} placeholder="搜索歌曲、歌手、专辑" />
                        {this.state.searchList ?
                            <span onClick={this.close.bind(this)}>
                                <i></i>
                            </span> : ''}
                    </div>
                </form>
                {this.state.searchList ? <h3>搜索“{this.state.searchList}”</h3> : <h4>热门搜索</h4>}

                {this.state.searchList ? <ul className="searchLi">
                    {this.state.songList.map((item, index) => {
                        if (index < 10) {
                            return this.state.searchList ? <li key={item.id}><i></i><span>{item.name}</span></li> : ''
                        }
                    })}
                </ul> : <div>
                        <ul className="hotLi">
                            {this.state.hotList.map(list => {
                                return <li onClick={() => this.pushName(list.first)} key={list.first}><span>{list.first}</span></li>
                            })}
                        </ul>
                    </div>}


            </div>
        )
    }
}

export default Search