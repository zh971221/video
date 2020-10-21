<template>
<div class="container">
    <el-table
    ref="multipleTable"
    :data="this.list"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="编号"
       prop="id"
      width="120">
    </el-table-column>
    <el-table-column
      prop="orderId"
      label="订单编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="cusId"
      label="顾客ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="commentTime"
      label="下单时间"
      width="120">
      </el-table-column>
      <el-table-column
      prop="content"
      label="评价内容"
      width="120">
      </el-table-column>
      <el-table-column
      prop="name"
      label="操作"
      width="120">
      <template slot-scope="scope" >
        <el-button @click="handleDelect(scope.row.id)" type="danger" size="small" >删除</el-button>
      </template>
      </el-table-column>
  </el-table>
</div>
  
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return{
          ids:[]
        }
    },
    methods:{
        handleSelectionChange(val){
        this.ids = val.map(item=>item.id);
       },
       deleteById(id){

       },
      ...mapActions('comment',['findAll','deleteById']),
        handleDelect(id){
          this.deleteById(id).then(()=>{
            this.$notify({
              title:'成功',
              message:this.$msg,
              type:'success'
            })
          })
          }
    },
    computed:{
      ...mapState('comment',['list','msg'])
    },
    created(){
      this.findAll()
    }

}
</script>
<style>
    
</style>