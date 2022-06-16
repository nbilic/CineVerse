const User = require("../models/User");

const removeUser = (socketId, onlineUsers) => {
  onlineUsers = onlineUsers?.filter((user) => {
    if (user.socketId === socketId)
      console.log(`${user.handle} has disconnected`);
    else return user;
  });
  return onlineUsers;
};

const addNewUser = async (id, socketId, onlineUsers) => {
  let exists = false;
  try {
    /* const user = await User.findById(id);
    const { avatar, handle, fullName, _id } = user; */
    for (let i = 0; i < onlineUsers?.length; i++)
      if (onlineUsers[i]?._id?.toString() === id.toString()) exists = true;

    /* const avatar =
      "https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg"; */
    !exists && onlineUsers.push({ _id: id, socketId: socketId });
    return onlineUsers;
  } catch (error) {
    console.log(error);
  }
};

const addMessages = (user, message) => {
  const payload = {
    user,
    message: { message, messageId: uuidv4() },
  };
  messages.push(payload);
};

exports.addNewUser = addNewUser;
exports.removeUser = removeUser;
