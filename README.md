# superhero
1) curl -X GET http://127.0.0.1:3000/getHeroStats

Вернёт json объект с характеристиками героя. 
Если параметры не устанавливались, то вернёт дефлотные характеристики:
{"name":"","strength":0,"dexterity":0,"intellect":0,"isInvincible" :false}


2) curl -d '{"name":"Batman","strength":10,"dexterity":10,"intellect":10,"isInvincible" :true}' -H 'Content-Type: application/json' -X POST http://127.0.0.1:3000/setHeroStats

Изменит характеристики героя и вернёт новые.

3) curl -d '{"nam":"Batman","strength":"10","dexterity":10.1,"intellect":10,"isInvincible" :true}' -H 'Content-Type: application/json' -X POST http://127.0.0.1:3000/setHeroStats
post запрос с ошибками

Вернёт список ошибок 
{"errors":
    [
        {"error":"name is required"},
        {"error":"nam is excess"},
        {"error":"name must be String"},
        {"error":"strength must be Integer"},
        {"error":"dexterity mustbe Integer"}
    ]
}

4) curl -X GET http://127.0.0.1:3000/getHeroImage

Вернёт картинку, если она есть либо ошибку 

5) curl -X POST -F "heroImage=@\superhero\test\correctImage.jpg"  http://127.0.0.1:3000/uploadHeroImage

Загружает картинку
Удаляет старую и загружает новую
Возвращает сообщение
{"message":"Image uploaded"}

6) curl -X POST -F "heroImage=@\superhero\test\bigImage.gif"  http://127.0.0.1:3000/uploadHeroImage

Загрузка слишком большой картинки 
Возвращает ошибку
{"error":"Image too large"}

7) curl -X POST -F "heroImage=@\superhero\test\incorrectType.js"  http://127.0.0.1:3000/uploadHeroImage

Загрузка не картинки
Возвращает ошибку
{"error":"Image not uploaded"}

8) curl -X POST -F "badField=@\superhero\test\incorrectType.js"  http://127.0.0.1:3000/uploadHeroImage

Попытка загрузить картинку с другим ключом
Возвращает ошибку
{"error":"Unexpected field"}



