const RecentActivity = () => {
  return (
    <div className="recent-activity">
      <h4 className="recent-activity-header">Recent activity</h4>
      <ul>
        <li>
          <span className="name">Fred</span> became friends with{" "}
          <span className="name">Carl</span>
        </li>
        <li>
          <span className="name">Fred</span> made a new{" "}
          <span className="post">post</span>
        </li>
        <li>
          <span className="name">John</span> added{" "}
          <span className="movie-name">Batman</span> to his collection{" "}
        </li>
      </ul>
    </div>
  );
};

export default RecentActivity;
