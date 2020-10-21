import {get,post,poststr} from '../../utils/axios'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import ElementUI from 'element-ui'
Vue.use(ElementUI)
const waiters = {
    //使用子仓库时，要开启命名空间
    namespaced:true,
    state:function(){
        return {
            list:null,
            total: 0,
            listQuery: {
              page: 1,
              limit: 5
            },
            dialogVisible:false,
            waiter_info:{}
        }
    },
    actions:{
        fetchData(context){
            // get('/waiter/findAll').then((data)=>{
            //     context.state.list=data.data
    
            // })
            post('/waiter/query',{page:context.state.listQuery.page-1,
                pageSize:context.state.listQuery.limit}).then((data)=>{
                context.state.list=data.data.list;
                console.log(data.data);
                context.state.total = data.data.total;
               
            })
            
        },
        handleAdd(context){
            context.state.dialogVisible = true
        },
        handleClose(context){
            context.state.dialogVisible = false
        },
        handleSave(context){
            context.state.dialogVisible = false
            post('/waiter/saveOrUpdate',context.state.waiter_info).then((data)=>{
                console.log(data);
                context.dispatch('fetchData')//操作完成后更新一次数据
                ElementUI.Notification({
                    title: '保存',
                    message: '保存成功',
                    type: 'success',
                    duration: 2000
                })
            })
        },
        handleClick(context,data){
            context.state.waiter_info = data
            context.state.dialogVisible = true
            

        },
        handleDelect(context,id){
            get('/waiter/deleteById?id='+id).then((resp)=>{
                ElementUI.Notification({
                    title: '删除',
                    message: '删除成功',
                    type: 'warning',
                    duration: 2000
                })
                context.dispatch('fetchData')
            })
        }
    }
}
export default waiters