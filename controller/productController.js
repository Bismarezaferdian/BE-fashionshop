const Product = require("../model/Product");
const cloudinary = require("../middleware/cloudinary");
const CategoriesProducts = require("../model/CategoriesProducts");

const fs = require("fs-extra");
const path = require("path");
// const cloudinary = require("cloudinary").v2;

const productController = {
  upload: (req, res) => {},
  addProduct: async (req, res) => {
    //
    const imgDetail = [];
    try {
      for (let i = 0; i < req.files?.length; i++) {
        if (req.files[i].fieldname === "imgDetail") {
          const Detail = await cloudinary.uploader.upload(req.files[i].path, {
            width: 480,
            height: 480,
            crop: "fill",
          });

          // console.log(Detail);

          const newImgDetail = {
            publicId: Detail.public_id,
            imgId: req.files[i].filename,
            imgUrl: Detail.secure_url,
          };
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
      // console.log(req.body.categories.toString("").split(","));
      const categorieProduct = [];
      //ubah selected categoru dari ui ke array
      const categories = req.body.categories.toString().split(",");
      for (let i = 0; i < categories.length; i++) {
        const result = await CategoriesProducts.findOne({
          _id: categories[i],
          // _id: { $in: categories },
        });
        categorieProduct.push(result);
      }
      //menerima id categories
      // const categorieProduct = await CategoriesProducts.findOne({
      //   // _id: req.body.categories,
      //   _id: { $in: categories },
      // });
      req.body.variant = JSON.parse(req.body.variant);
      // // const color = req.body.color;
      // req.body.color = JSON.parse(req.body.color);
      // // const size = req.body.size;
      // req.body.size = JSON.parse(req.body.size);

      // console.log(req.body.size, req.body.color);
      req.body.categories = categorieProduct;
      req.body.imgDetail = imgDetail;
      const newProduct = new Product(req.body);
      const saveProduct = await newProduct.save();
      res.status(200).json(saveProduct);
    } catch (error) {
      console.log(error);
      if (req.files.length > 0) {
        //jika error delete image detail from cloudinary
        for (let i = 0; i < imgDetail.length; i++) {
          await cloudinary.uploader.destroy(imgDetail[i].publicId);
        }
        //jika error delete image display from cloudinary
        await cloudinary.uploader.destroy(req.body.imgDisplay.publicId);
        //jika error delete image from folder public/uploads
        for (let i = 0; i < req.files?.length; i++) {
          await fs.unlink(path.join(`public/uploads/${req.files[i].filename}`));
        }
      }
      res.status(500).json(error);
    }
  },

  updatedProduct: async (req, res) => {
    // fs.access(path.join("public/upload", fileName);
    const imgDetail = [];
    // const categories = JSON.parse(req.body.categories);
    const variant = JSON.parse(req.body.variant);

    // req.body.categories = categories;
    req.body.variant = variant;
    try {
      // get product berdasarkan id yang dikirim ui
      const products = await Product.findById(req.params.idProduct);
      //jika ada req.files
      if (req.files.length > 0) {
        //loop semua
        for (let i = 0; i < req.files.length; i++) {
          if (req.files[i].fieldname === "imgDetail") {
            //Upload ke clodinary
            const Detail = await cloudinary.uploader.upload(req.files[i].path, {
              width: 480,
              height: 480,
              crop: "fill",
            });

            //tampung ke dalam variable
            const newImgDetail = {
              publicId: Detail.public_id,
              imgId: req.files[i].filename,
              imgUrl: Detail.secure_url,
            };
            //push ke imgDetail
            imgDetail.push(newImgDetail);
            //jika ada req files dengen fieldname imgDisplay
          } else if (req.files[i].fieldname === "imgDisplay") {
            //hapus gambar imgDisplay yang ada di root folder(public/upload)
            //fs-unlink adalah fiture dari middleware fs-extr
            await fs.unlink(
              path.join(`public/uploads/${products.imgDisplay.imgId}`)
            );
            //upload ke clodynary
            const Display = await cloudinary.uploader.upload(
              req.files[i].path,
              {
                width: 480,
                height: 480,
                crop: "fill",
              }
            );
            //tampung ke dalam variable
            const newImgDisplay = {
              publicId: Display.public_id,
              imgId: req.files[i].filename,
              imgUrl: Display.secure_url,
            };

            //req.body.imgDisplay di isi dengan newImgDisplay
            req.body.imgDisplay = newImgDisplay;
            // imgDisplay.push(Display.secure_url);
          }
        }

        //jika ada gambar dengen filedname imgDetail ,
        if (imgDetail.length > 0) {
          req.body.imgDetail = imgDetail;
          //jika gambar ada banya /didalam file array, looping gambar
          for (let i = 0; i < products.imgDetail.length; i++) {
            //hapus gambar imgDetail yang ada di root folder(public/upload)
            await fs.unlink(
              path.join(`public/uploads/${products.imgDetail[i].imgId}`)
            );
            //hapus link gambar imgDetai yang ada di cloudinary
            await cloudinary.uploader.destroy(products.imgDetail[i].publicId);
          }
        }
        //update categories
        const categorieProduct = [];
        //ubah selected categoru dari ui ke array
        const categories = req.body.categories.toString("").split(",");
        for (let i = 0; i < categories.length; i++) {
          const result = await CategoriesProducts.findOne({
            _id: categories[i],
            // _id: { $in: categories },
          });
          categorieProduct.push(result);
        }
        req.body.categories = categorieProduct;
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
      } else {
        // console.log(req.body);
        // console.log(req.files);
        //update color
        // console.log(req.body.categories);
        // console.log("tidak ada poto");

        //update categories
        const categorieProduct = [];
        //ubah selected categoru dari ui ke array
        const categories = req.body.categories.toString("").split(",");
        for (let i = 0; i < categories.length; i++) {
          const result = await CategoriesProducts.findOne({
            _id: categories[i],
            // _id: { $in: categories },
          });
          categorieProduct.push(result);
        }
        req.body.categories = categorieProduct;

        //update all
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
        // const update = await products.save();
        // res.status(200).json(update);
      }
    } catch (error) {
      //note: jika ui tidak update gambar req.files dari db tidak akan terkirim
      //jika ada req.files
      if (req.files.length >= 0) {
        //cek apakah req.files(img) ada di folder directory
        const directoryPath = "public/uploads"; // Ganti dengan path direktori yang ingin dicek
        const imageRegex = /\.(jpg|jpeg|png|gif)$/i; // Regex untuk mencocokkan ekstensi gambar

        fs.readdir(directoryPath, async (err, files) => {
          if (err) {
            console.error("Error membaca direktori", err);
            return;
          }
          //files berisi img yang ada difolder directory
          const images = files.filter((file) => imageRegex.test(file));
          if (images.length > 0) {
            //menampung img dari req.files
            const imgFiles = [];
            //jika ada req.files push ke imgFiles
            req.files.map((item) => imgFiles.push(item.filename));
            //apakah req.files ada di file directory
            const isReqFile = images.filter((element) =>
              imgFiles.includes(element)
            );
            // //apakah img detail product ada di directory
            // const isImgDetail = imagesDetails.filter((element) =>
            //   imgFiles.includes(element)
            // );
            // //apakah img display ada di directori
            // const isImgDisplay = imgFiles.includes(products.imgDisplay.imgId);

            if (isReqFile) {
              for (let i = 0; i < imgDetail.length; i++) {
                await cloudinary.uploader.destroy(imgDetail[i].publicId);
              }
              //jika error delete image display from cloudinary
              await cloudinary.uploader.destroy(req.body.imgDisplay.publicId);
              //jika error delete image from folder public/uploads
              for (let i = 0; i < req.files?.length; i++) {
                await fs.unlink(
                  path.join(`public/uploads/${req.files[i].filename}`)
                );
              }
              res.status(500).json(error);
            }
          } else {
            console.log("Tidak ada file gambar di direktori", directoryPath);
          }
        });
      } else {
        console.log("tidak ada gambar");
        res.status(500).json(error);
      }
    }
  },
  getAllProduct: async (req, res, next) => {
    const qNew = req.query.new;

    const qCategories = req.query.categories;
    try {
      let products;
      if (qNew) {
        products = await Product.find()
          .populate({ path: "categories", select: "id name" })
          .sort({ createdAt: -1 })
          .limit(req.query.limit);
        res.status(200).json(products);
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
          .sort({ createdAt: -1 })
          .limit(req.query.limit);
        res.status(200).json(products);
        // products = await Product.find({ categories: { $in: qCategories } })
        // .sort({ createAt: -1 });
        // .limit(req.query.limit);
      } else {
        products = await Product.find()
          .populate({
            path: "categories",
            select: "id name",
          })
          .sort({ createdAt: -1 })
          .limit(req.query.limit);
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
      } else if (product.imgDisplay) {
        await fs.unlink(
          path.join(`public/uploads/${product.imgDisplay.imgId}`)
        );
        //hapus link gambar imgDisplay yang ada di cloudinary
        await cloudinary.uploader.destroy(product.imgDisplay.publicId);
      }
      if (product.imgDetail.length >= 0) {
        //jika gambar ada banya /didalam file array, looping gambar
        for (let i = 0; i < product.imgDetail.length; i++) {
          //hapus gambar imgDetail yang ada di root folder(public/upload)
          await fs.unlink(
            path.join(`public/uploads/${product.imgDetail[i].imgId}`)
          );
          //hapus link gambar imgDetai yang ada di cloudinary
          await cloudinary.uploader.destroy(product.imgDetail[i].publicId);
        }

        // await fs.unlink(
        //   path.join(`public/uploads/${product.imgDisplay.imgId}`)
        // );
        // await cloudinary.uploader.destroy(product.imgDisplay.publicId);
        // for (let i = 0; i < product.imgDetail.length; i++) {
        //   await fs.unlink(
        //     path.join(`public/uploads/${product.imgDetail[i].imgId}`)
        //   );
        //   await cloudinary.uploader.destroy(product.imgDetail[i].publicId);
        // }
      }
      await Product.findByIdAndDelete(id);
      res.status(200).json("product has been delete");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productController;
