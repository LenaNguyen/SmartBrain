const handleRegister = (req, res, db, bcrypt) =>{
    const {email, name, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('missing fields');
    }
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(users => {
                res.json(users[0]);
            })
        })
        .then(trx.commit)
        .catch(err => {trx.rollback; return res.json(err)});
    }).catch(err => {
        res.status(400).json(err);
    })
}

module.exports = {
    handleRegister: handleRegister
}
