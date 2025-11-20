<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      <view v-if="loading" class="loading">
        正在加载数据...
      </view>
      <view v-else-if="resultData && resultData.list.length > 0">
        <view class="header">{{ resultData.list[0].Position }}</view>
        <view class="detail-item">
          <text class="label">点检项目:</text>
          <text class="value">{{ resultData.list[0].Project }}</text>
        </view>
        <view class="detail-item">
          <text class="label">点检内容:</text>
          <text class="value">{{ resultData.list[0].Description }}</text>
        </view>
        <view class="detail-item">
          <text class="label">点检结果:</text>
          <text class="value">
            <span v-if="resultData.list[0].Result === '1'"><image src="../../static/dui.png" class="Fuhao"></image></span> <!-- √ -->
            <span v-else-if="resultData.list[0].Result === '3'"><image src="../../static/NT.png" class="Fuhao"></image></span> <!-- ⊗ -->
            <span v-else-if="resultData.list[0].Result === '2'"><image src="../../static/cuo.png" class="Fuhao"></image></span> <!-- × -->
          </text>
        </view>
        <view class="detail-item">
          <text class="label">点检说明:</text>
          <text class="value">{{ resultData.list[0].Remark }}</text>
        </view>
        <view class="detail-item">
          <text class="label">点检人:</text>
          <text class="value">{{ resultData.list[0].Person }}</text>
        </view>
        <view class="detail-item">
          <text class="label">点检时间:</text>
          <text class="value">{{ resultData.list[0].Time1 }}</text>
        </view>
        <view class="detail-item">
          <text class="label">设备时间:</text>
          <text class="value">{{ resultData.list[0].Time3 }}</text>
        </view>
        
        <view class="images-container">
          <image 
            v-for="(image, index) in resultData.list[0].FileLists || []" 
            :key="index" 
            :src="'data:image/png;base64,' + image" 
            class="image"
            @click="previewImage(index)"
          ></image>
        </view>
      </view>
      <view v-else-if="!loading" class="no-data">
        没有找到相关数据。
      </view>
    </view>
    <image-viewer 
      :is-preview-visible="isPreviewVisible" 
      :current-image="currentDetail?.FileLists[currentPreviewIndex] || ''" 
      @update:is-preview-visible="isPreviewVisible = $event"
    />
  </view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ImageViewer from '@/components/ImageViewer.vue';

export default {
  components: {
    Navbar,
    ImageViewer
  },
  data() {
    return {
      username: uni.getStorageSync('username') || '',
      resultData: null,
      loading: true,
      isPreviewVisible: false,
      currentPreviewIndex: 0
    };
  },
  computed: {
    currentDetail() {
      return this.resultData ? this.resultData.list[0] : {};
    }
  },
  methods: {
    async fetchResult(position, project, description, time) {
      try {
        uni.showLoading({
          title: '加载中...'
        });

        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({
            title: '未登录，请先登录',
            icon: 'none'
          });
          return;
        }

        const response = await uni.request({
          url: 'http://13.94.38.44:8080/CheckList/GetScanReport3New',
          method: 'POST',
          data: {
            token: token,
            time: time,
            Position: position,
            Project: project,
            Description: description
          }
        });

       
        const data = JSON.parse(response.data);
        if (!data.isError) {
          this.resultData = data;
          console.log('更新状态成功:', this.resultData);
        } else {
          uni.showToast({
            title: '更新状态失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('更新状态失败', error);
        uni.showToast({
          title: '更新状态失败',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
        this.loading = false;
      }
    },
    logout() {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    },
    previewImage(index) {
      this.currentPreviewIndex = index;
      this.isPreviewVisible = true;
    }
  },
  onLoad(options) {
    const position = decodeURIComponent(options.position);
    const project = decodeURIComponent(options.project);
    const description = decodeURIComponent(options.description);
    const time = decodeURIComponent(options.time);
    if (position && project && description && time) {
      this.fetchResult(position, project, description, time);
    } else {
      uni.showToast({
        title: '缺少参数',
        icon: 'none'
      });
      uni.navigateBack(); // 返回上一页
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}

.content {
  flex: 1;
  padding: 40rpx;
}

.header {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.detail-item {
  margin-bottom: 20rpx;
}

.label {
  font-weight: bold;
  margin-right: 20rpx;
}

.images-container {
  position: relative;
  display: inline-block;
  margin: 20rpx;
}

.image {
  width: 160rpx;
  height: 160rpx;
  margin-right: 20rpx;
  cursor: pointer;
}

.no-data {
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #888;
}

/* 图标样式 */
.Fuhao {
  width: 25rpx;
  height: 25rpx;
}

.loading {
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #888;
}
</style>