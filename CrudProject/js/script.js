var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var mainBtn = document.getElementById('mainBtn');
var productContainer;
var updateIndex;
//check if there is an old data in local storage or not and return it if found
if (localStorage.getItem ("myProducts") == null){
    productContainer = [];
}
else {
    //return data from local storage and convert it from string to json
    productContainer = JSON.parse (localStorage.getItem("myProducts"));
    displayProduct();
}

function checkClick(){
    if(mainBtn.innerHTML == "add product")
    {
        addProduct();
    }
    else
    {
        updateProduct();
    }
}

function updateProduct(){
    productContainer[updateIndex].name  = productNameInput.value;
    productContainer[updateIndex].price  = productPriceInput.value;
    productContainer[updateIndex].category  = productCategoryInput.value;
    productContainer[updateIndex].desc  = productDescInput.value;
    mainBtn.innerHTML = "add product";
    localStorage.setItem ("myProducts", JSON.stringify(productContainer));
    clearForm();
    displayProduct();
}


function addProduct (){
    var product = 
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }

    if (product.name != "" && product.price != "" && product.category != ""){
        productContainer.push(product);
        //convert array from json to string and save it in the local storage
        localStorage.setItem ("myProducts", JSON.stringify(productContainer));
        clearForm();
        displayProduct();
    }
}

function clearForm (){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function displayProduct (){
    var cartoona = ``;
    for (var i=0; i<productContainer.length; i++){
        cartoona += `
        <tr>
            <td>${i+1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td><button onclick="changeFormForUpdate(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cartoona;
}

function searchProduct (searchTerm){
    var cartoona = ``;
    for (var i=0; i<productContainer.length; i++){
        if (productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())){
            cartoona += `
        <tr>
            <td>${i}</td>
            <td>${productContainer[i].name.toLowerCase().replace(searchTerm.toLowerCase(), `<span class = "bg-danger text-white">${searchTerm}</span>`)}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td><button class="btn btn-warning">Update</button></td>
            <td><button class="btn btn-danger">Delete</button></td>
        </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function deleteProduct (productIndex){
    productContainer.splice(productIndex, 1);
    localStorage.setItem ("myProducts", JSON.stringify(productContainer));
    displayProduct();
}

function changeFormForUpdate (productIndex){

    updateIndex = productIndex;
    productNameInput.value = productContainer[productIndex].name;
    productPriceInput.value = productContainer[productIndex].price;
    productCategoryInput.value = productContainer[productIndex].category;
    productDescInput.value = productContainer[productIndex].desc;
    mainBtn.innerHTML = "update";
    displayProduct();
}