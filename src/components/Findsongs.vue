<template>
    <NewMusic :newMusicList="findSongs"></NewMusic>
</template>
<script>
import NewMusic from './NewMusic'
export default {
    components:{
        NewMusic
    },
    props:{
        findSongs:Array
    }
}
</script>
<style lang="less" scoped>

</style>