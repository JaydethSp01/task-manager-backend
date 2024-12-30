# 🚀 ServerTaskManager

Este proyecto es un servidor RESTful desarrollado con **Node.js**, **Express** y **MongoDB** para gestionar tareas. ✅

El servidor permite crear, leer, actualizar y eliminar tareas. La autenticación de los metodos CRUS se maneja mediante tokens JWT.

## 🌟 Características principales

- **Autenticación JWT**: Generación de tokens seguros.
- **Gestión de tareas**: Crear, leer, actualizar y eliminar tareas.
- **Documentación Swagger**: Explora y prueba la API fácilmente.

## 📁 Estructura del Proyecto

La estructura básica del proyecto es la siguiente:

```
ServerTaskManager/
├── Config/
│   └── db.js            # Configuración de la base de datos (MongoDB)
├── Controller/
│   ├── authController.js # Controlador de autenticación (generación de token)
│   └── taskController.js # Controlador de tareas
├── Middlewares/
│   └── authMiddleware.js # Middleware para verificar token JWT
├── Models/
│   └── Task.js          # Modelo de datos de tareas
├── Routes/
│   └── taskRoutes.js    # Rutas para las operaciones sobre las tareas
├── Tests/
│   └── taskController.test.js # Pruebas automatizadas para el controlador de tareas
├── .env                 # Variables de entorno
├── server.js            # Servidor Express
├── swagger.json         # Documentación Swagger
├── package-lock.json    # Bloqueo de dependencias
└── package.json         # Dependencias del proyecto
```

## 📦 Instalación

### Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js**: [Instrucciones de instalación](https://nodejs.org/)
- **MongoDB**: [Instrucciones de instalación](https://www.mongodb.com/try/download/community)

Adicionalmente, instala las herramientas necesarias para un entorno de Node.js:

```bash
npm install -g express-generator nodemon
```

### Pasos para la instalación

1. **Clonar el repositorio**

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/ServerTaskManager.git
```

2. **Instalar dependencias**

Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias:

```bash
cd ServerTaskManager
npm install
```

Si las dependencias no se instalan correctamente, intenta instalar cada una manualmente con el siguiente comando:

```bash
npm install dotenv express express-validator jsonwebtoken swagger-jsdoc swagger-ui-express cors
npm install --save-dev jest mongoose nodemon supertest
```

3. **Crear el archivo `.env`**

En la raíz del proyecto, crea un archivo `.env` para configurar las variables de entorno. El archivo debe contener las siguientes variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/tasksdb
JWT_SECRET=tu-secreto-aqui
TEST_JWT=tu-token-de-prueba-aqui
```

4. **Conectar la base de datos**

El archivo `Config/db.js` contiene la configuración de conexión a MongoDB. Asegúrate de que MongoDB esté ejecutándose en tu máquina local o en una instancia remota.

5. **Ejecutar el servidor**

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
node server.js
```

Si el servidor se inicia correctamente, deberías ver un mensaje como este en la consola:

```
Server running on port 3000
Connected to MongoDB successfully
```

6. **Acceder a la API**

La documentación Swagger está disponible en la siguiente ruta:

```http
http://localhost:3000/api-docs/
```

## 🔧 Uso de la API

### 1. Generar un token JWT

Antes de usar las rutas protegidas, necesitas generar un token. Para hacerlo, realiza una solicitud GET a la siguiente ruta:

```http
GET /api/generate-token
```

Esto devolverá un JSON con el token, que debes incluir en el encabezado `Authorization` de las siguientes solicitudes:

```json
{
  "token": "tu-token-aqui"
}
```

### 2. Crear una tarea

Para crear una nueva tarea, realiza una solicitud POST a la siguiente ruta, incluyendo el token en el encabezado `Authorization`:

```http
POST /api/tasks
```

El cuerpo de la solicitud debe contener el título de la tarea:

```json
{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea"
}
```

### 3. Obtener todas las tareas

Para obtener todas las tareas, realiza una solicitud GET a la siguiente ruta:

```http
GET /api/tasks
```

### 4. Obtener una tarea por ID

Para obtener una tarea específica, realiza una solicitud GET a la siguiente ruta:

```http
GET /api/tasks/:id
```

Sustituye `:id` con el ID de la tarea que deseas obtener.

### 5. Actualizar una tarea

Para actualizar una tarea, realiza una solicitud PUT a la siguiente ruta:

```http
PUT /api/tasks/:id
```

El cuerpo de la solicitud debe contener los nuevos datos de la tarea:

```json
{
  "title": "Tarea actualizada",
  "completed": true
}
```

### 6. Eliminar una tarea

Para eliminar una tarea, realiza una solicitud DELETE a la siguiente ruta:

```http
DELETE /api/tasks/:id
```

## 🛠️ Problemas comunes

1. **Error al conectar con MongoDB**:

   - Asegúrate de que MongoDB esté ejecutándose y que la URI en el archivo `.env` sea correcta.
   - Puedes verificar el estado de MongoDB con el comando `mongod` en tu terminal.

2. **Dependencias que no se instalan**:

   - Intenta instalar las dependencias manualmente con los comandos descritos en la sección de instalación.

3. **El servidor no responde**:
   - Asegúrate de que el archivo `.env` esté configurado correctamente y que no haya conflictos en el puerto especificado.

## 🧪 Pruebas

El proyecto incluye pruebas automatizadas para la API. Para ejecutarlas, sigue estos pasos:

1. Asegúrate de tener el archivo `.env` configurado correctamente con el token de prueba.
2. Ejecuta las pruebas con el siguiente comando:

```bash
npx jest
```

Las pruebas están ubicadas en el directorio `Tests/` para su ejecucion se debe estar en ese directorio, estan se encargan de verifican el correcto funcionamiento de las rutas y controladores.
Para usar el Test tie es que actualizar la variable de entorno TEST_JWT para esto corremos el proyecto con node server.js y en la Url que nos da por consola vamos a usar el metodo de generate/token y pegamos el valor que nos da el metodo en esa variable de entorno

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
