const db = require("../config/db")

const productModel = {
  create: (name, image) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO product (name, image) VALUES ($1, $2)", [name, image], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  showAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT name, image FROM product ORDER BY id ASC", (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getProductImage: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT image FROM product WHERE id=$1", [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  update: (id, name, image) => {
    return new Promise((resolve, reject) => {
      db.query("UPDATE product SET name=$2, image=$3, updated_at=CURRENT_TIMESTAMP WHERE id=$1", [id, name, image], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM product WHERE id=$1", [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = productModel