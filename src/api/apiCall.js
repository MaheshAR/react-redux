import $ from 'jquery'; 

export function apiCall(url, method, data){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: method,
            url: url,
            data: data
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(error){
            reject(error.responseJSON);
        });
    });
}