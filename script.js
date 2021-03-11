const addForm = document.querySelector('#addForm')
const myList = document.querySelector('.myList')
const error = document.querySelector('.error')
const input = document.querySelector('#input')
let array2 = []


// Get items from jasonPlaceholder

async function getTodosFromJP() {
 const response = await fetch('https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10');
 const data = await response.json();
 let newArray= Array.from(data);// Create a new array from jsonPlaceholder data
 
 postInList(newArray)
}


//Invoke get Todo-list from jsonPlaceholder
getTodosFromJP();


// Create Todo Item
async function createTodo(e){
 fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  body: JSON.stringify({
   userId: 1,
    id: 1,
    title: `${e}`,
    completed: false
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => insertNewItem(json));

}




// Insert Listitems with Todo-item + Delete-button
function postInList(todoList){
 
for(let i=0; i<todoList.length; i++ ){

if(todoList[i].completed != true){
 myList.innerHTML += ` <li class="list-group-item d-flex justify-content-between">
 ${todoList[i].title}


  <button class="btn btn-danger btn-sm float-right delete">X</button>
  </li>`
   array2.push(todoList[i].title)
  }else{
    myList.innerHTML += ` <li class="list-group-item d-flex justify-content-between done">
 ${todoList[i].title}

  <button class="btn btn-danger btn-sm float-right delete">X</button>
  </li>`
  }
  
}

}

// Submit eventlistener on Add Todo Form & Invoke addItem function
addForm.addEventListener('submit', addItem)

function addItem(e) {
 e.preventDefault();
 let item = document.querySelector('#input').value;
// Invoke Create Todo-Item
if(item != ''){
 createTodo(item);
// Empty form field
document.querySelector('#input').value = ''
//insertNewItem(item)
}else{
 error.textContent = 'You must enter some text';
 error.classList.add('errorRed')
 setTimeout(function(){
   error.textContent = '';
   error.classList.remove('errorRed')
}, 2000);
}
}


function insertNewItem(_item){
 
   myList.insertAdjacentHTML('afterbegin', ` <li class="list-group-item d-flex justify-content-between">
   ${_item.title}
  <button class="btn btn-danger btn-sm float-right delete ">X</button>
   </li>`)
   array2.unshift(_item.title)
}

// Eventlistener toggle for "Completed"
myList.addEventListener('click', (e)=> {
  if (e.target && e.target.nodeName == 'LI') {
    e.target.classList.toggle('done');

  }
});

//REMOVE ITEMS FROM BOTH UL-list & ARRAY (IF item is marked completed)
myList.addEventListener('click', removeItem)

function removeItem(e){

 if(e.target.classList.contains('delete')){
  if(confirm('Are you shure?')){
   const li = e.target.parentElement;
   
  if(li.classList.contains('done')){
     let dynamicTitle = e.target.previousSibling.textContent;
    
    //console.log(`FIRST CLICK ${dynamicTitle}`);
    for(i=0; i<array2.length; i++){
      //console.log(array2[i] + " " + dynamicTitle);
      let text = array2[i].toLowerCase().trim();
      let dynamicTitlex = dynamicTitle.toLowerCase().trim()
      let result = text.localeCompare(dynamicTitlex)
      //console.log(result);
      if(result === 0){
        array2.splice(i, 1);
        //console.log('MATCH!');

        break;
      }
    }

     myList.removeChild(li)
     //console.log(`ARRAY2 after splice: ${array2}`);
   }else{
    alert('Todo have to be clicked and Done for Removing')
   }
  }
 }
}


//LÄRDOM EFTER 2 dagars galenskap. DET ÄR INTE MÖJLIGT ATT STOPPA EN FOREACHLOOP om en condition inträder. Gick alltså inte att få if-satsen att funka för att splica en array. För att göra detta möjligt, alltså när dynamiskt skapade strängen matchar sträng i array så ska splice i arrayen köras. Till slut fick jag det att funka med en vanlig for-loop och efter att ha kört trim & tolowercase på strängarna. Måste ju finnas en enklare lösning??? 