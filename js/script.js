/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentsList = document.querySelectorAll(".student-item");
const itemsPerPage = 10;

function showPage (list, page, itemsPerPage){
  let startIndex = (page*itemsPerPage)-itemsPerPage;
  let endIndex = (page*itemsPerPage)-1;
  for (let i=0; i<=(list.length-1); i++){
      if (i>=startIndex && i<=endIndex){
        list[i].style.display ="";
      } else {
        list[i].style.display = "none";
      }
  }
}

function createElements(name, properties, parentNode){
  const element = document.createElement(name);
  if (Array.isArray(properties[0])){
    for (let i=0; i<properties.length; i++){
      element[properties[i][0]]=[properties[i][1]];
    }
  }
  else {
    element[properties[0]]=[properties[1]];
    }
  parentNode.appendChild(element);
  return element;
}

function appendPageLinks (list, itemsPerPage){
  const divPage = document.querySelector(".page");
  const divPageLinks = createElements("div", ["className", "pagination"], divPage);
  const ulPageLinks = createElements("ul", [], divPageLinks);
  const noOfLinks= Math.ceil(list.length/itemsPerPage);
  for (let i=1; i<=noOfLinks; i++){
    const liPageLinks= createElements("li", [], ulPageLinks);
    const anchors = createElements("a", [["href", "#"], ["textContent", i]], liPageLinks);
      if (i===1){
        anchors.className="active";
      }
      // Daaaan, schreib das um, das ist falsch!
      anchors.addEventListener("click", (e) => {
        if (anchors.className !== "active"){
          const allAnchors = ulPageLinks.querySelectorAll("a")
            for (let j=0; j<=allAnchors.length; j++){
              allAnchors[j].className=" ";
            }
          anchors.className = "active";
          showPage(studentsList, anchors.textContent, itemsPerPage);
        }
      });
  }
}

function createList (list, itemsPerPage){
  appendPageLinks(list, itemsPerPage);
  showPage(list, 1, itemsPerPage);
}

createList(studentsList, itemsPerPage);






// Remember to delete the comments that came with this file, and replace them with your own code comments.
