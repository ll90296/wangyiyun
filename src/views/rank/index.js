import React from 'react'
import '../../assets/css/rank.css'
import { getToplist } from '../../utils/axios'

class Rank extends React.Component {
    constructor() {
        super()
        this.state = {
            newList: [
            ]
        }
    }
    toPlay(id){
        this.props.history.push(`/play/${id}`)
    }
    componentDidMount() {
        let id = 3778678
        getToplist({ id }).then(res => {
            if (res.data.code == 200) {
                // console.log(res);
                let newList = res.data.playlist.tracks.splice(0, 20)
                console.log(newList);
                this.setState({
                    newList
                })
            }
        })
    }
    render() {
        return (
            <div className="rank">
                <div className="topImg">
                    <div></div>
                    <p>更新日期：11月19日</p>
                </div>
                <div className="newList">
                    {this.state.newList.map((item, index) => {
                        return <div onClick={this.toPlay.bind(this,item.id)} key={item.id}>
                            {index <= 2 ? <div className="rankId coldf3436">
                                {index + 1}
                            </div> : <div className="rankId">
                                    {index + 1}
                                </div>}

                            <div className="newlistLeft">
                                <h3>{item.name}{item.alia.length > 0 ? <span>({item.alia[0]})</span> : ''}</h3>
                                <p>
                                    <i className="sq"></i>
                                    {item.ar.map(songer => {
                                        return <i key={songer.name}>{songer.name}<span>/</span></i>
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
        )
    }
}

export default Rank