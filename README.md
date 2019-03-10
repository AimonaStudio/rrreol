# RRReol

方便的调试算法程序

# 设计思路

实验性项目，通过Node.js快速高效的测试OI选手的算法程序

```javascript
import Judge from 'rrreol'

Judge({
  input: ['./1.in', './2.in'],
  out: ['./1.out', './2.out']
})
```

```bash
rrreol INPUT="./1.in ./2.in" OUTPUT="./1.out, ./2.out"
# Testing ....
# ./1.in PASS √
# ./2.in UnPASS ×
# on line 12:
#    cout << "no";
#             ^
# Finished...
```
