import {get,post} from './index';
export const ArticlesList = async (where)=>{
   return  await  get('/api/articles',where)
};
export const create = async (result)=>{
    return await post('/api/articles/create',{...result})
}
export const update = async (id,name)=>{
    return await post(`/api/articles/update/${id}`,{name})
}
export const destruction = async (id)=>{
    return await post(`/api/articles/destruction/${id}`)
}
export const AddPv = async (id)=>{
    return await post(`/api/articles/update/pv/${id}`)
}