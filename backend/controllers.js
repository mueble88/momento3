const { Vendedores, Venta } = require("./models.js");


// ------- VENDEDORES

exports.readVendedores = (req, res) =>
    Vendedores.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.readVendedor = (req, res) =>
    Vendedores.findOne({ idvend: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.deleteVendedores = (req, res) =>
    Vendedores.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.updateVendedores = (req, res) =>
    Vendedores.findOneAndUpdate(
        { _id: req.params.id },
        { $set: {idvend: req.body.idvend, nombre: req.body.nombre, correoe: req.body.correoe, totalcomision: req.body.totalcomision } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );


exports.createVendedores = (req, res) =>
    new Vendedores({idvend: req.body.idvend, nombre: req.body.nombre, correoe: req.body.correoe, totalcomision: req.body.totalcomision })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });



// ------ ARTÍCULOS

exports.readVentas = (req, res) =>
    Venta.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.readVenta = (req, res) =>
    Venta.findOne({ idvend: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.deleteVentas = (req, res) =>
    Venta.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.updateVentas = (req, res) =>
    Venta.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { zona: req.body.zona, fecha: req.body.fecha, valorventa: req.body.valorventa } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );


exports.createVentas = (req, res) =>{
    new Venta({idvend: req.body.idvend, zona: req.body.zona, fecha: req.body.fecha, valorventa: req.body.valorventa, comision: req.body.comision  })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else {       
            res.json(data);
        }    
    });
//find vendor by vendorId
//update vendor total comission and
//save vendor with updated commision to database
    
}
