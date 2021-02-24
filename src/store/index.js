import Vue from 'vue'
import Vuex from 'vuex'
import bika from '../assets/bika.jpg'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicID:'',
    picurl:bika,
    musicname:'',
    songername:'',
    lyrics:[],
    nowplay:[]
  },
  mutations: {
    changeMusicID(state,newsong){
      state.musicID = newsong
    },
    changeMusicPic(state,newurl){
      state.picurl = newurl
    },
    changeMusicName(state,newname){
      state.musicname = newname
    },
    changeSongerName(state,newSonger){
      state.songername = newSonger
    },
    changeLyrics(state, newLyrics){
      state.lyrics = newLyrics
    },
    changePlayList(state,newList){
      state.nowplay = newList
    }
  },
  actions: {
  },
  modules: {
  }
})
