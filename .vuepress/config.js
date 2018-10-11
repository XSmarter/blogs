module.exports = {
  title: '风散云烟',
  description: '风散云烟博客',
  ga: 'UA-127225362-1',
  themeConfig: {
    nav: [
      { text: '技术', link: '/' },
      { text: '工作', items: [{text: '题库', link: '/work/题库.html'}] },
    ],
    sidebar: [
      ['/','主页'],
      ['/technical/Express和jwt认证实现RESTful-API.html','Express和jwt认证实现RESTful-API'],
      ['/technical/Vue-table-component.html','Vue-table-component'],
      ['/technical/一些常用的javascript代码.html','一些常用的javascript代码'],
      ['/technical/使用SheetJS实现纯前端导出Excel数据.html','使用SheetJS实现纯前端导出Excel数据']
    ]
  },
  markdown: {
    lineNumbers: true
  }
}