<template>
    <div class="songlist">
        <div class="top">
            <div class="left">
                <img :src="songlisTop.bigpcrurl">
            </div>
            <div class="right">
                <h2>{{songlisTop.name}}</h2>
                <div>
                   <img :src="songlisTop.smallpceurl">{{songlisTop.nickname}}
                </div>
            </div>
        </div>
        <PlayListMusic :hotMusicList="Playlis"></PlayListMusic>
        <button @click="loadLis()">查看更多</button>
       <!-- <router-link :to="`/playlist/${$route.params.id}/${num+1}`">查看更多....</router-link> -->
       <Loading v-if="Playlis.length < num*20" />
    </div>
</template>
<script>
import PlayListMusic from '../components/HotMusicList'
import Loading from '../components/Loading'
export default {
    components:{
        PlayListMusic,
        Loading
    },
    data(){
        return {
            songlisTop:{
                name:'',
                bigpcrurl:'',
                smallpceurl:'',
                nickname:''
            },
            PlaylisID:[],
            Playlis:[],
            num:0
        }
    },
    methods:{
        loadLis(){
            let vm=this;
            vm.num++
            vm.$http.get('/playlist/detail?id='+vm.$route.params.id).then(data=>{
                if(data.data.playlist.trackIds.length <= (vm.num-1)*20){
                    alert('没有更多了')
                }else{
                    vm.PlaylisID = data.data.playlist.trackIds.slice(20*(vm.num-1),20*(vm.num))
                    vm.PlaylisID.forEach(item =>{
                        let ids = item.id;
                        let urls = '/song/detail?ids='+ids;
                        vm.$http.get(urls).then(data=>{
                            // console.log(data.data.songs[0]);
                            vm.Playlis.push(data.data.songs[0])
                        })
                    })
                }
            })
            // console.log(this.$route.params.id);
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            // console.log(vm.$route.params);
            vm.num=0;
            vm.Playlis = []
            let ThisId = vm.$route.params.id
            vm.$http.get('/playlist/detail?id=' +ThisId).then(data=>{
                let playlist = data.data.playlist;
                vm.songlisTop.name = playlist.name;
                vm.songlisTop.bigpcrurl = playlist.coverImgUrl;
                vm.songlisTop.smallpceurl = playlist.creator.avatarUrl;
                vm.songlisTop.nickname = playlist.creator.nickname;
            })
            vm.loadLis()
            // console.log();
        })
    },
    beforeRouteUpdate(to,from,next){
        this.loadLis(this);
        next()
    }
}
</script>
<style lang="less" scoped>
.top{
    width: 100%;
    height: 34vh;
    box-sizing: border-box;
    padding: 0vh 3vh 6vh 2vh;
    display: flex;
    justify-content: left;
    .left{
        flex: 1;
        img{
            height: 100%;
        }
    }
    .right{
        flex: 3;
        margin-left: 3vh;
        text-align: left;
        div{
            height: 6vh;
            margin-top: 8vh;
            img{
                height: 100%;
                border-radius: 50%;
            }
        }
    }
}
</style>