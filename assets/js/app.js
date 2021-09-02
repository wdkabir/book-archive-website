// All id form HTML
const searchInputField = document.getElementById('search-input-field');
const bookListContainer = document.getElementById('book-list-container');
const errorMessage = document.getElementById('error-message');
const countData = document.getElementById('data-count');
// spinner function 
const toggleSpinner = displayStyle =>{
    document.getElementById('spinner-container').style.display = displayStyle;
}
// toggleSearchResultDiv function
const toggleSearchResultDiv = displayStyle =>{
    document.getElementById('count-div').style.display = displayStyle;
}
const toggleSearchResult = displayStyle =>{
    document.getElementById('data-count').style.display = displayStyle;
}
// search button function
const loadBook = () => {
    const searchField = searchInputField.value;
    // data clear
    countData.innerHTML = "";
    bookListContainer.innerHTML = "";
    searchInputField.value = "";
    errorMessage.innerHTML = "";
    // error handaling
    if(searchField === ""){
        toggleSearchResultDiv('none');
        errorMessage.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Please type your <b>Book Name</b> then click <b>Search</b> button!!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    return;
    }
    // show spinner 
    toggleSpinner('block');
    toggleSearchResultDiv('none');
    toggleSearchResult('none');
    const url = `https://openlibrary.org/search.json?q=${searchField}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBook(data, data.docs))
}
//display data
const displayBook = (data , books) => {
    const count = books.length;
    const AllBookCount = data.numFound;
    countData.innerHTML = `<span class="fw-bold text-info fs-5">Showing : ${AllBookCount} OF ${count} Found Result</span>`;
    // error handaling
    if(books.length === 0){
        errorMessage.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong> Result Not Found !</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }else if(books.length > 0){
     toggleSearchResultDiv('block');
     toggleSearchResult('none');
    }
    // foreach loop
    books.forEach(book => {
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
           <img src="${imgUrl ? imgUrl : 'N/A'}" class="card-img-top" style="height:300px" alt="${book.title}" />
            <h6 class="card-title p-3"><span class="fw-bold text-info fs-5">Name :</span> ${book.title}</h6>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" style = "font-size:1rem; font-weight:500"><span class="fw-bold text-info fs-5">Author :</span> ${book.author_name?book.author_name[0]:'N/A'}</li>
                <li class="list-group-item" style = "font-size:1rem; font-weight:500"><span class="fw-bold text-info fs-5">Publisher :</span> ${book.publisher?book.publisher[0]:'N/A'}</li>
                <li class="list-group-item" style = "font-size:1rem; font-weight:500"><span class="fw-bold text-info fs-5">First Publish Year :</span> ${book.first_publish_year ? book.first_publish_year : 'N/A'}</li>
            </ul>
        </div>`;
        bookListContainer.appendChild(div);
    });
    toggleSpinner('none');
    toggleSearchResult('block');
}