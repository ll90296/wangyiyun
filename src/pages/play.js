import React from 'react'
import '../assets/css/play.css'
import axios from 'axios'
import $ from 'jquery'

import { getUrl, getLyric, getSongDetail } from '../utils/axios'

class Play extends React.Component {
    constructor() {
        super()
        this.state = {
            urlList: [],
            lyricList: [],
            SongList: [],
            nowTime: '',
            onOff: false
        }
        this.audio = React.createRef()
        this.btnOnoff = React.createRef()
    }
    //封装事件格式化
    formateTime(timer) {
        let minutes = (Math.floor(timer / 60) + '').padStart(2, '0')
        let seconds = (Math.floor(timer % 60) + '').padStart(2, '0')
        return `${minutes}:${seconds}`
    }
    //歌词滚动
    moveLyric() {
        // let lyric = document.querySelector('.lyric')
        let lyric = $('.lyric')
        // let activeIndex = document.querySelector('.active')
        let active = $('.active')
        let index = active.index()
        let offSet = active.outerHeight()
        console.log(active.css('color'));
        if (active.css('color') == 'rgb(127, 255, 0)') {
            $('.lyric').css('transform', `translateY(-${offSet * index}px)`)
        }
    }
    //点击播放暂停
    toPlay() {
        // console.log(this.btnOnoff);
        this.setState({
            onOff: !this.state.onOff
        }, () => {
            if (this.state.onOff) {
                this.audio.current.pause()
                this.btnOnoff.current.style.display = 'block'
            } else {
                this.audio.current.play()
                this.btnOnoff.current.style.display = 'none'
            }
        })

    }

    componentDidMount() {
        const id = this.props.history.location.pathname.slice(6)
        const ids = id
        axios.all([getUrl({ id }), getLyric({ id }), getSongDetail({ ids })]).then(axios.spread((url, lyric, SongDetail) => {
            if (url.data.code == 200) {
                this.setState({
                    urlList: url.data.data[0]
                })
            }
            if (lyric.data.code == 200) {
                let reg = /\[(.*?)](.*)/g
                let obj = {}
                lyric.data.lrc.lyric.replace(reg, (a, b, c) => {
                    b = b.slice(0, 5)
                    obj[b] = c
                })
                this.setState({
                    lyricList: obj
                }, () => {
                    let audio = this.audio.current
                    audio.ontimeupdate = () => {
                        // console.log(audio.currentTime);
                        let nowTime = this.formateTime(audio.currentTime)
                        if (nowTime in obj) {
                            this.setState({
                                nowTime
                            }, () => {
                                this.moveLyric()
                            })
                        }
                    }
                })
            }
            if (SongDetail.data.code == 200) {
                this.setState({
                    SongList: SongDetail.data.songs
                })
            }
        }))
    }
    render() {
        const { urlList, lyricList, nowTime, SongList } = this.state
        const arr = Object.entries(lyricList)
        console.log(SongList);
        return (
            <div className="play">
                <div className="top">
                    <div className="blackCri" onClick={this.toPlay.bind(this)}>
                        <div>
                            <img src={SongList.length > 0 ? SongList[0].al.picUrl : ''} alt="" />
                        </div>
                        <div className="playBtn" ref={this.btnOnoff}>

                        </div>
                    </div>
                    <div className="ciTiao"></div>
                </div>
                <div className="footer">
                    <div className="lyric">
                        <h3><span>{SongList.length > 0 ? SongList[0].name : ''}</span>-<i>{SongList.length > 0 ? SongList[0].ar[0].name : ''}</i></h3>
                        {arr.map(item => {
                            if (nowTime == item[0]) {
                                return <p className="active" key={item}>{item[1]}</p>
                            } else {
                                return <p key={item}>{item[1]}</p>
                            }

                        })}
                    </div>
                </div>
                <audio ref={this.audio} src={urlList.url} autoPlay></audio>

            </div>
        )
    }
}

export default Play