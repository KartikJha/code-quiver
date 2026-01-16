db.createUser({
  user: "standupfight",
  pwd: "strongpassword",
  roles: [
    { role: "readWrite", db: "standupfightdb" }
  ]
})

mongodb://standupfight:strongpassword@localhost:27017/standupfightdb?authSource=standupfightdb


db.createUser({
  user: "admin",
  pwd: "StrongAdminPassword123",
  roles: [ { role: "root", db: "admin" } ]
})

mongodb://admin:StrongAdminPassword123@localhost:27017/admin?authSource=admin

