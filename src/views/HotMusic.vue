<template>
    <div class="hotmusci">
        <div class="topbg">
            <div>
                <div class="hotpcr"></div>
                <div class="UpdateT">更新日期：{{ UpdateTime|formtDate }}</div>
            </div>
        </div>
        <HotMusic :hotMusicList="hotMusicList"></HotMusic>
        <router-link :to="`/hot/${num+1}`">查看更多....</router-link>
        <Loading v-if="hotMusicList.length < num*20" />
    </div>
</template>
<script>
import HotMusic from '../components/HotMusicList'
import Loading from '../components/Loading'
export default {
    name:'Hotsong',
    components:{
        HotMusic,
        Loading
    },
    data(){
        return {
            hotMusicIDList:[],
            hotMusicList:[],
            UpdateTime:new Date(),
            num:0
        }
    },
    methods:{
        loadMusic(vm){
            vm.num++
            vm.$http.get('/playlist/detail?id=3778678').then(data=>{
                // vm.hotMusicList = data.data.playlists
                // console.log(vm.hotMusicList);
                // console.log(data);
                vm.hotMusicIDList = data.data.playlist.trackIds.slice(20*(vm.num-1),20*(vm.num))
                // console.log(vm.hotMusicIDList);
                vm.hotMusicIDList.forEach(item => {
                    let ids=item.id;
                    let urls = '/song/detail?ids='+ids;
                    vm.$http.get(urls).then(data=>{
                        // console.log(data.data.songs[0]);
                        vm.hotMusicList.push(data.data.songs[0])
                    })
                });
                // console.log(vm.hotMusicList);
            })
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.num = 0
            vm.hotMusicList = []
            vm.loadMusic(vm)
        })
    },
    beforeRouteUpdate(to,from,next){
        this.loadMusic(this)
        next()
    },
    filters:{
        formtDate(value){
            let d = new Date(value);
            let month = d.getMonth()+1
            let day = d.getDate()
            if(month < 10){
                month = "0"+month
            }
            if(day < 10){
                day = "0"+day
            }
            return month+"月"+ day +"日"
        }
    }
}
</script>
<style lang="less" scoped>
.hotmusci{
    .topbg{
        background: url(../assets/hot_music_bg_2x.jpg) no-repeat;
        background-size: cover;
        min-height: 30vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &>div{
            padding-left: 20px;
            height: 100%;
            .hotpcr{
                width: 142px;
                height: 67px;
                background: url(../assets/index_icon_2x.png) no-repeat -24px -30px;
                background-size: 166px 97px;
            }
            .UpdateT{
                text-align: left;
                font-size: 12px;
                margin-top: 10px;
            }
        }
    }
}
</style>