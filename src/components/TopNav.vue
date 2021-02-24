<template>
    <div class="nav">
        <ul class="topnav">
            <li><router-link tag="a" to="/">推荐音乐</router-link></li>
            <li><router-link tag="a" to="/hot/1">热歌榜</router-link></li>
            <li><router-link tag="a" to="/search">搜索</router-link></li>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.nav{
    .topnav{
        position: fixed;
        height: 43px;
        width: 100%;
        top: 0;
        display: flex;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
        z-index: 1;
        li{
            flex: 1 1 auto;
            line-height: 40px;
            font-size: 15px;
            a{
                display: inline-block;
                color: #000;
                &.router-link-exact-active{
                    color: red;
                    border-bottom: 2px solid red;
                }
            }
        }
    }
}
</style>