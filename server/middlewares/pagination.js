export const paginate = (model) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)

      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      const data = {}

      if (endIndex < (await model.countDocuments().exec())) {
        data.next = {
          page: page + 1,
          limit: limit,
        }
      }

      if (startIndex > 0) {
        data.previous = {
          page: page - 1,
          limit: limit,
        }
      }

      data.data = await model.find().limit(limit).skip(startIndex).exec()
      res.paginate = data
      next()
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message })
    }
  }
}
