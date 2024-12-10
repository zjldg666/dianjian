<template>
  <view class="container">
    <!-- 导航栏组件 -->
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      <!-- 按钮组组件 -->
      <button-group :buttons="Menubuttons"/>
    </view>
  </view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import { ref, onMounted } from 'vue';
import { scanAndNavigate } from '@/utils/scanAndNavigate.js';

export default {
  components: {
    Navbar,
    ButtonGroup
  },
  setup() {
    const username = ref(uni.getStorageSync('username') || '');
    const Menubuttons = ref([]);
    const positions = ref([]);

    // 定义所有需要的函数
    const goToInspection = () => {
      uni.navigateTo({
        url: '/pages/inspection/inspection'
      });
    };

    const goToForm = (formName) => {
      switch (formName) {
        case 'frmMyChcek':
          uni.navigateTo({
            url: '/pages/Mydianjian/Mydianjian'
          });
          break;
        case 'frmScanCode':
          handleHomeScan();
          break;
        case 'frmRemind':
          uni.navigateTo({
            url: '/pages/remind/remind'
          });
          break;
        case 'frmCheckListReport':
          uni.navigateTo({
            url: '/pages/report/report'
          });
          break;
        case 'frmCheckPlan':
          uni.navigateTo({
            url: '/pages/plan/plan'
          });
          break;
        case 'frmCheckConfig':
          uni.navigateTo({
            url: '/pages/config/config'
          });
          break;
        default:
          console.warn(`未知的表单名称: ${formName}`);
          uni.showToast({
            title: '无效的表单名称',
            icon: 'none'
          });
      }
    };

    const fetchPositions = async () => {
      try {
        const token = uni.getStorageSync('token'); // 确保在此处获取 token
        if (!token) {
          uni.showToast({
            title: '未登录，请先登录',
            icon: 'none'
          });
          return;
        }

        const response = await uni.request({
          url: 'http://13.94.38.44:8080/CheckList/GetPositionByPerson',
          method: 'POST',
          data: { token }
        });

        console.log('API Response:', response.data);
        const data = JSON.parse(response.data);
        if (!data.isError) { // 注意这里应该是 isError 而不是 isEarror
          positions.value = data.list; // 存储点检位置数据
          console.log('点检位置加载成功:', positions.value);
        } else {
          uni.showToast({
            title: '加载点检位置失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('加载点检位置失败', error);
        uni.showToast({
          title: '加载点检位置失败',
          icon: 'none'
        });
      }
    };

    const loadMenu = async () => {
      try {
        const token = uni.getStorageSync('token'); // 确保在此处获取 token
        if (!token) {
          uni.showToast({
            title: '未登录，请先登录',
            icon: 'none'
          });
          return;
        }

        const response = await uni.request({
          url: 'http://13.94.38.44:8080/CheckList/GetMenuList',
          method: 'POST',
          data: { token }
        });

        console.log('API Response:', response.data);
        const data = JSON.parse(response.data);
        if (!data.isError) { // 注意这里应该是 isError 而不是 isEarror
          // 将固定按钮和接口按钮合并
          const fixedButtons = [
            { label: '所有点检', action: goToInspection, disable: false }
          ];

          Menubuttons.value = [
            ...fixedButtons,
            ...data.list.map(item => ({
              label: item.menu_text,
              action: () => goToForm(item.form_name),
              disable: false
            }))
          ];
        } else {
          uni.showToast({
            title: '获取菜单失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取菜单失败', error);
        uni.showToast({
          title: '获取菜单失败',
          icon: 'none'
        });
      }
    };

    const handleHomeScan = () => {
      uni.scanCode({
        success: res => {
          console.log('扫描成功', res);
          loadHomeInspectionDetails(res.result);
        },
        fail: err => {
          console.error('扫描失败', err);
        }
      });
    };

    const loadHomeInspectionDetails = (code) => {
      const token = uni.getStorageSync('token'); // 获取存储的 token
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetCheckListDetailNew',
        method: 'POST',
        data: {
          code: code,
          token: token
        },
        success: (res) => {
          const data = JSON.parse(res.data); // 解析 JSON 数据
          if (!data.isError) {
            const inspectionDetails = data.dt; // 存储点检详情数据
            console.log('点检详情加载成功:', inspectionDetails);
            // 跳转到 project 页面，传递检点项目和名称
            const position = positions.value.find(pos => pos.code === inspectionDetails.Position);
            if (position) {
              uni.navigateTo({
                url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${position.SEL_ShuoMing}`
              });
            } else {
              console.error('未找到对应的点检位置');
              uni.showToast({
                title: '未找到对应的点检位置',
                icon: 'none'
              });
            }
          } else {
            console.error('加载点检详情失败:', data.msg);
            uni.showToast({
              title: data.msg,
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          console.error('加载点检详情失败', err);
        }
      });
    };

    //退出登录
    const logout = () => {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    };

    onMounted(() => {
      loadMenu();
      fetchPositions();
    });

    return {
      username,
      Menubuttons,
      logout,
      positions // 将 positions 暴露出去
    };
  }
}
</script>

<style>
/* 样式部分保持不变 */
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
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}
</style>



