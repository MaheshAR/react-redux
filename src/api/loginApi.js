import * as apicall from './apiCall';

class LoginApi{
    static login(data){
        const payload = {
            username: data.username,
            password: data.password
        };
        const url = '/api/login';
        const method = 'POST';

        return apicall.apiCall(url, method, data);
    }

    static register(data){
        const payload = {
            username: data.username,
            password: data.password
        };
        const url = '/api/register';
        const method = 'POST';

        return apicall.apiCall(url, method, data);
    }
}

export default LoginApi;