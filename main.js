(() => {

    // search input text field
    let searchField = document.getElementById('search');

    // containers for search results
    let searchResults = document.getElementById('searchResults');
    let searchBox = document.getElementById('searchResultsBox');

    // unordered list for search result items
    let searchResultsList = document.getElementById('searchResultsUnorderedList');


    // fetch json data
    const fetchJSON = async() => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            return await response.json();

        } catch (err) {
            console.log('fetch failed', err);
        }
    }


    const filterData = async() => {

        hideAndRemoveResults();
        let data = await fetchJSON();
        const q = searchField.value.trim().toLowerCase(); // get the search text field's value

        if (q.length > 0) {

            // filter all of the fetched data emails containing the search field value
            const res = data.filter(i => i.email.toLowerCase().includes(q));

            // display results
            searchBox.style.display = 'block';
            searchResults.style.display = 'block';

            // create a list item
            // append the the list item to the search results list
            // attach a click listener for each result that sets the search text field to the clicked result
            res.forEach(i => {
                let listItem = document.createElement('li');
                listItem.innerHTML = i.email;
                searchResultsList.append(listItem);
                listItem.addEventListener('click', handleItemClick);

            });
        }

    }

    // set the text field on click of a search result
    const handleItemClick = (e) => {
        searchField.value = e.target.innerHTML;
        hideAndRemoveResults();
    }

    // reset and hide search results
    const hideAndRemoveResults = () => {
        searchBox.style.display = 'none';
        searchResults.style.display = 'none';
        searchResultsList.innerHTML = '';
    }

    // event listener for filtering search results on key up
    searchField.addEventListener('keyup', filterData);


})();