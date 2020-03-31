module.exports = {
	indexPath: "index.js",
    chainWebpack: config => {   //修改webpack打包的入口文件。需要在根目录建两个对应入口js文件
		config.when(process.env.NODE_ENV === 'production', config => {
			config.entry('app').clear().add('./src/index.js')    //生产环境
		})

	}
  
}