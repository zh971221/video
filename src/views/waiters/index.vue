<template>

  <div class="app-container">
    <el-button @click="handleAdd()" type="primary"  size="mini" >新增</el-button>
    <!-- 表格 -->
     <el-table
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="telephone"
      label="手机号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="idCard"
      label="身份证号">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope" >
        <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
        <el-button @click="handleDelect(scope.row.id)" type="danger" size="small" >删除</el-button>
      </template>
    </el-table-column>  
  </el-table>
  <!-- 表格结束 -->
  <!-- 分页 -->
  <template>
  <pagination
    total=5
    :page.sync="listQuery.page"
    :limit.sync="listQuery.limit"
    @pagination="fetchData" />

  </template>
  <!-- 分页结束 -->
  <!-- 模态框 -->
  <el-dialog
  title="保存员工信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <p>用户名：<el-input v-model="waiter_info.username"  placeholder="请输入内容"></el-input></p>
  <p>密码：<el-input v-model="waiter_info.password" placeholder="请输入内容"></el-input></p>
  <p>电话：<el-input v-model="waiter_info.telephone" placeholder="请输入内容"></el-input></p>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleSave">确 定</el-button>
  </span>
  </el-dialog>
  <!-- /模态框 -->
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  computed: {
        ...mapState('waiters',['list','dialogVisible','waiter_info','listQuery'])
    },
  data() {
    return {
      // list: null, //表格数据
      listLoading: false,
      
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions('waiters',['fetchData','handleAdd','handleClose','handleSave','handleClick','handleDelect'])
  }
}
</script>
