document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.product-form-container .quantity-plus').addEventListener('click', function(){
        let value = document.querySelector('.product-form-container .quantity-input-control .quantity-input').value;
        console.log('herere', value);
        if(value == 1){
            document.querySelector('.product-form-container .quantity-minus').removeAttribute('disabled');
        }
        document.querySelector('.product-form-container .quantity-input-control .quantity-input').value = Number(value) + 1;
    })

    document.querySelector('.product-form-container .quantity-minus').addEventListener('click', function(){
        let value = document.querySelector('.product-form-container .quantity-input-control .quantity-input').value;
        if(value > 1){
            document.querySelector('.product-form-container .quantity-input-control .quantity-input').value = Number(value) - 1;
        }
        if(value == 2){
            document.querySelector('.product-form-container .quantity-minus').setAttribute('disabled', 'true');
        }
    })

    document.querySelectorAll('.cart__quantity').forEach(item => {
        item.querySelector('.quantity-minus').addEventListener('click', function(){
            let value = item.querySelector('.quantity-input-control .quantity-input').value;
            if(value > 1){
                item.querySelector('.quantity-input-control .quantity-input').value = Number(value) - 1;
            }
            if(value == 2){
                item.querySelector('.quantity-minus').setAttribute('disabled', 'true');
            }
        })

        item.querySelector('.quantity-plus').addEventListener('click', function(){
            let value = item.querySelector('.quantity-input-control .quantity-input').value;
            if(value > 1){
                item.querySelector('.quantity-input-control .quantity-input').value = Number(value) - 1;
            }
            if(value == 2){
                item.querySelector('.quantity-minus').setAttribute('disabled', 'true');
            }
        })
    })
});