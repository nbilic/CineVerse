import Picker from "emoji-picker-react";
import "../../styles/emotePicker.css";
import { useEffect, useRef, useState } from "react";
import emojis from "emojis-list";
const EmotePicker = ({ display, setDisplay, post, setPost, position }) => {
  const ref = useRef();
  const [emojiFilter, setEmojiFilter] = useState("");
  const [emojiList, setEmojiList] = useState(emojis);
  const onEmojiClick = (event, emojiObject) => {
    setPost({
      ...post,
      content: `${post?.content}${emojiObject.emoji}`,
    });
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (display && ref.current && !ref.current.contains(e.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [display]);

  useEffect(() => {
    const filterEmojis = () => {
      const filteredList = emojiList.filter((emoji) =>
        emoji.includes(emojiFilter)
      );
      setEmojiList(filteredList);
    };

    /* filterEmojis(); */
  }, [emojiFilter]);
  return (
    <>
      {display && (
        <div className={`modal ${position}`} ref={ref}>
          <Picker onEmojiClick={onEmojiClick} />
          {/*  <div className="filter-emojis">
            <input
              type="text"
              className="emoji-filter"
              value={emojiFilter}
              onChange={(e) => setEmojiFilter(e.target.value)}
            />
          </div>
          <div className="emoji-holder">
            {emojiList.map((emoji) => (
              <div className="emoji" key={emoji}>
                {emoji}
              </div>
            ))}
          </div> */}
        </div>
      )}
    </>
  );
};

export default EmotePicker;
