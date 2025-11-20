<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      <!-- 通用加载组件 -->
      <loading-spinner :show="isLoading" />
      <!-- 按钮组 -->
      <button-group v-if="!isLoading" :buttons="Menubuttons"/>
    </view>
  </view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import { ref, onMounted, nextTick } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  components: {
    Navbar,
    ButtonGroup,
    LoadingSpinner
  },
  setup() {
    const username = ref(uni.getStorageSync('username') || '');
    const Menubuttons = ref([]);
    const positions = ref([]);
    const isLoading = ref(true);
    // 分离菜单加载状态和提醒数据加载状态
    const isRemindLoading = ref(false);

    // --- 新增：用于缓存提醒详情数据 ---
    let cachedRemindDetails = null;
    // --- --- --- --- --- --- --- --- ---

    const goToInspection = () => {
      uni.navigateTo({
        url: '/pages/inspection/inspection'
      });
    };

    const goToForm = async (formName) => {
      try {
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
            console.log("开始处理缺失提醒跳转");
            
            // 如果正在加载，显示提示但不执行任何操作
            if (isRemindLoading.value) {
              uni.showToast({
                title: '数据加载中...',
                icon: 'none'
              });
              return; // 直接返回，不执行后续操作
            }
            
            // --- 修改：使用缓存的数据 ---
            if (cachedRemindDetails) {
                console.log('使用缓存的提醒数据:', cachedRemindDetails);
                
                if (cachedRemindDetails.length > 0) {
                    // 将缓存的数据存入 Storage 供 remind 页面使用
                    uni.setStorageSync('exceptions', JSON.stringify(cachedRemindDetails));
                    uni.navigateTo({
                        url: '/pages/remind/remind'
                    });
                } else {
                    uni.showToast({
                        title: '暂无异常',
                        icon: 'none'
                    });
                }
            } else {
                 // 如果缓存意外为空（例如加载失败），可以选择重新加载或提示
                 console.warn('缓存的提醒数据为空，尝试重新加载...');
                 // 设置加载状态，防止重复点击
                 isRemindLoading.value = true;
                 
                 try {
                   await loadRemindCount(); // 重新加载
                   // 加载后再次尝试跳转（简单重试一次）
                   if (cachedRemindDetails && cachedRemindDetails.length > 0) {
                       uni.setStorageSync('exceptions', JSON.stringify(cachedRemindDetails));
                       uni.navigateTo({ url: '/pages/remind/remind' });
                   } else {
                        uni.showToast({
                            title: '暂无异常',
                            icon: 'none'
                        });
                   }
                 } catch (error) {
                   console.error('加载提醒数据失败', error);
                   uni.showToast({
                     title: '加载失败',
                     icon: 'none'
                   });
                 } finally {
                   // 无论成功失败，都关闭加载状态
                   isRemindLoading.value = false;
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
          case 'frmScanConfig':
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
      } catch (error) {
        console.error('跳转页面失败', error);
      }
    };

    const fetchPositions = async () => {
      try {
        const token = uni.getStorageSync('token');
        if (!token) {
          return;
        }

        const response = await uni.request({
          url: 'http://13.94.38.44:8080/CheckList/GetPositionByPerson',
          method: 'POST',
		  data:
           { token },
          timeout: 10000
        });

        console.log('API Response:', response.data);
        const data = JSON.parse(response.data);
        if (!data.isError) {
          positions.value = data.list;
          console.log('点检位置加载成功:', positions.value);
        } else {
          uni.showToast({
            title: '加载点检位置失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('加载点检位置失败', error);
      }
    };

    // 内联 fetchRemindData(获取缺失提醒数量) 逻辑以便于控制和缓存 ---
    // 这个函数的逻辑与 remindUtils.js 中的 fetchRemindData 相同
    const internalFetchRemindData = async () => {
      try {
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({
            title: '未登录，请先登录',
            icon: 'none'
          });
          return null;
        }
        const response = await uni.request({
          url: 'http://13.94.38.44:8080/CheckList/GetRemind',
          method: 'POST',
		  data:
           { token }
        });
        const data = JSON.parse(response.data);
        console.log('API Response (GetRemind):', data);
        if (!data.isError) {
          const remindData = data.list.filter(item => item.num > 0);
          console.log('Filtered Remind Data:', remindData);
          return remindData; 
        } else {
          uni.showToast({
            title: '获取提醒信息失败',
            icon: 'none'
          });
          return null;
        }
      } catch (error) {
        console.error('获取提醒信息失败或代码有误', error);
        uni.showToast({
          title: '获取提醒信息失败或代码有误',
          icon: 'none'
        });
        return null;
      }
    };

    const loadMenu = async () => {
      try {
        const token = uni.getStorageSync('token');
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
          data: { token },
          timeout: 10000
        });

        console.log('API Response (GetMenuList):', response.data);
        const data = JSON.parse(response.data);
        if (!data.isError) {
          const fixedButtons = [
            { 
              label: '所有点检', 
              action: goToInspection, 
              disable: false,
              image: '../../static/icon/SuoYouDianjian.png'
            }
          ];

          Menubuttons.value = [
            ...fixedButtons,
            ...data.list.map(item => ({
              label: item.menu_text,
              form_name: item.form_name,
              action: () => goToForm(item.form_name),
              disable: false,
              image: getImagePath(item.form_name),
              badge: '' 
            }))
          ];
          
          nextTick(() => {
            loadRemindCount(); 
          });
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
      } finally {
        isLoading.value = false;
      }
    };

    // 获取缺失提醒数量，并缓存详情数据
    const loadRemindCount = async () => {
      const remindButton = Menubuttons.value.find(button => button.form_name === 'frmRemind');
      if (remindButton) {
        remindButton.badge = '...';
      } else {
        console.warn('未找到缺失提醒按钮，无法设置加载状态');
        return; 
      }
      try {
        // --- 修改：调用内联的 fetch 函数并缓存结果 ---
        const remindData = await internalFetchRemindData(); // 使用内联函数
        cachedRemindDetails = remindData; // 缓存数据 以供后面remind使用
        if (remindData) {
          const count = remindData.length;
          console.log("缺失提醒数据长度:", count);
          nextTick(() => {
            remindButton.badge = count > 0 ? count.toString() : '';
          });
        } else {
             nextTick(() => {
                 remindButton.badge = '';
             });
        }
      } catch (error) {
        console.error('获取提醒数量失败', error);
        nextTick(() => {
            remindButton.badge = '';
        });
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
      const token = uni.getStorageSync('token');
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetCheckListDetailNew',
        method: 'POST',
        data: {
          code: code,
          token: token
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          console.log(data);
          if (!data.isError) {
            const inspectionDetailsArray = data.dt;
            console.log('点检详情加载成功:', inspectionDetailsArray);

            if (inspectionDetailsArray.length > 0) {
              const inspectionDetails = inspectionDetailsArray[0];
              const position = positions.value.find(pos => pos.SEL_TXT === inspectionDetails.Position);
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
      // 清除缓存数据
      uni.removeStorageSync('cachedRemindData');
      uni.removeStorageSync('remindDataCacheTime');
      uni.removeStorageSync('username');
      // --- 新增：清除内部缓存 ---
      cachedRemindDetails = null;
      // --- --- --- --- --- --- ---
      uni.redirectTo({
        url: '/pages/login/login'
      });
    };

    const getImagePath = (formName) => {
      switch (formName) {
        case 'frmMyChcek':
          return '../../static/icon/MyDianjian.png'; 
        case 'frmScanCode':
          return '../../static/icon/LiJiSaoma.png'; 
        case 'frmRemind':
          return '../../static/icon/QueShiTixing.png'; 
        case 'frmCheckListReport':
          return '../../static/icon/JianDanBaobiao.png'; 
        case 'frmCheckPlan':
          return '../../static/icon/DJjihua.png'; 
        case 'frmScanConfig':
          return '../../static/icon/DJweihu.png'; 
        default:
          return '';
      }
    };

    onMounted(() => {
      loadMenu();
      fetchPositions();
    });

    return {
      username,
      Menubuttons,
      logout,
      positions,
      isLoading,
      isRemindLoading
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

</style>