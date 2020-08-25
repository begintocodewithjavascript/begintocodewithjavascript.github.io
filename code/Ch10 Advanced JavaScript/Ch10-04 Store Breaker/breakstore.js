const storeName = "TinyContactsStore";

function doBreakStore() {
  var reply = confirm("Click OK to corrupt the data store");
  if (reply) {
    localStorage.setItem(storeName, "kaboom");
  }
}

function doEmptyStore() {
  var reply = confirm("Click OK to remove the data store");
  if (reply) {
    localStorage.removeItem(storeName);
  }
}

