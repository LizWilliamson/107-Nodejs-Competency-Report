var serverURL = "http://localhost:8080";

function saveMessage(){
    // read data
    var name = $("#txtName").val();
    var email = $("#txtEmail").val();
    var message = $("#txtMessage").val();
    
    // create an object (use object literal because there are only a few items)
    var message = {
        name: name,
        email: email,
        message: message,
        user: "Liz"
    };

    console.log(message);

    // send the object to the back end
    $.ajax({
        url: serverURL + "/API/message",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(message),
        success: function(submitted){
            //alert the user
            console.log("Your Message has been sent", submitted);
            clearForm();

        },
        error: function(error){
            console.log("Ooooops, something went wrong", error);
        }
    });
}

function clearForm() {
    $("#txtName").val("");
    $("#txtEmail").val("");
    $("#txtMessage").val("");
    
}

function init(){
    console.log('Contact Page');

    // click event on button
    $("#btnSend").click(saveMessage);
}


window.onload = init;