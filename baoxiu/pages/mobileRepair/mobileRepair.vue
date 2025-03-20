<template>
  <view class="container">
	  
	  <navbar :username="username" @logout="logout"/>
	  <view class="content">
		  <input
		    type="text" 
		    v-model="searchQuery" 
		    placeholder="请输入搜索内容"
		    @input="handleSearchInput"
		    class="search-input"
		  />
		  
		  <!-- 表格内容 -->
		  <scroll-view scroll-y class="table-container" @scrolltolower="loadMore">
		    <view class="table-header">
		      <view class="header-cell">选择</view>
		      <view class="header-cell">资产编码</view>
		      <view class="header-cell">资产名称</view>
		    </view>
		    <view 
		      class="table-row" 
		      v-for="(item, index) in filteredAssets" 
		      :key="index"
		      @click="toggleSelection(item)"
		      :class="{ 'selected': selectedAsset === item.资产编号 }"
		    >
		      <view class="cell">
		        <view :class="{ 'radio-checked': selectedAsset === item.资产编号, 'radio-unchecked': selectedAsset !== item.资产编号 }"></view>
		      </view>
		      <view class="cell">{{ item.资产编号 }}</view>
		      <view class="cell">{{ item.资产名称 }}</view>
		    </view>
		    <view v-if="loading" class="loading-indicator">加载中...</view>
		  </scroll-view>
		  <button 
		    class="repair-button" 
		    :disabled="!selectedAsset" 
		    @click="submitRepair"
		  >
		    确定报修
		  </button>
		  
	  </view>
    <!-- 搜索框 -->

  </view>
</template>

<script>
	import Navbar from '@/components/Navbar.vue'
	
export default {
	components:{
		Navbar
	},
  data() {
    return {
		username:'',
      searchQuery: '',
      assetsList: [],
      selectedAsset: '',
      currentPage: 1,
      pageSize: 10,
      loading: false,
      hasMoreData: true
    };
  },
  // 通过搜索，过滤信息
  computed: {
    filteredAssets() {
      return this.assetsList.filter(asset => 
        (asset.资产编号 && asset.资产编号.includes(this.searchQuery)) || 
        (asset.资产名称 && asset.资产名称.includes(this.searchQuery))
      ).slice(0, this.currentPage * this.pageSize);
    },
    selectedAssetInfo() {
      return this.assetsList.find(asset => asset.资产编号 === this.selectedAsset);
    }
  },
  
  onLoad() {
	  // 当页面加载时尝试从本地存储获取用户名
	  const userInfo = uni.getStorageSync('userInfo');
	  if (userInfo && userInfo.username) {
	    this.username = userInfo.username;
	  };
    this.fetchAssets();
  },
  methods: {
    fetchAssets(reset = false) {
      if (reset) {
        this.assetsList = [];
        this.currentPage = 1;
        this.hasMoreData = true;
      }

      if (!this.hasMoreData || this.loading) return;

      this.loading = true;
      const userInfo = uni.getStorageSync('userInfo');
      if (!userInfo.token || !userInfo.connid) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        this.loading = false;
        return;
      }

      uni.request({
        url: 'http://13.94.38.44:8000/AssetsRepair/GetAllCode',
        method: 'POST',
        header: {
          'content-type': 'application/json'
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
          const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
		  console.log(result);
          if (!result.IsError) {
            if (result.list.length > 0) {
              this.assetsList = reset ? result.list : [...this.assetsList, ...result.list];
              this.currentPage++;
            } else {
              this.hasMoreData = false;
            }
          } else {
            uni.showToast({
              title: '获取资产信息失败',
              icon: 'none'
            });
          }
        },
        fail: () => {
          uni.showToast({
            title: '请求失败，请检查网络连接',
            icon: 'none'
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
        this.selectedAsset = ''; // 取消选择
      } else {
        this.selectedAsset = item.资产编号; // 选择新项
      }
    },
	
	
    submitRepair() {
      if (!this.selectedAsset) {
        uni.showToast({
          title: '请选择一个资产',
          icon: 'none'
        });
        return;
      }

      const { 资产编号, 资产名称 } = this.selectedAssetInfo;
	
	  console.log(this.selectedAssetInfo)
      // 确认报修，拿到资产相应的数据，之后再跳转到repair页面
      uni.request({
        url: 'http://13.94.38.44:8000/AssetsRepair/GetAssetsInfoByCode', // 假设这是提交报修的API地址
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          connid: uni.getStorageSync('userInfo').connid,
		  AssetsCode: 资产编号,
          token: uni.getStorageSync('userInfo').token, 
        }),
        success: (response) => {
          const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
		  console.log(result)
		  if (!result.IsError) {
		    // 将资产信息作为参数传递给repair页面
		  // 修改 mobileRepair 页面的跳转代码
		  uni.navigateTo({
		    url: `/pages/repair/repair?data=${encodeURIComponent(JSON.stringify(result))}`
		  });
			
		  } else {
		    uni.showToast({
		      title: '获取资产信息失败',
		      icon: 'none'
		    });
		  }
  
        },
        fail: () => {
          uni.showToast({
            title: '请求失败，请检查网络连接',
            icon: 'none'
          });
        }
      });
    },
    loadMore() {
      this.fetchAssets();
    },	
	logout (){
	  uni.removeStorageSync('userInfo'); // 修改为移除整个userInfo缓存
	  uni.redirectTo({
	    url: '/pages/login/login'
	  });
	}
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}

.content{
	width: 90%;
	max-width: 800rpx; 
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx;
}
.search-input {
  width: 90%;
  padding: 20rpx;
  margin-bottom: 20rpx;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
}

.table-container {
  height: 1100rpx /* 调整高度以适应按钮 */
}

.table-header {
  display: flex;
  background-color: #f5f5f5;
  padding: 10rpx;
  font-weight: bold;
}

.header-cell {
  flex: 1;
  text-align: center;
}

.table-row {
  display: flex;
  padding: 10rpx;
  border-bottom: 1rpx solid #ddd;
}

.cell {
  flex: 1;
  text-align: center;
}

.loading-indicator {
  text-align: center;
  padding: 20rpx;
}

.repair-button {
  width: 100%;
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 10rpx;
  font-size: 30rpx;
}

.repair-button:disabled {
  background-color: #cccccc;
}

.selected {
  background-color: #e0f7fa;
}

.radio-checked::before {
  content: '●';
  color: #1aad19;
}

.radio-unchecked::before {
  content: '○';
  color: #ccc;
}
</style>



