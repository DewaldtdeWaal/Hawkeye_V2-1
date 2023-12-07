const bcrypt = require("bcrypt")

bcrypt.hash("",10).then( (pword) => {
    console.log(pword)
})