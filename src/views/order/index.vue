<template>
    <div id='order'>
         <el-tabs v-model="status" @tab-click="handleClick">
            <el-tab-pane label="所有订单" name="全部"></el-tab-pane>
            <el-tab-pane label="待支付" name="待支付"></el-tab-pane>
            <el-tab-pane label="待派单" name="待派单"></el-tab-pane>
            <el-tab-pane label="待接单" name="待接单"></el-tab-pane>
            <el-tab-pane label="待服务" name="待服务"></el-tab-pane>
            <el-tab-pane label="待确认" name="待确认"></el-tab-pane>
            <el-tab-pane label="已完成" name="已完成"></el-tab-pane>
         </el-tabs>
         <el-table
            ref="multipleTable"
            :data="list.list"
            tooltip-effect="dark"
            style="width: 100%"
            >
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="订单编号"
            prop="id"
            width="120">
            </el-table-column>
            <el-table-column
            prop="orderTime"
            label="下单时间"
            width="120">
            </el-table-column>
            <el-table-column
            prop="total"
            label="总价"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="status"
            label="状态"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="customerId"
            label="顾客ID"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            label="操作"
            show-overflow-tooltip>
            <template v-slot="slot">
            <el-button size='mini'>详细</el-button>
            <el-button size='mini' v-if="slot.row.status ==='待派单'" @click.prevent="toSendOrderHandler(slot.row)">派单</el-button>
            </template>
            </el-table-column>
          
        </el-table>
        <!-- 分页 -->
         <el-pagination
                layout="prev, pager, next" @current-change="handlePageChange"
                :total="list.total" :pageSize="list.pageSize" :current-page="1"> 
         </el-pagination>
         <!-- 模态框 -->
         <el-dialog
      title="派单"
      :visible.sync="visible"
      width="60%">
      <div>
        <p> <strong>订单编号：</strong> {{form.id}} </p>
        <p> <strong>订单总价：</strong> {{form.total}} </p>
        <p> <strong>下单时间：</strong> {{form.orderTime}} </p>
        <p> 
          <strong>服务员工：</strong> 
           <el-radio-group v-model="waiterId">
            <el-radio 
              border
              size="small"
              v-for="e in employee" 
              :key="e.id"
              :label="e.id" >{{e.realname}}</el-radio>
          </el-radio-group>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModalHandler">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import { mapActions,mapState } from 'vuex';
export default {
    data(){
        return {
          status:'全部',
          visible:false,
          form:{},
          waiterId:{},
          order:{}
        }
    },
    methods: {
        ...mapActions('order',['query','sendOrder','handler']),
        handleClick(){
        if(this.status=="全部"){
            this.params.status=''
            this.query();
        }else{
            this.params.status=this.status
            console.log(this.params.status)
            this.query();
        }
      },
       handlePageChange(page){
            this.params.page = page+1;
            this.query()
        },
         // 去派单，将模态框打开，然后选择员工作为派单对象
        toSendOrderHandler(row){
          // 模态框显示当前订单信息
          this.form = row;
          this.order.orderId=this.form.id
          console.log(order.orderId)
          this.sendOrder();
          
          this.visible = true;
        },
        // 点击派单
        submitHandler(){
          this.order.waiterId=this.waiterId
          console.log(order.waiterId)
          this.handler(this.order).then(()=>{
            this.query();
            // alert(1)
          })
          this.visible = false
        },
        // 关闭模态框
      closeModalHandler(){
        this.visible = false;
      }
    },
    //加载数据
    created() {
        this.query();
    },
    computed: {
         ...mapState('order',['list','params','employee']),
    },
    
}
</script>

<style>

</style>