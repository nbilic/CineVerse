const users = [1, 3, 4, 7];
const friends = [2, 3, 4, 5, 6];
let onlineFriends = [];

users.forEach((u) => {
  friends.forEach((f) => {
    f === u && onlineFriends.push(f);
  });
});

//console.log(onlineFriends);

const messages = [
  { userId: 123, messages: [1, 2, 3] },
  { userId: 90, messages: [9, 0] },
  { userId: 212, messages: [2, 1, 2] },
];
messages.map((m) => console.log(m.userId));

const UID = 1234;

let userChat = messages.find((m) => m.userId === UID);

//console.log(userChat);

if (userChat) {
  userChat.messages = [...userChat.messages, 111];
} else {
  messages.push({ userId: UID, messages: ["hello"] });
}

//console.log(userChat);
//console.log(`\n${messages.map((m) => console.log(m))}`);

console.log("\n");
messages.map((m) => console.log(m));
console.log("\n");
console.log("\n");
console.log(messages[{ userId: "123" }]);
