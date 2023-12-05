<template>
  <div class="locationList">
    <!-- {{ $route.params }} -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="addressid" label="银行地址ID"> </el-table-column>
      <el-table-column prop="addressname" label="银行地址名称">
      </el-table-column>
      <el-table-column prop="longitude" label="地址对应的经度">
      </el-table-column>
      <el-table-column prop="latitude" label="地址对应的纬度">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { locationMain, delLocation } from "@/api/location.js";
export default {
  name: "location",

  data() {
    return {
      tableData: [],
    };
  },

  created() {
    this.getList();
  },

  methods: {
    // 获取地址列表
    getList() {
      locationMain()
        .then((res) => {
          console.log(res, "successful");
          if (res.code == 101) {
            this.tableData = res.data;
          }
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
    handleDelete(row) {
      delLocation({
        addressid: row.addressid,
      })
        .then((res) => {
          if (res.code == 101) {
            this.$message({
              message: res.message,
              type: "success",
            });
            this.getList();
          }
        })
        .catch((res) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.locationList {
  width: 800px;
  margin: 100px auto;
}
</style>