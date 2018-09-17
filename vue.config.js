// const target=process.env.VUE_APP_SCHOOL==='hit'?'http://i.hit.edu.cn':'http://one.ccnu.edu.cn';
// const target=process.env.VUE_APP_SCHOOL==='hit'?'http://192.168.57.53:8081':'http://onetest.ccnu.edu.cn';
// const target='http://one.ccnu.edu.cn';
// const target='http://192.168.0.8:88/portal';
const target=process.env.VUE_APP_SCHOOL==='nit'?'http://portal.nit.edu.cn/':'http://192.168.0.110:8081/portal';
// const target='http://192.168.0.19:8080';
// const target='http://portal.nit.edu.cn/';
module.exports = {
  baseUrl:process.env.baseUrl,
  outputDir:process.env.outputDir,
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