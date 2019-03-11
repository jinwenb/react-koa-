import {get,post} from './index';
export const List = async (where)=>{
   return  await  get('/api/categories',where)
};
export const create = async (name)=>{
    return await post('/api/categories/create',{name})
}
export const update = async (id,name)=>{
    return await post(`/api/categories/update/${id}`,{name})
}
export const destruction = async (id)=>{
    return await post(`/api/categories/destruction/${id}`)
}
