const express = require("express");

const fs = require("fs");
const {
  insertarCanciones,
  getCanciones,
  editCanciones,
  eliminarCancion,
} = require("./consultas");

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

app.use(express.static("assets"));
//RUTAS
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//INSERTAR
app.post("/cancion", async (req, res) => {
  try {
    const datos = Object.values(req.body);

    const respuesta = await insertarCanciones(datos);

    res.json(respuesta);
  } catch (error) {
    res.status(500).send("Algo salió mal :/ ...");
  }
});

//GET
app.get("/canciones", async (req, res) => {
  try {
    const canciones = await getCanciones();
    res.json(canciones);
  } catch (error) {
    res.status(500).send("Algo salió mal :/ ...");
  }
});

//PUT
app.put("/cancion", async (req, res) => {
  try {
    const { id } = req.query;
    const cancion = req.body;
    cancion.id = id;

    const result = await editCanciones(cancion);
    res.json(result);
  } catch (error) {
    res.status(500).send("Algo salió mal :/ ...");
  }
});

//DELETE
app.delete("/cancion", async (req, res) => {
  try {
    const { id } = req.query;
    await eliminarCancion(id);
    res.send("Canción eliminado con éxito");
  } catch (error) {
    res.status(500).send("Algo salió mal :/ ...");
  }
});
