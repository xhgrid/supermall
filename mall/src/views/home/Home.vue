<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" class="swiper"></home-swiper>
    <recomand-view :recomands="recommends"></recomand-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" class="tabControl"></tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
      <li>41</li>
      <li>42</li>
      <li>43</li>
      <li>44</li>
      <li>45</li>
      <li>46</li>
      <li>47</li>
      <li>48</li>
      <li>49</li>
      <li>50</li>
      <li>51</li>
      <li>52</li>
      <li>53</li>
      <li>54</li>
      <li>55</li>
      <li>56</li>
      <li>57</li>
      <li>58</li>
      <li>59</li>
      <li>60</li>
      <li>61</li>
      <li>62</li>
      <li>63</li>
      <li>64</li>
      <li>65</li>
      <li>66</li>
      <li>67</li>
      <li>68</li>
      <li>69</li>
      <li>70</li>
    </ul>
  </div>
</template>

<script>
// 子组件的导入
import HomeSwiper from './childComps/HomeSwiper'
import RecomandView from './childComps/RecomendView'
import FeatureView from './childComps/FeatureView'

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from '@/network/home'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecomandView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'news': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      }
    }
  },
  created () {
    // 1.请求轮播图等数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    // this.getHomeGoods('news')
    // this.getHomeGoods('sell')
  },
  methods: {
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.data.banner.list
        // console.log(this.banners)
        this.recommends = res.data.data.recommend.list
        // console.log(this.recommends)
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style>
#home {
  position: relative;
  width:100vw;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.swiper {
  margin-top: 22px;
}
.tabControl {
  position: sticky;
  top: 44px;
}
</style>
