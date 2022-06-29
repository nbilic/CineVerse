const A = [
  "Beacon1",
  "37",
  "Beacon2",
  "45",
  "Beacon3",
  "23",
  "Beacon4",
  "30",
  "Beacon1",
  "100",
  "Beacon4",
  "99",
];

const groupBeacons = (A) => {
  let i = 0;
  const grupirano = [];
  while (i < A.length) {
    let elementExists = grupirano.find((x) => x.name === A[i]);
    !elementExists
      ? grupirano.push({ name: A[i++], rssi: [A[i]] })
      : elementExists.rssi.push(A[++i]);
    ++i;
  }
  return grupirano;
};

const grupirano = groupBeacons(A);

console.log(grupirano);
