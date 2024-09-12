(function () {
  let vm_print = new Vue({
    el: '.print-container',
    delimiters: ['${', '}'],
    data: {
      formFields: [
        { label: 'PROJECT', visible: true, label_fr: 'PROJET' },
        { label: 'PREPARED BY', visible: true, label_fr: 'PREPARÉ PAR' },
        { label: 'PREPARED FOR', visible: true, label_fr: 'PREPARÉ POUR' },
        { label: 'DATE', visible: true, label_fr: 'DATE' },
        { label: 'TYPE/ROOM	', visible: true, label_fr: 'TYPE/CHAMBRE' },
        { label: 'APPROVED', visible: true, label_fr: 'APPROUVÉ' }
      ],
      custom_logo: '',
      notes: ''
    },

    computed: {},

    mounted() {
    },

    methods: {
      onUploadCustomLogo(e) {
        const file = e.target.files[0];
        this.custom_logo = URL.createObjectURL(file);
      },

      hideRow(e) {
        e.currentTarget.closest('tr').classList.toggle('hide-print');
      },

      print() {
        // hide all hidden items
        document.body.classList.add('print-version');
        window.print();
        setTimeout(() => {
          document.body.classList.remove('print-version');
        }, 0);
      }
    }
  });
})();