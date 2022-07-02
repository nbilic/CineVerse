import Post from "../Posts/Post";

const Activity = ({ posts, removePost }) => {
  return (
    <div className="profile-posts-container">
      {posts?.map((post) => (
        <Post
          key={post?.post._id}
          post={post.post}
          user={post.user}
          removePost={removePost}
        />
      ))}
    </div>
  );
};

export default Activity;
