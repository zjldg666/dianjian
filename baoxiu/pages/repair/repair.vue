<template>
  <view class="container">
	  <navbar :username="username" @logout="logout" />
	  <view class="content">
		  <form @submit="submitRepair">
		    <view class="form-item">
		      <text>报修单号:</text>
		      <input type="text" :value="docnum" disabled class="input" />
		    </view>
		    
		    <view class="form-item">
		      <text>资产编码:</text>
		      <input type="text" :value="AssetsCode" disabled  class="input"/>
		    </view>
		    
		    <view class="form-item">
		      <text>资产名称:</text>
		      <input type="text" :value="AssetsName" disabled  class="input"/>
		    </view>
		    
		    <view class="form-item">
		      <text>使用部门:</text>
		      <input type="text" v-model="UserDept" disabled  class="input"/>
		    </view>
		    
		    <view class="form-item">
		      <text>资产类型:</text>
		      <input type="text" :value="AssetsType" disabled  class="input"/>
		    </view>
		    
		    <view class="form-item">
		      <text>完工日期:</text>
		      <picker mode="date" @change="onDateChange"  class="input">
		        <view>{{ FinishDate || '请选择日期' }}</view>
		      </picker>
		    </view>
		    
		    <view class="form-group">
		      <text>故障描述:</text>
		      <textarea v-model="Discription" placeholder="请输入故障描述" class="textarea"></textarea>
		    </view>
		    
		    <view class="form-item">
		  		<text>上传照片</text>
		  	<button @click="chooseImage" class="imageButton">+</button>
		    </view>
		    
		    <!-- 图片存放处 -->
		    <block v-for="(src, index) in images" :key="index">
		      <view class="image-preview">
		    	<image :src="src" class="preview-image" 
		  	 @click="previewImage(index)" 
		      :data-index="index"/>
		    	<button 
		    		class="delete-button"
		    		@click.stop.prevent="removeImage(index)">x</button>
		      </view>
		     </block>
		     
		    <view class="button-row">
		      <button  type="primary" @click="showConfirmDialog('立即')">立即报修</button>
		      <button  @click="showConfirmDialog('稍后')">稍后报修</button>
		    </view>
		  </form>
	  </view>
    
  </view>
</template>

<script>

import Navbar from '@/components/Navbar.vue';

export default {
	components: {
	  Navbar,
	
	},
  data() {
    return {
		username:'',
      connid: '',
      token: '',
      docnum: '',
      AssetsCode: '',
      AssetsName: '',
      UserDept: '',
      AssetsType: '',
      FinishDate: '',
      Discription: '',
      images: []
    };
  },
  //页面刷新时，将数据赋值，以便此页面使用
  onLoad(options) {
    if (options.data) {
      const assetInfo = JSON.parse(decodeURIComponent(options.data));
      console.log(assetInfo);
      this.connid = assetInfo.connid;
      this.token = assetInfo.token;
      this.docnum = assetInfo.docnum;
      this.AssetsCode = assetInfo.AssetsCode;
      this.AssetsName = assetInfo.AssetsName;
      this.UserDept = assetInfo.UserDept || '';
      this.AssetsType = assetInfo.AssetsType;

      // 检查是否有草稿数据
      const draftData = uni.getStorageSync('repairDraft_' + this.AssetsCode);
	  console.log(draftData);
      if (draftData) {
        this.FinishDate = draftData.FinishDate;
        this.Discription = draftData.Discription;
        this.images = draftData.images;
      }
	  // 当页面加载时尝试从本地存储获取用户名
	  const userInfo = uni.getStorageSync('userInfo');
	  if (userInfo && userInfo.username) {
	    this.username = userInfo.username;
	  }
    }
  },
  methods: {
	  logout() {
	    uni.removeStorageSync('userInfo'); // 修改为移除整个userInfo缓存
	    uni.redirectTo({
	      url: '/pages/login/login'
	    });
	  },
	  //选择完工日期
    onDateChange(e) {
      this.FinishDate = e.detail.value;
    },
    chooseImage() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.images.push(...res.tempFilePaths);
        }
      });
    },
	 // 新增图片预览方法
	  previewImage(index) {
	    uni.previewImage({
	      current: index,          // 当前点击的图片索引
	      urls: this.images        // 所有图片的 URL 数组
	    });
	  },
	//删除照片
	removeImage(index) {
	      this.images.splice(index, 1);
	    },


    async showConfirmDialog(action) {
        // 验证必填项
        if (!this.FinishDate || !this.Discription) {
          uni.showToast({
            title: '请确保所有必填项已填写',
            icon: 'none'
          });
          return;
        }
    
        const confirm = await this.showModalAsync(`确定${action}报修吗？`);
        if (confirm) {
          if (action === '立即') {
            await this.submitRepair(true);
          } else {
            await this.saveAsDraft(); // 使用 await 确保异步操作完成
            uni.redirectTo({
              url: '/pages/home/home'
            });
          }
        } else {
          console.log('用户取消了操作');
        }
      },
    
      showModalAsync(content) {
        return new Promise((resolve) => {
          uni.showModal({
            title: '提示',
            content: content,
            success: (res) => resolve(res.confirm),
            fail: () => resolve(false)
          });
        });
      },
	  
async submitRepair(isImmediate){
  try{
    const type = isImmediate ? "1" : "0";
    const base64Images = await Promise.all(this.images.map(src => this.urlToBase64(src)));
    console.log('Base64 Images:', base64Images); // 确认所有图片都被正确转换
    
    const requestData = {
      connid: this.connid, 
      AssetsCode: this.AssetsCode,
      token: this.token, 
      docnum: this.docnum,
      Discription: this.Discription,
      FinishDate: this.FinishDate,
      type: type,
      FileList: base64Images
    };

    console.log('请求数据:', requestData);
    
    const res = await new Promise((resolve, reject) =>{
      uni.request({
        url: 'http://13.94.38.44:8000/AssetsRepair/SaveNewInfo', // 提交检修的接口
        method: 'POST',
        data: requestData,
        success: resolve,
        fail: reject
      });
    });

    console.log('提交成功:', res.data);

    // 成功提交后删除草稿数据
    uni.removeStorageSync('repairDraft_' + this.AssetsCode);

    uni.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000, // 显示时长为2秒
      complete: () =>{
        uni.redirectTo({
          url: '/pages/home/home'
        }); // 在提示信息显示完后返回首页
      }
    });
  } catch(err) {
    console.error('提交失败:', err);
    uni.showToast({
      title: '提交失败',
      icon: 'none'
    });
  }
},
    
      async saveAsDraft() {
        try {
          const draftData = {
            connid: this.connid,
            token: this.token,
            docnum: this.docnum,
            AssetsCode: this.AssetsCode,
            AssetsName: this.AssetsName,
            UserDept: this.UserDept,
            AssetsType: this.AssetsType,
            FinishDate: this.FinishDate,
            Discription: this.Discription,
            images: this.images
          };
    
          console.log('准备保存草稿:', draftData); // 添加日志输出
    
          uni.setStorageSync('repairDraft_' + this.AssetsCode, draftData); // 使用docnum作为键值，以便于查找
    
          console.log('草稿保存成功'); // 添加日志输出
    
          uni.showToast({
            title: '已保存为草稿',
            icon: 'success',
            duration: 2000, // 显示时长为2秒
            complete: () => {
              console.log('提示框显示完毕，即将返回首页'); // 添加日志输出
              uni.redirectTo({
                url: '/pages/home/home'
              });
            }
          });
        } catch (err) {
          console.error('保存草稿失败:', err);
          uni.showToast({
            title: '保存草稿失败',
            icon: 'none'
          });
        }
      },
	  
urlToBase64(url, type = 'png') {
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
          // #ifdef APP-PLUS
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

          // 如果是在非APP环境下（例如H5），可以直接使用Canvas进行转换
          // #ifndef APP-PLUS
          const img = new Image();
          img.src = url;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL(`image/${type}`);
            resolve(dataURL);
          };
          img.onerror = reject;
          // #endif
        }
      });
    },
  // handleInvalidImagePath(path) {
  //   console.warn(`Invalid image path found: ${path}, removing it from images list.`);
  //   // 清除无效的图片路径
  //   this.images = this.images.filter(src => src !== path);
  //   uni.showToast({
  //     title: '发现无效图片路径，请重新上传相关图片。',
  //     icon: 'none',
	 //   duration: 2000, // 显示时长为2秒
  //   });
  // },

  }
};
</script>
<style scoped>
	
text{
	line-height: 86rpx;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}

.content {
  width: 90%;
  max-width: 800rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
}

.imageButton{
	width: 50%;
	height: ;
}

.form-group{
	 margin-bottom: 20px;
}
.form-item {
  margin-bottom: 20px;
  width: 93%;
  display: flex;
  justify-content: space-between;
  height: 90rpx;
}

.input {
  width: 60%;
  padding: 20rpx;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
  color: red;
}

.textarea{
	padding: 20rpx;
	border: 2rpx solid #ccc;
	border-radius: 10rpx;
}

.image-preview {
  position: relative;
  display: inline-block;
  margin: 20rpx;
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

.button-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.button-group button {
  width: 48%;
  margin-right: 2%;
  margin-bottom: 10px;
}

.button-group button:last-child {
  margin-right: 0;
}
</style>