let scrollCount = 0; // var scroll
let hasLiked = false; // stt btn like

function autoScroll() {
  window.scrollBy(0, 1000); // scroll 1000px

  scrollCount++; 
  // check 50 -> like
  if (scrollCount % 50 === 0 && !hasLiked) {
    // find btn like
    let likeButtons = document.evaluate('//span[contains(text(), "Thích")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if (likeButtons.snapshotLength > 0) {
      let likeButton = likeButtons.snapshotItem(0); // default click like first
      likeButton.click();
      hasLiked = true; // set
    }
  }
  if (scrollCount % 50 === 0 && hasLiked) {
    hasLiked = false; // Reset 
  }
}

window.autoScrollInterval = setInterval(autoScroll, Math.floor(Math.random() * 20000) + 20000);
console.log("Extension Facebook Auto Scroller đang hoạt động.");
