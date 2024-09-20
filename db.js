// Open a database
// Create objectstore
// Make transactions
let db;
let openRequest = indexedDB.open("myDatabase");

openRequest.addEventListener("success", (e) => {
  db = openRequest.result;
});

openRequest.addEventListener("error", (e) => {
  db = openRequest.result;
});

openRequest.addEventListener("upgradeneeded", (e) => {
  db = openRequest.result;

  db.createObjectStore("video", { keyPath: "id" });
  db.createObjectStore("image", { keyPath: "id" });
});
