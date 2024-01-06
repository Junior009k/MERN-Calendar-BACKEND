/*Rutas de Usuarios / Auth 
Host + /api/auth
*/

const { validarJWT } = require('../middleware/validar-token')
const {Router}=require('express');
const {createUser,loginUser,revalidateToken}=require('../Controllers/auth');
const {check} =require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const router=Router();

router.post('/new',
            [
                check('name','El nombre es obligatorio').not().isEmpty(),
                check('email','El email es obligatorio').not().isEmpty().isEmail(),
                check('password','El password debe ser de 6 caracteres').not().isEmpty(),
                validarCampos

            ],
            createUser)


router.post('/',
            [
                check('email','El email es obligatorio').not().isEmpty().isEmail(),
                check('password','El password debe ser de 6 caracteres').not().isEmpty(),
                validarCampos
            ],
            loginUser)


router.get('/renew',
            validarJWT ,
            revalidateToken)



module.exports=router