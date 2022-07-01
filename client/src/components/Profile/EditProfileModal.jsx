import { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineCamera } from "react-icons/ai";
import "../../styles/editProfileModal.css";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user";
import Loading from "../Loading";
import ClipLoader from "react-spinners/ClipLoader";
import { enableScroll, disableScroll } from "../../functions/modifyScroll";

const EditProfileModal = ({ user, display, setDisplay }) => {
  const [newBanner, setNewBanner] = useState(null);
  const avatarRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const bannerRef = useRef(null);
  const dispatch = useDispatch();
  const [newAvatar, setNewAvatar] = useState(null);
  const ref = useRef();

  const convertDate = () => {
    const date = new Date(user.dob);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay() + 1;
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  };

  const [newValues, setNewValues] = useState({
    handle: user.handle || "",
    bio: user.bio || "",
    dob: convertDate() || "",
    location: user.location || "",
    favoriteMovie: user.favoriteMovie || "",
    favoriteGenres: user.favoriteGenres || "",
  });

  const onChange = async (e) => {
    setNewValues({ ...newValues, [e.target.name]: e.target.value });
  };

  const toDataURL = (img, setter) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const response = await api.put(`/api/user/${user._id}`, {
        ...newValues,
        newBanner,
        newAvatar,
      });
      await dispatch(setUser(response.data));

      setDisplay();
      /*  console.log({ ...newValues, newBanner, newAvatar }); */
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => {
    if (display) disableScroll();
    const checkIfClickedOutside = (e) => {
      if (display && ref.current && !ref.current.contains(e.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      enableScroll();
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [display, setDisplay]);

  return (
    <div className="edit-profile-modal">
      <div className="layers" ref={ref}>
        {saving && <Loading />}
        <div className="first-layer">
          <div className="top-layer-left-section">
            <AiOutlineClose
              className="close-edit-profile-modal"
              onClick={setDisplay}
            />
            <p>Edit profile</p>
          </div>
          <button className="save-profile-changes" onClick={handleSubmit}>
            {saving && (
              <ClipLoader
                color={"white"}
                loading={saving}
                /* cssOverride={override} */
                size={15}
              />
            )}
            <p className={`${saving && "saving"}`}>
              {saving ? "Saving..." : "Save"}
            </p>
          </button>
        </div>
        <div className="second-layer">
          <div className="banner-preview-div">
            <img
              src={newBanner || user.banner}
              alt=""
              className="banner-preview"
            />
            <div className="banner-buttons">
              <button
                className="image-upload-button"
                onClick={(e) => {
                  e.preventDefault();
                  bannerRef.current.click();
                }}
              >
                <AiOutlineCamera className="banner-change-image" />
              </button>

              <input
                type="file"
                onChange={(e) => {
                  toDataURL(e.target.files[0], setNewBanner);
                }}
                ref={bannerRef}
                accept="image/png, image/jpeg"
                hidden
              />

              <AiOutlineClose className="banner-reset-image" />
            </div>
          </div>
          <div className="avatar-preview-div">
            <img
              src={newAvatar || user.avatar}
              alt=""
              className="avatar-preview"
            />
            <button
              className="image-upload-button"
              onClick={(e) => {
                e.preventDefault();
                avatarRef.current.click();
              }}
            >
              <AiOutlineCamera className="avatar-change-image" />
            </button>

            <input
              type="file"
              onChange={(e) => {
                toDataURL(e.target.files[0], setNewAvatar);
              }}
              ref={avatarRef}
              accept="image/png, image/jpeg"
              hidden
            />
          </div>
        </div>
        <div className="third-layer">
          <form>
            <label>Handle</label>
            <input
              type="text"
              label="Handle"
              name="handle"
              placeholder="Handle"
              value={newValues.handle}
              onChange={onChange}
            />

            <label>Location</label>
            <input
              type="text"
              label="Location"
              name="location"
              placeholder="Location"
              value={newValues.location}
              onChange={onChange}
            />
            <label>Birthday</label>
            <input
              type="date"
              label="dob"
              name="dob"
              placeholder="dob"
              value={newValues.dob}
              onChange={onChange}
            />
            <label>Favorite Movie</label>
            <input
              type="text"
              label="favoriteMovie"
              name="favoriteMovie"
              placeholder="favoriteMovie"
              value={newValues.favoriteMovie}
              onChange={onChange}
            />
            <label>Favorite Genres</label>
            <input
              type="text"
              label="favoriteGenres"
              name="favoriteGenres"
              placeholder="favoriteGenres"
              value={newValues.favoriteGenres}
              onChange={onChange}
            />
            <label>Bio</label>
            <input
              type="text"
              label="Bio"
              placeholder="Bio"
              name="bio"
              value={newValues.bio}
              onChange={onChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
