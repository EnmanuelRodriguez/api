//constante para el paquete de MYSQL
const mysql = require('mysql');
//constante para el paquete express 
const express = require('express');
//variable para los metodos de express
var app = express();
//constante para el paquete de bodyparser
const bp = require('body-parser');

//enviando los datos JSON a NodeJS API
app.use(bp.json());

//conectar a la base de datos (Mysql)
var mysqlConnection = mysql.createConnection({

    host: '142.44.161.115',
    user: 'SMONICA',
    password: 'Smonica#770a',
    database: 'SMONICA',
    multipleStatements: true
});

//test de conexion a base de datos
mysqlConnection.connect((err) =>{
    if (!err) {
        console.log('conexion exitosa');
    } else {
        console.log('error al conectar a la DB');
    }
});  

//ejecutar el server en un puerto especifico
app.listen(3000, () => console.log('Server Running puerto: 3000'));

//crud method
app.get('/hola', function (req, res) {
    res.send("bienvenido a SMONICA")
});

//GET
// traer todos los telefonos
app.get("/telefonos", (req, res) => {
    mysqlConnection.query('SELECT * FROM TELEFONO', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//GET
// traer todas las direcciones
app.get("/direcciones", (req, res) => {
    mysqlConnection.query('SELECT * FROM DIRECCION', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//GET
// traer todos los correos
app.get("/correos", (req, res) => {
    mysqlConnection.query('SELECT * FROM CORREO', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//GET
// traer todas las personas
app.get("/personas", (req, res) => {
    mysqlConnection.query('SELECT * FROM PERSONA', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//GET
// seleccionar persona por codigo
app.get('/PERSONAS/:COD_PERSONA', (req, res) => {
    mysqlConnection.query('call SELECT_PERSONA(?);', [req.params.COD_PERSONA], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}); 

//POST
//INSERTAR PERSONA
app.post('/REGISTROPERSONA', (req, res) => {
    let consu = req.body;
    var sql = "SET @ID=?; SET @NOM_PERSONA=?; SET @APE_PERSONA=?; SET @SEXO=?; SET @EDAD=?; SET @EST_CIVIL=?; SET @TIP_DIRECCION=?; SET @NOM_DIRECCION=?; SET @TIP_TELEFONO=?; SET @NUM_TELEFONO=?; SET @TIP_CORREO=?; SET @CORREO=?; \ CALL INSERT_PERSONA(@ID, @NOM_PERSONA, @APE_PERSONA, @SEXO, @EDAD, @EST_CIVIL, @TIP_DIRECCION, @NOM_DIRECCION, @TIP_TELEFONO, @NUM_TELEFONO, @TIP_CORREO, @CORREO);"
    mysqlConnection.query(sql, [consu.ID, consu.NOM_PERSONA, consu.APE_PERSONA, consu.SEXO,consu.EDAD, consu.EST_CIVIL, consu.TIP_DIRECCION, consu.NOM_DIRECCION, consu.TIP_TELEFONO, consu.NUM_TELEFONO, consu.TIP_CORREO, consu.CORREO], (err, rows, fields) => {
        if (!err)
            res.send("datos de persona ingresados correctamente");
        else
            console.log(err);
    })
}); 

//PUT
// actualizar registro de PERSONA
app.put('/ACTUALIZARPERSONA', (req, res) => {
    let c = req.body;
    var sql = "SET @COD_PERSONA=?; SET @ID=?; SET @NOM_PERSONA=?; SET @APE_PERSONA=?; SET @SEXO=?; SET @EDAD=?; SET @EST_CIVIL=?; SET @TIP_DIRECCION=?; SET @NOM_DIRECCION=?; SET @TIP_TELEFONO=?; SET @NUM_TELEFONO=?; SET @TIP_CORREO=?; SET @CORREO=?; \ CALL UPDATE_PERSONA(@COD_PERSONA, @ID, @NOM_PERSONA, @APE_PERSONA, @SEXO, @EDAD, @EST_CIVIL, @TIP_DIRECCION, @NOM_DIRECCION, @TIP_TELEFONO, @NUM_TELEFONO, @TIP_CORREO, @CORREO);"
    mysqlConnection.query(sql, [c.COD_PERSONA, c.ID, c.NOM_PERSONA, c.APE_PERSONA, c.SEXO, c.EDAD, c.EST_CIVIL, c.TIP_DIRECCION, c.NOM_DIRECCION, c.TIP_TELEFONO, c.NUM_TELEFONO, c.TIP_CORREO, c.CORREO], (err, rows, fields) => {
        if (!err)
            res.send("datos de persona actualizados correctamente");
        else
            console.log(err);
    })
}); 

//GET
// traer todos los Metodos de Pago
app.get("/getmetodopago", (req, res) => {
    mysqlConnection.query('SELECT * from  METODOPAGO', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//GET
// seleccionar METODOPAGO por codigo
app.get('/getmetodopago/:COD_METODOPAGO', (req, res) => {
    mysqlConnection.query('call SELECT_METODOPAGO(?);', [req.params.COD_METODOPAGO], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}); 

//POST
//INSERTAR METODOPAGO
app.post('/postmetodopago', (req, res) => {
    let consu = req.body;
    var sql = "SET @TIP_PAGO=?; SET @NUM_TARJ_BAN=?; SET @TIT_TAR=?; SET @FEC_EMI=?; SET @FEC_VEN=?; SET @COD_SEG=?; \ CALL INSERT_METODOPAGO(@TIP_PAGO, @NUM_TARJ_BAN, @TIT_TAR, @FEC_EMI, @FEC_VEN, @COD_SEG);"
    mysqlConnection.query(sql, [consu.TIP_PAGO, consu.NUM_TARJ_BAN, consu.TIT_TAR, consu.FEC_EMI, consu.FEC_VEN, consu.COD_SEG], (err, rows, fields) => {
        if (!err)
            res.send("Datos de metodo de pago ingresados correctamente");
        else
            console.log(err);
    })
}); 

//PUT
//ACTUALIZAR METODOPAGO
app.put('/putmetodopago', (req, res) => {
    let c = req.body;
    var sql = "SET @COD_METODOPAGO=?;SET @TIP_PAGO=?; SET @NUM_TARJ_BAN=?; SET @TIT_TAR=?; SET @FEC_EMI=?; SET @FEC_VEN=?; SET @COD_SEG=?; \ CALL UPDATE_METODOPAGO(@COD_METODOPAGO, @TIP_PAGO, @NUM_TARJ_BAN, @TIT_TAR, @FEC_EMI, @FEC_VEN, @COD_SEG);"
    mysqlConnection.query(sql, [c.COD_METODOPAGO, c.TIP_PAGO, c.NUM_TARJ_BAN, c.TIT_TAR, c.FEC_EMI, c.FEC_VEN, c.COD_SEG], (err, rows, fields) => {
        if (!err)
            res.send("Datos de metodo de pago actualizados correctamente");
        else
            console.log(err);
    })
}); 

//GET
// traer todas las Ventas 
app.get("/getventas", (req, res) => {
    mysqlConnection.query('SELECT * FROM VENTAS', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//GET
// seleccionar ventas por codigo
app.get('/getventas/:COD_VENTAS', (req, res) => {
    mysqlConnection.query('call SELECT_VENTAS(?);', [req.params.COD_VENTAS], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}); 

//POST
//INSERTAR VENTAS
app.post('/postventas', (req, res) => {
    let consu = req.body;
    var sql = "SET @COD_CLIENTE=?; SET @CANTIDAD=?; SET @PRECIO=?; SET @COD_METODOPAGO=?; \ CALL INSERT_VENTAS(@COD_CLIENTE, @CANTIDAD, @PRECIO, @COD_METODOPAGO);"
    mysqlConnection.query(sql, [consu.COD_CLIENTE, consu.CANTIDAD, consu.PRECIO, consu.COD_METODOPAGO], (err, rows, fields) => {
        if (!err)
            res.send("Datos de ventas ingresados correctamente");
        else
            console.log(err);
    })
}); 


//PUT
//ACTUALIZAR VENTAS
app.put('/putventas', (req, res) => {
    let c = req.body;
    var sql = "SET @COD_VENTAS=?; SET @COD_CLIENTE=?; SET @CANTIDAD=?; SET @PRECIO=?; SET @COD_METODOPAGO=?; \ CALL UPDATE_VENTAS(@COD_VENTAS,@COD_CLIENTE, @CANTIDAD, @PRECIO, @COD_METODOPAGO);"
    mysqlConnection.query(sql, [c.COD_VENTAS, c.COD_CLIENTE, c.CANTIDAD, c.PRECIO, c.COD_METODOPAGO], (err, rows, fields) => {
        if (!err)
            res.send("Datos de Ventas actualizados correctamente");
        else
            console.log(err);
    })
}); 



//GET COMPRAS
// seleccionar COMPRAS  
app.get("/getcompras", (req, res) => {
    mysqlConnection.query('SELECT * FROM COMPRAS', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


//GET
// seleccionar COMPRAS por codigo
app.get('/getcompras/:COD_COMPRAS', (req, res) => {
    mysqlConnection.query('call SELECT_COMPRAS(?);', [req.params.COD_COMPRAS], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}); 

//POST COMPRAS
app.post('/postcompras', (req, res) => {
    let consu = req.body;
    var sql = "SET @COD_PROVEEDOR=?;SET @CANTIDAD=?; SET @PRECIO=?; SET @COD_METODOPAGO=?; \ CALL INSERT_COMPRAS(@COD_PROVEEDOR, @CANTIDAD, @PRECIO,@COD_METODOPAGO);"
    mysqlConnection.query(sql, [consu.COD_PROVEEDOR, consu.CANTIDAD, consu.PRECIO, consu.COD_METODOPAGO], (err, rows, fields) => {
        if (!err)
            res.send("Datos de compras ingresados correctamente");
        else
            console.log(err);
    })
}); 

//PUT COMPRAS
app.put('/putcompras', (req, res) => {
    let c = req.body;
    var sql = "SET @COD_COMPRAS=?; SET @COD_PROVEEDOR=?; SET @CANTIDAD=?; SET @PRECIO=?; SET @COD_METODOPAGO=?; \ CALL UPDATE_COMPRAS(@COD_COMPRAS, @COD_PROVEEDOR, @CANTIDAD, @PRECIO, @COD_METODOPAGO);"
    mysqlConnection.query(sql, [c.COD_COMPRAS, c.COD_PROVEEDOR, c.CANTIDAD, c.PRECIO, c.COD_METODOPAGO], (err, rows, fields) => {
        if (!err)
            res.send("Datos de compras actualizados correctamente");
        else
            console.log(err);
    })
});

//GET INV_FINAL
// seleccionar INV_FINAL 
app.get("/getinv_final", (req, res) => {
    mysqlConnection.query('SELECT * from INV_FINAL', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


//GET
// seleccionar INV_FINAL por codigo
app.get('/getinv_final/:COD_INV_FINAL', (req, res) => {
    mysqlConnection.query('call SELECT_INV_FINAL(?);', [req.params.COD_INV_FINAL], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}); 

//POST INV_FINAL
app.post('/postinv_final', (req, res) => {
    let consu = req.body;
    var sql = "SET @COD_PRODUCTO=?; SET @COD_INV_COMPRA=?; SET @COD_INV_VENTA=?; SET @CANTIDAD=?;\ CALL INSERT_INV_FINAL(@COD_PRODUCTO, @COD_INV_COMPRA, @COD_INV_VENTA, @CANTIDAD);"
    mysqlConnection.query(sql, [consu.COD_PRODUCTO, consu.COD_INV_COMPRA, consu.COD_INV_VENTA, consu.CANTIDAD], (err, rows, fields) => {
        if (!err)
            res.send("Datos de inventario final ingresados correctamente");
        else
            console.log(err);
    })
}); 

//PUT INV_FINAL
app.put('/putinv_final', (req, res) => {
    let c = req.body;
    var sql = "SET @COD_INV_FINAL=?;SET @COD_PRODUCTO=?; SET @COD_INV_COMPRA=?; SET @COD_INV_VENTA=?; SET @CANTIDAD=?;  \ CALL UPDATE_INV_FINAL(@COD_INV_FINAL, @COD_PRODUCTO, @COD_INV_COMPRA, @COD_INV_VENTA, @CANTIDAD);"
    mysqlConnection.query(sql, [c.COD_INV_FINAL, c.COD_PRODUCTO, c.COD_INV_COMPRA, c.COD_INV_VENTA, c.CANTIDAD], (err, rows, fields) => {
        if (!err)
            res.send("Datos de metodo de inventario final actualizado correctamente");
        else
            console.log(err);
    })
}); 

//GET
//Seleccionar empleados
app.get("/getempleado", (req, res) => {
    mysqlConnection.query('SELECT * from  EMPLEADO', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


//GET
// seleccionar empleados por codigo
app.get('/getempleado/:COD_EMPLEADO', (req, res) => {
    mysqlConnection.query('call SELECT_EMPLEADO(?);', [req.params.COD_EMPLEADO], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}); 

//POST
//POST EMPLEADO
app.post('/postempleado', (req, res) => {
    let consu = req.body;
    var sql = "SET @USR_EMPLEADO=?; SET @COD_PERSONA=?; SET @FEC_REGISTRO=?; SET @CARGO=?; SET @SALARIO=?; \ CALL INSERT_EMPLEADO(@USR_EMPLEADO, @COD_PERSONA, @FEC_REGISTRO, @CARGO, @SALARIO);"
    mysqlConnection.query(sql, [consu.USR_EMPLEADO, consu.COD_PERSONA, consu.FEC_REGISTRO, consu.CARGO, consu.SALARIO], (err, rows, fields) => {
        if (!err)
            res.send("Datos del empleado ingresados correctamente");
        else
            console.log(err);
    })
}); 

//PUT
//PUT EMPLEADO
app.put('/putempleado', (req, res) => {
    let c = req.body;
    var sql = "SET @COD_EMPLEADO=?; SET @USR_EMPLEADO=?; SET @COD_PERSONA=?; SET @FEC_REGISTRO=?; SET @CARGO=?; SET @SALARIO=?; \ CALL UPDATE_EMPLEADO(@COD_EMPLEADO, @USR_EMPLEADO, @COD_PERSONA, @FEC_REGISTRO, @CARGO, @SALARIO);"
    mysqlConnection.query(sql, [c.COD_EMPLEADO, c.USR_EMPLEADO, c.COD_PERSONA, c.FEC_REGISTRO, c.CARGO, c.SALARIO], (err, rows, fields) => {
        if (!err)
            res.send("Datos del empleado actualizados correctamente");
        else
            console.log(err);
    })
}); 

//GET
//Seleccionar CLIENTES
app.get("/getcliente", (req, res) => {
    mysqlConnection.query('SELECT * FROM CLIENTE', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//GET
// seleccionar clientes por codigo
app.get('/getcliente/:COD_CLIENTE', (req, res) => {
    mysqlConnection.query('call SELECT_CLIENTE(?);', [req.params.COD_CLIENTE], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}); 

//POST
//POST CLIENTE
app.post('/postcliente', (req, res) => {
    let consu = req.body;
    var sql = "SET @COD_PERSONA=?; SET @FACTURA=?; \ CALL INSERT_CLIENTE(@COD_PERSONA, @FACTURA);"
    mysqlConnection.query(sql, [consu.COD_PERSONA, consu.FACTURA], (err, rows, fields) => {
        if (!err)
            res.send("Datos del cliente ingresados correctamente");
        else
            console.log(err);
    })
}); 

//PUT
//PUT CLIENTE
app.put('/putcliente', (req, res) => {
    let c = req.body;
    var sql = "SET @COD_CLIENTE=?; SET @COD_PERSONA=?; SET @FACTURA=?; \ CALL UPDATE_CLIENTE(@COD_CLIENTE, @COD_PERSONA, @FACTURA);"
    mysqlConnection.query(sql, [c.COD_CLIENTE, c.COD_PERSONA, c.FACTURA], (err, rows, fields) => {
        if (!err)
            res.send("Datos del cliente actualizados correctamente");
        else
            console.log(err);
    })
}); 

//GET
//Seleccionar PRODUCTO
app.get("/getproducto", (req, res) => {
    mysqlConnection.query('SELECT * FROM PRODUCTO', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//GET
// seleccionar productos por codigo
app.get('/getproducto/:COD_PRODUCTO', (req, res) => {
    mysqlConnection.query('call SELECT_PRODUCTO(?);', [req.params.COD_PRODUCTO], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}); 

//POST
//POST PRODUCTO
app.post('/postproducto', (req, res) => {
    let consu = req.body;
    var sql = "SET @COD_PROVEEDOR=?; SET @NOM_PRODUCTO=?; SET @TIPO_PRODUCTO=?; SET @DESC_PRODUCTO=?; SET @UN_COMPRA=?; SET @UN_VENTA=?;\ CALL INSERT_PRODUCTO(@COD_PROVEEDOR, @NOM_PRODUCTO, @TIPO_PRODUCTO, @DESC_PRODUCTO, @UN_COMPRA, @UN_VENTA);"
    mysqlConnection.query(sql, [consu.COD_PROVEEDOR, consu.NOM_PRODUCTO, consu.TIPO_PRODUCTO, consu.DESC_PRODUCTO, consu.UN_COMPRA, consu.UN_VENTA], (err, rows, fields) => {
        if (!err)
            res.send("Datos del producto ingresados correctamente");
        else
            console.log(err);
    })
}); 

//PUT
//PUT PRODUCTO
app.put('/putproducto', (req, res) => {
    let c = req.body;
    var sql = "SET @COD_PRODUCTO=?; SET @COD_PROVEEDOR=?; SET @NOM_PRODUCTO=?; SET @TIPO_PRODUCTO=?; SET @DESC_PRODUCTO=?; SET @UN_COMPRA=?; SET @UN_VENTA=?;\ CALL UPDATE_PRODUCTO(@COD_PRODUCTO, @COD_PROVEEDOR, @NOM_PRODUCTO, @TIPO_PRODUCTO, @DESC_PRODUCTO, @UN_COMPRA, @UN_VENTA);"
    mysqlConnection.query(sql, [c.COD_PRODUCTO,c.COD_PROVEEDOR, c.NOM_PRODUCTO, c.TIPO_PRODUCTO, c.DESC_PRODUCTO, c.UN_COMPRA, c.UN_VENTA], (err, rows, fields) => {
        if (!err)
            res.send("Datos del producto actualizados correctamente");
        else
            console.log(err);
    })
}); 

//GET
//Seleccionar PROVEEDOR
app.get("/getproveedor", (req, res) => {
    mysqlConnection.query('SELECT * FROM PROVEEDOR', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//GET
// seleccionar PROVEEDOR por codigo
app.get('/getproveedor/:COD_PROVEEDOR', (req, res) => {
    mysqlConnection.query('call SELECT_PROVEEDOR(?);', [req.params.COD_PROVEEDOR], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//POST
//POST PROVEEDOR
app.post('/postproveedor', (req, res) => {
    let consu = req.body;
    var sql = "SET @COD_PERSONA=?; \ CALL INSERT_PROVEEDOR(@COD_PERSONA);"
    mysqlConnection.query(sql, [consu.COD_PERSONA], (err, rows, fields) => {
        if (!err)
            res.send("Datos del proveedor ingresados correctamente");
        else
            console.log(err);
    })
});

//PUT
//PUT PROVEEDOR
app.put('/putproveedor', (req, res) => {
    let c = req.body;
    var sql = "SET @COD_PROVEEDOR=?; SET @COD_PERSONA=?; \ CALL UPDATE_PROVEEDOR(@COD_PROVEEDOR, @COD_PERSONA);"
    mysqlConnection.query(sql, [c.COD_PROVEEDOR, c.COD_PERSONA], (err, rows, fields) => {
        if (!err)
            res.send("Datos del proveedor actualizados correctamente");
        else
            console.log(err);
    })
}); 