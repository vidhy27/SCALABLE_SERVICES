
# Scalable Services Assignment

## Microservice Based Blogging Application**

**#Tech:docker
BACKEND:NODE.JS
DATABASE: POSTGRESQL,MONGO**


This project is a microservices-based blogging platform.

It demonstrates how to design and implement a scalable, maintainable application using a microservices architecture. 

**The platform consists of the following services:**

- **User Service**: Manages user registration, authentication, and profile management.
    - Link to Repo: https://git.foss.life/axel/ss-assignment-user-service
- **Post Service**: Handles creating, retrieving, updating, and deleting blog posts.
    - Link to Repo: https://github.com/vidhy27/SCALABLE_SERVICES
- **Comment Service**: Allows users to add comments to posts, retrieve comments, and delete their own comments.
    - Link to Repo: https://git.foss.life/axel/ss-assignment-comment-service
- **Like Service**: Enables users to like or unlike posts and keeps track of the number of likes per post.
    - Link to Repo: https://github.com/freakcap/LikeMicroservice
- **API Gateway**: Acts as a single entry point to the system, routing client requests to the appropriate services and handling cross-cutting concerns like authentication and logging.
    - Link to Repo: https://github.com/vidhy27/SCALABLE_SERVICES/blob/main/ss-assignment-api-gateway.zip
Services communicate with each other using synchronous HTTP/REST calls. Authentication is managed using JSON Web Tokens (JWT), with the API Gateway centralizing authentication and authorization to ensure secure and consistent access control across all services.

This application serves as a foundation for building complex, distributed systems and can be extended with additional features and services as needed.

### Video Links

- Video #1: https://drive.google.com/file/d/1syYOzdtyGnBaRrZ3QlkEVrRPYwLpBoXh/view?usp=drive_link
- Video #2: https://drive.google.com/file/d/1b5sYK2bK_PYpOY8RbW7n9lTSqIEsG_d9/view?usp=drive_link

### Submitted By

 | Name                         | Student #   |
 | ---------------------------- | ----------- |
 | Kuchibhotla Abhirama Krishna | 2023TM93673 |
 | Vidhya V                     | 2023TM93607 |
 | Kulkarni Pranav Jagadish     | 2023TM93617 |
 | Anusha K                     | 2023TM93552 |
