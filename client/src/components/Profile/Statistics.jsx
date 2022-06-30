import PostsChart from "./PostsChart";
import MoviesChart from "./MoviesChart";
import "../../styles/statistics.css";
const Statistics = ({ posts, user }) => {
  return (
    <div className="statistics-container">
      <PostsChart posts={posts} />
      <MoviesChart user={user} />
    </div>
  );
};

export default Statistics;
