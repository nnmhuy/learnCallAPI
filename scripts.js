get();

function get(){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            // console.log(this.responseText);
            fillInTable(this.responseText);
        }
    });

    xhr.open("GET", "https://coffee-chain.herokuapp.com/api/people/");
    xhr.setRequestHeader("accept", "application/json");

    xhr.send(data);
}

function post() {
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");

    if (!firstname.value || !lastname.value){
        alert("Firstname and lastname can't be empty");
        return;
    }

    var data = "firstname=" + firstname.value + "&" + "lastname=" + lastname.value;

    firstname.value = "";
    lastname.value = "";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            get();
        }
    });

    xhr.open("POST", "https://coffee-chain.herokuapp.com/api/people/");
    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send(data);
}

document.getElementById("add-button").addEventListener("click", post);


function delName(id){
    var data = "id=" + id;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange",function(){
        if (this.readyState === 4){
            get();      
        }
    })

    xhr.open("DELETE", "https://coffee-chain.herokuapp.com/api/people/" + id);
    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send(data);
}

function put(data){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){
        if (this.readyState === 4){
            get();
        }
    });

    xhr.open("PUT", "https://coffee-chain.herokuapp.com/api/people/");
    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send(data);
}

function newData(id){
    var inputFirstname = document.getElementById("inputFirstname" + id);
    var inputLastname = document.getElementById("inputLastname" + id);
    if (!inputFirstname.value || !inputLastname.value) {
        alert("Firstname and lastname can't be empty");
        return;
    }
    var data = ("firstname=" + inputFirstname.value + "&" + "lastname=" + inputLastname.value + "&" + "id=" + id);
    put(data);
}


function editFunction(id){
    var firstname = document.getElementById("firstname" + id);
    var inputFirstname = document.getElementById("inputFirstname" + id);

    firstname.style.display = "none";
    inputFirstname.value = firstname.innerHTML;
    inputFirstname.style.display = "inline";

    var lastname = document.getElementById("lastname" + id);
    var inputLastname = document.getElementById("inputLastname" + id);
    lastname.style.display = "none";
    inputLastname.value = lastname.innerHTML;
    inputLastname.style.display = "inline";

    var edit = document.getElementById("edit" + id);
    edit.style.display = "none";

    var save = document.getElementById("save" + id);
    save.style.display = "inline-block";
}


function fillInTable(data){
    data = JSON.parse(data);
    var tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    for (var i = 0; i < data.length; ++i){
        var row = document.createElement("tr");
        var firstnameData = document.createElement("td");
        var firstname = document.createElement("span");
        firstname.innerHTML = data[i].firstname;
        firstname.id = "firstname" + data[i].id;
        var inputFirstname = document.createElement("input");
        inputFirstname.id = "inputFirstname" + data[i].id;
        inputFirstname.setAttribute("type", "text");
        inputFirstname.style.width = "95%";
        inputFirstname.style.display = "none";
        firstnameData.appendChild(firstname);
        firstnameData.appendChild(inputFirstname);

        var lastnameData = document.createElement("td");
        var lastname = document.createElement("span");
        lastname.innerHTML = data[i].lastname;
        lastname.id = "lastname" + data[i].id;
        var inputLastname = document.createElement("input");
        inputLastname.id = "inputLastname" + data[i].id;
        inputLastname.setAttribute("type", "text");
        inputLastname.style.width = "95%";
        inputLastname.style.display = "none";
        lastnameData.appendChild(lastname);
        lastnameData.appendChild(inputLastname);

        var buttons = document.createElement("td");

        var edit = document.createElement("button");
        edit.innerHTML = "Edit";
        edit.id = "edit" + data[i].id;
        edit.nameID = data[i].id;


        var save = document.createElement("button");
        save.innerHTML = "Save";
        save.id = "save" + data[i].id;
        save.nameID = data[i].id;
        save.style.display = "none";

        var del = document.createElement("button");
        del.innerHTML = "Delete";
        del.id = "del" + data[i].id;
        del.nameID = data[i].id;

        del.addEventListener("click",function(e){
            delName(e.target.nameID);
        })

        edit.addEventListener("click", function (e) {
            editFunction(e.target.nameID);
        });

        save.addEventListener("click", function(e){
            newData(e.target.nameID);
        })

        buttons.appendChild(edit);
        buttons.appendChild(save);
        buttons.appendChild(del);
        row.appendChild(firstnameData);
        row.appendChild(lastnameData);
        row.appendChild(buttons);
        tableBody.appendChild(row);
    }
}



