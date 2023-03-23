const User = require('../models/UserModel');

module.exports.addToLikedMovies = async(req, res)=>{
    try{
        const { email, data } = req.body;
        const user = await User.findOne({ email });
        if(user){
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => ( id === data.id ));

            if( !movieAlreadyLiked ){
                await User.findByIdAndUpdate(
                    user._id,
                    {

                        likedMovies : [...user, likedMovies, data]
                    },
                    { new: true }
                    );
            }
            else{
                return res.status(200).json({ msg: 'Movie already added to the liked list.' });
            }  
        } else { await User.create({ email, likedMovies: [data]}) }
            return res.status(200).json({ msg : 'Movie added successfully'})
    }
    catch(err){
        return res.status(502).json('Error Adding movie')
    }
};

module.exports.getLikedMovies = async(req, res)=>{
    try{
        const { email } = req.params;
        const user = await User.findOne({ email });
        if(user){
            res.status(200).json({ mag: 'Success', movies: user.likedMovies });
        }else return res.status(200).json({ msg: 'User with given email not found.'});
    }
    catch(err){
        return res.send(400).json({ msg: 'Error fetching movie'})
    }
};


module.exports.removeFromLikedMovies = async(req, res)=> {
    try{
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });
        if(user){
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
            const movieAlreadyLiked = likedMovies.find(({ id }) => ( id === data.id ))
            if(!movieIndex) res.status(400).json({ msg: 'Movie not found' });
            likedMovies?.splice(movieIndex, 1)
                await User.findByIdAndUpdate(
                    user._id,
                    likedMovies,
                    { new: true }
                    );
                    return res.status(200).json({ msg: 'Movie Deleted', movies: likedMovies })
        }
    }
    catch(err){
        res.status(404).json({ msg: 'Error deleting movie' });
    }
};
