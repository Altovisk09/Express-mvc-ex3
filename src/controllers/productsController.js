const { json } = require('express');
const fs = require('fs');
const path = require('path');

const db = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(db, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Exibe todos os produtos
	index: (req, res) => {
		let product = products;
		res.render('products', {
			product,
			toThousand
		})
	},

	// Detalhes de um produto especifico
	detail: (req, res) => {
		let id = req.params.id;
		let product = products.find(product => product.id == id);
		res.render('detail', {
			product,
			toThousand
		})
	},

	// view criar novo produto
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Salva novo produto
	store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: 'default-image.png',
		}
		products.push(newProduct)
		fs.writeFileSync(db, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},

	// Atualizar - view 
	edit: (req, res) => {
		let id = req.params.id;
		let product = products.find(product => product.id == id);
		console.log(product)
		res.render('product-edit-form', {
			product
		})
	},
	// Atualizar - processo
	update: (req, res) => {
		let id = req.params.id;
		let productUpdate = products.find(product => product.id == id);

		productUpdate = {
			id: productUpdate.id,
			...req.body,
			image: productUpdate.image,
		}

		let modificationDb = products.map(product=>{
			if(product.id == productUpdate.id){
				return product = {...productUpdate}
			}
			return product
		})

		fs.writeFileSync(db , JSON.stringify(modificationDb, null, " "));
		res.send('<script>alert("Produto atualizado"); window.location.href = "/"</script>');
	},

	// Deletar - Deleta um produto do banco de dados
	destroy : (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.id != id);
		fs.writeFileSync(db, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
	}
};

module.exports = controller;