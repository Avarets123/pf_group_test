## О ТЗ
Все пункты тестового задания успешно реализованы.
## Запуск проекта
Для запуска проекта перейдите в папку `infrastructure` и выполните команду `docker compose up --build`. Эта команда запустит проект вместе со всеми необходимыми зависимостями.  
Если зависимости уже запущены, вы можете запустить проект, перейдя в папку `project` и создав файл `.env` потом указав в него все необходимые переменные (в качестве примера оставлен файл `.env.example`).

## O Проекте


Аутентификация осуществляется передачей access токена в заголовок запроса `Authorization: "Bearer \<accessToken\>" 
### Роуты:
- POST /auth/sign-up - регистрация нового пользователя принимает следующий боди:
```
{
  email: string;
  password: string;
  role: admin | user;
}
```
example:
```
curl --location 'http://localhost:3000/auth/sign-up' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "b@sgmail.com",
    "password": "123",
    "role": "admin"

}'
```

- POST /auth/sign-in - аутентификация пользователя, принимает следующий боди:
```
{
  email: string;
  password: string;
}
```
example:
```
curl --location 'http://localhost:3000/auth/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "b@sgmail.com",
    "password": "123",

}'
```

- POST /auth/refresh-tokens - обновление токенов, принимает следующий боди:
```
{
    refresh: string
}
```
example:
```
curl --location 'http://localhost:3000/auth/refresh-tokens' \
--header 'Content-Type: application/json' \
--data '{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzM2MxMGY2LTRmMTItNDU1YS1iNjEzLTEyMGQxNDhmZDZlYSIsImlhdCI6MTc1MTAzMzA2NSwiZXhwIjoxNzUxMDg3MDY1fQ.ZkMWqRFmiwpIjU7xNzf5inQciP2SuE1Of3Cpx8aTRdo"
}'
```

- GET /users - листинг пользователей, принимает следующие квери параметры: `limit`, `offset`, которые указывают сколько записей получаем и от какой записи начинаем выборку. Пользователь с ролью админ может увидеть в листинге и удаленных пользователей
example:
```
curl --location 'http://localhost:3000/articles?offset=2&limit=2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzM2MxMGY2LTRmMTItNDU1YS1iNjEzLTEyMGQxNDhmZDZlYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTAwOTg2NCwiZXhwIjoxNzUxMDEwNzY0fQ.4GZN_uM4YE6AWe6ZWDgd_njsXQ6OeYzl7xtaH8yJTto' \
--data ''
```

- DELETE /users/:userId - удаление пользователя, в параметрах запроса идентификатор пользователя. Роут доступен только админу
example:
```
curl --location --request DELETE 'http://localhost:3000/users/b793ae37-8fc5-49ae-a1ce-6774956ee223' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjMTRiNmJjLTg2NzItNDgzNy04M2Y2LTViYmMwNzM4MGM4NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzUwOTczMjIwLCJleHAiOjE3NTA5NzQxMjB9.hN89_MSsZTa1fIrW-eyqOfUB6tyU8j3x58VvZ7R-CKE' \
--data ''
``` 

- POST /tags - создание нового тега, в параметрах запроса идентификатор пользователя. Роут доступен только админу. Принимает следующий боди:
```
{
  name: string;
}
```
example:
```
curl --location 'http://localhost:3000/tags/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzM2MxMGY2LTRmMTItNDU1YS1iNjEzLTEyMGQxNDhmZDZlYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDk3Mjc2MSwiZXhwIjoxNzUwOTczNjYxfQ.-QyFGNJ2zzcywhkEQOZTTGgHSxmZT7hauGtLGYLtD-o' \
--data '{
    "name": "best"
}'
```

- GET /tags - листинг тегов, принимает следующие квери параметры: `limit`, `offset`, которые указывают сколько записей получаем и от какой записи начинаем выборку.
example:
```
curl --location 'http://localhost:3000/tags/' \
--data ''
```

- POST /articles - создание новой статьи. Роут доступен только админу. Принимает следующий боди:
```
{
  title: string;

  content?: string;

  tagsIds?: string[];

  publishedAt?: Date;
}
```

example:
```
curl --location 'http://localhost:3000/articles/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzM2MxMGY2LTRmMTItNDU1YS1iNjEzLTEyMGQxNDhmZDZlYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTAzNDc5MSwiZXhwIjoxNzUxMDM1NjkxfQ.um_kwwLlOMxnUU0Xdqnvn8pVoBu7T9UlS3DEc_T1g7s' \
--data '{
    "title": "First article34",
    "content": "content",
    "publishedAt": "2025-06-27T03:56:15.693Z"
}'
```

- PATCH /articles/:articleId - обновление статьи. Роут доступен только админу. Принимает следующий боди:
```
{
  title?: string;

  content?: string;

  tagsIds?: string[];

  publishedAt?: Date;
}
```
Если в поле `tagsIds` передать `null` все теги у статьи отвязываются, а если поле пустое или `undefined` теги у статьи остануться как есть, и соответственно если передать в него айдишики тегов эти теги прикрепятся к статье

example:
```
curl --location --request PATCH 'http://localhost:3000/articles/be569d89-4a32-4f2c-aa56-c2f8cac50918' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzM2MxMGY2LTRmMTItNDU1YS1iNjEzLTEyMGQxNDhmZDZlYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTAwNzMzMiwiZXhwIjoxNzUxMDA4MjMyfQ.jbvOI-Cdy74Pj2TZF_y8L5BQ3qQs7jOhiDyCA_DodH4' \
--data '{
    "title": "First article2",
    "content": "content",
    "tagsIds": ["5da035f5-2f13-4f76-bcb9-310e118ca326"],
    "publishedAt": "2025-06-27T03:56:15.693Z"
}'
```

- GET /articles - листинг статей, принимает следующие квери параметры: `limit`, `offset`, которые указывают сколько записей получаем и от какой записи начинаем выборку, также `tags` который позволяет фильтровать статей по тегом. Админ может видеть удаленные и неопубликованные статьи, а неавторизованные или авторизованные но с ролью `user` могут увидеть только опубликованные и не удаленные статьи

example:
```
curl --location 'http://localhost:3000/articles?tags=one&tags=best' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzM2MxMGY2LTRmMTItNDU1YS1iNjEzLTEyMGQxNDhmZDZlYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTAwOTg2NCwiZXhwIjoxNzUxMDEwNzY0fQ.4GZN_uM4YE6AWe6ZWDgd_njsXQ6OeYzl7xtaH8yJTto' \
--data ''
```

- GET /articles/:articleId - получение одной статьи

example:
```
curl --location 'http://localhost:3000/articles/be569d89-4a32-4f2c-aa56-c2f8cac50918' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzM2MxMGY2LTRmMTItNDU1YS1iNjEzLTEyMGQxNDhmZDZlYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTAxMDYxMiwiZXhwIjoxNzUxMDExNTEyfQ.ZJp3_0Uh4DINMtbk2PmLSqiL4LQD2WyNnGOr4jHgVtc'
```


- DELETE /articles/:articleId - удаление статьи. Роут доступен только админу

example:
```
curl --location --request DELETE 'http://localhost:3000/articles/be569d89-4a32-4f2c-aa56-c2f8cac50918' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzM2MxMGY2LTRmMTItNDU1YS1iNjEzLTEyMGQxNDhmZDZlYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTAwNzMzMiwiZXhwIjoxNzUxMDA4MjMyfQ.jbvOI-Cdy74Pj2TZF_y8L5BQ3qQs7jOhiDyCA_DodH4'
```
### Примечание:
Проект написано полностью за сутки без использования ии (только скопировал настройку валидатора с другого проекта).
В проекте допущены некоторые погрешности, которые для прода недопустимы, допущены они в целях упрощения работы и тестирования.
Среди них: Логирование не настроено, тесты и свагер отсутствуют и т.д.