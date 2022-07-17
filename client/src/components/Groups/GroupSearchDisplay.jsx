const group = {
  name: "Batman enjoyers",
  groupPicture:
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1489b916166391.562a646dc8806.png",
  memberCount: 10,
  description: "We love batman",
  status: "Public",
};

const GroupSearchDisplay = () => {
  return (
    <div className="group-search-display">
      <div className="group-info">
        <img src={group.groupPicture} alt="" className="group-picture" />
        <h5>{group.name}</h5>
      </div>

      <h5>{`${group.memberCount} members`}</h5>
      <button>View group</button>
    </div>
  );
};

export default GroupSearchDisplay;
