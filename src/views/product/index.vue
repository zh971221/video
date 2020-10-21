<template>
    <div id="product">
        <!-- 搜索栏 -->
        <div class="sousuo">
            <el-form :inline="true" >
            <el-form-item label="姓名" >
                <el-input size="small" v-model="params.name"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
                <el-button size="small" type="primary" @click="handleQuery">查询</el-button>
                <el-button size="small" type="success" @click="toAddHandler">添加</el-button>
            </el-form-item>          
        </el-form>
        </div>
        <!-- 表格 -->
        <el-table :data="productList.list">
            <el-table-column type="selection" width="55px"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="单价" prop="price"></el-table-column>
            <el-table-column label="所属栏目" prop="category.name"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
            <!-- <el-table-column label="产品主图" prop="photo"></el-table-column> -->
            
            <el-table-column label="操作" width="250px" align="center">
                <template v-slot="slot">
                  <el-button type="warning" size="mini" @click="handleDeleteProduct(slot.row.id)">删除</el-button>
                  <el-button type="danger" @click="handleToEdit(slot.row)" size="mini">修改</el-button>
                  <el-button type="primary" size="mini" @click.prevent="toDetaialsHandler">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
            <el-pagination
                layout="prev, pager, next" @current-change="handlePageChange"
                :total="productList.total" :pageSize="productList.pageSize" :current-page="1"> 
            </el-pagination>
        <!-- 模态框 -->
                <el-dialog
                :title="title" @close="toCloseModel"
                :visible="visible"
                width="30%"
                >
                <el-form label-position="left" ref="productForm" :rules="rules" label-width="80px" :model="product">
                <el-form-item label="产品名" prop="name">
                    <el-input v-model="product.name"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="product.price"></el-input>
                </el-form-item>
                <el-form-item label="所属栏目" prop="categoryId">
                    <el-select v-model="product.categoryId" placeholder="请选择">
                        <el-option v-for="c in CategoryList"  :value='c.id' :key='c.id' :label='c.name'/>
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="product.description"></el-input>
                </el-form-item>
                <el-form-item label="产品主图" prop="photo">
                   <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer" >
                     <el-button @click.prevent="toCloseModel">取 消</el-button>
                     <el-button type="primary" @click="handleSubmit('productForm')">确 定</el-button>
                </span>              
            </el-dialog>
    </div>
</template>


<script>
import {mapActions,mapMutations,mapState} from 'vuex'
export default {
      data(){
        return{
            name:"产品管理",
            params:{
                page:0,
                pageSize:5
            },
            fileList:[], 
            product:{},
            row:{},
            rules:{
                 
            }
        }
    },
    computed:{
        ...mapState('product',["visible","title","message"]),
        ...mapState('product',{
            productList:'list',
        }),
        ...mapState('category',{
            CategoryList:'list',
        })
    },
    created() {
        this.queryProduct(this.params);
    },
    methods: {
        //修改
          handleToEdit(row){
            this.product=row
            this.openModel();
        },
        // 删除
        handleDeleteProduct(id){
            this.deleteByIdProduct(id).then(()=>{
                this.$notify({
                title: '成功',
                message: this.message,
                type: 'success'
                });
                this.queryProduct(this.params)
            })
        },
        // 跳转
        toDetaialsHandler(){
            this.$router.push({name:'productDetail'})
        },
        toCloseModel(){
            this.closeModel();
        },
        toAddHandler(){
            this.findAllCategory();
            this.openModel();
        },
        handleSubmit(productForm){
            this.$refs[productForm].validate((valid)=>{
                if(valid){
                    this.saveOrUpdateproduct(this.product).then(()=>{
                        this.queryProduct(this.params)
                        this.$notify({
                                type:"success",
                                title:"成功",
                                message:this.message
                            })
                    })
                }else{
                    return false;
                }
            })
        },
        ...mapMutations('App',['resetCurrentView']),
        ...mapActions('product',['openModel','closeModel']),
        ...mapActions('product',{
            queryProduct:"query",
            saveOrUpdateproduct:"saveOrUpdate",
            deleteByIdProduct:"deleteById"
        }),
        ...mapActions("category",{
            findAllCategory:'findAll'
        }),
       
        handlePageChange(page){
            this.params.page = page-1;
            this.queryProduct(this.params)
        },
        handleQuery(){
            this.queryProduct(this.params);
        }
    },
}
</script>
<style scoped>
  .sousuo{
      margin-left: 20px;
  }
</style>