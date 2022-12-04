const db = require('../config/database')

module.exports = {
    readMovie : async (id)=>{
        const result = await db.one(`select * from "Movies" where "id"= $1 `,[id])

        return result;
    },

    readMovieGenre: async (id)=>{
        const result = await db.any(`select * from "Movie Genres" where "id" = $1`,[id])
        return result;
    },

    readMovieCast: async(id)=>{
        const result = await db.any(`select distinct * from "Casting" join "Casts" on "idCast"="id" where "idMovie" = $1`,[id])
        return result;
    },

    readReviews: async(id)=>{
        const result = await db.any(`select * from "Reviews" where "id_movie"=$1`,[id]);
        return result;
    }
}