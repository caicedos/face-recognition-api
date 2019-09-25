const handleSignin = (req, res, bcrypt, db) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json('incorrect from submission');
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data=>{
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where('email', '=', data[0].email)
            .then(user=>{
                res.json(user)
            })
            .catch(err => res.status(400).json('Unable to signin'))
        }
        return res.status(400).json('wrong credentials')
    })
    .catch(err => res.status(400).json('wrong credential'))

}

module.exports={
    handleSignin
}