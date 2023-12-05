<template>
    <div class="add-location">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <!-- <el-form-item label="银行地址ID" prop="addressid">
          <el-input v-model.number="ruleForm.addressid"></el-input>
        </el-form-item> -->
        <el-form-item label="地址名称" prop="addressname">
          <el-input v-model.number="ruleForm.addressname"></el-input>
        </el-form-item>
        <el-form-item label="地址经度" prop="longitude">
          <el-input v-model.number="ruleForm.longitude"></el-input>
        </el-form-item>
        <el-form-item label="地址纬度" prop="latitude">
          <el-input v-model.number="ruleForm.latitude"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { addLocation } from "@/api/location.js";
  export default {
    name: "addlocation",
  
    data() {
      return {
        ruleForm: {
        //   addressid: "",
          addressname:"",
          longitude:"",
          latitude:"",
        },
        rules:{
        //   addressid:[
        //       { required: true, message: '银行地址ID不能为空'},
        //   ],
          addressname:[
              { required: true, message: '地址名称不能为空'},
          ],
          longitude:[
              { required: true, message: '地址经度不能为空'},
          ],
          latitude:[
              { required: true, message: '地址纬度不能为空'},
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addLocation({
            //   addressid: this.ruleForm.addressid,
              address: this.ruleForm.addressname,
              longitude: this.ruleForm.longitude,
              latitude: this.ruleForm.latitude,
            })
              .then((res) => {
                if(res.code==101){
                  this.$message({
                  message: res.message,
                  type: "success",
                });
                //this.resetForm();
                this.$router.push({
                  name:"location",
                  // params:{
                  //   test:"测试"
                  // }
                });
                console.log(this.ruleForm);
                }
              })
              .catch((err) => {
                console.log(err, "error");
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  
    mounted() {},
  };
  </script>
  
  <style lang="scss" scoped>
  .add-location{
      width: 400px;
      margin: 20px auto;
  }
  //深度样式穿透 v-deep
//   ::v-deep .el-form-item__content{
//       line-height: 100px;
//   }
//   .el-input{
//       background:mintcream;
//   }
  </style>