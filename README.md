# Prueba Técnica Backend Junior - Fortuna

## Modelado de Datos
### Node.js con MongoDB:
Entregables de esquemas:
- **Usuarios**: nombre, correo, saldo.
- **Eventos Deportivos**: nombre, fecha, tipo de deporte.
- **Apuestas**: usuario, evento, monto apostado, cuota, estado.
  
Rutas de los esquemas: (https://github.com/Issblann/prueba-tecnica-fortuna/tree/main/src/infrastructure/models)

## Backend
He utilizado Clean Architecture para estructurar el proyecto. La separación de responsabilidades incluye las siguientes carpetas y archivos:
- Controladores (controllers/): Gestionan las solicitudes HTTP y las respuestas.
- Servicios (services/): Contienen la lógica de negocio.
- Repositorios (repositories/): Interactúan con la base de datos (MongoDB).
- Entidades (entities/): Representan las entidades del modelo de datos (Usuario, Evento, Apuesta).

Para ver el swagger entrar a: (http://localhost:3000/api-docs)

## Pruebas Unitarias
He implementado pruebas unitarias utilizando Jest para validar la lógica de negocio y las funciones de los controladores.

Las pruebas cubren los archivos que van relacionados con los controladores directamente. 

Para ver el reporte de cobertura aqui: (https://github.com/Issblann/prueba-tecnica-fortuna/tree/main/coverage)

##  Docker 
Se ha configurado Docker para contenerizar el proyecto y facilitar su ejecución en cualquier entorno. El proyecto se compone de dos contenedores:

- API: Contenedor con la aplicación Node.js.
- MongoDB: Contenedor para la base de datos.

Configurar el archivo .env

- PORT=3000
- MONGO_URI_DOCKER=mongodb://mongo:27017/API-Fortuna

Agrega archivo docker-compose-yml

![yml-image-cod](https://github.com/user-attachments/assets/91bbac0c-6886-4c4b-be58-83f2980d0ee8)


Iniciar los Contenedores con Docker Compose

Asegúrate de tener Docker y Docker Compose instalados. Luego, inicia los contenedores utilizando Docker Compose:

docker-compose up --build


##  Instrucciones para ejecutar el proyecto localmente
Prerrequisitos
- Node.js instalado en tu máquina.
- MongoDB instalado localmente o en la nube (por ejemplo, MongoDB Atlas).
  
Pasos para ejecutar:

- Clona este repositorio
- Instala dependencias (npm install)
- Configura la variable de entorno MONGO_URI para conectar la aplicación con MongoDB. (MONGO_URI=mongodb://localhost:27017/API-Fortuna)
- Iniciar aplicacion (npm run start)
