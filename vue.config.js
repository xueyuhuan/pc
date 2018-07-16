// const target='http://i.hit.edu.cn';
const target='http://one.ccnu.edu.cn';
// const target='http://onetest.ccnu.edu.cn';
// const target='http://192.168.0.8:88/portal';
module.exports = {
  css:{
    loaderOptions:{
      sass:{
        data:`@import "@/assets/scss/all.scss";`
      }
    }
  },
  devServer:{
    port:1999,
    proxy:{
      '/api':{
        target:target,
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      },
    }
  }
};