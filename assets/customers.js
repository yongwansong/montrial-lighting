document.addEventListener('DOMContentLoaded', function() {
    console.log('herere');
    document.querySelector('.quantity-plus').addEventListener('click', function(){
        let value = document.querySelector('.quantity-input-control .quantity-input').value;
        console.log('herere', value);
        document.querySelector('.quantity-input-control .quantity-input').value = value+1;
    })

    document.querySelector('.quantity-minus').addEventListener('click', function(){
        let value = document.querySelector('.quantity-input-control .quantity-input').value;
        if(value > 1){
            document.querySelector('.quantity-input-control .quantity-input').value = value-1;
        }
        
    })
});