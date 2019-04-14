const getProfile = (req, res, db) => {
    const { id } = req.params;

    db.select('*').where({
        id: id
    }).from('users')
    .then(user => {
        if(user.length){
            res.json(user);
        } else {
            res.status(400).json('Not found');
        }
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    getProfile: getProfile
}