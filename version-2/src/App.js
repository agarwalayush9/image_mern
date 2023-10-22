import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState("");
  const [getData, setData] = useState([]);

  function handleChange(e) {
    console.log(e);
    try {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        console.log(reader.result); //base64encoded string
        setImage(reader.result);
      };
    } catch (e) {
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  }
  useEffect(() => {
    getImg();
  }, []);
  function upload() {
    fetch("http://localhost:5001/uploadImg", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  function getImg() {
    fetch("http://localhost:5001/get-img", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.data);
      });
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          style={{ color: "wheat", fontFamily: "cursive" }}
          type="file"
          accept="image/*"
          name="photo"
          onChange={handleChange}
        />
        &nbsp;&nbsp;
        <div style={{ paddingTop: "4px" }}>
          {image == "" || image == null ? (
            <span style={{ marginRight: "-80px" }}>Preview</span>
          ) : (
            <img
              width={120}
              style={{ paddingLeft: "15px", marginRight: "-70px" }}
              height={120}
              src={image}
            />
          )}
          <br />
          <input
            id="title"
            type="text"
            style={{ textAlign: "center" }}
            placeholder=" Give a title"
            // onChange={handleChange}
          />
        </div>
      </div>

      <br />
      <input id="assign" onClick={upload} type="submit"></input>
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
            {getData.map(data=>{
              return(
                <img key={data._id}
                width={200}
                style={{ }}
                height={200}
                src={data.image}
              />
              )
            })}
           
            <span>{}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
