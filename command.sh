npx migrate-mongo create update_user
npx migrate-mongo up
npx migrate-mongo down

npx sequelize-cli model:generate --name User --attributes username:string,name:string,password:string,status_active:boolean
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all -to namefile
npx sequelize-cli migration:generate --name update-user

npx cross-env NODE_ENV=test npx sequelize-cli db:migrate

# dalam seeder di sequelize, kalau mau buat seeder yang depens on model lain, maka diatur berdasarkan urutan executenya nanti di get.
# seeding
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo
npx sequelize-cli db:seed:undo:all

# cli node js
# if you have run script in your package.json and want by pass when you run in terminal. just use : npx jest

# test
# for mongoose, it is auto migrate when you invoke the model. so doesn't need to  run migrate command like sequelize.

## note
# 1. to change TZ in node js. just set TZ in your process.env.TZ. in windows you can get easy by cross-env plugin
# 2. i think the best way to structurizing mongoddb is like sql. use normalization and denormalization in good place. embedded doc gain more powerfull perfromance but less integrity and give more redundant and sizes. for relationship is making less for read performace than embedded.
## end note

##
# 1. $unwind : gunanya untuk memecah  array menjadi array baru yang berisi satu elemen saja. hasil akhirnya bisa kaya select * from detail inner join master. jadi povnya dari detail. tapi pakainya harus bijak, terkadangan bisa malah kaya kombinasi
# 2. agregate pass array and execute one by one from beginning
# 3. jest mock : https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
##
