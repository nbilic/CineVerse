import useRouteToProfile from "../hooks/useRouteToProfile";

const Friend = ({ friend }) => {
  const routeToProfile = useRouteToProfile(friend.handle);
  return (
    <li>
      <img
        src={friend.avatar}
        alt=""
        className="friend-avatar"
        onClick={routeToProfile}
      />
      <div className="name-handle">
        <p
          onClick={routeToProfile}
        >{`${friend.firstName} ${friend.lastName}`}</p>
        <p
          className="friend-handle"
          onClick={routeToProfile}
        >{`@${friend.firstName}${friend.lastName}`}</p>
      </div>
    </li>
  );
};

export default Friend;
