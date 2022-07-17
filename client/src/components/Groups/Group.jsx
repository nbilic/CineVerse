const group = {
  name: "Batman enjoyers",
  groupPicture:
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1489b916166391.562a646dc8806.png",
  memberCount: 10,
  description: "We love batman",
  status: "Public",
};

const Group = () => {
  return (
    <div className="group-instance">
      <div className="group-info-container">
        <img src={group.groupPicture} alt="" className="group-picture" />
        <div className="group-info-text">
          <h5>{group.name}</h5>
          <p>{group.memberCount} members</p>
        </div>
      </div>
    </div>
  );
};

export default Group;
