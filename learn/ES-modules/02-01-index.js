var name = 'foo module'

function hello() {
    console.log('hello')
}

class Person {}

// export {name, hello, Person}
export {name as fooName, hello, Person}

// 使用 default 为重命名时，模块会默认导出该成员，在引入是不能以 default 为名引入，需要重命名
//