"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      news: [],
      searchQuery: "",
      loading: true
    };
  },
  onLoad() {
    this.loadNews();
  },
  methods: {
    loadNews() {
      common_vendor.index.showLoading({ title: "加载中..." });
      common_vendor.index.request({
        url: "https://unidemo.dcloud.net.cn/api/news",
        success: (res) => {
          if (Array.isArray(res.data)) {
            this.news = res.data;
          } else {
            this.news = [];
          }
          common_vendor.index.hideLoading();
        },
        fail: () => {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({ title: "加载失败", icon: "none" });
        }
      });
    },
    openinfo(e) {
      const newsid = e.currentTarget.dataset.newsid;
      common_vendor.index.navigateTo({
        url: "../info/info?newsid=" + newsid
      });
    }
  },
  computed: {
    filteredNews() {
      if (!this.searchQuery.trim()) {
        return this.news;
      }
      const keyword = this.searchQuery.toLowerCase();
      return (this.news || []).filter((item) => {
        if (!item || !item.title)
          return false;
        return item.title.toLowerCase().includes(keyword);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.searchQuery,
    b: common_vendor.o(($event) => $data.searchQuery = $event.detail.value),
    c: common_vendor.f($options.filteredNews, (item, index, i0) => {
      return {
        a: item.cover_image || "/static/back.jpg",
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.created_at),
        d: index,
        e: common_vendor.o((...args) => $options.openinfo && $options.openinfo(...args), index),
        f: item.post_id
      };
    }),
    d: $options.filteredNews.length === 0 && $data.searchQuery
  }, $options.filteredNews.length === 0 && $data.searchQuery ? {} : {}, {
    e: !$data.news.length && !$data.searchQuery
  }, !$data.news.length && !$data.searchQuery ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
