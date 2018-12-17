var app = new Vue({
    el: '#app',
    data: {
        criptoList: [],
        data: [],
        step: 10,
        resource_url: 'https://api.coinmarketcap.com/v2/listings/',
        message: 'Привет, Vue!',
        loading: false
    },
    methods: {
        onScroll: function (event) {
            let wrapper = event.target;
            let list = wrapper.firstElementChild;
            let scrollTop = wrapper.scrollTop;
            let wrapperHeight = wrapper.offsetHeight;
            let listHeight = list.offsetHeight;

            let diffHeight = listHeight - wrapperHeight;
            if (diffHeight <= scrollTop) {
                this.addElements();
            }

        },
        load: function () {
            this.$http.get(this.resource_url).then(function (response) {
                this.data = response.body.data;
                this.criptoList = this.data.slice(0, this.step);

                console.log(response);
            }, function (error) {
                console.log(error);
            })
        },
        addElements: function () {
            let numberOfElements = 10;
            this.step = this.step + numberOfElements;

            console.log(this.step);
            this.criptoList = this.criptoList.concat(this.data.slice(this.step - numberOfElements, this.step));
        }
    },
    created: function () {
        this.load();
    }
})