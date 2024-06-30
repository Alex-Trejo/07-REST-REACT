# Utiliza la imagen oficial de MySQL versión 8
FROM mysql:8

# Variables de entorno para configurar la base de datos
ENV MYSQL_ROOT_PASSWORD=150919
ENV MYSQL_DATABASE=rest_api_db

# Puerto por defecto de MySQL
EXPOSE 3306

# Comando por defecto al ejecutar el contenedor
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]
