# WORKANDA BACKEND
Este es el backend del desarrollo realizado como parte de la prueba tecnica.
Para funcionar se debe descargar el repositorio cliente desde el siguiente link

[Workanda Cliente](https://github.com/Francisco-Merchan/Workanda-front "Workanda Cliente")

###### Clonar el repositorio
>Abrir la consola y clonar el repositorio

>HTTPS
`git clone https://github.com/Francisco-Merchan/Workanda-back.git`

>SSH
`git clone git@github.com:Francisco-Merchan/Workanda-back.git`

###### Instalar dependencias
>Abrir la consola en la ubicacion donde clono el proyecto y ejecutar el comando
`npm install`

###### Crear base de datos
>El proyecto utiliza una base de datos MySQL, crear una base de datos en case de poseer un cliente de MySQL .
En caso contrario puede descargar MySQL desde el siguiente link
[MySQL](https://dev.mysql.com/downloads/mysql/ "MySQL")
una vez descargardo, accede a MySQL con el siguiente comando
`mysql -u root -p`
luego ejecutar el siguiente comando para crear una base de datos
`CREATE DATABASE IF NOT EXIST workandadb;
USE workandadb;
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  phone VARCHAR(15),
  PRIMARY KEY (id)
);`

######  Configurar Variables de entorno
>Crear un archivo .env y escribir las siguientes variables de entorno
`PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=workandadb
JWT_SECRET_WORD=workanda`

###### Levantar el proyecto
>Ejecutar el comando 
`npm run dev`
