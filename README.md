# Proyecto Universitario: App para Constructora

Este repositorio contiene el código de un proyecto universitario en el que estamos creando una aplicación para una constructora. La aplicación permitirá gestionar roles y nos servirá para introducirnos en el desarrollo de software y gestión de proyectos a través de levantamiento de requerimientos, épicas, historias de usuario, 3 sprints, creación de módulos, entre otros.

## Tecnologías Utilizadas

- **Backend**: Django REST Framework
- **Frontend**: React
- **Base de Datos**: PostgreSQL
- **Ambiente de Desarrollo**: Docker

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: el backend y el frontend.

El backend, desarrollado con Django REST Framework, se encuentra en la carpeta `backend/`.

El frontend, desarrollado con React, se encuentra en la carpeta `frontend/`.

## Cómo Correr el Proyecto

Para mantener un ambiente de desarrollo consistente entre plataformas, utilizamos Docker. Para correr el proyecto, simplemente ejecuta el siguiente comando:

```bash
docker-compose -f docker-compose.dev.yml up -d --build
```
