import React from 'react'
import '../assets/css/list.css'
import axios from 'axios'
import { getDetail } from '../utils/axios'

class List extends React.Component {
    constructor() {
        super()
        this.state = {
            playList: {},
            songList: [],
            description: []
        }
    }
    toPlay(id){
        this.props.history.push(`/play/${id}`)
    }
    componentDidMount() {
        let id = this.props.location.pathname.slice(6)
        console.log(id);
        getDetail({ id }).then(res => {
            console.log(res);
            const description = res.data.playlist.description.split('\n')
            if (res.data.code == 200) {
                this.setState({
                    playList: res.data.playlist,
                    songList: res.data.playlist.tracks,
                    description
                })
            }
        })
    }
    render() {
        const { playList, songList, description } = this.state
        return (
            <div className="list">
                {
                    playList.ordered ?<div className="topT">
                        <div className="plhead_wrap">
                            <img src="" alt=""/>
                            <div>
                                <h2>rapper说情话┃旋律说唱┃甜甜的宝藏女孩必备</h2>
                                <div>
                                    <div><img src="" alt=""/><i></i></div>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>:
                        <div className="top" style={{ background: `url('${playList.backgroundCoverUrl}')` }}>
                            <h3>{playList.name}</h3>
                            <span>每日更新</span>
                            <ul>
                                {description.map(item => {
                                    return <li key={item}>{item}<i></i></li>
                                })}

                            </ul>
                        </div>
                }

                <div className="content">
                    <h2>歌曲列表</h2>
                    <div className="newList">
                        {songList.map((item, index) => {
                            return <div onClick={this.toPlay.bind(this,item.id)} key={item.id}>
                                <div className="rankId">
                                    {index + 1}
                                </div>
                                <div className="newlistLeft">
                                    <h3>{item.name}<span>{item.oldTitle}</span></h3>
                                    <p>
                                        {item.ar.map(ar => {
                                            return <i key={ar.name}>{ar.name}<span>/</span></i>
                                        })}
                                        <span>-</span>{item.al.name}</p>
                                </div>
                                <div className="newlistRight">
                                    <span></span>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default List