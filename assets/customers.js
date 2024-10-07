document.addEventListener('DOMContentLoaded', function() {
    console.log('herere');
    document.querySelector('.product-form-container .quantity-plus').addEventListener('click', function(){
        let value = document.querySelector('.product-form-container .quantity-input-control .quantity-input').value;
        console.log('herere', value);
        if(value == 2){
            document.querySelector('.product-form-container .quantity-minus').disabled = false;
        }
        document.querySelector('.product-form-container .quantity-input-control .quantity-input').value = Number(value) + 1;
    })

    document.querySelector('.product-form-container .quantity-minus').addEventListener('click', function(){
        let value = document.querySelector('.product-form-container .quantity-input-control .quantity-input').value;
        if(value > 1){
            document.querySelector('.product-form-container .quantity-input-control .quantity-input').value = Number(value) - 1;
        }
        if(value == 2){
            document.querySelector('.product-form-container .quantity-minus').disabled = true;
        }
        
    })
});