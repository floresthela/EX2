const request = require('request')


const metSearch = function(obj, callback){
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + obj
	console.log(obj)
	request({url:url, json:true}, function(error,response){
		if(error){
			callback('Servicio no disponible', undefined)
		}
		else if(response.body.Response == 'False'){
			callback(response.body.Error, undefined)
		}
		else{
			const data = response.body
			if(data.total === 0){
				callback('No hubo resultados de la busqueda', undefined)
			}
			else{
				//console.log(data)
				callback(undefined,data)
			}
		}
	})
}

const idSearch = function(id, callback){
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id
	request({url:url, json:true}, function(error, response){
		if(error){
			callback('Servicio no disponible', undefined)
		}
		else if(response.body.Response == 'False'){
			callback(response.body.Error, undefined)
		}
		else{
			const data = response.body
			const info = {
				artist : data.constituents[0].name,
				title : data.title,
				year : data.objectEndDate,
				technique: data.medium,
				metUrl: data.objectURL
			}
			callback(undefined,info)
		}
	})
}

module.exports={
	metSearch: metSearch,
	idSearch: idSearch
}