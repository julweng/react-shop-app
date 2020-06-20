const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")
const { Product } = require("../models/Product")
const multer = require("multer")

/**
|--------------------------------------------------
| Product
|--------------------------------------------------
*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg and png are allowed"), false)
    }
    cb(null, true)
  }
})

const upload = multer({ storage: storage }).single("file")

router.post("/uploadImage", auth, (req, res) => {
  // after getting image client
  // save it inside server
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err })
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename
    })
  })
})

router.post("/uploadProduct", auth, (req, res) => {
  // save submitted data to database
  const product = new Product(req.body)
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err})
    return res.status(200).json({ success: true })
  })
})

module.exports = router
