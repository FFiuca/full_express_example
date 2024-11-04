exports.get_random_array = (arr)=>{
    if (arr.length==0)
        return undefined

    const idx = Math.floor(Math.random()* arr.length)
    return arr[idx]
}
