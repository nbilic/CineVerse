const RecentActivity = () => {
  return (
    <div className="recent-activity">
      <ul>
        <li>
          <span className="name">Fred</span> became friends with{" "}
          <span className="name">Carl</span>
        </li>
        <li>
          <span className="name">Fred</span> made a new post
        </li>
        <li>
          <span className="name">John</span> added{" "}
          <div className="movie-name">Batman</div> to his collection
        </li>
      </ul>
    </div>
  );
};

export default RecentActivity;
