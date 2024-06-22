const imageDirectory = "galery";
const imageClass = "gallerypics";

let htmlCode = "";

for (let i = 1; i <= 80; i++) {
  const imageName = `unnamed (${i}).jpg`;
  htmlCode += `<img src="${imageDirectory}/${imageName}" class="${imageClass}">`;
}

console.log(htmlCode);
