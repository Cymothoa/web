<template>
  <div class="add-level">
    <!-- 
        思路：
        添加等级信息，点击提交，联调提交接口，并在列表页可以查询到新增的数据
     -->
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="等级名称" prop="levelname">
        <el-input v-model.number="ruleForm.levelname"></el-input>
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
import { addLevel } from "@/api/level.js";
export default {
  name: "levelList",

  data() {
    return {
      ruleForm: {
        levelname: "",
      },
      rules:{
        levelname:[
            { required: true, message: '等级名称不能为空'},
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addLevel({
            levelname: this.ruleForm.levelname,
          })
            .then((res) => {
              if(res.code==101){
                this.$message({
                message: res.message,
                type: "success",
              });
              //this.resetForm();
              this.$router.push("/level/index");
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
.add-level{
    width: 400px;
    margin: 200px auto;
}
//深度样式穿透 v-deep
// ::v-deep .el-form-item__content{
//     line-height: 100px;
// }
// .el-input{
//     background:mintcream;
// }
</style>