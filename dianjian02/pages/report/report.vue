<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      <view class="date-picker-container">
        <button class="arrow-button" @click="prevDay" :disabled="isPrevDisabled">《</button>
        <picker mode="date" :value="selectedDate" :end="currentDate" @change="handleDateChange">
          <view class="picker">
            当前选择: {{ selectedDate }}
          </view>
        </picker>
        <button class="arrow-button" @click="nextDay" :disabled="isNextDisabled">》</button>
      </view>
      <view v-if="loading" class="loading">
        正在加载报表数据...
      </view>
      <view v-else-if="reportData && reportData.dt.length > 0" class="report-data">
        <table>
          <thead>
            <tr>
              <th>点检位置</th>
              <th v-for="(day, index) in displayedDates" :key="index">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in reportData.dt" :key="item.点检位置">
              <td>{{ item.点检位置 }}</td>
              <td v-for="(day, index) in displayedDates" :key="index">
                <navigator 
                  v-if="item[day] === '1'" 
                  :url="`/pages/detail/detail?position=${item.点检位置}&time=${day}`"
                  hover-class="navigator-hover"
                >
                  <button class="check-button">
                    <image src="../../static/dui.png" class="DuiCuo"></image>
                  </button>
                </navigator>
                <navigator 
                  v-else-if="item[day] === '2'" 
                  :url="`/pages/detail/detail?position=${item.点检位置}&time=${day}`"
                  hover-class="navigator-hover"
                >
                  <button class="check-button">
                    <image src="../../static/cuo.png" class="DuiCuo"></image>
                  </button>
                </navigator>
                <span v-else class="centered-span">{{ item[day] || '-' }}</span>
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
import { ref, onMounted, watch } from 'vue';

export default {
  components: {
    Navbar
  },
  setup() {
    const username = ref(uni.getStorageSync('username') || '');
    const reportData = ref(null);
    const loading = ref(true);
    const selectedDate = ref(new Date().toISOString().split('T')[0]);
    const currentDate = new Date().toISOString().split('T')[0];

    const fetchReport = async (date) => {
      try {
        loading.value = true; // 开始加载数据时设置为 true
        const token = uni.getStorageSync('token'); // 获取存储的 token
        if (!token) {
          uni.showToast({
            title: '未登录，请先登录',
            icon: 'none'
          });
          return;
        }

        const response = await uni.request({
          url: 'http://13.94.38.44:8080/CheckList/GetScanReport1New',
          method: 'POST',
          data: {
            token: token,
            time: date
          }
        });

        
        const data = JSON.parse(response.data);
        if (!data.isError) {
          reportData.value = data; // 存储报表数据
          console.log('报表数据加载成功:', reportData.value);
        } else {
          uni.showToast({
            title: '获取报表失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取报表失败', error);
        uni.showToast({
          title: '获取报表失败',
          icon: 'none'
        });
      } finally {
        loading.value = false; // 加载完成时设置为 false
      }
    };

    const handleDateChange = (event) => {
      selectedDate.value = event.detail.value;
      fetchReport(selectedDate.value);
    };

    const prevDay = () => {
      const prevDate = new Date(selectedDate.value);
      prevDate.setDate(prevDate.getDate() - 1);
      selectedDate.value = prevDate.toISOString().split('T')[0];
      fetchReport(selectedDate.value);
    };

    const nextDay = () => {
      const nextDate = new Date(selectedDate.value);
      nextDate.setDate(nextDate.getDate() + 1);
      selectedDate.value = nextDate.toISOString().split('T')[0];
      fetchReport(selectedDate.value);
    };

    const isPrevDisabled = ref(false);
    const isNextDisabled = ref(false);

    watch(selectedDate, (newDate) => {
      isPrevDisabled.value = newDate <= '2000-01-01'; // 禁止往前选择到某个日期之前
      isNextDisabled.value = newDate >= currentDate;
      displayedDates.value = getDisplayedDates(newDate);
    }, { immediate: true });

    onMounted(() => {
      fetchReport(selectedDate.value); // 在页面加载时请求报表数据
    });

    const logout = () => {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    };

    const getDisplayedDates = (date) => {
      const currentDate = new Date(date);
      const dates = [];
      for (let i = 0; i <= 2; i++) { // 显示当前日期及后两天
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - i);
        dates.push(newDate.toISOString().split('T')[0]);
      }
      return dates.sort((a, b) => new Date(b) - new Date(a)); // 按降序排序
    };

    const displayedDates = ref(getDisplayedDates(selectedDate.value));

    return {
      username,
      reportData,
      loading,
      selectedDate,
      currentDate,
      displayedDates,
      handleDateChange,
      prevDay,
      nextDay,
      isPrevDisabled,
      isNextDisabled,
      logout
    };
  }
}
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

.date-picker-container {
  margin-bottom: 40rpx;
  display: flex;
  align-items: center;
}

.arrow-button {
  padding: 20rpx;
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

.picker {
  padding: 20rpx;
  border: 1px solid #ccc;
  border-radius: 10rpx;
  width: 300rpx;
  text-align: center;
}

.report-data table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 40rpx;
}

.report-data th, .report-data td {
  border: 1px solid #ddd;
  padding: 16rpx;
  text-align: left;
}

.report-data th {
  background-color: #f5f5f5;
}

.check-button {
  padding: 5rpx 10rpx;
  border: none;
  border-radius: 5rpx;
  cursor: pointer;
}

.DuiCuo {
  width: 20rpx;
  height: 20rpx;
}

.centered-span {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 确保高度一致 */
}

.navigator-hover {
  opacity: 0.8;
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
</style>



