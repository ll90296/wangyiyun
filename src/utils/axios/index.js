//引入封装好的axios
import http from './axios'

//封装接口

//封装推荐歌单接口
export function getPersonalized(params) {
    return http.get('/personalized',{params})
}

//封装新音乐接口
export function getNewsong(){
    return http.get('/personalized/newsong')
}

//封装热歌榜接口
export function getToplist(data){
    return http.post('/top/list',data)
}

//封装轮播图接口
export function getBanner(params){
    return http.get('/banner',{params})
}

//封装搜索接口
// export function getSearch(){
//     return 
// }

//封装歌单详情接口
export function getDetail(params){
    return http.get('/playlist/detail',{params})
}

//封装音乐url接口
export function getUrl(params){
    return http.get('/song/url',{params})
}

//封装歌词接口
export function getLyric(params){
    return http.get('/lyric',{params})
}

//封装歌曲详情接口
export function getSongDetail(params){
    return http.get('/song/detail',{params})
}