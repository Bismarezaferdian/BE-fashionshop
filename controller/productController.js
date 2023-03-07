const Product = require("../model/Product");
const cloudinary = require("../middleware/cloudinary");
const CategoriesProducts = require("../model/CategoriesProducts");

const fs = require("fs-extra");
const path = require("path");
// const cloudinary = require("cloudinary").v2;

const productController = {
  upload: (req, res) => {
    console.log(req.files);
  },
  addProduct: async (req, res) => {
    console.log(req.files);
    try {
      // console.log(req.files);
      const imgDetail = [];
      for (let i = 0; i < req.files?.length; i++) {
        if (req.files[i].fieldname === "imgDetail") {
          const Detail = await cloudinary.uploader.upload(req.files[i].path, {
            width: 480,
            height: 480,
            crop: "fill",
          });

          const newImgDetail = {
            publicId: Detail.public_id,
            imgId: req.files[i].filename,
            imgUrl: Detail.secure_url,
          };
          // console.log(Detail);
          imgDetail.push(newImgDetail);
          // imgDetail.push(Detail.secure_url);
        } else if (req.files[i].fieldname === "imgDisplay") {
          const Display = await cloudinary.uploader.upload(req.files[i].path, {
            width: 480,
            height: 480,
            crop: "fill",
          });

          const newImgDisplay = {
            publicId: Display.public_id,
            imgId: req.files[i].filename,
            imgUrl: Display.secure_url,
          };
          req.body.imgDisplay = newImgDisplay;
          // imgDisplay.push(Display.secure_url);
        }
      }

      //menerima id categories
      const categorieProduct = await CategoriesProducts.findOne({
        _id: req.body.categories,
      });
      req.body.categories = categorieProduct;
      req.body.imgDetail = imgDetail;
      const newProduct = new Product(req.body);
      const saveProduct = await newProduct.save();
      res.status(200).json(saveProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  updatedProduct: async (req, res) => {
    try {
      //get product berdasarkan id yang dikirim ui
      const products = await Product.findById(req.params.idProduct);
      //jika ada gambar
      if (req.files) {
        //hapus gambar imgDisplay yang ada di root folder(public/upload)
        //fs-unlink adalah fiture dari middleware fs-extra
        await fs.unlink(
          path.join(`public/uploads/${products.imgDisplay.imgId}`)
        );
        //hapus link gambar imgDisplay yang ada di cloudinary
        await cloudinary.uploader.destroy(products.imgDisplay.publicId);
        //jika gambar ada banya /didalam file array, looping gambar
        for (let i = 0; i < products.imgDetail.length; i++) {
          //hapus gambar imgDetail yang ada di root folder(public/upload)
          await fs.unlink(
            path.join(`public/uploads/${products.imgDetail[i].imgId}`)
          );
          //hapus link gambar imgDetai yang ada di cloudinary
          await cloudinary.uploader.destroy(products.imgDetail[i].publicId);
        }

        const imgDetail = [];
        // const imgDisplay = [];
        for (let i = 0; i < req.files.length; i++) {
          if (req.files[i].fieldname === "imgDetail") {
            const Detail = await cloudinary.uploader.upload(req.files[i].path, {
              width: 480,
              height: 480,
              crop: "fill",
            });
            const newImgDetail = {
              imgId: req.files[i].filename,
              imgUrl: Detail.secure_url,
            };
            // console.log(Detail);
            imgDetail.push(newImgDetail);
            // imgDetail.push(Detail.secure_url);
          } else if (req.files[i].fieldname === "imgDisplay") {
            const Display = await cloudinary.uploader.upload(
              req.files[i].path,
              {
                width: 480,
                height: 480,
                crop: "fill",
              }
            );
            const newImgDisplay = {
              imgId: req.files[i].filename,
              imgUrl: Display.secure_url,
            };
            req.body.imgDisplay = newImgDisplay;
            // imgDisplay.push(Display.secure_url);
          }
        }
        req.body.imgDetail = imgDetail;
        const updateProduct = await Product.findByIdAndUpdate(
          products._id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updateProduct);
        // (products.title = title),
        //   (products.desc = desc),
        //   (products.imgDisplay = imgDisplay.join("")),
        //   (products.imgDetail = imgDetail),
        //   (products.categories = categories),
        //   (products.size = size),
        //   (products.color = color),
        //   (products.stock = stock),
        //   (products.price = price);
        // const update = await products.save();
        // res.status(200).json(update);
      } else {
        const updateProduct = await Product.findByIdAndUpdate(
          products._id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updateProduct);
        //   (products.title = title),
        //     (products.desc = desc),
        //     (products.categories = categories),
        //     (products.size = size),
        //     (products.color = color),
        //     (products.stock = stock),
        //     (products.price = price);
        //   const update = await products.save();
        //   res.status(200).json(update);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // updatedProduct: async (req, res) => {
  //   try {
  //     const updatedProduct = await Product.findByIdAndUpdate(
  //       req.params.idProduct,

  //       {
  //         $set: req.body,
  //       },
  //       { new: true }
  //     );
  //     res.status(200).json(updatedProduct);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },

  getAllProduct: async (req, res, next) => {
    const qNew = req.query.new;

    const qCategories = req.query.categories;
    try {
      let products;
      if (qNew) {
        products = await Product.find()
          .populate({ path: "categories", select: "id name" })
          .sort({ createAt: -1 })
          .limit(req.query.limit);
      } else if (qCategories) {
        //qCategories harus tidak ada string/tandapetik
        const categoryIds = await CategoriesProducts.findOne({
          name: qCategories,
        }).distinct("_id");
        const products = await Product.find({
          categories: { $in: categoryIds },
        })
          .populate({
            path: "categories",
            select: "_id name",
          })
          .sort({ createAt: -1 })
          .limit(req.query.limit);
        res.status(200).json(products);
        // products = await Product.find({ categories: { $in: qCategories } })
        // .sort({ createAt: -1 });
        // .limit(req.query.limit);
      } else {
        products = await Product.find().populate({
          path: "categories",
          select: "id name",
        });
        res.status(200).json(products);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate({
        path: "categories",
        select: "id name",
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        res.status(404).json("product not found");
      } else {
        await fs.unlink(
          path.join(`public/uploads/${product.imgDisplay.imgId}`)
        );
        await cloudinary.uploader.destroy(product.imgDisplay.publicId);
        for (let i = 0; i < product.imgDetail.length; i++) {
          await fs.unlink(
            path.join(`public/uploads/${product.imgDetail[i].imgId}`)
          );
          await cloudinary.uploader.destroy(product.imgDetail[i].publicId);
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json("product has been delete");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productController;
