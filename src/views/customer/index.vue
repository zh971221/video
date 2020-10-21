<template>
    <div id="customer">
        <!-- 按钮  -->
        <div class="btns">
            <el-button size='small' type="primary" @click="handleToAdd">添加</el-button>
            <el-button size='small' type="danger" @click="handleToDel">批量删除</el-button>

        </div>
        <!-- /按钮 -->
        <!-- 表格 -->
        <el-table :data="list" v-loading="loading" 
         @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55px"/>
            <el-table-column prop="realname" label="姓名"></el-table-column>
            <el-table-column prop="telephone" label="手机号"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="slot">
                    <el-button type="warning" @click.prevent="handleToBatchDel(slot.row.id)" size="mini">删除</el-button>
                    <el-button type="danger" @click.prevent="handleToEdit(slot.row)" size="mini">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- /表格 -->  
        <!-- 模态框 -->
            <el-dialog
                :title="title"
                :visible="visible"
                width="30%"
                >
                <el-form label-position="left" ref="customerForm" :rules="rules" label-width="80px" :model="customer">
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="customer.realname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="customer.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="telephone">
                    <el-input v-model="customer.telephone"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer" >
                     <el-button @click.prevent="handleClose">取 消</el-button>
                    <el-button type="primary" @click="handleSubmit('customerForm')">确 定</el-button>
                </span>              
            </el-dialog>
        <!-- /模态框 -->
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
      data(){
        return{
            title:"",
            customer:{},
            ids:[],
            rules:{
               realname:[
                   {required:true,message:"请输入姓名",trigger:"blur"},
                   {min:2,max:6,message:"姓名的字数应该是2-6位"}
               ],
               password:[
                   {required:true,message:"请输入密码",trigger:"blur"},
                   {min:2,max:6,message:"密码的字数应该是2-6位"}
               ],
               telephone:[
                    {required:true,message:"请输入电话号",trigger:"blur"},
                    {min:11,max:11,message:"电话号的字数应该是11位"},
                    // {type:"number", message:"电话号应该是数字"}
               ]
           }
        }
    },
    methods: {
        ...mapActions("customer",{closeModel:"closeModel",findAllCustomer:"findAll",openModel:"openModel",saveOrUpdateCustomer:"saveOrUpdate"
        ,deleteCustomerById:"deleteById",handleToBatchDel:"handleToBatchDelete"}),
          handleClose(){
          this.closeModel();
      },
      handleToAdd(){
          this.title = "添加顾客信息"
          //重置customer
          this.customer = {};
          this.openModel();

      },
    //  获取id
    handleSelectionChange(val){
        this.ids = val.map(item=>item.id);
    },
    //批量删除
    handleToDel(){
        this.handleToBatchDel(this.ids)
    },
      //删除
      handleToDelete(id){
          this.deleteCustomerById(id).then(()=>{
              this.$notify({
                title: '成功',
                message: this.message,
                type: 'success'
                });
        })
      },
      handleToEdit(row){
          this.title = "修改顾客信息"
          //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
          this.$refs.customerForm.resetFields();   
          this.customer = row
          this.openModel();
      },
      handleSubmit(customerForm){
          //提交之前先去执行校验操作
          console.log(customerForm,"---------")
        this.$refs[customerForm].validate((valid) => {
          if (valid) {
              //校验通过
              this.saveOrUpdateCustomer(this.customer).then((result)=>{
                this.$notify({
                title: '成功',
                message: this.$store.state.customer.message,
                type: 'success'
                });
        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      
    },
    created(){
        this.findAllCustomer()
    },
    computed: {
        ...mapState("customer",["list","visible","loading"," message"])
    },
}
</script>
<style scoped>
  .btns{
      margin-top: 20px;
      margin-left: 10px;
  }
</style>