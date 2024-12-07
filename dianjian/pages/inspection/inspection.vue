<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      
      <!-- 使用按钮组组件 -->
      <button-group :buttons="buttons"/>
    </view>
  </view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';

export default {
  components: {
    Navbar,
    ButtonGroup
  },
  data() {
    return {
      username: uni.getStorageSync('username') || '',
      buttons: [] // 用于存储点检项目的按钮数据
    };
  },
  onLoad() {
    // 获取对应的点检项目
    this.getInspectionItems();
  },
   onPullDownRefresh() {
      // 处理下拉刷新
      this.getInspectionItems(() => {
        uni.stopPullDownRefresh(); // 停止下拉刷新动作
      });
    },
  methods: {
    getInspectionItems(callback) {
      const token = uni.getStorageSync('token'); // 从本地存储获取 token
      const clientCode = uni.getStorageSync('clientcode'); // 从本地存储获取客户编码
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetAllCheckListByClientCode',
        method: 'POST',
        data: {
          code: clientCode, // 使用存储的客户编码
          token: token
        },
        success: (res) => {
          const data = JSON.parse(res.data); // 解析 JSON 数据
          console.log("token:",token);
		  if (!data.isError) {
            // 解析返回的数据，并生成按钮数据
            this.buttons = data.list.map(item => ({
              label: item.SEL_ShuoMing,
              action: () => this.goToDetail(item.SEL_TXT,item.SEL_ShuoMing)
            }));
            console.log('点检项目加载成功:', this.buttons);
          } else {
            console.error('加载点检项目失败:', data.message);
          }if(callback) callback();//停止刷新动作
        },
        fail: (err) => {
          console.error('加载点检项目失败', err);
			if(callback) callback();//停止刷新动作
        }
      });
    },
    goToDetail(selTxt,selShuoMing) {
      // 跳转到巡查点详情页面，传递 selTxt和selShuoMINg
      uni.navigateTo({
        url: `/pages/detail/detail?selTxt=${selTxt}&&selShuoMing=${selShuoMing}`
      });
    },
    logout() {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    }
  }
}
</script>

<style>
/* 容器样式 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color:white;
}
/* 内容样式 */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
/* 标题样式 */
.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}
</style>
