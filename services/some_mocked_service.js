exports.some_fn = (a)=>{
    return a
}

exports.some_fn_async = async (a)=>{
    const f = new Promise((resolve, reject)=>{
        resolve(a)
    })

    return f
}


// async function run(){
//     console.log(await exports.some_fn_async(10)) // must call with this due some_fn_async in scope of exports
// }
// run()
