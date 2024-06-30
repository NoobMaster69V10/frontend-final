async function get_news(){
    const apiURL = "https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news";

    const response = await fetch(apiURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const news = await response.json();

    news.forEach((news)=>{
        add_news(news);
    });    
}

function format_date(date_string){
    const date = new Date(date_string);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const formattedDate = `${month} ${day}`;
    
    return formattedDate;
}

function add_news(news){
    const tBody = document.getElementById('newsBody');

    const tr = document.createElement('tr');

    tr.classList.add("news_table_row");

    tr.id = "row_" + news.id;

    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');
    const td7 = document.createElement('td');
    const td8 = document.createElement('td');

    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');


    td1.innerHTML = news.id;
    td2.innerHTML = news.title;
    td3.innerHTML = news.category;
    td4.innerHTML = news.likes;
    td5.innerHTML = format_date(news.dateUpdated);
    td6.innerHTML = format_date(news.dateCreated);

    btn1.innerHTML = "Delete";
    btn2.innerHTML = "Update";

    btn1.classList.add("table_btn");
    btn1.classList.add("delete_btn");
    btn2.classList.add("table_btn");
    btn2.classList.add("update_btn");

    btn1.setAttribute("data-id", news.id);
    btn2.setAttribute("data-id", news.id);

    btn1.addEventListener("click", function(e){
        const userId = e.target.getAttribute("data-id");
        delete_user(userId);
    });

    btn2.addEventListener("click", function(e){
        sessionStorage.setItem("update-id", news.id);

        window.location.href = 'update.html';
    });


    td7.appendChild(btn1);  
    td8.appendChild(btn2);


    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);

    tBody.append(tr);
}


function validate_input(){
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const category = document.getElementById('category');
    const editorFirstName = document.getElementById('editorFirstName');
    const editorLastName = document.getElementById('editorLastName');

    const titleValidation= document.getElementById('titleValidation');
    const descriptionValidation = document.getElementById('descriptionValidation');
    const categoryValidation = document.getElementById('categoryValidation');
    const firstnameValidation = document.getElementById('firstnameValidation');
    const lastnameValidation = document.getElementById('lastnameValidation');


    if(title.value.length < 8){
        title.style.borderColor = "#FF0000";
        title.style.outlineColor = "#FF0000";
        titleValidation.style.display = "inline";
    }

    if(description.value.length < 8){
        description.style.borderColor = "#FF0000";
        description.style.outlineColor = "#FF0000";
        descriptionValidation.style.display = "inline";
    }

    if(category.value == ""){
        category.style.borderColor = "#FF0000";
        category.style.outlineColor = "#FF0000";
        categoryValidation.style.display = "inline";
    }

    if(editorFirstName.value.length < 2){
        editorFirstName.style.borderColor = "#FF0000";
        editorFirstName.style.outlineColor = "#FF0000";
        firstnameValidation.style.display = "inline";
    }

    if(editorLastName.value.length < 2){
        editorLastName.style.borderColor = "#FF0000";
        editorLastName.style.outlineColor = "#FF0000";
        lastnameValidation.style.display = "inline";
    }


    title.addEventListener("input", (e) => {

        if (title.value.length < 8){
            title.style.borderColor = "#FF0000";
            title.style.outlineColor = "#FF0000";
            titleValidation.style.display = "inline";
        }
        else{
            title.style.borderColor = "#07070740";
            title.style.outlineColor = "#000";
            titleValidation.style.display = "none";
        }
    });

    description.addEventListener("input", (e) => {
        if (description.value.length < 8){
            description.style.borderColor = "#FF0000";
            description.style.outlineColor = "#FF0000";
            descriptionValidation.style.display = "inline";
        }
        else{
            description.style.borderColor = "#07070740";
            description.style.outlineColor = "#000";
            descriptionValidation.style.display = "none";
        }
    });

    category.addEventListener("change", (e) => {
        if (category.value.length == ""){
            category.style.borderColor = "#FF0000";
            category.style.outlineColor = "#FF0000";
            categoryValidation.style.display = "inline";
        }
        else{
            category.style.borderColor = "#07070740";
            category.style.outlineColor = "#000";
            categoryValidation.style.display = "none";
        }
    });

    editorFirstName.addEventListener("input", (e) => {
        if (editorFirstName.value.length < 2){
            editorFirstName.style.borderColor = "#FF0000";
            editorFirstName.style.outlineColor = "#FF0000";
            firstnameValidation.style.display = "inline";
        }
        else{
            editorFirstName.style.borderColor = "#07070740";
            editorFirstName.style.outlineColor = "#000";
            firstnameValidation.style.display = "none";
        }
    });

    editorLastName.addEventListener("input", (e) => {
        if (editorLastName.value.length < 2){
            editorLastName.style.borderColor = "#FF0000";
            editorLastName.style.outlineColor = "#FF0000";
            lastnameValidation.style.display = "inline";
        }
        else{
            editorLastName.style.borderColor = "#07070740";
            editorLastName.style.outlineColor = "#000";
            lastnameValidation.style.display = "none";
        }
    });

    if(title.value.length >= 8 && description.value.length >= 8 && category.value != "" && editorFirstName.value.length >= 2 && editorLastName.value.length >= 2){
        return true
    }
    else{
        return false
    }
}



async function add_to_server(){
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const category = document.getElementById('category');
    const editorFirstName = document.getElementById('editorFirstName');
    const editorLastName = document.getElementById('editorLastName');


    if(validate_input()){
        const apiURL = "https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news";
        
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title: title.value,
            description: description.value,
            category: category.value,
            editorFirstName: editorFirstName.value,
            editorLastName: editorLastName.value,
            }),
        });

        window.location.href = 'index.html';
    }   
}

async function delete_user(userId){
    const apiURL = "https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/" + userId;

    const response = await fetch(apiURL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const t_row = document.getElementById("row_" + userId);
    t_row.classList.add("tr_with_anim");
    setTimeout(function(){
        t_row.remove();
    }, 1500);
}

async function update_news(){
    const news_id = sessionStorage.getItem('update-id');

    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const category = document.getElementById('category');
    const editorFirstName = document.getElementById('editorFirstName');
    const editorLastName = document.getElementById('editorLastName');
    
    const apiURL = "https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/" + news_id;
    
    const response = await fetch(apiURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.value,
          description: description.value,
          category: category.value,
          editorFirstName: editorFirstName.value,
          editorLastName: editorLastName.value,
        }),
    });

    window.location.href = 'index.html';
}

async function add_to_form(){
    const news_id = sessionStorage.getItem('update-id');

    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('category');
    let editorFirstName = document.getElementById('editorFirstName');
    let editorLastName = document.getElementById('editorLastName');

    const apiURL = "https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/" + news_id;

    const response = await fetch(apiURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const news = await response.json();


    title.value = news.title;
    description.value = news.description;
    category.value = news.category;
    editorFirstName.value = news.editorFirstName;
    editorLastName.value = news.editorLastName;
}

function redirect_to_create(){
    window.location.href = 'create.html';
}

function redirect_to_index(){
    window.location.href = 'index.html';
}
