#  Plataforma de Reservas - Fullstack App

Aplicación web desarrollada con React y Spring Boot que permite a los usuarios explorar hoteles, realizar reservas y gestionar favoritos.
Desarrollada como Proyecto Final del curso Professional Developer en Digital House.

Full-Stack: React.js (frontend) + Java Spring Boot (backend) + MySQL (base de datos)


##Funcionalidades

- Registro y login de usuarios con autenticación JWT
- Sistema de roles: USER y ADMIN con rutas protegidas
- Exploración de hoteles con filtrado por categorías y características
- Reservas con validación de fechas (sin solapamientos)
- Favoritos por usuario
- Panel ADMIN: CRUD completo de hoteles, categorías y características

##  Tecnologías

### Frontend
Tecnología           Uso
React.js             UI y manejo de estado
JavaScript (ES6+)    Lógica de componentes
CSS3                 Estilos y diseño responsive

### Backend
Tecnología           Uso
Java + Spring Boot   API REST
JPA / Hibernate      ORM y acceso a datos
MySQL                Base de datos relacional
JWT                  Autenticación stateless
Spring Security      Protección de endpoints por rol

## Estructura del proyecto

Proyecto-Final/
├── Frontend/          # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
│   └── public/
└── Backend/           # API Spring Boot
    └── src/main/java/
        ├── controller/
        ├── service/
        ├── repository/
        ├── model/
        └── security/  # JWT + Spring Security

 ## Endpoints principales de la API
Método      Endpoint          Descripción            Rol   
POST        /auth/register    Registro de usuario    Público
POST        /auth/login       Login + token JWT      Público
GET         /hoteles          Listar hoteles         Público
POST        /hoteles          Crear hotel            ADMIN
PUT         /hoteles/{id}     Editar hotel           ADMIN
DELETE      /hoteles/{id}     Eliminar hotel         ADMIN
POST        /reservas         Crear reserva          USER
GET         /favoritos        Ver favoritos          USER

## Autor
Santino Corti — Full-Stack Developer (Junior)

- GitHub: @Cortiih
- LinkedIn: santino-corti-66269a400
- Email: santicor.003@gmail.com        
