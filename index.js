function connect() {
    var searchTerm = document.getElementById("searchBox").value;
    document.getElementById("searchBox").value = "";

    if (searchTerm !== "") {
        document.getElementById("searchResult").innerHTML = `<p><i>Showing search result for '${searchTerm}'...</i></p>`;
    } else {
        document.getElementById("searchResult").innerHTML = `<p><i>Showing random recipes...</i></p>`;
    }

    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    fetch(url)
        .then(res => res.json())
        .then(data => display(data.meals));
}

function display(items) {
    var oldContent = document.getElementById("container");
    oldContent.textContent = "";

    var numToShow = Math.min(items.length, 5); // Show only the first 5 meals

    for (var i = 0; i < numToShow; i++) {
        var newDiv = createMealDiv(items[i]);
        oldContent.appendChild(newDiv);
    }

    if (items.length > 5) {
        var showAllButton = document.createElement("button");
        showAllButton.textContent = "SHOW ALL";
        showAllButton.addEventListener("click", function () {
            for (var j = 5; j < items.length; j++) {
                var newDiv = createMealDiv(items[j]);
                oldContent.appendChild(newDiv);
            }
            showAllButton.style.display = "none"; // Hide the "SHOW ALL" button after displaying all meals
        });
        showAllButton.classList.add("button-92");
        oldContent.appendChild(showAllButton);
    }
}

function createMealDiv(meal) {
    var newDiv = document.createElement("div");
    newDiv.innerHTML = `<div class="hero"> 
                            <div class="hero__title">
                                <h1> ${meal.strMeal} </h1> <span>( ID : ${meal.idMeal} )</span> <br> <br>
                                <img src="${meal.strMealThumb}"> <br>
                                <p id="instruction"><b><i>Instruction : </b></i>${meal.strInstructions}</p>
                            </div>
                            <div class="cube"></div>
                            <div class="cube"></div>
                            <div class="cube"></div>
                            <div class="cube"></div>
                            <div class="cube"></div>
                            <div class="cube"></div>
                        </div>
                        <br>`;

    newDiv.classList.add("innerStyle");
    return newDiv;
}
