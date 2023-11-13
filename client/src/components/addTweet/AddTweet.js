import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addTweet } from "../../redux/actions/feedActions";
import "./addtweet.css";

function AddTweet() {
  const [tweet, setTweet] = useState("");
  const inputFile = useRef(null);
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const uploadImage = async (e) => {
    toast.info("Uploading image...");

    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "c18m8jqp");
    setImageLoading(true);

    const api = process.env.REACT_APP_CLOUD_API || "";

    const res = await fetch(api, {
      method: "POST",
      body: data,
    });
    const file = await res.json();

    setImage(file.secure_url);
    setImageLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(image);

    if (tweet.length < 1) {
      toast.error("Tweet cannot be empty");
      return;
    }

    dispatch(
      addTweet({
        user: user._id,
        content: tweet,
        img: image ? image : "",
      })
    );

    setTweet("");
    setImage("");
  };

  return (
    <div className="addtweet">
      <form>
        <div className="addtweet_head">
          {user?.avatar ? (
            <img src={user.avatar} alt="avatar" className="addtweet_avatar" />
          ) : (
            <i
              className="fa fa-user fa-2x addtweet_head"
              aria-hidden="true"
            ></i>
          )}

          <input
            type="text"
            className="addtweet_input"
            placeholder="What's happening?"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            minLength={3}
            required
          />
        </div>

        <div className="addtweet_img">
          <label htmlFor="file-input" style={{ cursor: "pointer" }}>
            <i className="fas fa-image "></i>
          </label>
          <input
            type="file"
            name="file"
            id="file-input"
            placeholder="Upload an image"
            onChange={uploadImage}
            // ref={inputFile}
            style={{ display: "none" }}
          />

          {imageLoading && <i className="fas fa-cog fa-spin ml-3"></i>}
          {image && (
            <a
              href={image}
              target="_blank"
              className="cp td-n ml-3"
              rel="noreferrer"
            >
              img
            </a>
          )}
        </div>
        <button
          className="addtweet_btn"
          onClick={handleSubmit}
          disabled={imageLoading || tweet.length < 2}
        >
          <span>Tweet</span>
        </button>
      </form>
    </div>
  );
}

export default AddTweet;
