const mongoose = require("mongoose");

const ImgSchema = new mongoose.Schema(
    {
        image:String,
    },{
        collection:"ImgGallery"
    }
);
mongoose.model("ImgGallery",ImgSchema);