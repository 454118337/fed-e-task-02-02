## ES Modules 特性


导入和导出的注意事项

导出的不是字面量对象

导入的也不是对对象的解构

`export {}` 是固定的语法

需要导出一个对象的时候，可以使用 `export default {}`

导出成员的时候，是导出成员的引用，只读不可以写入