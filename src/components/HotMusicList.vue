<template>
    <ul class="hotMusicList">
        <li v-for="(v,k) in hotMusicList" :key="k" tag="li" @click="changesongs(v.id)">
            <span :class="[k+1<10?'has':'' , k<3?'red':'']">{{k+1}}</span>
            <div class="left">
                <div>{{ v.name }}</div>
                <p :class="v.no==1?'sq':''">{{ v.ar[0].name }}-{{ v.name }}</p>
            </div>
             <div class="right">
                <span></span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    name:'HotMusic',
    props:{
        hotMusicList:Array
    },
    methods:{
        changesongs(ID){
            this.$store.commit('changePlayList' , this.hotMusicList)
            this.$store.commit('changeMusicID' , ID)
            // this.$store.commit('changeMusicPic' , this.$http.get('/song/detail?ids=' + ID).then(data=>{
            //     return data.data.songs[0].al.picUrl
            // }))
            this.$http.get('/song/detail?ids=' + ID).then(data=>{
                this.$store.commit('changeMusicPic' , data.data.songs[0].al.picUrl);
                this.$store.commit('changeMusicName' , data.data.songs[0].al.name);
                this.$store.commit('changeSongerName' , data.data.songs[0].ar[0].name);
                // console.log(data.data.songs[0].al.picUrl);
            })
            // this.$store.commit('changeMusicPic' , url)
            // console.log(this.$store.state.picurl);
            this.$http.defaults.baseURL="http://music.kele8.cn";//临时改变请求baseURL
            this.$http.get('/lyric?id=' + ID).then(data=>{
                let lrc =  data.data.lrc.lyric;
                // console.log(lrc);
                let lrcArr=lrc.split(/\n/);
                //[00:00.000] 作词 : 小星星Aurora
                let reg=/\[(\d+):(\d+\.\d+)\](.+)/;
                lrcArr=lrcArr.map(lc=>{
                    reg.test(lc);
                    return {
                    time:parseInt(RegExp.$1*60)+parseFloat(RegExp.$2),
                    lyric:RegExp.$3
                    }
                });
                // console.log(lrcArr);
                this.$store.commit('changeLyrics' , lrcArr);
            })
            // console.log(d);
            // console.log($store.state.lyrics);
            this.$http.defaults.baseURL='http://musicapi.leanapp.cn/';//把临时服务器请求改回 leanapp.cn
            // this.$store.commit('changeMusicPic' , url)
            // console.log(this.$store.state.picurl);
            console.log(this.$store.state.nowplay);
        }
    }
}
</script>
<style lang="less" scoped>
.hotMusicList{
    li{
        display: flex;
        margin-left: 10px;
        margin-top: 10px;
        span{
            // display: flex;
            // align-content: center;
            line-height: 40px;
            width: 40px;
            font-size: 17px;
            color: #333;
            &.red{
                color: #df3436;
            }
            &.has::before{
                content: '0';
            }
        }
        div.left{
            flex: 1;
            text-align: left;
            div{
                font-size: 17px;
                color: #000;
            }
            p{
                font-size: 12px;
                color: #888;
                &.sq::before{
                    content: '';
                    display: inline-block;
                    width: 12px;
                    height: 8px;
                    background: url(../assets/index_icon_2x.png) no-repeat;
                    background-size: 166px 97px;
                }
            }
        }
        div.right{
            padding: 0 5px;
            display: flex;
            align-content: center;
            span{
                display: inline-block;
                width: 22px;
                height: 22px;
                background: url(../assets/index_icon_2x.png) no-repeat -24px 0px;
                background-size: 166px 97px;
            }
        }
    }
}
</style>