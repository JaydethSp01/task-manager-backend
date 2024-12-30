require("dotenv").config({ path: "../.env" });
const request = require("supertest");
const mongoose = require("mongoose");
const connectDB = require("../Config/db");
const app = require("../server");

describe("Pruebas de la API de tareas", () => {
  let jwtToken;
  let taskId;

  beforeAll(async () => {
    jwtToken = `Bearer ${process.env.TEST_JWT}`;
    if (!jwtToken) {
      throw new Error(
        "El token JWT no está configurado en las variables de entorno."
      );
    }

    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Debe crear una tarea con éxito", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Nueva Tarea", description: "Descripción de la tarea" })
      .set("Authorization", jwtToken);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Nueva Tarea");
    taskId = res.body._id;
  });

  it("Debe devolver una lista de tareas", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", jwtToken);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Debe devolver una tarea específica por ID", async () => {
    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", jwtToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", taskId);
  });

  it("Debe actualizar una tarea existente", async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: "Tarea Actualizada", completed: true })
      .set("Authorization", jwtToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Tarea Actualizada");
    expect(res.body.completed).toBe(true);
  });

  it("Debe eliminar una tarea por ID", async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", jwtToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("mensaje", "Tarea eliminada con éxito.");
  });

  it("Debe devolver un error 404 al intentar obtener una tarea no existente", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .get(`/api/tasks/${invalidId}`)
      .set("Authorization", jwtToken);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("mensaje", "Tarea no encontrada.");
  });

  it("Debe devolver un error 400 al intentar crear una tarea sin título", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({})
      .set("Authorization", jwtToken);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errores");
    expect(res.body.errores[0].msg).toBe('El campo "title" es obligatorio.');
  });

  it("Debe devolver un error 401 si no se proporciona el token de autenticación", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("mensaje", "No se proporcionó un token.");
  });

  it("Debe devolver un error 401 si el token es inválido", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", "Bearer token-invalido");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("mensaje", "Token inválido o expirado.");
  });

  it("Debe devolver un error 500 en caso de error interno del servidor", async () => {
    jest.spyOn(mongoose.Model, "find").mockImplementationOnce(() => {
      throw new Error("Error inesperado en el servidor");
    });

    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", jwtToken);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("mensaje", "Error al obtener las tareas.");
  });
});
