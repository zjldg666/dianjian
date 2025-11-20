<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      <view v-if="loading" class="loading">
        正在加载数据...
      </view>
      <view v-else-if="detailData && detailData.dt.length > 0" class="detail-data">
        <p><strong>点检位置:</strong> {{ detailData.dt[0]['点检位置'] }}</p>
        <table>
          <thead>
            <tr>
              <th>点检项目</th>
              <th>点检内容</th>
              <th colspan="3">
                <button class="arrow-button" @click="prevHour" :disabled="isPrevDisabled">《</button>
                {{ selectedHour }}:00
                <button class="arrow-button" @click="nextHour" :disabled="isNextDisabled">》</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredDetailData" :key="index">
              <td>{{ item.点检项目 }}</td>
              <td>{{ item.点检内容 }}</td>
              <td>
                <button
                  v-if="item[selectedHourKey] === '1'"
                  class="status-button check"
                  @click="navigateToResult(item)"
                >
                  <image src="../../static/whiteIcon/wDui.png" class="DuiCuo"></image>
                </button>
                <button 
                  v-else-if="item[selectedHourKey] === '2'"
                  class="status-button cross"
                  @click="navigateToResult(item)"
                >
                  <image src="../../static/whiteIcon/wCuo.png" class="DuiCuo"></image>
                </button>
				<button
				  v-else-if="item[selectedHourKey] === '3'"
				  class="status-button quanx"
				  @click="navigateToResult(item)"
				>
				  <image src="../../static/whiteIcon/wQuanx.png" class="DuiCuo"></image>
				</button>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </view>
      <view v-else class="no-data">
        没有找到相关数据。
      </view>
    </view>
  </view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      username: uni.getStorageSync('username') || '',
      detailData: null,
      loading: true,
      selectedHour: 8, // 默认时间为8点
      minHour: 0,
      maxHour: 23
    };
  },
  computed: {
    selectedDate() {
      if (this.detailData && this.detailData.dt.length > 0) {
        const firstTimestamp = Object.keys(this.detailData.dt[0]).find(key => /^202[45]-\d{2}-\d{2}/.test(key));
        if (firstTimestamp) {
          return firstTimestamp.split(' ')[0];
        }
      }
      return '';
    },
    selectedHourKey() {
      if (this.selectedDate) {
        const key = `${this.selectedDate} ${this.selectedHour.toString().padStart(2, '0')}`;
        console.log('selectedHourKey:', key); // 添加调试信息
        return key;
      }
      return '';
    },
    filteredDetailData() {
      if (!this.detailData || !this.detailData.dt) return [];
      console.log('detailData.dt:', this.detailData.dt); // 添加调试信息
      console.log('selectedHourKey in filteredDetailData:', this.selectedHourKey); // 添加调试信息
      return this.detailData.dt.filter(item => item[this.selectedHourKey] !== undefined);
    },
    isPrevDisabled() {
      return this.selectedHour <= this.minHour;
    },
    isNextDisabled() {
      return this.selectedHour >= this.maxHour;
    }
  },
  methods: {
    async fetchDetail(position, time) {
      try {
        this.loading = true;
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({
            title: '未登录，请先登录',
            icon: 'none'
          });
          return;
        }

        const response = await uni.request({
          url: 'http://13.94.38.44:8080/CheckList/GetScanReport2New',
          method: 'POST',
          data: {
            token: token,
            time: time,
            Position: position
          }
        });

        const data = JSON.parse(response.data);
        if (!data.isError) {
          this.detailData = data;
          console.log('详细数据加载成功:', this.detailData); // 添加调试信息
          this.setInitialSelectedHour();
        } else {
          uni.showToast({
            title: '获取详细数据失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取详细数据失败', error);
        uni.showToast({
          title: '获取详细数据失败',
          icon: 'none'
        });
      } finally {
        this.loading = false;
      }
    },
    setInitialSelectedHour() {
      if (this.detailData && this.detailData.dt.length > 0) {
        const dataItem = this.detailData.dt[0];
        const timestamps = Object.keys(dataItem).filter(key => /^202[45]-\d{2}-\d{2}/.test(key)).sort();
        for (const timestamp of timestamps) {
          const value = dataItem[timestamp];
          if (value === '1' || value === '2') {
            const hour = parseInt(timestamp.split(' ')[1], 10);
            this.selectedHour = hour;
            break;
          }
        }
      }
    },
    prevHour() {
      if (this.selectedHour > this.minHour) {
        this.selectedHour--;
      }
    },
    nextHour() {
      if (this.selectedHour < this.maxHour) {
        this.selectedHour++;
      }
    },
    logout() {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    },
    navigateToResult(item) {
      console.log('navigateToResult called with selectedHourKey:', this.selectedHourKey); // 添加调试信息
      uni.navigateTo({
        url: `/pages/result/result?position=${this.detailData.dt[0]['点检位置']}&project=${item['点检项目']}&description=${item['点检内容']}&time=${this.selectedHourKey}:00`
      });
    }
  },
  onLoad(options) {
    const position = options.position;
    const time = options.time;
    if (position && time) {
      this.fetchDetail(decodeURIComponent(position), decodeURIComponent(time));
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
}

.loading {
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #888;
}

.no-data {
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #888;
}

.detail-data {
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #333;
}

.detail-data h2 {
  font-size: 40rpx;
  margin-bottom: 20rpx;
}

.detail-data p {
  margin: 10rpx 0;
}

.detail-data table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 40rpx;
}

.detail-data th, .detail-data td {
  border: 1px solid #ddd;
  padding: 16rpx;
  text-align: left;
}

.detail-data th {
  background-color: #f5f5f5;
}

.arrow-button {
  padding: 10rpx 20rpx;
  border: none;
  background-color: #007aff;
  color: white;
  border-radius: 10rpx;
  margin: 0 10rpx;
  cursor: pointer;
}

.arrow-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.status-button {
  padding: 10rpx 20rpx;
  border: none;
  color: white;
  border-radius: 10rpx;
  margin: 0 5rpx;
  cursor: pointer;
}

.check {
  background-color: green;
}

.cross {
  background-color: red;
}

.navigator-hover {
  opacity: 0.8;
}
.DuiCuo {
  width: 40rpx;
  height: 40rpx;
  
}

.quanx{
	background-color: orange;
}

</style>