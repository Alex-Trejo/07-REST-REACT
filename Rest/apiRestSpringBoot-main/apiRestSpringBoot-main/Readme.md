# Laboratorio de API Rest con Spring Boot

## Descripción

Este proyecto es un laboratorio de API Rest con Spring Boot, en el cual se implementan los siguientes servicios:

- Creación de un API Rest con Spring Boot
- Creación de un Contenedor Docker para la base de datos de la aplicación en MySQL
- Creación de las entidades Maker y Product
- Creación de los repositorios MakerRepository y ProductRepository
- Creación de los servicios MakerService y ProductService
- Creación de los controladores MakerController y ProductController
- Pruebas de los servicios con Thunder Client

## Requisitos

- Java 17
- Maven
- Docker
- Docker Compose
- Thunder Client

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/statick88/apiRestSpringBoot.git
```

2. Ingresar al directorio del proyecto

```bash
cd apiRestSpringBoot
```

3. Crear el contenedor de la base de datos

```bash
docker-compose up -d
```

4. Compilar el proyecto

```bash
mvn clean package
```

5. Ejecutar el proyecto

```bash
java -jar target/apiRestSpringBoot-0.0.1-SNAPSHOT.jar
```

6. Probar los servicios con Thunder Client
7. Detener el contenedor de la base de datos

```bash
docker-compose down
```

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
