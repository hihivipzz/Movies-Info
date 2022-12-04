const db = require('../configs/database')

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

    readReviews: async(id,skip,take)=>{
        const result = await db.any(`select * from "Reviews" where "id_movie"=$1 offset $2 ROWS FETCH NEXT $3 ROWS ONLY`,[id,skip,take]);
        return result;
    },

    countReviews: async (id)=>{
        const result = await db.one(`select count(*) from "Reviews" where "id_movie"=$1`,[id])
        return result;
    }
}