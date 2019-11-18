/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentsList = document.querySelectorAll(".student-item");
const itemsPerPage = 10;

function showPage (list, page, itemsPerPage){
  if (list.length==0){
    noResult();
    return
  }
  let startIndex = (page*itemsPerPage)-itemsPerPage;
  let endIndex = (page*itemsPerPage)-1;
  for (let i=0; i<list.length; i++){
      if (i>=startIndex && i<=endIndex){
        list[i].style.display ="";
      } else {
        list[i].style.display = "none";
      }
  }
}

function noResult (){
  const list = document.querySelector(".student-list");
  if (list.lastChild.className!=="no-result"){
    const listEmpty = createElements("h2", [["className", "no-result"], ["textContent", "No results"]], list);
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

      anchors.addEventListener("click", () => {
        if (anchors.className !== "active"){
          const allAnchors = ulPageLinks.querySelectorAll("a");
            for (let j=0; j<allAnchors.length; j++){
              allAnchors[j].className=" ";
            }
          anchors.className = "active";
          showPage(list, anchors.textContent, itemsPerPage);
        }
      })
  }
}

function replacePageLinks(list, itemsPerPage){
  const divPage = document.querySelector(".page");
  divPage.removeChild(divPage.lastChild);
  appendPageLinks (list, itemsPerPage);
}

function appendSearchBar(){
  const listHeader = document.querySelector(".page-header");
  const divSearchBar = createElements("div", ["className", "student-search"], listHeader);
  const input = createElements("input", [["type", "text"], ["placeholder", "Search for students"]], divSearchBar);
  const button = createElements("button", ["textContent", "Search"], divSearchBar );

  button.addEventListener("click", () =>{
    if (input.value){
      const searchText = input.value.toLowerCase();
      const studentNames = document.querySelectorAll(".student-details>h3");
      const hits = [];
        for (let i=0; i<studentsList.length; i++){
          const name = studentNames[i].textContent.toLowerCase();
            if (name.includes(searchText)){
              studentsList[i].style.display ="";
              hits.push(studentsList[i]);
            } else {
              studentsList[i].style.display ="none";
            }
        }
        replacePageLinks(hits, itemsPerPage);
        showPage(hits, 1, itemsPerPage);
      }
    })
}

appendSearchBar();
appendPageLinks(studentsList, itemsPerPage);
showPage(studentsList, 1, itemsPerPage);
