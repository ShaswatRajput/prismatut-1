const express = require("express")
const app = express()

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hii there")
})

app.listen(3099,()=>{
    console.log('app listening successfully')
})