const data = [{
    id:1,
    name:'Dell',
    img:"./resources/download (1).jpg" ,
    price:150,
    cat:'Gaming'
},{
    id:1,
    name:'Macbook Air',
    img:"./resources/download (2).jpg" ,
    price:500,
    cat:'Workspace'
},{
    id:1,
    name:'Dell Xp 500',
    img:"./resources/download (3).jpg" ,
    price:750,
    cat:'Programing'
},{
    id:1,
    name:'Macbook Pro',
    img:"./resources/download (4).jpg" ,
    price:700,
    cat:'Day to Day'
}]

const productContainer = document.querySelector('.products')
const searchInput = document.querySelector('.search')
const categoryContainer = document.querySelector('.category')
const priceValue = document.querySelector('.priceValue')
const priceRange = document.querySelector('.range')

function displayProducts(filteredProducts){
    productContainer.innerHTML = filteredProducts.map((product)=>
        `
                    <div class="product">
                    <img src="${product.img}" alt="">
                    <span class="name">${product.name}</span>
                    <span class="price">$${product.price}</span>
                    </div>
                
        `
    ).join('')
}
displayProducts(data)

searchInput.addEventListener('keyup',(e)=>{
    const value = e.target.value.toLowerCase();

    if(value){//recieves user input 
        displayProducts(data.filter(item=> item.name.toLowerCase().indexOf(value)!== -1))
        /*
        uses arr.filter method to name the individual object to item .
        targets the name variable of the object and changes it to lowerCase.
        uses the .indexOf(value) method to check if the value(userInput) contains letters in the item.name props.
        */
    }
    else{
        displayProducts(data)
    }
})

function setCategory(){
    const allCats = data.map(item=>item.cat)
    const categories = ['All',...allCats.filter((item,i)=>{
        return allCats.indexOf(item==i)
    })]
    console.log(categories)

    categoryContainer.innerHTML= categories.map(cat=>
        `
         <span>${cat}</span>
        `
    ).join('')


    categoryContainer.addEventListener('click',(e)=>{
       const selectedCategory = e.target.textContent

       selectedCategory === 'All' ? displayProducts(data): displayProducts(data.filter(item=>item.cat === selectedCategory))
    })
}
// Set minimum and maximum price range
function setPrice() {
    const priceList = data.map((item) => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = '$' + maxPrice;

    // Update displayed products and price value on range input change
    priceRange.addEventListener('input', (e) => {
        const selectedPrice = e.target.value;
        priceValue.textContent = '$' + selectedPrice;
        displayProducts(data.filter((item) => item.price <= selectedPrice));
    });
}

setPrice();


setCategory()
