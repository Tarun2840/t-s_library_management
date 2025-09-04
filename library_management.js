let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let paraEl = document.getElementById("para");

function appendBooks(result) {
    let divEl = document.createElement("div");
    divEl.classList.add("book-card", "d-flex", "flex-column", "align-items-center");

    let imgEl = document.createElement("img");
    imgEl.src = result.imageLink;
    imgEl.alt = result.author;
    divEl.appendChild(imgEl);

    let pEl = document.createElement("p");
    pEl.textContent = result.author;
    divEl.appendChild(pEl);

    searchResultsEl.appendChild(divEl);
}

function results_to_con(search_results) {
    searchResultsEl.textContent = "";

    if (search_results.length === 0) {
        paraEl.textContent = "No results found";
    } else {
        paraEl.textContent = "Popular Books";
        for (let result of search_results) {
            appendBooks(result);
        }
    }
    spinnerEl.classList.add("d-none");
}

function searchbooks(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        paraEl.textContent = "";

        let searchInput = searchInputEl.value.trim();
        let url = "https://apis.ccbp.in/book-store?title=" + encodeURIComponent(searchInput);
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(response => response.json())
            .then(jsonData => {
                let {
                    search_results
                } = jsonData;
                results_to_con(search_results);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                paraEl.textContent = "Error fetching data. Please try again.";
                spinnerEl.classList.add("d-none");
            });
    }
}

searchInputEl.addEventListener("keydown", searchbooks);
