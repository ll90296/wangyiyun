import React from 'react'
//引入路由配置
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import Home from '../views/home'
import Rank from '../views/rank'
import Search from '../views/search'
import '../assets/css/index.css'

import Logo from '../assets/images/topbar.png'

class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            Logo
        }
    }
    render() {
        return (
            <div className="index">
                <div className="fixed">
                    <div className="top">
                        <div><img src={Logo} alt="" /></div>
                        <div className="download">下载APP</div>
                    </div>
                    <ul className="tab">
                        <li><NavLink activeClassName="active" to="/index/home">推荐音乐</NavLink></li>
                        <li><NavLink activeClassName="active" to="/index/rank">热歌榜</NavLink></li>
                        <li><NavLink activeClassName="active" to="/index/search">搜索</NavLink></li>
                    </ul>
                </div>
                <Switch>
                    <Route path="/index/home" component={Home}></Route>
                    <Route path="/index/rank" component={Rank}></Route>
                    <Route path="/index/search" component={Search}></Route>
                    <Redirect to="/index/home"></Redirect>
                </Switch>
            </div>
        )
    }
}

export default Index