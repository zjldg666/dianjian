<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      <button-group :buttons="Menubuttons"/>
    </view>
  </view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import { ref, onMounted } from 'vue';
import { fetchRemindData } from '@/utils/remindUtils.js';

export default {
  components: {
    Navbar,
    ButtonGroup
  },
  setup() {
    const username = ref(uni.getStorageSync('username') || '');
    const Menubuttons = ref([]);
    const positions = ref([]);

    const goToInspection = () => {
      uni.navigateTo({
        url: '/pages/inspection/inspection'
      });
    };

    const goToForm = async (formName) => {
      switch (formName) {
        case 'frmMyChcek':
          uni.navigateTo({
            url: '/pages/Mydianjian/Mydianjian'
          });
          break;
        case 'frmScanCode':
          handleHomeAscan();
          break;
        case 'frmRemind':
          const remindData = await fetchRemindData();
          console.log('Remind Data:', remindData); // 添加日志
          if (remindData) {
            const exceptions = remindData.filter(item => item.num > 0);
            console.log('Exceptions:', exceptions); // 添加日志
            if (exceptions.length > 0) {
              uni.setStorageSync('exceptions', JSON.stringify(exceptions)); // 存储 exceptions 到本地存储
              uni.navigateTo({
                url: '/pages/remind/remind'
              });
            } else {
              uni.showToast({
                title: '暂无异常',
                icon: 'none'
              });
            }
          }
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
        console.log('token', token);
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
              form_name: item.form_name, // 添加 form_name 属性以便后续使用
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

    const loadRemindCount = async () => {
      const remindData = await fetchRemindData();
      if (remindData) {
        const remindButton = Menubuttons.value.find(button => button.form_name === 'frmRemind');
        if (remindButton) {
          const count = remindData.filter(item => item.num > 0).length;
          remindButton.badge = count > 0 ? count.toString() : '';
        }
      }
    };

    const handleHomeAscan = () => {
      uni.scanCode({
        success: res => {
          console.log('扫描成功', res);
          loadHomeInspectionDetails(res.result.substring(0, 3));
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
          console.log(data);
          if (!data.isError) {
            const inspectionDetailsArray = data.dt; // 假设 dt 是一个数组
            console.log('点检详情加载成功:', inspectionDetailsArray);

            // 找到第一个点检详情项的位置
            if (inspectionDetailsArray.length > 0) {
              const inspectionDetails = inspectionDetailsArray[0];
              const position = positions.value.find(pos => pos.SEL_TXT === inspectionDetails.Position);
			  console.log(position)
              if (position) {
                const shuoMing = position.SEL_ShuoMing;
                uni.navigateTo({
                  url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${shuoMing}`
                });
              } else {
                console.error('未找到对应的点检位置');
                uni.showToast({
                  title: '未找到对应的点检位置',
                  icon: 'none'
                });
              }
            } else {
              console.error('点检详情为空');
              uni.showToast({
                title: '点检详情为空',
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

    const logout = () => {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    };

    onMounted(() => {
      loadMenu();
      fetchPositions();
      loadRemindCount(); // 加载提醒数量
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

.title {
  font-size: 48rpx;
  margin-bottom: 40rpx;
  color: #fff;
}

/* 添加 badge 样式 */
.button-with-badge {
  position: relative;
  display: inline-block;
}

.button-with-badge .badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: red;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 40rpx;
  font-size: 24rpx;
}
</style>



