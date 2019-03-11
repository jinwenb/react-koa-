import axios from 'axios';

let config = {
    baseURL: 'http://localhost:7001',
    timeout: 8000,
    withCredentials: true
};
export const get = async (url, params = {}) => {
    let where = [];
    Object.keys(params).forEach(key => where.push(`${key}=${params[key]}`));
    url = config.baseURL + url + '?' + where.join('&');
    return await axios.get(
        url
    ).then(res => res.data)
};
export const post = async (url, data = {}) => {
    let where = [];
    Object.keys(data).forEach(key => where.push(`${key}=${data[key]}`));
    url = config.baseURL + url + '?' + where.join('&');

    return await axios({
        url,
        method: 'post',
    }).then(res => res.data)
};
export const del = async (url, data) => {
    return await axios({
        url,
        method: 'del',
        data,
        ...config
    })
};
export const put = async (url, data) => {
    return await axios({
        url,
        method: 'put',
        data,
        ...config
    })
};