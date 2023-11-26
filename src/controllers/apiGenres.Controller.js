const { getAllGenres, getGenreById ,storeGenre, updateGenre, deleteGenre} = require("../services/genres.services")

module.exports = {
    index :async(req,res) => {
            try {
                const genres = await getAllGenres()
                return res.status(200).json({
                    ok : true,
                    data : genres
                })
                
            } catch (error) {
                console.log(error)
                return res.status(error.status || 500).json({
                    ok : false,
                    status :error.status || 500,
                    error : error.message || 'Upss, hubo un error'
                })
            }
    },
    show : async (req,res) => {
        try {
            const genre = await getGenreById(req.params.id)
            return res.status(200).json({
                ok : true,
                data : genre
            })
            
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                status :error.status || 500,
                error : error.message || 'Upss, hubo un error'
            })
        }

    }, 
    store : async (req,res) => {
        try {
            const {name,ranking,active} = req.body;
            if([name,ranking,active].includes('' || undefined)){
                throw createError(400,'Todos los campos son obligatorios')
            }
             
             const genre = await storeGenre(req.body);
            return res.status(200).json({
                ok : true,
                message : 'Género agregado con éxito',
                url : `${req.protocol}://${req.get('host')}/api/v1/genres/${genre.id}`
            })
            
        }catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                status :error.status || 500,
                error : error.message || 'Upss, hubo un error'
            })
        }

    },
    update : async (req,res) => {
        try {
           const genreUpdated = await updateGenre(req.params.id, req.body);
            
           return res.status(200).json({
            ok : true,
            message : 'Género actualizado con éxito',
            data : genreUpdated
        })

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                status :error.status || 500,
                error : error.message || 'Upss, hubo un error'
            })
        }
    },
    delete :async (req,res) => {
        try {
           await deleteGenre(req.params.id);

            return res.status(200).json({
                ok : true,
                message : 'Género eliminado con éxito',
                
            }) 
            
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                status :error.status || 500,
                error : error.message || 'Upss, hubo un error'
            })
        }
    }
    

}