const db = require('../database/models');

const getAllGenres = async () => {

    try {
        const genres = await db.Genre.findAll({
            attributes : {
                exclude : ['created_at','updated_at']
            },
            include : [
              {
                association : 'movies',
                attributes : ['id','title']
              }  
            ]
        });
        return genres

    } catch (error) {
        console.log(error);
        throw {
            status : 500,
            message : error.message
        }
    }
}

const getGenreById = async (id) => {
    try {
        if (!id) {
            throw {
                status : 400,
                message : 'ID inexistente'
            }
            
        }
        const genre = await db.Genre.findByPk(id,{
            attributes : {
                exclude : ['created_at','updated_at'],
            },
            include : [
                {
                  association : 'movies',
                  attributes : ['id','title']
                }  
              ]
        });
        return genre

    } catch (error) {
        console.log(error);
        throw {
            status : error.status || 500,
            message : error.message
        }
    }
}

const storeGenre = async (dataGenre) =>{
    try {
        const newGenre = await db.Genre.create(dataGenre);

        return await getGenreById(newGenre.id)


        
    } catch (error) {
        console.log(error);
        throw {
            status : error.status || 500,
            message : error.message || 'ERROR en el servicio'
        }
    }
}


const updateGenre = async (id, dataGenre) => {
    try {
        const {name, ranking, active} = dataGenre

        const genre = await db.Genre.findByPk(id,{
            attributes : {
                exclude : ["created_at","updated_at"]
            }
        });

        if (!genre) {
            throw {
                status : 400,
                message : 'No hay un género con ese ID'
            };
        }
        
        
        genre.name = name?.trim()|| genre.name;
        genre.ranking = ranking || genre.ranking;
        genre.active = active || genre.active;
        

        await genre.save();

        return genre

    } catch (error) {
        console.log(error);
        throw {
            status : error.status || 500,
            message : error.message || 'ERROR en el servicio'
        }
    }
}

const deleteGenre = async (id) => {
    try {
        if (isNaN(id)) {
            throw {
                status : 400,
                message : 'ID incorrecto'
            };
        }

        const genre = await db.Genre.findByPk(id);
        if (!genre) {
            throw {
                status : 400,
                message : 'No hay un género con ese ID'
            };
        }


        await db.Movie.update(
            {
                genre_id : null,
            },
            {
                where : {
                     genre_id : id,
                     
                }
            }
        )

        await genre.destroy()

        return null


        
    } catch (error) {
        console.log(error);
        throw {
            status : error.status || 500,
            message : error.message || 'ERROR en el servicio'
        }
    }
}


module.exports = {
    getAllGenres,
    getGenreById,
    storeGenre,
    updateGenre,
    deleteGenre
}