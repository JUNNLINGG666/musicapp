<template>
    <div class="comments">
        <div class="top">
            <i @click="back">
                <img src="../assets/返回.svg">
            </i>
            <p>评论</p>
            <i>
                <img src="../assets/分享.svg">
            </i>
        </div>
        <div class="section">
            <p>评论区</p>
            <ul>
                <li v-for="v in says" :key="v.commentId">
                    <div class="left"> 
                        <img :src="v.pic">
                    </div>
                    <div class="right">
                        <p>{{v.username}}</p>
                        <p>{{v.say}}</p>
                    </div>
                </li>
            </ul>
            <router-link :to="`/comments/${page+1}`">查看更多....</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            page:0,
            says:[]
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.page = 0
            vm.says = []
            vm.more(vm)
            // console.log(vm.says);
        })
    },
    beforeRouteUpdate(to,from,next){
        this.more(this)
        next()
    },
    methods:{
        back(){
            // console.log(this);
            this.$router.back('/')
        },
        more(vm){
            vm.page++
            vm.$http.get('/comment/music?id='+vm.$store.state.musicID+'&limit='+(vm.page*20)).then(data=>{
                let usersay = data.data.comments.map(d=>{
                    return {
                        pic:d.user.avatarUrl,
                        username:d.user.nickname,
                        say:d.content,
                        commentId:d.commentId
                    }
                })
                vm.says = usersay
            })
        }
    }
}
</script>
<style lang="less" scoped>
.comments{
    width: 100%;
    height: 100%;
    .top{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        i{
            flex: 1;
            display: block;
            height: 100%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        p{
            flex: 8;
            line-height: 40px;
            height: 100%;
            text-align: left;
            font-size: 28px;
        }
    }
    .section{
        p{
            text-align: left;
        }
        >p:first-of-type{
            font-weight: bold;
        }
        ul{
            li{
                padding-top: 20px;
                display: flex;
                border-bottom: 1px solid rgb(119, 116, 116);
                .left{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: 0 20px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .right{
                    height: 100%;
                    p:last-of-type{
                        margin: 10px 0;
                    }
                }
            }
        }
    }
}
</style>