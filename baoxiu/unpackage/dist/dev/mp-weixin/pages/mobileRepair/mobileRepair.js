"use strict";
const common_vendor = require("../../common/vendor.js");
const Navbar = () => "../../components/Navbar.js";
const _sfc_main = {
  components: {
    Navbar
  },
  data() {
    return {
      username: "",
      searchQuery: "",
      assetsList: [],
      selectedAsset: "",
      currentPage: 1,
      pageSize: 10,
      loading: false,
      hasMoreData: true
    };
  },
  // 通过搜索，过滤信息
  computed: {
    filteredAssets() {
      return this.assetsList.filter(
        (asset) => asset.资产编号 && asset.资产编号.includes(this.searchQuery) || asset.资产名称 && asset.资产名称.includes(this.searchQuery)
      ).slice(0, this.currentPage * this.pageSize);
    },
    selectedAssetInfo() {
      return this.assetsList.find((asset) => asset.资产编号 === this.selectedAsset);
    }
  },
  onLoad() {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo && userInfo.username) {
      this.username = userInfo.username;
    }
    this.fetchAssets();
  },
  methods: {
    fetchAssets(reset = false) {
      if (reset) {
        this.assetsList = [];
        this.currentPage = 1;
        this.hasMoreData = true;
      }
      if (!this.hasMoreData || this.loading)
        return;
      this.loading = true;
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!userInfo.token || !userInfo.connid) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        this.loading = false;
        return;
      }
      common_vendor.index.request({
        url: "http://13.94.38.44:8000/AssetsRepair/GetAllCode",
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          connid: userInfo.connid,
          token: userInfo.token,
          search: this.searchQuery,
          isEdit: true,
          page: this.currentPage,
          size: this.pageSize
        }),
        success: (response) => {
          const result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
          console.log(result);
          if (!result.IsError) {
            if (result.list.length > 0) {
              this.assetsList = reset ? result.list : [...this.assetsList, ...result.list];
              this.currentPage++;
            } else {
              this.hasMoreData = false;
            }
          } else {
            common_vendor.index.showToast({
              title: "获取资产信息失败",
              icon: "none"
            });
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "请求失败，请检查网络连接",
            icon: "none"
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    },
    handleSearchInput() {
      this.fetchAssets(true);
    },
    toggleSelection(item) {
      if (this.selectedAsset === item.资产编号) {
        this.selectedAsset = "";
      } else {
        this.selectedAsset = item.资产编号;
      }
    },
    submitRepair() {
      if (!this.selectedAsset) {
        common_vendor.index.showToast({
          title: "请选择一个资产",
          icon: "none"
        });
        return;
      }
      const { 资产编号, 资产名称 } = this.selectedAssetInfo;
      console.log(this.selectedAssetInfo);
      common_vendor.index.request({
        url: "http://13.94.38.44:8000/AssetsRepair/GetAssetsInfoByCode",
        // 假设这是提交报修的API地址
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          connid: common_vendor.index.getStorageSync("userInfo").connid,
          AssetsCode: 资产编号,
          token: common_vendor.index.getStorageSync("userInfo").token
        }),
        success: (response) => {
          const result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
          console.log(result);
          if (!result.IsError) {
            common_vendor.index.navigateTo({
              url: `/pages/repair/repair?data=${encodeURIComponent(JSON.stringify(result))}`
            });
          } else {
            common_vendor.index.showToast({
              title: "获取资产信息失败",
              icon: "none"
            });
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "请求失败，请检查网络连接",
            icon: "none"
          });
        }
      });
    },
    loadMore() {
      this.fetchAssets();
    },
    logout() {
      common_vendor.index.removeStorageSync("userInfo");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    }
  }
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  _component_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.logout),
    b: common_vendor.p({
      username: $data.username
    }),
    c: common_vendor.o([($event) => $data.searchQuery = $event.detail.value, (...args) => $options.handleSearchInput && $options.handleSearchInput(...args)]),
    d: $data.searchQuery,
    e: common_vendor.f($options.filteredAssets, (item, index, i0) => {
      return {
        a: $data.selectedAsset === item.资产编号 ? 1 : "",
        b: $data.selectedAsset !== item.资产编号 ? 1 : "",
        c: common_vendor.t(item.资产编号),
        d: common_vendor.t(item.资产名称),
        e: index,
        f: common_vendor.o(($event) => $options.toggleSelection(item), index),
        g: $data.selectedAsset === item.资产编号 ? 1 : ""
      };
    }),
    f: $data.loading
  }, $data.loading ? {} : {}, {
    g: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    h: !$data.selectedAsset,
    i: common_vendor.o((...args) => $options.submitRepair && $options.submitRepair(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1214ae1c"]]);
wx.createPage(MiniProgramPage);
