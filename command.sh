npx migrate-mongo create update_user
npx migrate-mongo up
npx migrate-mongo down

npx sequelize-cli model:generate --name User --attributes username:string,name:string,password:string,status_active:boolean
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli migration:generate --name update-user

# dalam seeder di sequelize, kalau mau buat seeder yang depens on model lain, maka diatur berdasarkan urutan executenya nanti di get.
# seeding
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo
npx sequelize-cli db:seed:undo:all

