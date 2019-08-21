# Project API - Rocketseat Bootcamp challenge

This is a API to control projects and tasks. It's is a simple CRUD, implemented in Node JS.
This is  the first challenge presented by Rocketseat Bootcamp.

###Language
Node JS

###Packages
- Express js
- Nodemon

###Data Structure

```json
[
  {
    id: "1",
    title: 'Novo projeto',
    tasks: ['Nova tarefa']
  }
]
```
###Routes

+ POST /projects  
	+ Body format
```JSON
{ id: "#", title: 'test', tasks: [] }
```

+ GET /projects

+ PUT /projects/:id
	+ Body format
```JSON
{ title: 'test'}
```
+ DELETE /projects/:id

+ POST /projects/:id/tasks
	+ Body format
```JSON
{ title: 'test'}
```



