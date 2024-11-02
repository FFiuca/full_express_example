const app = require('./app')

const PORT = process.env.PORT || 3001
// console.log(process, process.env)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
