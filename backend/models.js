const mongoose = require('mongoose');

const Vendedores = mongoose.model('Vendedores',
  new mongoose.Schema({idvend:Number, nombre: String, correoe: String, totalcomision: Number })
);


const Venta = mongoose.model('Venta',
  new mongoose.Schema({idvend: Number, zona: String, fecha: Date, valorventa: Number, comision:Number })
);

module.exports = {
  Vendedores: Vendedores,
  Venta: Venta
}

// Otra forma más corta:
// module.exports = {
//     Cliente,
//     Articulo
// }
