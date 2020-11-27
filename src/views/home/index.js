import React from 'react'
import '../../assets/css/home.css'
import axios from 'axios'
import { getPersonalized, getNewsong, getBanner } from '../../utils/axios'
import '../../assets/css/banner.css'
import 'swiper/css/swiper.css'
import 'swiper/js/swiper'
import Swiper from 'swiper'
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            gridList: [
            ],
            singList: [
            ],
            CountRe: [],
            bannerList: []
        }
    }
    toList(id) {
        this.props.history.push(`/list/${id}`)
    }
    toPlay(id){
        this.props.history.push(`/play/${id}`)
    }
    componentDidUpdate() {

    }
    componentDidMount() {
        let type = 2
        axios.all([getPersonalized({ limit: 6 }), getNewsong(), getBanner({ type })]).then(axios.spread((gridList, singList, bannerList) => {
            console.log(gridList, singList, bannerList);
            if (gridList.data.code == 200) {
                this.setState({
                    gridList: gridList.data.result
                })
                var CountRe = []
                gridList.data.result.map(item => {
                    var re = item.playCount.toString()
                    CountRe.push(re.replace(/\d{4}$/, '万'))
                    // console.log(CountRe);
                    this.setState({
                        CountRe
                    })
                })
            }
            if (singList.data.code == 200) {
                this.setState({
                    singList: singList.data.result
                })
            }
            if (bannerList.data.code == 200) {
                this.setState({
                    bannerList: bannerList.data.banners
                }, () => {
                    new Swiper('.swiper-container', {
                        loop: true,
                        autoplay: {
                            delay: 1000,
                            stopOnLastSlide: false,
                            disableOnInteraction: true,
                        }
                    })
                })
            }
        }))
    }
    render() {
        return (
            <div className="home">
                <div className="content">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {this.state.bannerList.map(item => {
                                return <div key={item.pic} className="swiper-slide">
                                    <img src={item.pic} alt="" />
                                </div>
                            })}
                        </div>
                    </div>
                    <h2><i></i>推荐歌单</h2>
                    <div className="grid">
                        {this.state.gridList.map((item, index) => {
                            return <div onClick={this.toList.bind(this, item.id)} key={item.id}>
                                <img src={item.picUrl} alt="" />
                                <p>{item.name}</p>
                                <span className="playCount">{this.state.CountRe[index]}</span>
                            </div>
                        })}
                    </div>
                    <h2><i></i>最新音乐</h2>
                    <div className="newList">
                        {this.state.singList.map(item => {
                            return <div onClick={this.toPlay.bind(this,item.id)} key={item.id}>
                                <div className="newlistLeft">
                                    <h3>{item.name}
                                        {item.song.alias.map(song => {
                                            return <span key={song}>({song})</span>
                                        })}
                                    </h3>
                                    <p>
                                        <i className="sq"></i>
                                        {item.song.artists.map(item => {
                                            return <i key={item.id}>{item.name}<span>/</span></i>
                                        })}
                                        <span>-</span>{item.name}</p>
                                </div>
                                <div className="newlistRight">
                                    <span></span>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="footer">
                        <div>
                            <div>打开APP，发现更多好音乐 &gt;</div>
                            <p>网易公司版权所有©1997-2020   杭州乐读科技有限公司运营</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home