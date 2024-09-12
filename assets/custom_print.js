
document.querySelectorAll('.print-form tr').forEach(item => {
    item.querySelector('input').addEventListener('keyup', function () {
        var conetent = this.closest('tr').querySelectorAll('td')[0].innerHTML;
        if (conetent.includes('EMAIL')) {
            document.querySelector('.icon-email').innerHTML = this.value;
        } else if (conetent.includes('PHONE')) {
            document.querySelector('.customer_phone').innerHTML = this.value;
        }
    })
})