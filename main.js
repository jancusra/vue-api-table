new Vue({
  el: '#app',
  http: {
    emulateJSON: true,
    emulateHTTP: true
  },
  mounted () {
    this.getData()
  },
  data () {
    return {
      nameNew: '',
      surnameNew: '',
      birthNew: null,
      abilityNew: '',
      idDel: 0,
      nameDel: '',
      surnameDel: '',
      menu: false,
      dialog: false,
      delDialog: false,
      newFormErrors: false,
      notNull: (v) => v != null || 'Required field!',
      reqField: (v) => v.length > 0 || 'Required field!',
      tmp: '',
      search: '',
      pagination: {},
      loading: true,
      pages: [10, 20, 100, { text: "All", value: -1 }],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Surname', value: 'surname' },
        { text: 'Birth', value: 'birth' },
        { text: 'Ability', value: 'ability' },
        { text: '', value: 'actions', sortable: false, class: "actions-column" }
      ],
      items: [ ]
    }
  },
  computed: {
    newForm () {
      return {
        name: this.nameNew,
        surname: this.surnameNew,
        birth: (new Date(this.birthNew)).toISOString(),
        ability: this.abilityNew
      }
    },
    editForm () {
      return {
        tmp: this.tmp
      }
    }
  },
  methods: {
    getData: function () {
      this.loading = true
      this.$http.get('api/get.php').then(response => {
        this.items = response.body
        this.loading = false
      })
    },
    addData: function () {
      this.newFormErrors = false

      Object.keys(this.newForm).forEach(f => {
        if (!this.newForm[f]) this.newFormErrors = true
        if(!this.$refs[f].validate(true)) this.newFormErrors = true
      })

      if (!this.newFormErrors) {
        var item = Object.assign({ id: 0 }, this.newForm);

        this.$http.post('api/post.php', { obj: item }).then(response => {
          this.items = response.body
        })
        this.dialog = false
      }
    },
    updateData: function (id, prop) {
      if (this.$refs.tmp.validate(true)) {
        Object.keys(this.items).forEach(i => {
          if (this.items[i].id === id) {
            this.items[i][prop] = this.tmp
            this.$http.post('api/put.php', { obj: this.items[i] })
            return false
          }
        })
      }
    },
    deleteData: function (id) {
      this.delDialog = false
      this.$http.post('api/delete.php', { id: id }).then(response => {
        this.items = response.body
      })
    }
  }
})
