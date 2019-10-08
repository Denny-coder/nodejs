<template>
  <div>
    <!-- <img :src="hello" alt="首页" class="img-style"> -->
    <el-form label-width="150px">
      <el-form-item label="普通文件上传">
        <el-upload
          :action="$ImgUpload+'/api/upload'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="断点续传">
        <input
          ref="bigFile"
          type="file"
          @change="upBigFile"
        >
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SparkMD5 from "spark-md5";
import hello from "@/assets/helloWord.png";
const LENGTH = 1024 * 10000; // 10000kb

export default {
  name: "dashboard",
  data() {
    return {
      hello,
      dialogImageUrl: "",
      dialogVisible: false,
      end: LENGTH,
      start: 0
    };
  },
  methods: {
    upBigFile(e) {
      const files = e.target.files[0];
      if (!files) {
        return;
      }
      console.log(files.size);
      const maxLen =
        files.size % LENGTH === 0
          ? files.size / LENGTH
          : Math.ceil(files.size / LENGTH);
      this.md5(
        files,
        function(md5) {
          this.ajaxFile(
            {
              url: `${this.$ImgUpload}/api/upload/bigFile`,
              method: "post",
              data: { md5, maxLen }
            },
            files
          );
        }.bind(this)
      );
    },
    ajaxFile(
      option = {
        url: "",
        method: "get",
        data: null
      },
      files
    ) {
      const xhr = new XMLHttpRequest();
      xhr.open("post", option.url, true);
      // 请求成功回调函数
      xhr.onload = e => {
        if (xhr.status < 200 || xhr.status >= 300) {
          // console.log("onload  error");
        } else {
          if (this.start * LENGTH < files.size) {
            this.ajaxFile(option, files);
          }
        }
      };
      xhr.upload.addEventListener("progress", e => {
        // console.log("上传进度", e);
      });
      let blob = files.slice(this.start * LENGTH, this.end);
      let formData = new FormData();
      formData.append("blob", blob); // 文件分片
      formData.append("md5", option.data.md5); // 文件的MD5值
      formData.append("index", this.start); // 当前片的索引
      formData.append("maxLen", option.data.maxLen); // 文件最大分片数
      this.start += 1;
      this.end = this.start * LENGTH;
      // 发送请求
      xhr.send(formData);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    md5(file, callBack) {
      var blobSlice =
          File.prototype.slice ||
          File.prototype.mozSlice ||
          File.prototype.webkitSlice,
        chunkSize = 2097152, // Read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader();

      fileReader.onload = function(e) {
        // console.log("read chunk nr", currentChunk + 1, "of", chunks);
        spark.append(e.target.result); // Append array buffer
        currentChunk++;

        if (currentChunk < chunks) {
          loadNext();
        } else {
          callBack(spark.end());
        }
      };
      fileReader.onerror = function() {
        console.warn("oops, something went wrong.");
      };
      function loadNext() {
        var start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }

      loadNext();
    }
  },
  mounted() {
    const that = this;
  },
  computed: {
    ...mapGetters(["name", "roles"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
