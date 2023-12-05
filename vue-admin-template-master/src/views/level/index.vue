<template>
  <div class="list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="jrid" label="等级ID" width="180">
      </el-table-column>
      <el-table-column prop="levelname" label="等级名称" width="180">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { levelMain,delLevel } from "@/api/level.js";
//import { delLevel } from "@/api/level.js";
export default {
  name: "Level",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {},
  created() {
    this.getList();
  },
  methods: {
    // 获取等级列表
    getList() {
      levelMain()
        .then((res) => {
          if (res.code == 101) {
            this.tableData = res.data;
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 移除
    deleteRow(rows) {
      delLevel({
        levelid: rows.jrid
      }) .then((res) => {
          if (res.code == 101) {
            this.$message({
              message: res.message,
              type: "success",
            });
            this.getList();
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: 800px;
  margin: 0 auto;
}
</style>