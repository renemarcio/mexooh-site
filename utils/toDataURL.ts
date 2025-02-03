export function toDataURL(url: string, callback: (result: any) => void) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      // Create an Image
      var img = new Image();
      img.src = url;
      img.onload = function () {
        // When it finishes loading, create a canvas and draw it there.
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (!ctx) return; // If we don't have a canvas, we're done.
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        var dataUrl = canvas.toDataURL("image/png");
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
