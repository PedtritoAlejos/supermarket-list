# supermarket-list
### INSTALACIÓN DEL PROYECTO 

 - Descargar el proyecto desde github y posicionarse dentro del proyecto descargado "supermarket-list"
```sh
$ git clone https://github.com/PedtritoAlejos/supermarket-list.git 
```

 - Instalar las dependencias
```sh
$ npm install
```
 - Crear el archivo .env con las deficiones
 
 ```sh
DATABASE=mongodb://localhost:27017/supermarlet-list
PORT=3000
JWT_SECRET=142bagsdt273hsghef6
```
- Iniciar el proyecto 
 ```sh
$ npm start
```

Si se realizaron todos los pasos, la consola debería verse de la siguiente manera:

```sh
pealejosb@ubunto:/opt/pealejosb/test-repo/supermarket-list$ ls -l
total 148
-rw-r--r--   1 pealejosb pealejosb   2608 ene  2 21:26 app.js
drwxr-xr-x   2 pealejosb pealejosb   4096 ene  2 21:26 controllers
drwxr-xr-x   2 pealejosb pealejosb   4096 ene  2 21:26 helpers
drwxr-xr-x   2 pealejosb pealejosb   4096 ene  2 21:26 models
drwxr-xr-x 292 pealejosb pealejosb  12288 ene  2 21:28 node_modules
-rw-r--r--   1 pealejosb pealejosb   1087 ene  2 21:26 package.json
-rw-r--r--   1 pealejosb pealejosb 105455 ene  2 21:26 package-lock.json
-rw-r--r--   1 pealejosb pealejosb    417 ene  2 21:26 README.md
drwxr-xr-x   2 pealejosb pealejosb   4096 ene  2 21:26 routes
drwxr-xr-x   2 pealejosb pealejosb   4096 ene  2 21:26 validator
pealejosb@ubunto:/opt/pealejosb/test-repo/supermarket-list$ npm start

> supermarket-list@1.0.0 start /opt/pealejosb/test-repo/supermarket-list
> nodemon app.js -e js,yaml

[nodemon] 1.19.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node app.js`
Server is running on port 3000
DB Connected


```

### DOCUMENTACIÓN CON SWAGGER
Link : http://localhost:3000/api-docs/
