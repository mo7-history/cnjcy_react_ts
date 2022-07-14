/*
 * @LastEditors: Mark
 * @Description: none
 * @Author: Mark
 * @Date: 2019-05-14 15:32:49
 * @LastEditTime: 2019-06-19 09:31:29
 */

module.exports = {
  extends: ['react-app'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    // jQuery: false,
    // $: false
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    //强制return
    'getter-return': 'error',
    'no-await-in-loop': 'error',
    //条件表达式禁止出现赋值操作
    'no-cond-assign': 'error',
    //必须使用\n换行
    'linebreak-style': ['error', 'unix'],
    //使用单引号
    quotes: ['error', 'single'],
    //console
    'no-console': [
      'warn',
      {
        allow: [
          'warn',
          'error',
          'info',
          'group',
          'groupCollapsed',
          'groupEnd',
          'table',
        ],
      },
    ],
    //禁用常量表达式
    'no-constant-condition': 'error',
    //正则的控制字符
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-dupe-args': 'error',
    //禁止出现重复的键
    'no-dupe-keys': 'error',
    //禁止出现重复的 case 标签
    'no-duplicate-case': 'error',
    //禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 'error',
    //禁止不必要的布尔类型转换
    'no-extra-boolean-cast': 'error',
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-inner-declarations': 'error',
    //必须使用括号包裹箭头函数的参数
    'arrow-parens': ['error', 'always'],
    //禁止不规则的空白
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: true,
        skipTemplates: true,
        skipRegExps: true,
      },
    ],
    'no-obj-calls': 'error',
    //禁止直接调用 Object.prototypes 的内置属性
    // 'no-prototype-builtins': "error",
    //正则表达式多个空格
    'no-regex-spaces': 'error',
    //禁用稀疏数组
    'no-sparse-arrays': 'error',
    //禁止出现令人困惑的多行表达式
    'no-unexpected-multiline': 'error',
    //警告return后的语句
    'no-unreachable': 'warn',
    //控制流语句规范
    'no-unsafe-finally': 'error',
    //善用感叹号
    'no-unsafe-negation': 'error',
    //强制 generator 函数
    'generator-star-spacing': ['error', { before: false, after: true }],
    //函数空格的问题
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'use-isnan': 'error',
    'valid-typeof': ['error', { requireStringLiterals: true }],
    //分号
    semi: ['error', 'always'],
    'semi-spacing': ['error', { before: false, after: true }],
    'semi-style': ['error', 'last'],
    //禁止导入重复模块
    'no-duplicate-imports': 'error',
    //jsx中使用单引号
    'jsx-quotes': ['error', 'prefer-double'],
    //括号内空格
    'space-in-parens': ['error', 'never'],
    //禁止使用嵌套的三元表达式
    'no-nested-ternary': 'error',
    //禁止混合缩进
    'no-mixed-spaces-and-tabs': 'error',
    //空格缩进
    indent: ['error', 2, { SwitchCase: 1 }],
    //调用构造函数必须带括号
    'new-parens': 'error',
    //多行注释风格
    // 'multiline-comment-style': ['error', 'starred-block'],
    //this别名
    'consistent-this': ['error', '_this'],
    //大括号风格
    'brace-style': 'error',
    //拖尾逗号
    'comma-dangle': ['error', 'always-multiline'],
    //正则表达式必须被括起来
    'wrap-regex': 'error',
    //不要省地方
    'arrow-spacing': 'error',
    //标记无效或缺失的 super() 调用
    'constructor-super': 'error',
    //操作符和箭头函数混用
    'no-confusing-arrow': 'error',
    //九年制调用 super() 之前使用 this 或 super
    'no-this-before-super': 'error',
    //不要玩花
    'no-useless-computed-key': 'error',
    //避免新手问题
    'no-new-symbol': 'error',
    //不要使用var
    'no-var': 'error',
    //简写
    'object-shorthand': 'error',
    //必须要有 yield
    'require-yield': 'error',
    //不要省地方
    'rest-spread-spacing': ['error', 'never'],
    //不要省括号
    curly: 'error',
    //switch
    'default-case': 'error',
    //点点和操作符
    'dot-location': ['error', 'property'],
    //恒等号
    eqeqeq: ['error', 'always'],
    //for-in 中必须判断
    'guard-for-in': 'error',
    //alert
    // 'no-alert': 'error',
    'no-caller': 'error',
    //switch 词法声明
    'no-case-declarations': 'error',
    //消除正则则表达式歧义
    'no-div-regex': 'error',
    //结构不能为空
    'no-empty-pattern': 'error',
    //禁止 null 比较
    'no-eq-null': 'error',
    //禁止 eval
    'no-eval': 'error',
    //禁止扩展原生类型
    'no-extend-native': 'error',
    //禁止不必要的标签
    'no-extra-label': 'error',
    //switch
    'no-fallthrough': 'error',
    //禁用浮点小数
    'no-floating-decimal': 'error',
    //禁止改变原生对象的值
    'no-global-assign': 'error',
    //禁止使用短符号进行类型转换
    'no-implicit-coercion': 'error',
    //禁止在全局范围使用变量和函数声明
    'no-implicit-globals': 'error',
    //禁用迭代器
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    //多空格问题
    'no-multi-spaces': 'error',
    //多行字符串
    'no-multi-str': 'error',
    'no-new': 'error',
    //禁用Function构造函数
    'no-new-func': 'error',
    //禁止原始包装实例
    'no-new-wrappers': 'error',
    //禁用八进制字面量
    'no-octal': 'error',
    //禁止对函数参数再赋值
    'no-param-reassign': 'error',
    //禁用__proto__
    'no-proto': 'error',
    //禁止多次声明同一个变量
    'no-redeclare': 'error',
    //return禁止赋值
    'no-return-assign': ['error', 'always'],
    //禁止return await
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    //禁止未使用过的表达式
    'no-unused-expressions': 'error',
    'no-useless-concat': 'error',
    //void
    'no-void': 'error',
    //禁用 with 语句
    'no-with': 'error',
    //要求使用 Error 对象作为 Promise 拒绝的原因
    'prefer-promise-reject-errors': 'error',
    //要求必须有基数 parseInt
    radix: 'error',
    //禁止使用不带 await 表达式的 async 函数
    'require-await': 'error',
    //var 必须在作用域顶部
    'vars-on-top': 'error',
    //需要把立即执行的函数包裹起来
    'wrap-iife': ['error', 'outside'],
    // if Yoda 条件
    yoda: 'error',
    //禁止删除变量
    'no-delete-var': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undef': 'error',
    'no-undefined': 'error',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'error',
    //数组括号
    'array-bracket-newline': ['error', 'consistent'],
    'array-bracket-spacing': ['error', 'never'],
    'array-element-newline': ['error', { multiline: true, minItems: 3 }],
    //花括号
    'block-spacing': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'eol-last': 'error',
    'implicit-arrow-linebreak': ['error', 'beside'],
    'key-spacing': 'error',
    //最大三层嵌套
    'max-nested-callbacks': ['error', 3],
    //最大参数数量 , 多余的参数应该使用解构
    'max-params': ['error', 3],
    'no-array-constructor': 'error',
    'no-mixed-operators': 'error',
    'no-multi-assign': 'error',
    'no-negated-condition': 'error',
    'no-new-object': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: { multiline: true },
      },
    ],
    'arrow-body-style': ['error', 'always'],
    'no-dupe-class-members': 'error',
    'no-const-assign': 'error',
    'no-class-assign': 'error',
    'no-useless-rename': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'sort-imports': 'off',
  },
};
// 详细规则说明请查看 http://eslint.cn/docs/rules/
