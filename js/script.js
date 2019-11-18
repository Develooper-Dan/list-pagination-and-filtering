/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentsList = document.querySelectorAll(".student-item");
const itemsPerPage = 10;

/* Creates HTML-Elements using "name" as name of the element (like "div"), "properties"
for assigning attributes like class names or text content together with the respective
value and "parentNode" to which the element is appended to. IMPORTANT: "properties" has to be an
one- or two-dimensional array, each consisting of two elements in this pattern: [attribute, value].
*/
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
// Shows only those list elements whose index is in a certain range defined by the page number & itemsPerPage
function showPage (list, page, itemsPerPage){
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

/* Applies the pagination links to the bottom of the page and also assigns a click event to each link.
The number of added links is calculated by dividing the list length with the items per Page, the latter
being a constant which was defined at the beginning of this script
*/
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
/* Checks if the clicked link is showing the active page, eventually setting it's class to active
and calling the showPage function for that page
*/
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

// What the name suggests...
function replacePageLinks(list, itemsPerPage){
  const divPage = document.querySelector(".page");
  divPage.removeChild(divPage.lastChild);
  appendPageLinks (list, itemsPerPage);
}

// Removes  "No results" from previous searches and adds it if the list of search hits is empty
function checkResults (list){
  const ul = document.querySelector(".student-list");
  if (ul.lastChild.className=="no-result"){
    ul.removeChild(ul.lastChild);
  }
  if (list.length==0){
    const noResult = createElements("h2", [["className", "no-result"], ["textContent", "No results"]], ul);
  }
}

// Adds a search bar to the document. The search is either started by clicking a button or dynamically if a key is pressed
function appendSearchBar(){
  const listHeader = document.querySelector(".page-header");
  const divSearchBar = createElements("div", ["className", "student-search"], listHeader);
  const input = createElements("input", [["type", "text"], ["placeholder", "Search for students"]], divSearchBar);
  const button = createElements("button", ["textContent", "Search"], divSearchBar );

/* Checks which student names are matching the input and adds the matches to an new list.
Also replaces page links based on the number of hits or throw a "No results" message if nothing is found.
*/
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
        checkResults(hits);
        replacePageLinks(hits, itemsPerPage);
        showPage(hits, 1, itemsPerPage);
      }
    })
// Same as for the buttons event listener, but on "keyup"-event so the results are shown dynamically
  input.addEventListener("keyup", () =>{
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
        checkResults(hits);
        replacePageLinks(hits, itemsPerPage);
        showPage(hits, 1, itemsPerPage);
    })
}

appendSearchBar();
appendPageLinks(studentsList, itemsPerPage);
showPage(studentsList, 1, itemsPerPage);
