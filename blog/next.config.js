const withCSS = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{} // 在next.js的总配置文件中让next.js可以支持使用css
}

module.exports = withCSS({})