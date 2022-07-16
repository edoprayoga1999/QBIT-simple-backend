const { create, showAll, update, destroy, getProductImage } = require("../models/product.model")
const { success, failed } = require("../helpers/response")
const fs = require('fs');
const deleteFile = (path) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
};

const productController = {
  createProduct: (req, res) => {
    try {
      const { name } = req.body
      const image = req.file.filename
      if (!name) {
        throw Error("name cannot be empty")
      }
      create(name, image)
        .then(() => {
          success(res, {
            code: 200,
            status: "success",
            message: "create product success",
            data: []
          })
        })
          .catch((err) => {
            deleteFile(`./public/${image}`)
            failed(res, {
              code: 500,
              status: "failed",
              message: "failed creating product",
              error: err.message
            })
          })
    } catch (err) {
      deleteFile(`./public/${image}`)
      if (err.message === "Cannot read properties of undefined (reading 'filename')") {
        failed(res, {
          code: 500,
          status: "error",
          message: "internal server error",
          error: "image cannot be empty"
        })
      } else {
          failed(res, {
          code: 500,
          status: "error",
          message: "internal server error",
          error: err.message
        })
      }
    }
  },
  showAllProduct: (req, res) => {
    try {
      showAll()
        .then((result) => {
          success(res, {
            code: 200,
            status: "success",
            message: "get all product success",
            data: result.rows
          })
        })
        .catch((err) => {
          failed(res, {
            code: 500,
            status: "failed",
            message: "failed getting all product",
            error: err.message
          })
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: "error",
        message: "internal server error",
        error: err.message
      })
    }
  },
  updateProduct: async(req, res) => {
    try {
      const { name } = req.body
      const { id } = req.params
      let image
      if (typeof (req.body.image) === 'string') {
        image = req.body.image
      } else {
        image = req.file.filename
      }
      if (!id || !name || !image) {
        throw Error("all field must be filled")
      }
      const prevImage = await getProductImage(id)
      if (prevImage.rowCount) {
        if (prevImage.rows[0].image !== image) {
          deleteFile(`./public/${prevImage.rows[0].image}`)
        }
      }
      update(id, name, image)
        .then((result) => {
          if (result.rowCount) {
            success(res, {
              code: 200,
              status: "success",
              message: "update product success",
              data: []
            })
          } else {
            if (typeof (req.body.image) !== 'string') {
              deleteFile(`./public/${image}`)
            }
            failed(res, {
              code: 500,
              status: "failed",
              message: "failed updating product",
              error: "product not found"
            })
          }
        })
        .catch((err) => {
          if (typeof (req.body.image) !== 'string') {
            deleteFile(`./public/${image}`)
          }
          failed(res, {
            code: 500,
            status: "failed",
            message: "failed updating product",
            error: err.message
          })
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: "error",
        message: "internal server error",
        error: err.message
      })
    }
  },
  deleteProduct: async(req, res) => {
    try {
      const { id } = req.params
      if (!id) {
        throw Error("id cannot be empty")
      }
      const prevImage = await getProductImage(id)
      if (prevImage.rowCount) {
        if (prevImage.rows[0].image) {
          deleteFile(`./public/${prevImage.rows[0].image}`)
        }
      }
      destroy(id)
        .then((result) => {
          if (result.rowCount) {
            success(res, {
              code: 200,
              status: "success",
              message: "delete product success",
              data: []
            })
          } else {
            failed(res, {
              code: 500,
              status: "failed",
              message: "failed deleting product",
              error: "product not found"
            })
          }
        })
        .catch((err) => {
          failed(res, {
            code: 500,
            status: "failed",
            message: "failed deleting product",
            error: err.message
          })
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: "error",
        message: "internal server error",
        error: err.message
      })
    }
  }
}

module.exports = productController