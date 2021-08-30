# Route

## Daftar Endpoint :

### Tanpa Bearer Token

- /users2 , method yang digunakan GET, POST
- /user2/:id , method yang digunakan PUT, DELETE

### With Bearer Token

- /users , method yang digunakan GET, POST
- /users/:id , method yang digunakan PUT, DELETE (- error -)

### login

- /login , method yang digunakan GET, POST
  - view => login.ejs

### root

- / , render view ejs
  - view => index.ejs

### game

- /game , render view ejs
  - view => game.ejs

### Selain end point di atas

- render view ejs
  - view => 404.ejs

## View dokumentasi API postman

https://www.getpostman.com/collections/2edb23b0bb3504d3d069
