export function downloadFile(link) {
  var urlCreator = window.URL || window.webkitURL;
  var imageUrl = urlCreator.createObjectURL(link);
  var tag = document.createElement("a");
  tag.href = imageUrl;
  tag.download = "file";
  document.body.appendChild(tag);
  tag.click();
  document.body.removeChild(tag);
  link.innerText = "Download Image";
}
