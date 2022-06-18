const users = [1, 3, 4, 7];
const friends = [2, 3, 4, 5, 6];
let onlineFriends = [];

users.forEach((u) => {
  friends.forEach((f) => {
    f === u && onlineFriends.push(f);
  });
});
console.log(onlineFriends);
