module.exports = {
  title: '风散云烟',
  description: '风散云烟博客',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' }
    ],
    sidebar: [
      ['/','主页'],
      ['/technical/Express和jwt认证实现RESTful-API','Express和jwt认证实现RESTful-API'],
      ['/technical/Vue-table-component','Vue-table-component'],
      ['/technical/一些常用的javascript代码','一些常用的javascript代码'],
      ['/technical/使用SheetJS实现纯前端导出Excel数据','使用SheetJS实现纯前端导出Excel数据']
    ]
  },
  markdown: {
    lineNumbers: true
  }
}