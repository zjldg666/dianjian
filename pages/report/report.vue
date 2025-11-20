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
              <th>区域描述</th>
              <th>点检位置</th>
              <th>三级负责人</th>
              <th>{{ selectedDate }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in reportData.dt" :key="item.点检位置">
              <td>{{ item['区域描述'] }}</td>
              <td>{{ item['点检位置'] }}</td>
              <td>{{ item['区域负责人'] }}</td>
              <td>
                <navigator 
                  v-if="item[selectedDate] === '1'" 
                  :url="`/pages/detail/detail?position=${encodeURIComponent(item['点检位置'])}&time=${selectedDate}`"
                  hover-class="navigator-hover"
                >
                  <button class="check-button">
                    <image src="../../static/dui.png" class="DuiCuo"></image>
                  </button>
                </navigator>
                <navigator 
                  v-else-if="item[selectedDate] === '2'" 
                  :url="`/pages/detail/detail?position=${encodeURIComponent(item['点检位置'])}&time=${selectedDate}`"
                  hover-class="navigator-hover"
                >
                  <button class="check-button">
                    <image src="../../static/cuo.png" class="DuiCuo"></image>
                  </button>
                </navigator>
                <navigator 
                  v-else-if="item[selectedDate] === '3'" 
                  :url="`/pages/detail/detail?position=${encodeURIComponent(item['点检位置'])}&time=${selectedDate}`"
                  hover-class="navigator-hover"
                >
                  <button class="check-button">
                    <image src="../../static/quanx.png" class="DuiCuo"></image>
                  </button>
                </navigator>
                <span v-else class="centered-span"><strong>{{ item[selectedDate] || '-' }}</strong></span>
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

    // 缓存已加载的月份数据
    const cachedMonthData = ref({});

    // 获取某个月的第一天
    const getFirstDayOfMonth = (date) => {
      const [year, month] = date.split('-');
      return `${year}-${month}-01`;
    };

    // 获取月份标识（年-月格式）
    const getMonthKey = (date) => {
      const [year, month] = date.split('-');
      return `${year}-${month}`;
    };

    // 获取报表数据
    const fetchReport = async (date) => {
      try {
        loading.value = true;

        const monthKey = getMonthKey(date);
        const monthRequestDate = getFirstDayOfMonth(date);

        // 检查缓存中是否存在该月份的数据
        if (cachedMonthData.value[monthKey]) {
          // 如果缓存中有数据，直接使用
          reportData.value = cachedMonthData.value[monthKey];
          console.log(`使用缓存的${monthKey}月份数据`);
          return;
        }

        const token = uni.getStorageSync('token');
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
           data:{
            token: token,
            time: monthRequestDate
          }
        });

        const data = JSON.parse(response.data);
        if (!data.isError) {
          // 缓存该月份的数据
          cachedMonthData.value[monthKey] = data;
          reportData.value = data;
          console.log(`报表数据加载成功并缓存: ${monthKey}`, reportData.value);
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
        loading.value = false;
      }
    };

    // 处理日期选择变化
    const handleDateChange = (event) => {
      const newDate = event.detail.value;
      selectedDate.value = newDate;
      
      const monthKey = getMonthKey(newDate);
      const monthRequestDate = getFirstDayOfMonth(newDate);
      
      // 检查缓存中是否存在该月份的数据
      if (cachedMonthData.value[monthKey]) {
        reportData.value = cachedMonthData.value[monthKey];
      } else {
        fetchReport(monthRequestDate);
      }
    };

    // 上一天
    const prevDay = () => {
      const prevDate = new Date(selectedDate.value);
      prevDate.setDate(prevDate.getDate() - 1);
      const formattedDate = prevDate.toISOString().split('T')[0];
      
      selectedDate.value = formattedDate;
      const monthKey = getMonthKey(formattedDate);
      const monthRequestDate = getFirstDayOfMonth(formattedDate);
      
      // 检查缓存中是否存在该月份的数据
      if (cachedMonthData.value[monthKey]) {
        reportData.value = cachedMonthData.value[monthKey];
      } else {
        fetchReport(monthRequestDate);
      }
    };

    // 下一天
    const nextDay = () => {
      const nextDate = new Date(selectedDate.value);
      nextDate.setDate(nextDate.getDate() + 1);
      const formattedDate = nextDate.toISOString().split('T')[0];
      
      selectedDate.value = formattedDate;
      const monthKey = getMonthKey(formattedDate);
      const monthRequestDate = getFirstDayOfMonth(formattedDate);
      
      // 检查缓存中是否存在该月份的数据
      if (cachedMonthData.value[monthKey]) {
        reportData.value = cachedMonthData.value[monthKey];
      } else {
        fetchReport(monthRequestDate);
      }
    };

    const isPrevDisabled = ref(false);
    const isNextDisabled = ref(false);

    // 监听 selectedDate 的变化
    watch(selectedDate, (newDate) => {
      isPrevDisabled.value = newDate <= '2020-01-01'; // 禁止往前选择到某个日期之前
      isNextDisabled.value = newDate >= currentDate;
    }, { immediate: true });

    onMounted(() => {
      // 初始化加载当前日期的数据
      const monthKey = getMonthKey(selectedDate.value);
      const monthRequestDate = getFirstDayOfMonth(selectedDate.value);
      fetchReport(monthRequestDate);
    });

    const logout = () => {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    };

    return {
      username,
      reportData,
      loading,
      selectedDate,
      currentDate,
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
  padding: 20rpx;
  box-sizing: border-box;
}

.date-picker-container {
  margin-bottom: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.arrow-button {
  padding: 20rpx 30rpx;
  border: none;
  background-color: #007aff;
  color: white;
  border-radius: 10rpx;
  margin: 0 10rpx;
  cursor: pointer;
  font-size: 36rpx;
  min-width: 80rpx;
  text-align: center;
}

.arrow-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}

.picker {
  padding: 20rpx;
  border: 1px solid #ddd;
  border-radius: 10rpx;
  width: 300rpx;
  text-align: center;
  font-size: 32rpx;
  background-color: #f9f9f9;
  color: #333;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.1);
}

.report-data table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 40rpx;
  border: 1px solid #ddd;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  overflow: hidden;
  border-radius: 12rpx;
  background-color: #fff;
}

.report-data th, .report-data td {
  border: 1px solid #eee;
  padding: 24rpx 4rpx;
  text-align: center; /* 所有内容居中 */
  vertical-align: middle;
  font-size: 32rpx;
  word-break: break-all;
  overflow-wrap: break-word;
}

.report-data th {
  background-color: #f5f5f5;
  font-weight: bold;
  font-size: 34rpx;
  padding: 24rpx 4rpx;
  position: relative;
}

/* 设置各列宽度 */
.report-data th:nth-child(1),
.report-data td:nth-child(1) {
  width: 15%; /* 区域描述 */
  min-width: 120rpx;
}

.report-data th:nth-child(2),
.report-data td:nth-child(2) {
  width: 35%; /* 点检位置 */
  min-width: 200rpx;
}

.report-data th:nth-child(3),
.report-data td:nth-child(3) {
  width: 15%; /* 区域负责人 */
  min-width: 120rpx; /* 至少容纳3个汉字 */
  white-space: nowrap; /* 防止换行 */
}

.report-data th:nth-child(4),
.report-data td:nth-child(4) {
  width: 15%; /* 日期列 */
  min-width: 100rpx;
}

.check-button {
  padding: 5rpx 10rpx;
  border: none;
  border-radius: 8rpx;
  cursor: pointer;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.check-button:hover {
  transform: scale(1.1);
  background-color: #e6f2ff;
}

.DuiCuo {
  width: 36rpx;
  height: 36rpx;
  display: block;
}

.centered-span {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-weight: bold;
  color: #666;
}

.navigator-hover {
  opacity: 0.8;
  background-color: #f0f0f0;
  border-radius: 8rpx;
}

.loading {
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #888;
  text-align: center;
}

.no-data {
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #888;
  text-align: center;
}

/* 响应式适配小屏幕 */
@media screen and (max-width: 768px) {
  .report-data th, .report-data td {
    padding: 16rpx 0rpx;
    font-size: 28rpx;
  }
  
  .picker {
    width: 240rpx;
    font-size: 28rpx;
  }
  
  .arrow-button {
    padding: 16rpx 20rpx;
    font-size: 28rpx;
  }
}
</style>