import {get, post} from '../axios'
export default{
    namespaced:true,

    state:{
        name:"product",
        list:[],
        visible:false,
        title:"添加产品",
        message:"",
    },
    getters:{

    },
    mutations:{
        resetList(state,list){
            state.list = list
        },
        resetVisible(state,visible){
            state.visible = visible
        },
        resetTitle(state,title){
            state.title = title
        },
        resetMessage(state,message){
            state.message = message
        },
        actionMsg(state,message){
            state.message = message
        },
       
    },
    actions:{
        // 打开模态框
        openModel({commit},visible){
            commit("resetVisible",true)
        },
        //关闭模态框
        closeModel({commit},visible){
            commit("resetVisible",false)
        },
        // 分页查询
        query({commit},params){
            post("/product/queryProductCascadeCategory",params)
            .then((result)=>{
                commit('resetList',result.data)
            })
        },
        //删除
        deleteById(context,id){
            get("/product/deleteById?id="+id).then((result)=>{
                context.commit("actionMsg",result.statusText)
            })

        }, 
        //修改
      
        // 保存并更新
        saveOrUpdate(context,product){
           return post('/product/saveOrUpdate',product).then((result)=>{
                context.commit('resetMessage',result.statusText);
                // 关闭模态框
                context.dispatch('closeModel')
            })
        }
    }
}