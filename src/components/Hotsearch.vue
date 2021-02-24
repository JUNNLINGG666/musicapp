<template>
    <div class="hotsearch">
        <h3>热门搜索</h3>
        <ul>
            <li tag="li" v-for="(v,k) in hotSearch" :key="k" @click="$emit('clickSearch' , v.first)">{{v.first}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'Hotsearch',
    props:{
        hotSearch:Array,
        keywords:String
    },
    methods:{
        clickthis(){
            console.log(this);
        }
    }   
}
</script>
<style lang="less" scoped>
.hotsearch{
    padding: 3vh 2vh 0;
    h3{
        font-size: 12px;
        line-height: 12px;
        color: #666;
        text-align: left;
    }
    ul{
        margin-top: 2vh;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        li{
            border: 1px solid #9a9c9c;
            // display: inline-block;
            padding: 1vh 3vh;
            margin: 0 2vh 1vh 0; 
            border-radius: 4vh;
            font-size: 14px;  
        }
    }
}
</style>