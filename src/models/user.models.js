const db = require("../config/db");

const selectAll = () => {
    return db.query(`SELECT * FROM users;`);
}

const insert = (data) => {
    const { id, nama, tanggal_lahir, usia, no_whatsapp, pendidikan_terakhir, foto } = data
    return db.query(`INSERT INTO users(id, nama, tanggal_lahir, usia, no_whatsapp, pendidikan_terakhir, foto) VALUES('${id}','${nama}','${tanggal_lahir}', ${usia}, '${no_whatsapp}', '${pendidikan_terakhir}', '${foto}')`)
  }
const update = (data) => {
    const { id, nama, tanggal_lahir, usia, no_whatsapp, pendidikan_terakhir, foto } = data
    return db.query(`UPDATE users SET nama='${nama}', tanggal_lahir='${tanggal_lahir}', usia=${usia}, no_whatsapp='${no_whatsapp}', foto='${foto}', pendidikan_terakhir='${pendidikan_terakhir}' WHERE id='${id}'`)
}

const findId =(id)=>{
  return  new Promise ((resolve,reject)=> 
  db.query(`SELECT id FROM users WHERE id='${id}'`, (error, result)=>{
    if(!error){
      resolve(result)
    }else{
      reject(error)
    }
  })
  )
}

const countUsers = () => {
  return db.query(`SELECT COUNT(*) FROM users`);
}

module.exports = {
  selectAll,
  insert,
  update,
  findId,
  countUsers
}