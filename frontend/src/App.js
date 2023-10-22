import { useState } from "react";
import "./App.css";
import axios from "axios";
const images = require.context('../../backend/images',true);
const imageList = images.keys().map(image=> images(image));

function App() {
  const [newUser, setNewAuthor] = useState({
    name: "",
    photo: "",
  });
  const handleChange = (e) => {
    setNewAuthor({ ...newUser, [e.target.name]: e.target.value });
  };
  const handlePhoto = (e) => {
    setNewAuthor({ ...newUser, photo: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", newUser.photo);
    formData.append("name", newUser.name);
    console.log(newUser.photo);
    console.log(newUser.name);

    axios
      .post("http://localhost:5000/users/add/", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          style={{ color: "wheat", fontFamily: "cursive" }}
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          onChange={handlePhoto}
        />
        <br />
        <br />
        <input
          id="title"
          type="text"
          placeholder="name"
          name="name"
          value={newUser.name}
          onChange={handleChange}
        />
        <div className="bg"></div>
        <br />
        <input id="assign" type="submit"></input>
      </form>
      <div id="gallery">
        <h2>Gallery</h2>
        <div id="sub-gallery">
          <div
            id="image"
            style={{
              textAlign: "center",
              width: "fit-content",
              color: "skyBlue",
            }}
          >
            {
              imageList.map((image,index)=>{
                <img
                  width={200}
                  style={{ display: "grid" }}
                  height={200}
                  src={image.default} alt={`image-${index}`}
                />
              })
            }
            <span>{}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
