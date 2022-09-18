//book tracker. user can store book data every time they search a book
//this event listener bellow, is running the function fetch
document.querySelector('button').addEventListener('click', getFetch)

//the line below, takes item from local storage on page load, and put it into h2
document.querySelector('h2').innerText = localStorage.getItem('books')


function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.title)
        //put title into localStorage
        //this line will reset item every time user clicks the button==>     localStorage.setItem('books', data.title)
        //this variable below is getting everything in localStorage in the key that are 'books'and 'title' using 
        //concatination. the quotaions are blank with a ; , using them as a delimiter (or seperator, like a comma)
        //as well as the + sign to add the 'title'
        //when the user clicks the button, they will get everything that is already in 'books' (the string) 
        //that is ALREADY in localStorage, then it will concatenate the new title, once you have the new title, it will update
        //the localStorage PLUS the new title and semicolon, in DOM AND in localStorage
        //       let books = localStorage.getItem('books') + " ; " + data.title
        //an issue that you can have with the code above, if you clear local storage,
        //and add a new item, the user will get 'null' result first, because null is ALREADY in localStorage
        //this is because on the initial call of the function,*** let books = localStorage.getItem('books') + " ; " + data.title  ***  
        //localStorage is NULL because it is empty
        ///to fix this issue----use a conditional   (using BANG ! checks), in this case
        //it is checking that localStorage is NOT NULL 
        // the conditional using ! is saying: if it is false, then we need to put something
        //into local storage - NULL by itself is a falsey value, so you DON'T want false or NULL 
        //the conditional ONLY runs when it is true (when it is NULL, the conditiola will set it to be the FIRST book)
        //after the first book is entered in local storage, the else will run every single time
        if(!localStorage.getItem('books')){
            localStorage.setItem('books', data.title)
        }else if(data.value === undefined){
          document.querySelector('h3').innerText = `404...ooops. stay calm, don't freak out. try refreshing the page.`
        }else{
          let books = localStorage.getItem('books') + " ; " + data.title
          localStorage.setItem('books', books)
        }
        //let books = localStorage.getItem('books') + " ; " + data.title
        //localStorage.setItem('books', books)
        document.querySelector('h2').innerText = localStorage.getItem('books')
       //+= concatenate each time, meaning to join or combine
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

//MAKE THE APP WORK WITH UNDEFINED, WHAT OTHER INFO CAN YOU GET FROM IT?
//PLAY WITH IT....MAKING AMAZING!!!