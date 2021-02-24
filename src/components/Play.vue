<template>
    <div class="box">
        <div class="lyrics" v-if="isFullLrc">
           <div class="lrc">
               <div class="top">
                   <i @click="isFullLrc=false">
                       <img src="../assets/返回.svg">
                   </i>
                   <div>
                       <p>{{$store.state.musicname}}</p>
                       <p>{{$store.state.songername}}</p>
                   </div>
                   <i>
                       <img src="../assets/分享.svg">
                   </i>
                    <!-- <van-button type="primary">主要按钮</van-button> -->
               </div>
               <div class="uls">
                   <ul :style="{
                       transform:`translateY(-${(lrcCurrent-1)*35}px`
                   }">
                        <li v-for="(v,i) in $store.state.lyrics" :key="i" :class="{active:i==lrcCurrent}" @click="jumpsongs(i)">{{v.lyric}}</li>
                   </ul>
               </div>
                <div class="four">
                    <a>
                        <img src="../assets/收藏.svg" alt="">
                    </a>
                    <a>
                        <img src="../assets/xiazai.svg" alt="">
                    </a>
                    <router-link to="/comments/1" tag="a" @click.native="isFullLrc=false">
                        <img src="../assets/评论.svg" alt="">
                        </router-link>
                    <a>
                        <img src="../assets/更多.svg" alt="">
                    </a>
                </div>
           </div>
           <div class="bottom">
               <div class="b_left">
                    <i class="last"></i>
                    <i :class="name == false?'stop':'play'" @click="playOrstop"></i>
                    <i class="next"></i>
               </div>
               <div class="b_right">
                   <i class="list"></i>
               </div>
           </div>
        </div>
        <div @click="showFull" v-if="!isFullLrc">{{$store.state.musicname}}--{{$store.state.songername}}</div>
        <div class="player" v-show="!isFullLrc">
            <i :class="$store.state.picurl == '/img/bika.ae561091.jpg'?'':'roll'">
                <img :src="`${$store.state.picurl}`">
                <!-- <img src="../assets/bika.jpg" alt=""> -->
            </i>
            <audio autoplay controls :src="`https://music.163.com/song/media/outer/url?id=${$store.state.musicID}.mp3`" @timeupdate="timeupdate" ref="musicplayer"></audio>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isFullLrc:false,
            lrcCurrent:0,
            name:false
        }
    },
    methods:{
        showFull(){
            this.isFullLrc = true;
        },
        timeupdate(event){
            let audio=event.target;
            let currentTime=audio.currentTime;//当前播放的时间
            for(var i =0;i < this.$store.state.lyrics.length;i++){
                let lrcTime = this.$store.state.lyrics[i].time;
                if(i >= this.$store.state.lyrics.length-1){
                    this.lrcCurrent = i
                    continue;
                }
                if(currentTime >= lrcTime && currentTime < this.$store.state.lyrics[i+1].time){
                    this.lrcCurrent = i
                    break;
                }
            }
            // for(var i in this.$store.state.lyrics){
            //     let lrcTime=this.$store.state.lyrics[i].time;//歌词的时间
            //     //  [01:00.000] 作词 : 小星星Aurora  currentTime=01:1
            //     //  [01:15.000] 作词 : 小星星Aurora  currentTime=01:1
            //     //判断当前歌词时间如果 小于等于当前播放时间，但是小于下一个歌词时间，当前歌词播放
            //     // var i2=parseInt(i)+1;//下标 是字符串 "0" +1 "1" +1
            //     // if(this.lrcCurrent <= this.$store.state.lyrics.length - 1){
            //         var i2=parseInt(i)+1
            //         if(i2 >= this.$store.state.lyrics.length){
            //             i2=this.$store.state.lyrics.length -1
            //         }
            //         console.log(this.$store.state.lyrics);
            //         console.log(i2);
            //         console.log(this.$store.state.lyrics[i2]);
            //         console.log(currentTime);
            //         console.log(this.$store.state.lyrics[i2].time);
            //         if(currentTime>=lrcTime && currentTime<this.$store.state.lyrics[i2].time){
            //             this.lrcCurrent=i;//  0 1 2 3 4 5 6 
            //             break;
            //         }
            //         console.log(this.lrcCurrent);
            //     // }
            // }
            // console.log(this.lrcCurrent);
            //  audio.currentTime 当前播放时间  audio.duration 音频总时长
        },
        jumpsongs(k){
            // console.log('1');
            // console.log(this.$refs);
            // console.log(this.$refs.musicplayer);
            this.$refs.musicplayer.currentTime = this.$store.state.lyrics[k].time;
        },
        playOrstop(){
            this.name = !this.name
            if(this.name){
                this.$refs.musicplayer.pause()
            }else{
                this.$refs.musicplayer.play()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.box{
    position: fixed;
    bottom: 0px;
    // height: 100%;
    width: 100%;
    z-index: 2;
    background-color:#fff;
    flex-direction: column;
    .player{
        justify-content: space-between;
        width: 100%;
        height: 40px;
        display: flex;
        i{  
            flex:1;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            &.roll{
                animation: rollImg 15s linear 0s infinite;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
        audio{
            flex: 12;
            height: 100%;
            outline: none;
        }
    }
    .lyrics{
        z-index: 1;
        width:100%;
        height:100vh;
        background-color: rgba(151, 144, 144, 0.685);
        position: relative;
      .lrc{
        position: relative;
        height: 100%;
        div{
          width: 100%;
          &.top{
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
              div{
                  text-align: left;
                  height: 100%;
                  flex: 8;
                  p:first-of-type{
                      font-weight: bold;
                  }
              }
          }
          &.uls{
            // position: absolute;
            margin-top: 43px;
            height:60vh;
            overflow: hidden;
            ul{
                li{
                    height:25px;
                    margin-top: 10px;
                    &.active{
                    color:red;
                    }
                }
            }
          }
        }
        .four{
            width: 50%;
            display: flex;
            justify-content: space-between;
            height: 5%;
            // position: absolute;
            // bottom: 0;
            // left: 0;
            // right: 0;
            margin: auto;
            a{
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
      }
      .bottom{
          width: 100%;
          height: 10vh;
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 0;
          .b_left{
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: space-around;
              i{
                    width: 10%;
                    height: 80%;
                    //   margin: 0 20px;
                    &.last{
                        background: url(../assets/上一首.svg) no-repeat;
                        background-size: cover;
                    }
                    &.stop{
                        background: url(../assets/暂停.svg) no-repeat;
                        background-size: cover;
                    }
                    &.play{
                        background: url(../assets/播放.svg) no-repeat;
                        background-size: cover;
                    }
                    &.next{
                        background: url(../assets/下一首.svg) no-repeat;
                        background-size: cover;
                    }
                }
          }
          .b_right{
              width: 10%;
              height: 100%;
              display: flex;
              justify-content: center;
              i{
                  width: 100%;
                  height: 100%;
                  background: url(../assets/列表.svg) no-repeat;
                  background-size: cover;
              }
          }
      }
    }   
}
@keyframes rollImg{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>