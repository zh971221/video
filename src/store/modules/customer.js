import {post,get,post_arry} from '../axios'
export default{
    namespaced:true,
    state:{
        name:"customer",
        list:[],
        message:"",
        visible:false,
        loading:false,
    },
    getters:{

    },
    mutations:{
        //重置list
        resetList(state,list){
            state.list = list;
        },
        //重置message
        actionMsg(state,message){
            state.message = message;
        },
        // 模态框
        restVisible(state,visible){
            state.visible = visible;
        },
        //重置加载 
        resetLoading(state,loading){
            state.loading = loading;
        }

    },   
    actions:{
        // 批量删除
        handleToBatchDelete(context,ids){
            if(ids.length!==0){return post_arry('/customer/batchDelete',{ids:ids}).then((result)=>{
                context.commit("actionMsg",result.statusText)
                context.dispatch("findAll")
            })}
        },
        deleteById(context,id){
          get('/customer/deleteById?id='+id).then((result)=>{
            context.commit("actionMsg",result.statusText)
            context.dispatch("findAll")
          }) 
        },
        openModel(context){
            context.commit("restVisible",true)
        },
        closeModel(context){
            context.commit("restVisible",false)
            
        },
        saveOrUpdate(context,customer){
          return post('/customer/saveOrUpdate',customer).then((result)=>{
                context.commit("actionMsg",result.statusText)
                context.dispatch("closeModel")
                context.dispatch("findAll")
            })
        },
        findAll(context){
            context.commit("resetLoading",true)
            get('/customer/findAll').then((result)=>{
                context.commit('resetList',result.data);
            }).finally(()=>{
            context.commit("resetLoading",false)
            })
        }
    }}