

var items = [];
var serverURL = "http://localhost:8080";

// [
// {
//     code: "Chad",
//     title: "First product",
//     price: 123.00,
//     description: "Looking for the world to see you as an adult instead of Mr. Frat-but-chill, with a trust fund and a boat you dont like to talk about? Then get these shoes. Aint nobody gonna think you have money.<br><br>",
//     category: "Sneakers",
//     rating: 4,
//     image: "sneakers.jpg"

// },

// {
//     code: "Samantha",
//     title: "Second product",
//     price: 1.00,
//     description: "What do these shoes say about you? Did you major in theatre to express yourslf, only to become a business woman by day, and a *wink, wink* BUSINESS woman by night?<br><br><br>",
//     category: "Heels",
//     rating: 1,
//     image: "heels.jpg"

// },
// {
//     code: "Krisynne",
//     title: "Third product",
//     price: 23.00,
//     description: "Are you skinny and lethargic? Do you like boy bands and tacos? Have you tried whiskey once and thrown up? Call your father Daddy? Then these shoes have your name all over them.<br><br> ",
//     category: "Boots",
//     rating: 3,
//     image: "boots.jpg"

// },

// {
//     code: "Brad",
//     title: "Best product",
//     price: 56.00,
//     description: "Are you big boned, a bit of a bully and has a love of cutoff shorts. How about a love for beer pong. Do you still compare all women to your ex-girlfriends and pop your collar? Then these shoes are for you.<br><br>",
//     category: "Shoes",
//     rating: 4,
//     image: "slides.jpg"

// },


// ];

function getCatalogFromServer(){
    // create an AJAX request to get the data
    // When data is received:
        // fill items in array
        // call display catalog
    
        $.ajax({
            url: serverURL + "/API/products",
            type: "GET",
            success: function(response){
                console.log("Server responded OK", response);
                // filter to include only my items into array 
                // Travel array->get each item inside array
                // Compare item to user name
                // if equal, add item to array

                for (var i = 0; i < response.length; i++){
                    var theItem = response[i];
                    
                    if(theItem.user == "Liz"){
                        // console.log("My item", theItem);
                        items.push(theItem);
                    }
                }
                displayCatalog();
            },
            error: function(error){
                console.log("Error on request", error);
            }
        });
}

function displayCatalog(){
    for(var i=0; i< items.length; i++){
        var product = items[i];
        // var pLayout = "<div><h4>" + product + "</h4> </div>";
        displayItem(product);
        
    }
}

function displayItem(product){
    var pLayout = `<div class="item">
        <img src="img/${product.image}">
        <h4>${product.title}</h4>
        <h6>$${product.price}.00</h6>
        <p>${product.description}</p>
        <button class="btn btn-sm btn-info">Buy Me</button>
        </div>`;

        // console.log(i, pLayout);
        $("#catalog").append(pLayout);

}

function search(){
    var text = $("#txtSearch").val();

    

    // clear the catalog

    $("#catalog").html("");

    // Travel the array
    // get each element from the array
    // compare text with product.title
    // if match, display item

    for(var i = 0; i < items.length; i++){
        var product = items[i];
        

        if(
            product.title.toLowerCase().includes(text.toLowerCase())
            || product.code.toLowerCase().includes(text.toLowerCase())
            || product.description.toLowerCase().includes(text.toLowerCase())
        
        ){
            displayItem(product);
        }

    }


    

    

}
    
function init(){
    console.log("Catalog Page");
    
    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function (e){
        if(e.key == "Enter"){
            search();
            
        }
        
    });

    getCatalogFromServer();
    

    

}


window.onload = init;