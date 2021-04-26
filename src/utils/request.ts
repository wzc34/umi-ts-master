/*
 * @Description: request
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:05
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';
import configs from '@/configs'
import { StorageKey } from '@/constants'
// import { clearAuthority } from './authority';

const codeMessage: { [status: number]: string } = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const error_code = [
	{code: 0, message: '成功'},
	{code: 1, message: '请求失败'},
	{code: 2, message: '请求太快'},
	// {code: 3, message: '无效的token'},
	// {code: 4, message: '重复绑定token'},
	// {code: 5, message: '账号没有注册'},
    // {code: 6, message: '验证失败'},
	{code: 9, message: '账号已失效，请重新登录'},
]

const responseLog = (response: Response, res: any, options: any) => {

    const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255,
    )},${Math.round(Math.random() * 255)})`;
  
    console.log(
      '%c┍------------------------------------------------------------------┑',
      `color:${randomColor};`,
    );
    console.log('| 请求地址：', response.url);
    console.log('| 请求方式：', options.method);
    console.log('| 请求头：', options.headers);
    console.log('| 请求状态：', response.status);
    console.log('| 请求参数：', options.data || {});
    console.log('| 返回数据：', res);
    console.log(
      '%c┕------------------------------------------------------------------┙',
      `color:${randomColor};`,
    );
 };

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }) => {
    const { response } = error;

    if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;
        notification.error({
            message: `请求错误 ${status}: ${url}`,
            description: errorText,
        });
    } else if (!response) {
        notification.error({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常',
        });
    }

    return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    prefix: configs.server,
    timeout: 10000,
    errorHandler,
    mode: 'cors',
    // credentials: 'include',
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': window.location.href.substring(0, window.location.href.indexOf('//') + 2) + window.location.host
    })
});

// response拦截器, 处理response
request.interceptors.response.use(async(response, options) => {
    
    const res = await response.json();

    res && responseLog(response, res, options); // release to remove

    if(res && res.code && res.code !== 0){
        const findItem: any = error_code.find(item=> res.code === item.code)
        if (findItem) {
            notification.error({
                description: findItem.message,
                message: '请求异常',
            });
            if (res.code === 9) history.push('/user/login')
        }
        if (res.code === 7) return res
        return null
    }
    return res;
});

request.interceptors.request.use((url: string, options) => { // 此处为拦截器，每次发送请求之前判断能否取到token
    let user = localStorage.getItem(StorageKey.currentUser)

    let username = ''
    if (user) username = JSON.parse(user)?.username

    const headers = {
        username: `${username}`,
        // token: '',
    };
    return {
        url,
        options: {...options, headers },
    };

});

function fetch(url: string, options: {method: string, data?: any}) {

    return request(
        url,
        Object.assign({}, options),
    );
}
export default fetch;