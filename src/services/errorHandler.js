/**
 * A file to handle errors global level
 */
window.addEventListener("error", handleGlobalError);
window.addEventListener("unhandledrejection", unhandledRejection);

/**
 * @description: Handler erros on window level
 */
function handleGlobalError(msg) {
  const {message, filename, lineno, colno, error} = msg;

  const string = message.toLowerCase();
  const substring = "script error";
  if (string.indexOf(substring) > -1) {
    console.log("Script Error: See Browser Console for Detail");
  } else {
    const msg = [
      "Message: " + message,
      "URL: " + filename,
      "Line: " + lineno,
      "Column: " + colno,
      "Error object: " + JSON.stringify(error)
    ].join(" - ");
    console.log(msg);
  }
  return false;
}

/**
 * @description: handle global unhandled rejections
 */
function unhandledRejection(event) {
  console.log(`unhandled promise rejection: ${event.reason}`);
}
