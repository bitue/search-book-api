
//load data function load the search result data by fetch
const loadBookData = () => {
    let bookName = document.getElementById('input-book').value
    document.getElementById('load').style.display = 'block'
    document.getElementById('no-result').style.display = 'none'
    //clear the data previous
    document.getElementById('add').textContent = ''
    document.getElementById('result-div').style.display = 'none'


    //fetch the data from api 
    fetch(`https://openlibrary.org/search.json?q=${bookName}`)
        .then(res => res.json())
        .then(data => loadData(data))

}

const loadData = (data) => {

    let books = data.docs
    let resultFound = data.numFound

    //clear the input field
    document.getElementById('input-book').value = ''
    //parent div
    let parentDiv = document.getElementById('add')


    // check the books array 
    if (books.length === 0) {
        document.getElementById('no-result').style.display = 'block'
        document.getElementById('load').style.display = 'none'
        return
    }
    //show the div and result 
    document.getElementById('result-div').style.display = 'block'
    document.getElementById('result-show').innerText = books.length
    document.getElementById('result-found').innerText = resultFound


    //use for each to get all search result objects
    books?.forEach(book => {
       
        let imgUrl;
        //check imgUrl 
        if (`${book.cover_i}` === 'undefined') {
            imgUrl = 'img/notfound.png'

        }
        else {
            imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

        }


        let div = document.createElement('div')




        div.innerHTML = `
       <div class=" sm:flex justify-center items-center h-full  bg-gray-200 hover:bg-gray-300 rounded-3xl  ">
        <div class="img text-center py-3 sm:w-1/3 w-full  h-[400px]">
        <img class="inline h-full " src=${imgUrl} alt="">

        </div>
        <div class="des sm:w-2/3 w-full py-3">
            <h1 class="font-bold  sm:text-2xl text-1xl text-center">Title:${book.title ? book.title : 'no title found'}</h1>
            <h1 class="font-bold  sm:text-2xl texl-1xl text-center">Author Names : ${book.author_name ? book.author_name : 'no author found'}</h1>
            <p class="font-bold  sm:text-1xl text-center">First Published year :${book.first_publish_year ? book.first_publish_year : ' no published year fund'}</p>
            <p class="font-bold  sm:text-1xl  text-center">Publisher :${book.publisher ? book.publisher : ' no publisher fund'}</p>


        </div>
    </div>
        
        
        `
        document.getElementById('load').style.display = 'none'





        //append as child the parent div
        parentDiv.appendChild(div)

    })


}

//add event listner by the search btn and call the load data call back function
document.getElementById("search-btn").addEventListener('click', loadBookData)