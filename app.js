const express = require ('express')

const port = process.env.PORT || 3000
const app = express()

const met = require('./met.js')

app.get('/students/:id', function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	if(req.params.id === 'A01281460'){
		res.send({
			id: "A01281460",
			fullname: "Flor Esthela Barbosa Castillo",
			nickname: "Flor :)",
			age: 21
		})
	}
	else{
		res.send({
			error: "Error en la matricula ingresada :("
		})
	}
})


app.get('/met', function(req,res){
	if(!req.query.search){
		return res.send({
			error: 'Escribe algo a buscar'
		})
	}
	met.metSearch(req.query.search, function(error,response){
		if(error){
			return res.send({
				error: error
			})
		}
		return met.metSearch(req.query.search,function(error, response){
				if(error){
					return res.send({
						error:error
					})
				}
				console.log(response.objectIDs[0])
				//return res.send(response)
				//console.log(response.objectIDs[0])
				met.idSearch(response.objectIDs[0], function(error, response){
					if(error){
						return res.send({
							error:error
						})
					}
					return res.send({
						searchTerm: req.query.search,
						artist: response.artist,
						title: response.title,
						year: response.year,
						technique: response.technique,
						metUrl: response.metUrl
					})
				})

			})	
	})





})

app.get('*', function(req,res){
	res.send({
		error: 'Esta ruta no existe, no hay nada'
	})
})

app.listen(port, function(){
	console.log('up and running')
})