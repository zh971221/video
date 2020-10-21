import {get,post,post_arry} from '../axios'
export default{
    namespaced:true,
    state:{
        list:[],
        msg:''
    },
    getters:{

    },
    mutations:{
        resetlist(state,list){
            state.list = list
        },
        actionMsg(state,msg){
            state.msg = msg
        }
    },
    actions:{
        findAll(context){
            get('/comment/findAll').then((result)=>{
                context.commit('resetlist',result.data)
            })
        },
        deleteById(context,id){
            get('/comment/deleteById?id='+id).then((result)=>{
                context.commit("actionMsg",result.statusText)
                context.dispatch("findAll")
            })
        }
    }
}