document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.quantity-plus').addEventListener('click', function(){
        let value = document.querySelector('.quantity-input-control').value;
        document.querySelector('.quantity-input-control').value = value+1;
    })

    document.querySelector('.quantity-minus').addEventListener('click', function(){
        let value = document.querySelector('.quantity-input-control').value;
        if(value > 1){
            document.querySelector('.quantity-input-control').value = value-1;
        }
        
    })
});