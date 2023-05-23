// Clean up newline breaks and spaces returned from Rock
const unescapeSlashes = (str) => {
  // add another escaped slash if the string ends with an odd
  // number of escaped slashes which will crash JSON.parse
  let parsedStr = str.replace(/(^|[^\\])(\\\\)*\\$/, "$&\\");

  // escape unescaped double quotes to prevent error with
  // added double quotes in json string
  parsedStr = parsedStr.replace(/(^|[^\\])((\\\\)*")/g, "$1\\$2");

  try {
    parsedStr = JSON.parse(`"${parsedStr}"`);
  } catch (e) {
    return str;
  }
  return parsedStr;
};

// Convert string returned from Rock into DOM elements
const convertStringToHTML = (str) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

// Parse Lava
const parseLava = (internalRoot, key, callback) => {
  // Get auth key from external file
  fetch(key)
    .then((response) => response.text())
    .then((authKey) => {

      // Get lava elements to send to parse
      const elems = document.querySelectorAll("[data-lava]");

      // Loop through them
      for (let i = 0; i < elems.length; i++) {
        let elem = elems[i],
          // Get the contents within the element
          elemContents = elem.innerHTML,
          // Save the class list so we can add it to the new element
          elemClassList = elem.classList,
          xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              let response = convertStringToHTML(
                unescapeSlashes(this.responseText).slice(1).slice(0, -1).trim()
              );
              // Insert the response node before the original element
              elem.parentNode.insertBefore(response, elem);
              // Remove the original element
              elem.remove();
              // Add class list from original element to new one
              response.classList = elemClassList;
            } else {
              alert("Unauthorized");
            }
          }
        };

        xhttp.open(
          "POST",
          internalRoot.replace(/\/+$/, "") + "/api/Lava/RenderTemplate",
          true
        );

        xhttp.setRequestHeader(
          "Authorization-Token",
          authKey,
          "Content-type",
          "application/json"
        );
        xhttp.send(elemContents);
      }
    });

  callback();
};