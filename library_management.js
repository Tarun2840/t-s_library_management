let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let paraEl = document.getElementById("para");

function appendBooks(result) {
    console.log(result);
    let divEl = document.createElement("div");
    divEl.classList.add("d-flex", "flex-column", "justify-content-center");
    // Create and append the image element  
    let imgEl = document.createElement("img");
    imgEl.src = result.imageLink;
    imgEl.alt = result.author; // For better accessibility  
    divEl.appendChild(imgEl);
    // Create and append the paragraph element  
    let pEl = document.createElement("p");
    pEl.textContent = result.author;
    divEl.appendChild(pEl);

    searchResultsEl.appendChild(divEl);
}

function results_to_con(search_results) {
    // Clear previous results  
    searchResultsEl.textContent = "";

    if (search_results.length === 0) {
        paraEl.textContent = "No results found";
    } else {
        let headingEl = document.createElement('h1');
        headingEl.textContent = "Popular Books";
        searchResultsEl.appendChild(headingEl);

        for (let result of search_results) {
            appendBooks(result);
        }
    }
    spinnerEl.classList.add("d-none"); // Hide the spinner after processing results  
}

function searchbooks(event) {
    if (event.key === "Enter") { // Check if Enter key is pressed  
        spinnerEl.classList.remove("d-none"); // Show spinner  
        searchResultsEl.textContent = ""; // Clear previous results  

        let searchInput = searchInputEl.value.trim(); // Get and trim input value  
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput; // Encode input for URL  
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                results_to_con(search_results);
            })
            .catch(function(error) {
                console.error("Error fetching data:", error);
                paraEl.textContent = "Error fetching data. Please try again.";
                spinnerEl.classList.add("d-none"); // Hide spinner on error  
            });
    }
}

// Corrected event listener  
searchInputEl.addEventListener("keydown", searchbooks);