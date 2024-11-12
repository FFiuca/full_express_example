const svc = require('../services/some_mocked_service')

exports.some_runner = (a)=>{
    return svc.some_fn(a)
}

exports.some_runner_async = async (a)=>{
    return await svc.some_fn_async(a)
}

// async function run(){
//     console.log(await exports.some_runner_async(7))
// }
// run()
