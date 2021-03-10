export const sendConnection = async (apiURL, data) => {
    console.log(data)
    let connectionData = new Promise((resolve, reject)=>{
        fetch(apiURL + '/api/connection', {
            method: 'POST',
            body: JSON.stringify({
                data
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((data)=>{
            console.log(data)
            resolve(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    return connectionData
}


export const getUser = async (apiURL, username) => {
    let getChannel = new Promise((resolve, reject)=>{
        fetch(apiURL + '/api/getUser/' + username)
        .then((data)=>{
            data.json()
            .then((res)=>{
                resolve(res)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    return getChannel
}