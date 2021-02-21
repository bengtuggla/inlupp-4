const addForm = document.querySelector('#addForm')
const myList = document.querySelector('.myList')
// startPage & limit max 10 items/page
let sP = 1;
let lP = 10;
const error = document.querySelector('.error')
const input = document.querySelector('#input')


// Get items from jasonPlaceholder

async function getTodosFromJP() {
 const response = await fetch('https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10');
 const data = await response.json();
 postInList(data)
   console.log(data);
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
  .then((json) => console.log(json));
}




// Insert Listitems with Todo-item + Delete-button
function postInList(todoList){
for(let i=0; i<todoList.length; i++ ){

 myList.innerHTML += ` <li class="list-group-item d-flex justify-content-between">
 ${todoList[i].title}

  <button class="btn btn-danger btn-sm float-right delete">X</button>
  </li>`
  
}

}

// Submit eventlistener on Add Todo Form & Invoke addItem function
addForm.addEventListener('submit', addItem)

function addItem(e) {
 e.preventDefault();
 let item = document.querySelector('#input').value;
// Invoke Create Todo-Item
 createTodo(item);
// Empty form field
document.querySelector('#input').value = ''
insertNewItem(item)
}

// Insert new Todo + Deletebutton from Form as first Item
function insertNewItem(_item){
 if(_item !== ''){
   myList.insertAdjacentHTML('afterbegin', ` <li class="list-group-item d-flex justify-content-between">
   ${_item}
  <button class="btn btn-danger btn-sm float-right delete ">X</button>
   </li>`)
   }else{
     error.textContent = 'You must enter some text'
     //input.value="You must enter some text"
   }
}

// Eventlistener toggle for "Completed"
myList.addEventListener('click', (e)=> {
  if (e.target && e.target.nodeName == 'LI') {
    e.target.classList.toggle('done');

  }
});

myList.addEventListener('click', removeItem)

function removeItem(e){
 if(e.target.classList.contains('delete')){
  if(confirm('Are you shure?')){
   const li = e.target.parentElement;
   myList.remove(li)
   //location.reload()
  }
 }
}