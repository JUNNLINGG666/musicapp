<template>
  <div class="search">
    <form @submit.stop.prevent="clickSearch(keywords)">
      <div class="top">
        <i></i>
        <input
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model="keywords"
          @input="changeflag"
        />
        <i v-show="deleflag" @click="Alldele"></i>
      </div>
    </form>
    <SearchVal
      :keywords="keywords"
      v-show="showSearch"
      :searchVal="searchVal"
      @clickSearch="clickSearch"
    ></SearchVal>
    <Hotsearch
      :hotSearch="hotSearch"
      v-show="HotSearch"
      :keywords="keywords"
      @clickSearch="clickSearch"
    ></Hotsearch>
    <Findsongs v-show="findsongs" :findSongs="findSongs"></Findsongs>
  </div>
</template>
<script>
import Hotsearch from "../components/Hotsearch";
import SearchVal from "../components/SearchVal";
import Findsongs from "../components/Findsongs";
export default {
  name: "Search",
  components: {
    Hotsearch,
    SearchVal,
    Findsongs,
  },
  data() {
    return {
      hotSearch: [],
      keywords: "",
      deleflag: false,
      showSearch: false,
      HotSearch: true,
      searchVal: [],
      findsongs: false,
      findSongs: [],
      isClickSearch: false,
    };
  },
  methods: {
    clickSearch(songs) {
      this.showSearch = false;
      this.HotSearch = false;
      this.findsongs = false;
      this.isClickSearch = true;
      this.keywords = songs;
      this.axios.get("/search?keywords=" + songs).then((d) => {
        if (d.data.code == 200) {
          this.findsongs = true;
          //    console.log(d.data.result.songs);
          this.findSongs = d.data.result.songs.map((dat) => {
            return {
              name: dat.name,
              id: dat.id,
              song: {
                artists: dat.artists,
                privilege: {
                  playMaxbr: 0,
                },
              },
            };
          });
          //    console.log('this.findSongs===>',this.findSongs);
        }
      });
    },
    Alldele() {
      this.searchVal = [];
      this.findSongs = [];
      this.keywords = "";
      this.HotSearch = true;
      this.showSearch = false;
      this.findsongs = false;
      this.deleflag = false;
    },
    changeflag() {
      this.isClickSearch = false;
    },
  },
  watch: {
    keywords(val) {
      if (val == "") {
        this.deleflag = false;
      } else {
        this.deleflag = true;
      }

      if (this.isClickSearch == false) {
        if (val == "") {
          this.searchVal = [];
          this.findSongs = [];
          this.HotSearch = true;
          this.showSearch = false;
          this.findsongs = false;
          this.deleflag = false;
        } else {
          this.$http.get("/search/suggest?keywords=" + val).then((data) => {
            if (data.data.code == 200 && data.data.result.order) {
              // console.log(data.data.result);
              let result = data.data.result;
              let re = result.order.reduce((prev, v) => {
                if (v !== "playlists") {
                  let rev = result[v];
                  return prev.concat(rev);
                }
                return prev;
                // console.log(v);
              }, []);
              // console.log(re);
              this.searchVal = re;
              // console.log(this.searchVal);
              this.HotSearch = false;
              this.showSearch = true;
            }
          });
        }
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$http.get("/search/hot").then((data) => {
        vm.hotSearch = data.data.result.hots;
        // console.log(vm.hotSearch);
      });
    });
  },
};
</script>
<style lang="less" scoped>
.search {
  .top {
    width: 100%;
    padding: 3vh 2vh;
    display: flex;
    border-bottom: 1px solid grey;
    position: relative;
    input {
      flex: 1;
      outline: none;
      background-color: #ebecec;
      text-indent: 4vh;
      min-height: 5vh;
      border-radius: 20px;
      border: 0px;
      color: #000;
    }
    i {
      width: 2vh;
      height: 2vh;
      position: absolute;
      top: 4.5vh;
      &:first-of-type {
        background: url(../assets/下载.svg) no-repeat 0 0;
        background-size: cover;
        left: 3vh;
      }
      &:last-of-type {
        background: url(../assets/删除.svg) no-repeat 0 0;
        background-size: cover;
        right: 3vh;
      }
    }
  }
}
</style>