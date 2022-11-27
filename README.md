# Prueba
Una app qué simula un carrito de compras en una farmacia, tiene manejo de usuarios.

  Consta de tres pasos.
  
   el primer paso:
   descargar el proyecto
   Instalar las librerias (npm i )
   ya al tener instalado las librerias
   pasamos al segundo paso.

   Segundo paso: 
   
   Procedemos a cambiar las información qué se encuentra en el archivo config.env (Lo hago Visible en el repositorio para qué sea más sencillo y rápido)
      			
		Ejemplo del documento: 
   			NODE_ENV=development

			DB_HOST=localhost
			DB_USERNAME=postgres (Aquí colocan USERNAME de su Postgres)
			DB_PASSWORD=j2080    (Aquí igual colocan PASSWORD con el que ingresan a Postgres)
			DB_PORT=5432	     (Puerto default)
			DB=farmacia-app      (Así se llama la base de datos)
 

			JWT_SECRET = fc41e25dd558b7a4c40dfa7dafab1c166d6d3b7a62b67f997a80ac6a96289259118d1e8459b44f827af868afeccffa5720f43ae9c982b0049cba341d06e988e5
			(JWT pueden dejarlo así cómo default para el manejo del ingreso al servidor y no tomar más tiempo)



	
   Cabe recalcar qué toda la conexión de la base de datos al node js es de forma Local.
   
   Después crear la base de datos en PostgreSQL, con el mismo nombre de la variable 'DB'.
   
   Por finalizar, colocamos en marcha el servidor de nodejs con (npm start) y queda activado el servidor.


  Tercer paso:

  Ya al realizar todo este paso por paso, para ejecutar cada endpoint; utilizamos Postman. De igual forma dejaré documentado todo para qué así sea solamente
  exportar a Postman y probar.


  Ya qué hice todo de forma local, al ejecutar este proyecto en su computadora, vendrá en blanco. Pero puedes crear la información para realizar la prueba. No necesita información
  muy compleja.

  LINK DE DOCUMENTACIÓN: https://documenter.getpostman.com/view/22441762/2s8YsuwCeS


  Muchas gracias por su tiempo.
