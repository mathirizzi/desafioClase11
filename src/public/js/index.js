// Socket lado del cliente

const socket = io();



socket.on("lista-de-productos", data =>{
    console.log(data)
})


 //--------------------Eliminar producto con su ID--------------------//
const deleteProductInput = document.querySelector('#deleteProductInput')

const deleteProductButton = document.querySelector('#deleteProductButton')
deleteProductButton.addEventListener('click', (evt)=>{
    let inputValue = deleteProductInput.value
    console.log(inputValue)
    socket.emit("id-producto-eliminado", inputValue)
})

 //--------------------Agregar producto con formulario--------------------//

 const inputTitle = document.querySelector('#title')
 const inputDescription = document.querySelector('#description')
 const inputPrice = document.querySelector('#price')
 const inputThumbnail = document.querySelector('#thumbnail')
 const inputStock = document.querySelector('#stock')
 const inputCode = document.querySelector('#code')

 const addProductButton = document.querySelector('#addProductButton')
 addProductButton.addEventListener('click', (evt)=>{
    let inputTitleValue = inputTitle.value
    let inputDescriptionValue = inputDescription.value
    let inputPriceValue = inputPrice.value
    let inputThumbnailValue = inputThumbnail.value
    let inputStockValue = inputStock.value
    let inputCodeValue = inputCode.value
    socket.emit("producto-creado", {inputTitleValue, inputDescriptionValue, inputPriceValue, inputThumbnailValue, inputStockValue, inputCodeValue} )
 })