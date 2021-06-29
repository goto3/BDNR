# Pruebas de concepto para subsistemas de Strava
A continuación se da una pequeña guía de como ejecutar los subsistemas implementados. Para las bases de datos se adjunta además una pequeña guía para correr ambientes dockerizados

## Activities
El subsistema se implementó como una API Rest. Se incluye una colección de postman para interactuar con el sistema, dentro del directorio `/helpers`

### Pre requisitos
- NodeJS v16
- MongoDb 4.4.5
- Redis 6.2 (Para el uso de Bull)

### Configuración
El proyecto incluye un archivo de configuración en el directorio `config` por si se desea usar puertos no estandar o una ubicación fuera del localhost para el almacenamiento.

### Ejecución
Sobre la ruta de instalación:
```
$ npm i
$ node index.js
```

## Feed
El subsistema se implementó como una API Rest. Se incluye una colección de postman para interactuar con el sistema, dentro del directorio `/helpers`. El feed es automáticamente enviado a través de mensajería desde la aplicación de *Activities*, por lo que para visualizar cambios en el feed de los usuarios se deben generar actividades para los usuarios definidos en `/Feed/config.json` bajo la propiedad "subscribersData" (este es un pequeño Map que simula las conexiones de comunidad, al contener los usuarios y una lista de sus suscriptores).

### Pre requisitos
- NodeJS v16
- Redis 6.2

### Configuración
El proyecto incluye un archivo de configuración en el directorio `config` por si se desea usar puertos no estandar o una ubicación fuera del localhost para el almacenamiento. También pueden agregarse mas usuarios y cambiar los parámetros de seguimiento entre ellos para verlo reflejado en el Feed.

### Ejecución
Sobre la ruta de instalación:
```
$ npm i
$ node index.js
```

## Comandos de docker

### MongoDb
```
$ docker pull mongo
$ docker run --name mongo-bdnr -p 27017:27017 -d mongo:latest
```

### Redis
```
$ docker pull redis
$ docker run --name redis-bdnr -p 6379:6379 -d redis
```

Para ejecutar comandos en la consola de redis (Redis-cli):
```
$ docker exec -i redis-bdnr redis-cli
```

