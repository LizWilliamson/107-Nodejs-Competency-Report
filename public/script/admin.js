var serverURL = "http://localhost:8080";

// object constructor for items

function Item(code, title, price, desc, cat, rating, image){
    this.code = code;
    this.title = title;
    this.price = price;
    this.description = desc;
    this.category = cat;
    this.rating = rating;
    this.image = image;
    this.user = "Liz";

}

function clearForm(){
    $("#txtCode").val("");
    $("#txtTitle").val("");
    $("#txtPrice").val("");
    $("#txtDescription").val("");
    $("#txtCategory").val("");
    $("#txtRating").val("");
    $("#txtImage").val("");
}

function saveItem(){
    // get values
    var code = $("#txtCode").val();
    var title = $("#txtTitle").val();
    var price = $("#txtPrice").val();
    var description = $("#txtDescription").val();
    var category = $("#txtCategory").val();
    var rating = $("#txtRating").val();
    var image = $("#txtImage").val();

    // create an object
    var test = new Item(code, title, price, description, category, rating, image);
    console.log(test);

    // send the object to the server
    $.ajax({
        url: serverURL + "/API/products",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(test),
        success: function(response){
            //alert the user
            console.log("Data Saved, Server Responded with", response);
            clearForm();
            $("#alert").removeClass("hide");

            setTimeout(
                function(){
                    $("#alert").addClass("hide");
                },
                10000
            );
        },
        error: function(details){
            console.log("Error, something went wrong", details);
        }
    });


}



function loadMessages(){
    var name = "Liz";

    $.ajax({
        url: '/api/message/' + name,
        type: 'GET',
        success: function(res){
            console.log("Server says: ", res);
            for(var i=0; i < res.length; i++){
                displayMessage(res[i]);
            }
        },
        error: function(error){
            console.log("Error loading messages", error);
        }
    });
}

function displayMessage(message){
    var container = $("#messageList");
    var template = `<li><a href='mailto:${message.mail}'> ${message.name}</a> - ${message.message}</li>`;
    container.append(template);
}


function init(){
    console.log("admin page");

    $("#btnSave").click(saveItem);

    loadMessages();

    

}




window.onload = init;