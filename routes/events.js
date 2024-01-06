const { validarJWT } = require('../middleware/validar-token')
const {Router}=require('express');
const {check} =require('express-validator');
const {getEvent,createEvent,updateEvent,deleteEvent} = require('../Controllers/event');
const { validarCampos } = require('../middleware/validar-campos');
const { isDate } = require('../Helper/isDate');

const router=Router();
router.use(validarJWT)
//obtener eventos
router.get('/',getEvent)

//obtener eventos
router.post('/create',
            [check('title','El titulo es obligatorio').not().isEmpty(),
            check('start','Fecha de inicio es obligatoria').custom(isDate),
            check('end','Fecha final es obligatorio').custom(isDate),
            validarCampos],
            createEvent)

//obtener eventos
router.put('/:id',
            [check('title','El titulo es obligatorio').not().isEmpty(),
            check('start','Fecha de inicio es obligatoria').custom(isDate),
            check('end','Fecha final es obligatorio').custom(isDate),
            validarCampos],
            updateEvent)

//obtener eventos
router.delete('/:id',deleteEvent)

module.exports=router