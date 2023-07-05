const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let visitado = products.filter(product => product.category == "visited")
let oferta = products.filter(product => product.category == "in-sale")

const controller = {
	index: (req, res) => {
	 res.render('index', {
		visitado,
		oferta,
		toThousand,
	 })
	},
	search: (req, res) => {
		let search = req.query.keywords
		let result = products.filter(product => product.name.toLowerCase().includes(search)) 
		res.render('results', {
			product: result,
			toThousand,
		})
	},
};

module.exports = controller;