module.exports = {
  success: (res, payload) => {
    const {
      code,
      status,
      message,
      data,
      pagination = false
    } = payload

    const response = {
      code: code || 200,
      status: status || "success",
      message,
      data
    }

    if (pagination) {
      response.pagination = pagination
    }

    res.status(code).json(response)
  },
  failed: (res, payload) => {
    const {
      code,
      status,
      message,
      error
    } = payload

    const response = {
      code: code || 500,
      status: status || 'error',
      message,
      error
    }

    res.status(code).json(response)
  }
}