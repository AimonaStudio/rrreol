---
sidebar: auto
---
# 介绍

RRReol 由四部分组成，他们分别是

## RRReol-Core <Badge text="即将完成" type="tip"/>

核心部分，所有的测评逻辑代码都在这里

如果您掌握 `javascript` 和 `node` 的基本知识，那么您可以这样

```javascript
const rrreol = require('@rrreol/core')
const judge = new rrreol.Judge('./1.cpp')
judge.load(__dirname, {
  input: /[0-9]+.in$/,
  output: /[0-9]+.out$/
})
judge.exec() // 开始测试
```


## RRReol-Cli <Badge text="在做了" type="warn"/>

通过命令行，可以方便的实现多输入输出测试

```bash
rrreol 1.cpp --in 1.in 2.in 3.in --out 1.out 2.out 3.out
```

当然，您也可以在目录下编写 `rrreol.config.js` 文件，方便多次运行

```javascript
module.exports = {
  input: /[0-9]+.in$/,  // 通过正则表达式，将类似 1.out 的文件自动加入到测评中
  output: /[0-9]+.out$/
}
```

或者 `.json` 格式

```json
{
  "input": "[0-9]+.in$",
  "output": "[0-9]+.out$"
}
```

```bash
rrreol -c 1.cpp # 自动寻找当前目录下的 rrreol.config.js，并测试代码

rrreol --config ../foo/rrreol.config.js 1.cpp # 指定配置文件
```

## RRReol-Serve <Badge text="在做了" type="warn"/> 

通过Node.js实现简单的服务器功能

## RRReol-UI <Badge text="在做了" type="warn"/>

提供可视化功能，可以在浏览器上直接操作代码测评

::: warning
将来可能通过 [electron](https://electronjs.org/) 实现跨平台软件
:::
