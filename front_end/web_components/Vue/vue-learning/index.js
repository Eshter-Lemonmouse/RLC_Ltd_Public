// 以此种形式定义的组件被称为vue的全局组件
Vue.component('todo-item', {
    props: ['content', 'index'],
    template: '<li @click="handleClick">{{content}}</li>',
    methods: {
        handleClick: function() {
            this.$emit('delete', this.index);
        }
    }
});

// 以此种形式定义的组件被称为vue的局部组件
// 使用方法：在对应的vue实例中以components的属性声明
var RangedTodoItem = {
    template: '<li>ranged item</li>'
};

var Root = new Vue({
    el: '#root',
    data: {
        title: 'this is hello world',
        content: 'this is content'
    }
});

var Root1 = new Vue({
    el: '#root1',
    data: {
        firstName: '',
        lastName: ''
    },
    // 计算属性的优点：当计算属性的关联数据未发生变化时，计算属性不会重新计算，而是使用上次结果的缓存值
    computed: {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        }
    },
});

var Root2 = new Vue({
	el: '#root2',
	data: {
		show: false,
		list: [2, 3, 5, 7, 11, 13, 17, 19]
	},
	methods: {
		handleClick: function() {
			this.show = !this.show;
		},
	},
});

var Root3 = new Vue({
    el: '#root3',
    // components: {
    //     'ranged-todo-list': RangedTodoItem
    // },
    data: {
        inputValue: '',
        list: []
    },
    methods: {
        handleClick: function() {
            this.list.push(this.inputValue);
            this.inputValue = '';
        },
        handleDelete: function(index) {
            this.list.splice(index, 1);
        }
    }
});

//Vue实例就是一种Vue组件
//当Vue实例下没有声明template属性时，会把挂载点下所有的html内容视为Vue组件的模板