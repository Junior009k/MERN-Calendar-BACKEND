const {response}= require('express')
const bcryptjs=require('bcryptjs')
const User=require('../models/User')
const {generarJWT}=require('../Helper/jwt')
const createUser=async(req, res=response)=>{
    try{
        const{name, email, password}=req.body
        let usuario=await User.findOne({email})
        if(usuario){return res.status(400).json({
            ok:"false",
            msg:"El usuario ya existe con ese correo"
        })}
        const user= new User(req.body);
        //Encriptar contraseña
        const salt=bcryptjs.genSaltSync();
        user.password=bcryptjs.hashSync(password, salt)
        await user.save()
        const token=await generarJWT(user.id,user.name)
        
        res.status(201).json({
            "ok":true,
            msg:'Se registro exitosamente',
            uid:user.id,
            name, 
            token
            })}
    
    catch(error){
        console.log(error)
        res.status(500).json({
            ok:"false",
            msg:"Por favor hable con el administrador"
        })

    }
}
    

const loginUser=async(req, res=response)=>{
    try{
        const{email, password}=req.body
        let usuario=await User.findOne({email})
        if(!usuario){return res.status(400).json({
            ok:"false",
            msg:"El email del usuario no existe"
        })}

        //confirmar contraseña 
        const validPassword= bcryptjs.compareSync(password,usuario.password)
        if(!validPassword){return res.status(400).json({
            ok:"false",
            msg:"la contraseña es incorrecta"
        })}
        //generar JWT
        const token=await generarJWT(usuario.id,usuario.name)
        res.status(201).json({
            "ok":true,
            msg:'Inicio sesion exitosamente',
            uid:usuario.id,
            name:usuario.name,
            token
            })}
    
    catch(error){
        console.log(error)
        res.status(500).json({
            ok:"false",
            msg:"Por favor hable con el administrador"
        })

    }}

const revalidateToken=async (req, res=response)=>{
    const uid=req.uid
    const name=req.name
    const token=await generarJWT(uid,name)
    res.json(
        {"ok":true,
          uid:uid,
            name:name, 
            token:token,
            }
    )}

module.exports= {createUser,loginUser,revalidateToken}