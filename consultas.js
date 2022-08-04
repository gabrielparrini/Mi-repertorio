const { Pool } = require("pg");
const config = {
  user: "postgres",
  host: "localhost",
  database: "repertorio",
  password: "123456",
  port: 5432,
};
const pool = new Pool(config);

//INSERTAR
const insertarCanciones = async (datos) => {
  const values = Object.values(datos);

  const consulta = {
    text: "INSERT INTO canciones (titulo, artista, tono) values($1, $2, $3)",
    values,
  };
  const result = await pool.query(consulta);
  return result;
};

//GET
const getCanciones = async () => {
  const { rows } = await pool.query("SELECT * FROM canciones");
  return rows;
};

//EDIT
const editCanciones = async (cancion) => {
  const values = Object.values(cancion);

  const consulta = {
    text: "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *",
    values,
  };
  const { rows } = await pool.query(consulta);
  return rows;
};

//DELETE
const eliminarCancion = async (id) => {
  const { rows } = await pool.query(`DELETE FROM canciones WHERE id = ${id}`);
  return rows;
};

module.exports = {
  insertarCanciones,
  getCanciones,
  editCanciones,
  eliminarCancion,
};
