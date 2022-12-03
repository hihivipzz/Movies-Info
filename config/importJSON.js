const db = require('./database');
const fs = require('fs')
const pathDbCast = './db/casts.json'
const pathDbMovie = './db/movies.json'

module.exports = {

    importCast: async () => {
        try {
            const dataBufferCast = fs.readFileSync(pathDbCast);
            const dataJSON = dataBufferCast.toString();
            const data = JSON.parse(dataJSON);

            data.forEach(async cast => {

                const check = await db.any('select * from "Casts" where id = $1', [cast.id])

                if (check.length == 0) {
                    var gender;
                    if (gender = 'male') {
                        gender = true;
                    } else {
                        gender = false;
                    }
                    await db.none('Insert into "Casts" ("id","image","legacyNameText","name","birthDate","birthPlace","gender","heightCentimeters","realName") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [cast.id, cast.image, cast.legacyNameText, cast.name, cast.birthDate, cast.birthPlace, gender, cast.heightCentimeters, cast.realName])

                    if (cast.nicknames != undefined) {
                        cast.nicknames.forEach(async (nickname) => {
                            await db.none('Insert into "Nicknames" ("id","Nickname") VALUES ($1,$2)', [cast.id, nickname]);
                        })
                    }

                }
            });
        }
        catch (e) {
            console.log(e);
        }
    },

    importMovie: async () => {
        try {
            const dataBufferCast = fs.readFileSync(pathDbMovie);
            const dataJSON = dataBufferCast.toString();
            const data = JSON.parse(dataJSON);

            data.forEach(async movie => {

                const check = await db.any('select * from "Movies" where id = $1', [movie.id])

                if (check.length == 0) {
                    var gender;
                    if (gender = 'male') {
                        gender = true;
                    } else {
                        gender = false;
                    }
                    await db.none('Insert into "Movies" ("id","img","title","year","topRank","rating","ratingCount","synopses") VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [movie.id, movie.img, movie.title, movie.year, movie.topRank, movie.rating, movie.ratingCount, movie.synopses, movie.realName])

                    movie.genres.forEach(genre => {
                        db.none('Insert into "Movie Genres" VALUES($1,$2)', [movie.id, genre])
                    });

                    if (movie.review != undefined) {
                        movie.reviews.forEach((review) => {
                            db.none('Insert into "Reviews" ("id_movie","author","authorRating","helpfulnessScore","VotesDown","VotesUp","languageCode","reviewText","reviewTitle","submissionDate")VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [movie.id, review.author, review.authorRating, review.helpfulnessScore, review.interestingVotes.down, review.interestingVotes.up, review.languageCode, review.reviewText, review.reviewTitle, review.submissionDate])
                        })
                    }

                    if(movie.cast != undefined){
                        movie.casts.forEach((cast)=>{
                            if(cast.characters!=undefined){
                                cast.characters.forEach((character)=>{
                                    db.none('Insert into "Casting" ("idMovie","idCast","character") VALUES ($1,$2,$3)',[movie.id,cast.id,character])
                                })
                            }
                           
                        })
                    }

                }

            });


        } catch (e) {
            console.log(e);
        }
    }
}