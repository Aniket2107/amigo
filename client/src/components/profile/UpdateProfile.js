import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../redux/actions/authActions";
import { customStyles } from "./modalStyle";
import "./uprofile.css";

const UpdateProfile = () => {
  const inputFile = useRef(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { user, updateLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    bio: user.bio,
    location: user.location,
    website: user.website,
    avatar: user.avatar,
  });
  const [image, setImage] = useState(user.avatar);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const uploadImage = async (e) => {
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

    // console.log(file)

    setImage(file.secure_url);
    setImageLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserData({ ...values, avatar: image }, user._id));
    setIsOpen(false);
  };

  return (
    <div className="uprofile">
      <button onClick={openModal} className="profile_editBtn">
        Edit Profile
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="up_left">
          <input
            type="file"
            name="file"
            placeholder="Upload an image"
            onChange={uploadImage}
            ref={inputFile}
            style={{ display: "none" }}
          />
          {imageLoading ? (
            <h3>Loading...</h3>
          ) : (
            <>
              {image ? (
                <span onClick={() => inputFile.current?.click()}>
                  <img
                    src={image}
                    style={{ width: "150px", borderRadius: "50%" }}
                    alt="avatar"
                    // onClick={() => inputFile.current?.click()}
                  />
                </span>
              ) : (
                <span onClick={() => inputFile.current?.click()}>
                  <i
                    className="fa fa-user fa-5x"
                    aria-hidden="true"
                    // onClick={() => inputFile.current?.click()}
                  ></i>
                </span>
              )}
            </>
          )}
        </div>

        <div className="up_right">
          <form>
            <div className="up_form-control">
              <label htmlFor="up_bio">Bio</label>
              <input
                type="text"
                id="up_bio"
                name="bio"
                value={values?.bio}
                onChange={(e) => setValues({ ...values, bio: e.target.value })}
              />
            </div>
            <div className="up_form-control">
              <label htmlFor="up_location">Location</label>
              <input
                type="text"
                id="up_location"
                value={values?.location}
                name="location"
                onChange={(e) =>
                  setValues({ ...values, location: e.target.value })
                }
              />
            </div>
            <div className="up_form-control">
              <label htmlFor="up_website">Website</label>
              <input
                type="text"
                id="up_website"
                value={values?.website}
                name="website"
                onChange={(e) =>
                  setValues({ ...values, website: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="up_button"
              onClick={handleSubmit}
              disabled={updateLoading}
            >
              {updateLoading ? "Loading..." : "Update Profile"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
