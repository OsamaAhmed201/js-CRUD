var inputNameProduct = document.getElementById("inputNameProduct")
var inputPriceProduct = document.getElementById("inputPriceProduct")
var inputcatogryProduct = document.getElementById("inputcatogryProduct")
var inputdescraptionProduct = document.getElementById("inputdescraptionProduct")
var inputSearch = document.getElementById("inputSearch")
var currentIndex = 0;
var productContainer;
if (localStorage.getItem("myproducts") != null) {
    productContainer = JSON.parse(localStorage.getItem("myproducts"))
    displayProduct()

}
else {
    productContainer = [];
}

function Addproduct() {
    if(validation()==true){
        var product = {
        name: inputNameProduct.value,
        Price: inputPriceProduct.value,
        catogry: inputcatogryProduct.value,
        descraption: inputdescraptionProduct.value,
    }
    productContainer.push(product)
    localStorage.setItem("myproducts", JSON.stringify(productContainer))
    productValied()
    displayProduct()
    clearForm()
}
    else{
        productValied_Not()
    }
    
}
function productValied(){
    swal({
        title: "Product Saved!",
        text: "The product has been saved in the table!",
        icon: "success",
        button: "OK",
      });
}
function productValied_Not(){
    swal({
        title: "Error!",
        text: "Name is Not valid!",
        icon: "error",
        button: "OK",
      });
}


function clearForm() {
  
    inputNameProduct.value = "";
    inputPriceProduct.value = "";
    inputcatogryProduct.value = "";
    inputdescraptionProduct.value = "";

}

function displayProduct() {
    var temp = ``;
    for (var i = 0; i < productContainer.length; i++) {
        temp += `  <tr>
        <td>${[i+1]}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].Price}</td>
        <td>${productContainer[i].catogry}</td>
        <td>${productContainer[i].descraption}</td>
        <td>
            <i onclick="updateProduct(${i})" class="fa-regular fa-pen-to-square icone icones"></i>
        </td>
        <td>
        <i onclick="deleteProduct(${i})" class="fa-solid fa-trash-can icone"></i>
        </td>
    </tr>`
    }
    document.getElementById('tablebody').innerHTML = temp;
}


function deleteProduct(x) {
    productContainer.splice(x, 1)
    localStorage.setItem("myproducts", JSON.stringify(productContainer))
    displayProduct()
}


function updateProduct(x) {
    currentIndex = x;
    inputNameProduct.value = productContainer[x].name
    inputPriceProduct.value = productContainer[x].Price
    inputcatogryProduct.value = productContainer[x].catogry
    inputdescraptionProduct.value = productContainer[x].descraption
    document.getElementById('addEdit').style.display = "inline-block";
    document.getElementById('addbtn').style.display = "none";
    console.log(productContainer[x])
}


function addEdit() {
    productContainer[currentIndex].name = inputNameProduct.value
    productContainer[currentIndex].Price = inputPriceProduct.value
    productContainer[currentIndex].catogry = inputcatogryProduct.value
    productContainer[currentIndex].descraption = inputdescraptionProduct.value
    document.getElementById('addEdit').style.display = "none";
    document.getElementById('addbtn').style.display = "inline-block";
    localStorage.setItem("myproducts", JSON.stringify(productContainer))
    displayProduct()

}

function searchproduct() {
    var searchvaule = inputSearch.value;
    var temp = ``;
    for (i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchvaule.toLowerCase()) ||
        productContainer[i].catogry.toLowerCase().includes(searchvaule.toLowerCase()) ) {
            temp += `  <tr>
                <td>${[i]}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].Price}</td>
                <td>${productContainer[i].catogry}</td>
                <td>${productContainer[i].descraption}</td>
                <td>
                    <i onclick="updateProduct(${i})" class="fa-regular fa-pen-to-square icone icones"></i>
                </td>
                <td>
                <i onclick="deleteProduct(${i})" class="fa-solid fa-trash-can icone"></i>
                </td>
            </tr>`
        }

    }
    document.getElementById('tablebody').innerHTML=temp;
}

function validation(){
    var regex=/^[A-Z][a-z]{3,8}$/;
    if(regex.test(inputNameProduct.value)==true){
        inputNameProduct.classList.replace('is-invalid','is-valid');
        return true;
    }
    else{
        inputNameProduct.classList.add('is-invalid'); 
        return false;
    }
}
