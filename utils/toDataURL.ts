export function toDataURL(url: string, callback: (result: any) => void) {
  var xhr = new XMLHttpRequest();
  console.log("url: ", url);
  console.log("xhr: ", xhr);
  xhr.onload = function () {
    var reader = new FileReader();
    console.log("reader: ", reader);
    reader.onloadend = function () {
      console.log("Reader loaded");
      // Create an Image
      var img = new Image();
      img.src = url;
      console.log("img: ", img);
      img.onload = function () {
        console.log("Image loaded");
        // When it finishes loading, create a canvas and draw it there.
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (!ctx) return; // If we don't have a canvas, we're done.
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        var dataUrl = canvas.toDataURL("image/png");
        console.log(dataUrl);
        callback(dataUrl);
      };
      // callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}
