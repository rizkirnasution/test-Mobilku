const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/user.models')
const commonHelper = require('../helper/common')

const userController = {  

    getAllUsers: (req, res) => {
        userModel
        .selectAll()
          .then(
            result => commonHelper.response(res, result.rows, 200, "get All data success")
          )
          .catch(err => res.send(err)
          )
      },
    
      insert: async(req, res) => {
        const PORT = process.env.PORT || 5000
        const DB_HOST = process.env.DB_HOST || 'localhost'
        // const file = req.file;
        const foto = req.file.filename;
        const { nama, tanggal_lahir, usia, no_whatsapp, pendidikan_terakhir} = req.body
        const {rows: [count]} = await userModel.countUsers()
        // const id = Number(count.count)+1;
    
        // let photo = await uploadGoogleDrive(file);
    
        const data ={
            id: uuidv4(),
            nama,
            tanggal_lahir,
            usia,
            no_whatsapp,
            pendidikan_terakhir,
            foto:`http://${DB_HOST}:${PORT}/img/${foto}`,
        //   photo: `https://drive.google.com/thumbnail?id=${photo.id}&sz=s1080`,
       
        }
        userModel.insert(data)
          .then(
            result => commonHelper.response(res, result.rows, 201, "User created")
          )
          .catch(err => res.send(err)
          )
      },
      update: async(req, res, next) => {
        try{
          const PORT = process.env.PORT || 5000
          const DB_HOST = process.env.DB_HOST || 'localhost'
        //   const id = Number(req.params.id)
            const { id } = req.params;
          const foto = req.file.filename;
          const {rowCount, rows} = await userModel.findId(id)
          if(!rowCount){
            return next(createError(403,"ID is Not Found"))
          }
    
          const { nama, tanggal_lahir, usia, no_whatsapp, pendidikan_terakhir} = req.body
          
          const data ={
            id,
            nama,
            tanggal_lahir,
            usia,
            no_whatsapp,
            pendidikan_terakhir,
            foto:`http://${DB_HOST}:${PORT}/img/${foto}`
          }
          userModel.update(data)
            .then(
              result => commonHelper.response(res, result.rows, 200, "User updated")
              )
              .catch(err => res.send(err)
              )
            }catch(error){
              console.log(error);
            }
      }
}

module.exports = userController