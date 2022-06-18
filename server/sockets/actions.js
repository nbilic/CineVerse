const User = require("../models/User");

const removeUser = (socketId, onlineUsers) => {
  onlineUsers = onlineUsers?.filter((user) => {
    if (user.socketId !== socketId)
      /*  console.log(`${user.handle} has disconnected`);
    else */ return user;
  });
  return onlineUsers;
};

const addNewUser = async (id, socketId, onlineUsers, friends) => {
  let exists = false;
  try {
    /* const user = await User.findById(id);
    const { avatar, handle, fullName, _id } = user; */
    for (let i = 0; i < onlineUsers?.length; i++)
      if (onlineUsers[i]?._id?.toString() === id.toString()) exists = true;

    !exists && onlineUsers.push({ _id: id, socketId: socketId, friends });
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
