<template>
    <div class="recommend">
        <Title>推荐歌单</Title>
        <ul class="recommendMusicList">
           <router-link v-for="v in recommendMusicList" :key="v.id" :to="`/playlist/${v.id}/1`" tag="li">
            <div>
                <img :src="v.picUrl" />
                <span>{{ v.playCount|formatNum }}</span>
            </div>
            <p>{{ v.name }}</p>
           </router-link>
        </ul>
        <Loading v-if="recommendMusicList.length<=0"/>
        <Title>最新音乐</Title>
        <NewMusic :newMusicList="newMusicList"></NewMusic>
    </div>
</template>

<script>
import Title from '../components/Title'
import Loading from '../components/Loading'
import NewMusic from '../components/NewMusic'
// import Loading from '../components/Loading'
export default {
    name:'Recommend',
    components:{
        Title,
        NewMusic,
        Loading
    },
    data(){
        return {
            recommendMusicList:[],
            newMusicList:[],
            playlisId:'',
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.$http.get('/personalized?limit=6').then(data=>{
                vm.recommendMusicList = data.data.result
                // console.log(vm.recommendMusicList);
            })
            vm.$http.get('/personalized/newsong').then(data=>{
                vm.newMusicList = data.data.result;
                // console.log( vm.newMusicList);
                // console.log(vm.newMusicList);
                // console.log(data.data.result);
            })
        })
    },
    filters:{
        formatNum(value){
            return (value/10000).toFixed(1)+"万"
        }
    }
}
</script>
<style lang="less" scoped>
.recommendMusicList{
    display: flex;
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
        width: 33%;
        div{
            position: relative;
            span{
                position: absolute;
                top: 0;
                right: 4px;
                color: #fff;
            }
            text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        }
        p{
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
            font-size: 13px;
            text-align: left;
            line-height: 1.2;
            padding: 0 8px;
        }
    }
}
</style>