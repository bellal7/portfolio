<template>
  <div class="crypto">
    <div class="inner">
      <header>
        <h1>Live Cryptocurrency</h1>
        <p class="countdown">{{timer}}</p>
        <button type="button" class="btn_reload" v-on:click="refresh()">
          <span class="blind">Refresh</span>
        </button>
      </header>
      <section>
        <h2 class="tit">Live Prices <span>{{priceTime}}</span></h2>
        <table class="tbl_price">
          <caption>Cryptocurrency Live</caption>
          <thead>
            <tr>
              <th><a :href="linkUrl.BTC">BTC/KRW</a></th>
              <th><a :href="linkUrl.ETH">ETH/KRW</a></th>
              <th><a :href="linkUrl.XRP">XRP/KRW</a></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td :class="fnActive(arrActive[0])"><a :href="linkUrl.BTC"><div>{{priceData[0]}}</div></a></td>
              <td :class="fnActive(arrActive[1])"><a :href="linkUrl.ETH"><div>{{priceData[1]}}</div></a></td>
              <td :class="fnActive(arrActive[2])"><a :href="linkUrl.XRP"><div>{{priceData[2]}}</div></a></td>
            </tr>
            <tr>
              <td :class="fnActive(arrActive[3])"><a :href="linkUrl.BTC"><div>{{priceData[3]}} %</div></a></td>
              <td :class="fnActive(arrActive[4])"><a :href="linkUrl.ETH"><div>{{priceData[4]}} %</div></a></td>
              <td :class="fnActive(arrActive[5])"><a :href="linkUrl.XRP"><div>{{priceData[5]}} %</div></a></td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2 class="tit">Recent News <span>{{newsTime}}</span></h2>
        <ul class="news_list">
          <li v-for="data in newsData" :key="data.id" class="news_item">
            <a :href="data.url">
              <div class="news_thumbnail">
                <img :src="data.imageurl" width="60" height="60" alt="">
              </div>
              <dl class="news_info">
                <dt>{{data.title}}</dt>
                <dd>
                  <p>{{data.body}}</p>
                </dd>
              </dl>
            </a>
          </li>
        </ul>
      </section>
      <button type="button" class="btn_more" v-on:click="getData2()">More ({{cntNews}}/{{totalNews}})</button>
    </div>
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
// import Toasted from 'vue-toasted'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueMomentJS,moment)
// Vue.use(Toasted)
Vue.component('loading', Loading)

export default {
  name: 'crypto',
  props: {
    testmsg: String
  },
  data(){
    const baseURL = 'https://cryptowat.ch/markets/bithumb'
    let init = 60
    return {
      priceData:[],
      newsData:[],
      timer:init,
      initTimer:init,
      prevData:[],
      arrActive:[],
      priceTime:'',
      newsTime:'',
      initNews:10,
      cntNews:'',
      totalNews:'',
      start: true,
      timeinit : 60,
      linkUrl: {
				BTC : baseURL + 'btc/krw',
				ETH : baseURL + 'eth/krw',
				XRP : baseURL + 'xrp/krw'
      },
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    // get Price data
    getData() {
      const baseApiURL = 'https://min-api.cryptocompare.com/data'
      let url = baseApiURL+'/pricemultifull?fsyms=BTC,ETH,XRP&tsyms=KRW&api_key=b1e0e632fb30692d72f286708fe1fe365914c6528678c6f38e1b80633bdaac3e';
      axios.get(url)
      .then((r) => {
        this.isLoading = true;
        this.prevData = this.priceData;
        this.priceData = [
          r.data.DISPLAY.BTC.KRW.PRICE,
          r.data.DISPLAY.ETH.KRW.PRICE,
          r.data.DISPLAY.XRP.KRW.PRICE,
          r.data.DISPLAY.BTC.KRW.CHANGEPCT24HOUR,
          r.data.DISPLAY.ETH.KRW.CHANGEPCT24HOUR,
          r.data.DISPLAY.XRP.KRW.CHANGEPCT24HOUR
        ]
        setTimeout(() => {
          this.isLoading = false
        },500)
        // compare prevdata = thisdata
        this.prevData.reduce((res, d, i) => {
          if(this.priceData[i] == d){
            // same = true (add class)
            this.isActive = true
          }else{
            this.isActive = false
          }
          // isActive 값을 array에 담음
          res.push(this.isActive);
          this.arrActive = res;
          return res;
        }, [])
        // timer check
        let t = setInterval(() => {
          if (this.timer !== 0){
            this.timer--;
          }else {
            clearInterval(t)
            this.timer = this.initTimer
            this.getData();
            this.msg('Update checked!')
          }
        }, 1000);
      });
    },
    // get News data
    getData2() {
      const baseApiURL = 'https://min-api.cryptocompare.com/data'
      let url = baseApiURL+'/v2/news/?lang=EN';
      axios.get(url)
      .then((r) => {
        this.totalNews = r.data.Data.length;
        this.isLoading = true;
        if(this.cntNews == ''){
          this.cntNews = this.initNews;
        }else{
          if(this.cntNews == this.totalNews){
            this.msg('List items are fully loaded!')
          }else{
            this.cntNews = this.cntNews + this.initNews;
          }
          setTimeout(() => {
            this.isLoading = false
          },500)
        }
        // 세팅된 cntNews 만큼 array에 담음
        let datas = [];
        for(let i=0;i<this.cntNews;i++){
          let data = r.data.Data[i];
          datas.push(data)
        }
        this.newsData = datas
      })
    },
    refresh() {
			location.reload();
    },
    currentDate() {
      return this.$moment(new Date()).format('HH:mm')
    },
    fnActive(arg) {
      if(arg == false){
        this.priceTime = this.currentDate();
        return 'active';
      }else{
        return '';
      }
    },
    // Toast popup
		msg(dsc) {
			// this.$toasted.success(dsc, {
			// 	theme: 'toasted-primary',
			// 	position: 'top-left',
			// 	duration: 2000,
			// 	containerClass: 'toast-custom'
			// });
    }
  },
  created() {
		this.getData();
    this.getData2();
    this.priceTime = this.currentDate();
    this.newsTime = this.currentDate();
  },
}
</script>
<style lang="scss" scoped>
.crypto {
  .inner{
    padding:70px 10px 46px;
    a{
      color:#333;
      text-decoration:none
    }
  }
  header {
    z-index:10;
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:64px;
    border-bottom:2px solid #2a3b52;
    background:#2e4564
  }
  h1 {
    margin:0;
    padding:24px 0 0;
    color:#fff;
    font-size:18px;
    text-align: center;
    text-transform:uppercase;
  }
  .tit {
    margin:0;
    text-transform:uppercase;
    padding:6px 0 15px;
    color:#333;
    font-size:16px;
    font-weight:700;
    text-align:left;
    span{
      display:inline-block;
      margin:0 4px 0 8px;
      font-weight:400;
      font-size:14px;
      &:after{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 4px;
        background:red;
        content: 'U';
        color: white;
        font-size: 14px;
        line-height: 18px;
        vertical-align: 0px;
        text-align: center;
      }
    }
  }
  .news_list {
    overflow: hidden;
    list-style-type: none;
    padding: 0;
    text-align: left;
    font-size: 12px;
    .news_item {
      display: block;
      text-align: left;
      a {
        display:flex;
        color:#42b983
      }
    }
    .news_info {
      margin: 0;
      text-align: left;
      dt{
        color:#0870b0;
        font-weight:700
      }
      dd{
        margin:0;
        p {
          margin: 0;
          color:#999;
        }
      }
    }
  }
  .news_thumbnail {
    width:60px;
    height:60px;
    margin-right:10px;
    img {
      max-width: none;
      height: 100%;
    }
  }
  .tbl_price {
    width:100%;
    margin-bottom:20px;
    table-layout:fixed;
    border-collapse:collapse;
    border-top:1px solid #ccc;
    text-align:center;
    font-size:12px;
    line-height:1.5;
    thead th{
      color:#369;
      border-bottom:3px solid #036;
      a{
        color:#369
      }
    }
    caption{
      position:absolute;
      left:0;
      top:0;
      width:1px;
      height:1px;
      font-size:0;
      line-height:0
    }
    tbody th,
    thead th {
      padding:10px;
      font-weight:700;
      vertical-align:top
    }
    tbody th{
      width:150px;
      border-bottom:1px solid #ccc;
      background:#f3f6f7
    }
    td{
      width:350px;
      vertical-align:top;
      border-bottom:1px solid #ccc;
      div{
        position:relative;
        height:100%;
        padding:10px 0
      }
    }
  }
  .active div:after {
    clear:both;
    content:"";
    display:block;
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background:#42b983;
    -webkit-animation:fadeinout .8s linear forwards;
    animation:fadeinout .8s linear forwards
  }
  .btn_more {
    position:fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 64px;
    padding: 2rem 0;
    border: 0;
    border-top: 2px solid #1b212f;
    background: #1d2943;
    font-size: 16px;
    margin: 0;
    color: #fff;
    z-index: 1;
  }
  .countdown {
    position: fixed;
    left: 0;
    top: 1px;
    width: 64px;
    height: 64px;
    background: none;
    font-size: 18px;
    text-align: center;
    line-height: 64px;
    color: #fff;
  }
  .btn_reload {
    display:block;
    position:absolute;
    top:1px;
    width:64px;
    height:64px;
    right:0;
    border:0;
    background:url(~assets/images/blog/crypto-vuejs/ico_reload.png) 50% 50% no-repeat;
    background-size:50% 50%;
    cursor:pointer;
    font-size: 0;
  }
  .toast-custom {
    right:60px!important;
    top:0!important
  }
  @-webkit-keyframes fadeinout {
    0%,to{opacity:0}50%{opacity:1}
  }
  @keyframes fadeinout {
    0%,to{opacity:0}50%{opacity:1}
  }
}
</style>
