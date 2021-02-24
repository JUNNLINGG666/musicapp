<template>
    <div class="searchval">
        <h3 @click="clickSearch(keywords)">搜索：{{ keywords }}</h3>
        <ul>
            <li v-for="v in searchVal" :key="v.id" @click="$emit('clickSearch' , v.name)">{{v|filtType}}{{v.name}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        searchVal:Array,
        keywords:String
    },
    filters:{
        filtType(v){
            if(typeof v.artists !='undefined'){
                return '歌曲:'
            }else if(typeof v.artist !='undefined'){
                return '专辑:'
            }else{
                return '歌手:'
            }
        }
    }
}
</script>
<style lang="less" scoped>
.searchval{
    text-align: left;
    h3{
        color: #507daf;
        height: 10vh;
        line-height: 10vh;
        // text-align: left;
        font-size: 15px;
        padding-left: 2vh;
    }
    ul{
        width: 100%;
        li{
            width: 100%;
            padding-left: 2vh;
            height: 9vh;
            line-height: 9vh;
            position: relative;
            text-indent: 4vh;
            &::before{
                content: '';
                display: block;
                width: 2vh;
                height: 2vh;
                position: absolute;
                background: url(../assets/下载.svg) no-repeat 0 0;
                background-size: cover;
                top: 3vh;
                left: 2vh;
            }
        }
    }

}
</style>