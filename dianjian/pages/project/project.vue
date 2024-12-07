<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="title">{{ inspectionPoint.name }} > {{ currentProject }}</view>
    <view class="content">
      <view v-if="currentItem">
        <view class="item">
          <!-- 点检内容描述 -->
          <view class="item-title">{{ currentItem.Description }}</view>
          <!-- 选择结果 -->
          <view class="form-group">
            <label>选择结果：</label>
            <view class="button-group">
              <button :class="{'selButton': true, 'selected': currentItem.flag === 'OK'}" @click="handleFlagChange('OK')">
                <image src="../../static/dui.png" class="icon-image" />
              </button>
              <button :class="{'selButton': true, 'selected': currentItem.flag === '有问题，但已经解决'}" @click="handleFlagChange('有问题，但已经解决')">
                <image src="../../static/NT.png" class="icon-image" />
              </button>
              <button :class="{'selButton': true, 'selected': currentItem.flag === 'NG'}" @click="handleFlagChange('NG')">
                <image src="../../static/cuo.png" class="icon-image" />
              </button>
            </view>
          </view>

          <!-- 点检说明 -->
          <view class="form-group">
            <label>点检说明：</label>
            <input type="text" v-model="currentItem.remarks" class="input" />
          </view>

          <!-- 上传图片 -->
          <view class="form-group">
            <label>上传图片：</label>
            <button @click="uploadImage" class="button">+</button>
            <view v-if="currentItem.images && currentItem.images.length > 0">
              <view v-for="(image, index) in currentItem.images" :key="index" class="image-preview">
                <image :src="image" class="preview-image" />
                <button @click="deleteImage(index)" class="delete-button">X</button>
              </view>
            </view>
          </view>

          <!-- 上一项和下一项按钮 -->
          <view class="button-group">
            <button @click="prevItem" :disabled="currentItemIndex === 0" class="button">上一项</button>
            <button @click="nextOrFinishItem" class="button">{{ currentItemIndex === inspectionItems.length - 1 ? '点检成功' : '下一项' }}</button>
          </view>
        </view>
      </view>
      <view v-else>
        <!-- 完成信息显示 -->
        <view class="message">所有点检项目完成</view>
      </view>
    </view>
  </view>
</template>


<script>
import Navbar from '@/components/Navbar.vue';

/**
 * 图片地址转换为base64格式图片
 * @param {string} url 图片地址 可网络地址、本地相对路径
 * @param {string} type base64图片类型 默认png
 */
function urlToBase64(url, type = 'png') {
  if (typeof url !== 'string' || url.trim() === '') {
    return Promise.reject(new Error('Invalid URL'));
  }

  return new Promise((resolve, reject) => {
    if (url.startsWith('http')) {
      // 网络地址 或者H5端本地相对路径 可使用request方式
      uni.request({
        url: url,
        method: 'GET',
        responseType: 'arraybuffer',
        success: (res) => {
          const base64 = `data:image/${type};base64,${uni.arrayBufferToBase64(res.data)}`;
          resolve(base64);
        },
        fail: (err) => {
          reject(new Error(`Request failed: ${err}`));
        }
      });
    } else {
      // #ifdef APP
      uni.compressImage({
        src: url,
        quality: 100, // 图片质量压缩0~100，100表示图片质量保持原样
        success: (res) => {
          const tempUrl = res.tempFilePath; // 使用compressImage获取到安卓本地路径file:///...
          plus.io.resolveLocalFileSystemURL(tempUrl, (entry) => {
            entry.file((e) => {
              let fileReader = new plus.io.FileReader();
              fileReader.onload = (r) => {
                resolve(r.target.result);
              };
              fileReader.readAsDataURL(e);
            }, (error) => {
              reject(new Error(`File resolution failed: ${error}`));
            });
          }, (error) => {
            reject(new Error(`File resolution failed: ${error}`));
          });
        },
        fail: (err) => {
          reject(new Error(`Compress image failed: ${err}`));
        }
      });
      // #endif

      // #ifndef APP
      // 如果不在APP环境中，直接返回错误
      reject(new Error('This method is only supported in the APP environment for local files.'));
      // #endif
    }
  });
}

export default {
  components: {
    Navbar
  },
  data() {
    return {
      username: uni.getStorageSync('username') || '',
      inspectionPoint: { id: '', name: '' },
      inspectionItems: [], // 初始化为空数组
      currentItemIndex: 0,
      currentProject: ''
    };
  },
  onLoad(options) {
    // 初始化检查点信息
    this.inspectionPoint.id = options.id;
    this.inspectionPoint.name = options.name;
    const token = uni.getStorageSync('token');
    // 加载点检详情
    this.loadInspectionDetails(this.inspectionPoint.id, token);
  },
  onPullDownRefresh() {
    // 处理下拉刷新
    const id = this.inspectionPoint.id;
    const token = uni.getStorageSync('token');
    if (!id) {
      console.error('id 参数为空');
      uni.stopPullDownRefresh(); // 停止下拉刷新
      return;
    }
    this.loadInspectionDetails(id, token, () => {
      uni.stopPullDownRefresh(); // 停止下拉刷新动作
    });
  },
  computed: {
    // 计算当前项
    currentItem() {
      return this.inspectionItems[this.currentItemIndex] || null;
    }
  },
  methods: {
    // 加载点检详情
    loadInspectionDetails(id, token, callback) {
      if (!id) {
        console.error('id 参数为空');
        return;
      }
      console.log('请求参数:', { code: id, token: token });
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetCheckListDetail',
        method: 'POST',
        data: {
          code: id,
          token: token
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          if (!data.isError) {
            this.inspectionItems = data.dt.map(item => ({
              ...item,
              remarks: '',
              images: [], // 初始化 images 数组
              flag: '' // 初始值为空
            }));
            this.currentProject = this.inspectionItems[0]?.Project || '';
            console.log('点检详情加载成功:', this.inspectionItems);
          } else {
            console.error('加载点检详情失败:', data.message);
          }
          if (callback) callback(); // 确保回调被调用
        },
        fail: (err) => {
          console.error('加载点检详情失败:', err);
          if (callback) callback(); // 确保回调被调用
        }
      });
    },
    // OK, NT, NG 选择结果
    handleFlagChange(flag) {
      this.currentItem.flag = flag;
    },
    // 上一项
    prevItem() {
      if (this.currentItemIndex > 0) {
        this.currentItemIndex--;
        this.currentProject = this.inspectionItems[this.currentItemIndex].Project;
      }
    },
    // 下一项或完成检查
    nextOrFinishItem() {
      if (this.currentItem.flag) {
        if (this.currentItemIndex < this.inspectionItems.length - 1) {
          this.nextItem();
        } else {
          console.log('当前 inspectionItems:', this.inspectionItems);
          this.saveInspection();
        }
      } else {
        uni.showToast({
          title: '请先选择结果',
          icon: 'none'
        });
      }
    },
    // 下一项
    nextItem() {
      if (this.currentItemIndex < this.inspectionItems.length - 1) {
        this.currentItemIndex++;
        this.currentProject = this.inspectionItems[this.currentItemIndex].Project;
      }
    },
    // 选择图片
    uploadImage() {
      uni.chooseImage({
        count: 9, // 支持最多选择9张图片
        success: (res) => {
          if (res.tempFilePaths.length > 0) {
            if (!this.currentItem.images) {
              this.$set(this.currentItem, 'images', []);
            }
            this.convertImagesToBase64(res.tempFilePaths); // 转换为 Base64 编码
          }
        },
        fail: (err) => {
          console.error('选择图片失败:', err);
        }
      });
    },
    // 将图片路径转换为 Base64 编码
    convertImagesToBase64(imagePaths) {
      Promise.all(imagePaths.map(imagePath => urlToBase64(imagePath))).then(base64Images => {
        // 更新 images 数组中的 Base64 编码
        this.currentItem.images.push(...base64Images);
        console.log('Base64 图片路径:', this.currentItem.images);
      }).catch(err => {
        console.error('转换图片为 Base64 编码失败:', err);
      });
    },
    // 删除图片
    deleteImage(index) {
      this.currentItem.images.splice(index, 1);
    },
    // 保存点检详情
    saveInspection() {
      if (!this.inspectionItems || !this.inspectionItems.length) {
        console.error('inspectionItems 未定义或为空');
        return;
      }

      uni.showLoading({
        title: '正在上传数据...'
      });

      const token = uni.getStorageSync('token');
      const inspectionData = {
        token: token,
        list: this.inspectionItems.map(item => {
          const now = new Date();
          const formattedTime = `${now.getFullYear()}:${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}:${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
          return {
            ID: item.ID,
            Time: formattedTime,
            Flag: item.flag || 'NG',
            FileList: (item.images || []).map(image => image), // 确保 FileList 包含 Base64 编码
            Remark: item.remarks || ''
          };
        })
      };

      console.log('发送到 SaveDetail 接口的数据:', inspectionData);

      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/SaveDetail',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: inspectionData,
        success: (res) => {
          console.log('第一次请求返回数据为:', res.data); // 打印原始响应数据
          if (typeof res.data === 'string') {
            try {
              const data = JSON.parse(res.data);
              if (!data.isError) {
                const docnum = data.docnum;
                this.saveFinalResult(docnum, token);
              } else {
                uni.showToast({
                  title: data.msg || '保存失败',
                  icon: 'none'
                });
                console.error('保存点检详情失败:', data.msg);
              }
            } catch (parseError) {
              console.error('解析第一次请求返回数据时出错:', parseError);
            }
          } else {
            console.error('第一次请求响应数据不是字符串:', res.data);
          }
        },
        fail: (err) => {
          console.error('保存点检详情失败:', err);
        }
      });
    },
    // 保存最终的检查结果
    saveFinalResult(docnum, token) {
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/SaveDetail2',
        method: 'POST',
        data: {
          docnum: docnum,
          token: token
        },
        success: (res) => {
          console.log('第二次请求返回数据为:', res.data); // 打印原始响应数据
          if (typeof res.data === 'string') {
            try {
              const result = JSON.parse(res.data);
              if (!result.IsError) {
                uni.showToast({
                  title: '检查成功',
                  icon: 'success'
                });
                uni.redirectTo({
                  url: '/pages/inspection/inspection'
                });
              } else {
                uni.showToast({
                  title: result.msg,
                  icon: 'none'
                });
                console.error('保存检查结果失败:', result.msg);
              }
            } catch (parseError) {
              console.error('解析第二次请求返回数据时出错:', parseError);
            }
          } else {
            console.error('第二次请求响应数据不是字符串:', res.data);
          }
        },
        fail: (err) => {
          console.error('保存检查结果失败:', err);
        }
      });
    },
    // 退出登录
    logout() {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    }
  }
}
</script>

<style scoped>
.container {
	
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}
.content {
	width: 100%%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
 
}
.title {
  font-size: 40rpx;
  margin:40rpx 20rpx;
}
.image-preview {
  position: relative;
  display: inline-block;
  margin: 10px;
}
.preview-image {
  width: 160rpx;
  height: 160rpx;
}
.delete-button {
 position: absolute;
   top: 0;
   right: 0;
   width: 60rpx;
   height: 60rpx;
   background-color: red;
   color: white;
   border: none;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
}

.item {
  width: 600rpx;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 10px;
  margin-bottom: 20px;
}
.item-title {
  font-size: 20px;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
  
}
.input {
  width: 93%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.button-group{
	display: flex;
	justify-content: space-between;
}
.Picbutton{
	width: 90%;
	padding: 10px;
	background-color: #007aff;
	color: #fff;
	text-align: center;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}
.button {
  width: 40%;
  padding: 10px;
  background-color: #007aff;
  color: #fff;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.selButton {
  width: 50px; /* 设置固定宽度 */
  height: 50px; /* 设置固定高度 */
  margin: 5px;
  background-color: white; /* 默认灰色 */
  color: #fff;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 50%; /* 圆形按钮 */
  cursor: pointer;
  display: flex; /* Flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  overflow: hidden; /* 防止内容超出圆形边界 */
}
.selButton.selected {
  background-color: #007aff; /* 选择后蓝色 */
}
.icon-image {
  max-width: 100%; /* 图片最大宽度 */
  max-height: 22px; /* 图片最大高度 */
  border-radius: 50%; /* 确保图片也是圆形 */
}



.uploaded-image {
  width: 100px;
  height: 100px;
  margin-top: 10px;
}
.message {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}
.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.button:active {
  background-color: #005bb5;
}
</style>
