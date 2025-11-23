<template>
  <view class="content">
    <view class="search-box">
      <input type="text" placeholder="搜索新闻..." v-model="searchQuery" class="search-input"/>
    </view>
	<view class="header-name">谭玉娇</view>
    <view class="uni-list">
      <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in filteredNews" :key="index" @tap="openinfo" :data-newsid="item.post_id">
        <view class="uni-media-list">
          <image class="uni-media-list-logo" :src="item.cover_image || '/static/back.jpg'" mode="aspectFill"></image>
          <view class="uni-media-list-body">
            <view class="uni-media-list-text-top">{{ item.title }}</view>
            <view class="uni-media-list-text-bottom uni-ellipsis">{{ item.created_at }}</view>
          </view>
        </view>
      </view>
      <view v-if="filteredNews.length === 0 && searchQuery" class="empty">无相关新闻</view>
      <view v-if="!news.length && !searchQuery" class="empty">暂无新闻</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      searchQuery: '',
      loading: true
    };
  },
  onLoad() {
    this.loadNews();
  },
  methods: {
    loadNews() {
      uni.showLoading({ title: "加载中..." });
      uni.request({
        url: 'https://unidemo.dcloud.net.cn/api/news',
        success: res => {
          if (Array.isArray(res.data)) {
            this.news = res.data;
          } else {
            this.news = [];
          }
          uni.hideLoading();
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({ title: '加载失败', icon: 'none' });
        }
      });
    },
    openinfo(e) {
      const newsid = e.currentTarget.dataset.newsid;
      uni.navigateTo({
        url: '../info/info?newsid=' + newsid
      });
    }
  },
  computed: {
    filteredNews() {
      if (!this.searchQuery.trim()) {
        return this.news;
      }
      const keyword = this.searchQuery.toLowerCase();
      return (this.news || []).filter(item => {
        if (!item || !item.title) return false;
        return item.title.toLowerCase().includes(keyword);
      });
    }
  }
};
</script>

<style>
.uni-media-list-logo {
  width: 60rpx;
  height: 60rpx;
}
.uni-media-list-body {
  height: auto;
}
.uni-media-list-text-top {
  line-height: 1.6em;
}
.uni-media-list-text-bottom{
	font-size: 20rpx;
	padding: 5rpx;
}
.search-box {
  padding: 20rpx;
  background-color: #f8f8f8;
}
.search-input {
  width: 100%;
  height: 60rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  border: 1rpx solid #ddd;
  box-sizing: border-box;
}
.empty {
  text-align: center;
  padding: 40rpx;
  color: #999;
}
.header-name{
	padding: 20rpx 20rpx;
}
</style>