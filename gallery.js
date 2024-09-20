setTimeout(() => {
  if (db) {
    let videoDBTransaction = db.transaction("video", "readonly");
    let videoStore = videoDBTransaction.objectStore("video");
    let videoRequest = videoStore.getAll(); // Event Driven

    videoRequest.onsuccess = (e) => {
      let videoResult = videoRequest.result;
      let galleryCont = document.querySelector(".gallery-cont");

      videoResult.forEach((videoObj) => {
        let mediaEle = document.createElement("div");
        mediaEle.setAttribute("class", "media-cont");
        mediaEle.setAttribute("id", videoObj.id);
        let url = URL.createObjectURL(videoObj.url);

        mediaEle.innerHTML = `
           <div class="media">
              <video autoplay loop src="${url}"></video>
           </div>
           <div class="delete action-btn">DELETE</div>
           <div class="download action-btn">DOWNLOAD</div>
        `;

        galleryCont.appendChild(mediaEle);

        let deleteButton = mediaEle.querySelector(".delete");
        deleteButton.addEventListener("click", deleteListener);
        let downloadButton = mediaEle.querySelector(".download");
        downloadButton.addEventListener("click", downloadListener);
      });
    };

    let imgDBTransaction = db.transaction("image", "readonly");
    let imgStore = imgDBTransaction.objectStore("image");
    let imgRequest = imgStore.getAll(); // Event Driven

    imgRequest.onsuccess = (e) => {
      let imgResult = imgRequest.result;
      let galleryCont = document.querySelector(".gallery-cont");

      imgResult.forEach((imgObj) => {
        let mediaEle = document.createElement("div");
        mediaEle.setAttribute("class", "media-cont");
        mediaEle.setAttribute("id", imgObj.id);
        let url = imgObj.url;

        mediaEle.innerHTML = `
             <div class="media">
                <img src="${url}" />
             </div>
             <div class="delete action-btn">DELETE</div>
             <div class="download action-btn">DOWNLOAD</div>
          `;

        galleryCont.appendChild(mediaEle);

        let deleteButton = mediaEle.querySelector(".delete");
        deleteButton.addEventListener("click", deleteListener);
        let downloadButton = mediaEle.querySelector(".download");
        downloadButton.addEventListener("click", downloadListener);
      });
    };
  }
}, 100);

function deleteListener(e) {
  let id = e.target.parentElement.getAttribute("id");
  let type = id.slice(0, 3);

  if (type === "vid") {
    let videoDBTransaction = db.transaction("video", "readwrite");
    let videoStore = videoDBTransaction.objectStore("video");
    videoStore.delete(id);
  } else if (type === "img") {
    let imgDBTransaction = db.transaction("image", "readwrite");
    let imgStore = imgDBTransaction.objectStore("image");
    imgStore.delete(id);
  }

  e.target.parentElement.remove();
}

function downloadListener(e) {
  let id = e.target.parentElement.getAttribute("id");
  let type = id.slice(0, 3);

  if (type === "vid") {
    let videoDBTransaction = db.transaction("video", "readwrite");
    let videoStore = videoDBTransaction.objectStore("video");
    let videoRequest = videoStore.get(id);
    videoRequest.onsuccess = (e) => {
      let videoObj = videoRequest.result;
      let videoURL = URL.createObjectURL(videoObj.url);

      let a = document.createElement("a");
      a.href = videoURL;
      a.download = "stream.mp4";
      a.click();
    };
  } else if (type === "img") {
    let imgDBTransaction = db.transaction("image", "readwrite");
    let imgStore = imgDBTransaction.objectStore("image");
    let imgRequest = imgStore.get(id);

    imgRequest.onsuccess = (e) => {
      let imgObj = imgRequest.result;

      let a = document.createElement("a");
      a.href = imgObj.url;
      a.download = "img.jpg";
      a.click();
    };
  }
}
