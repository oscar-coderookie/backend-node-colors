const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require("./../models/User");

const users = [
    {
        "name": "Oscar serna",
        "emoji": ":D",
        "email": "oscar@correo.com",
        "password": "1223344",
        "favPalettes": []
    },
    {
        "name": "Diana maría",
        "emoji": ":D",
        "email": "dianamar@correo.com",
        "password": "1223344",
        "favPalettes": []
    },
    {
        "name": "Eduardo serna",
        "emoji": ":D",
        "email": "oscar@correo.com",
        "password": "1223344",
        "favPalettes": []
    },

]

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async()=> {
    const allUsers = await User.find();

    if(allUsers.lenght) {
        await User.collection.drop();
        console.log("Drop database");
    }
}).catch((err)=> console.log(`Error deleting data: ${err}`))
.then(async()=>{
    await User.insertMany(users);
    console.log("Database created");
})
.catch((err)=> console.log(`Error creating data: ${err}`))
.finally(()=> mongoose.disconnect());

