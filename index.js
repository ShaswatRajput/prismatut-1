const express = require("express")
const app = express()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

app.use(express.json())

app.get("/",async (req,res)=>{
    const allUsers  = await prisma.user.findMany();
    res.json(allUsers)
})
app.put("/:id",async(req,res)=>{
    const id = req.params.id
    const newAge = req.body.age
    const updateData = await prisma.user.update({
        where:{id:parseInt(id)},
        data:{age:newAge}
    })
    res.json(updateData)
})
app.post("/",async(req,res)=>{
    const newUser = await prisma.user.create({data:req.body})
    res.json(newUser)
})
app.post("/houses",async(req,res)=>{
    
    const newHouse = await prisma.houses.create({data:req.body})
    res.json({
        newHouse
    })
})

app.delete("/:id",async(req,res)=>{
    const id = req.params.id
    const deleteData = await prisma.user.delete({
        where: {id: parseInt(id)}
    })
    res.json({
        deleteData
    })
})

app.get("/houses",async(req,res)=>{
    const houses = await prisma.houses.findMany({
        include:{
            owner:true,
            builtBy:true
        }
    });
    res.json({
        houses
    })
})
app.listen(3099,()=>{
    console.log('app listening successfully')
})