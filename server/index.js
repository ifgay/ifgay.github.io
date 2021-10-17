const express = require('express')

const config={
    port:8080
}

let app=express()
app.listen(config.port,()=>{
    console.log(`start port http://localhost:${config.port} ...`);
})


app.use(express.static('public'))