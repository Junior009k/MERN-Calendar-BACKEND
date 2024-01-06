const {response,request}= require('express')
const Evento=require('../models/Evento')
const getEvent=async (req,res=response)=>{

    const eventos = await Evento.find()
                                .populate('user','name')

    try{
    res.status(200).json({
        ok:true,
        Eventos:eventos
    })
}catch(error){
    console.log(error)
    res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'
    })
}

}

const createEvent=async(req,res=response)=>{
    const evento=new Evento(req.body)
    try{
        evento.user=req.uid;
        const eventoGuardado=await evento.save()
        
                res.status(200).json({
                ok:true,
                evento:eventoGuardado
                })
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const updateEvent=async(req=request,res=response)=>{

    const eventoID=req.params.id;
    const uid= req.uid
    console.log(eventoID)
    try{
        const evento=await Evento.findById(eventoID)
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }
        if(evento.user.toString()!==uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {...req.body,user:uid}
        const eventoActualizado= await Evento.findByIdAndUpdate(eventoID,nuevoEvento,{new:true});
        return res.status(200).json({
            ok:true,
            eventoActualizado:eventoActualizado,
            msg:"Evento actualizado"
        })
    }

catch(error){
    console.log(error)
    res.status(500).json({
        ok:false,
        msg:"no se pudo actualizar el evento"
    })
}
}

const deleteEvent=async(req=request,res=response)=>{

    const eventoID=req.params.id;
    const uid= req.uid
    console.log(eventoID)
    try{
        const evento=await Evento.findById(eventoID)
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }
        if(evento.user.toString()!==uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de eliminar este evento'
            })
        }

       await Evento.findByIdAndDelete(eventoID);
        return res.status(200).json({
            ok:true,
            msg:"Evento Eliminado"
        })
    }

catch(error){
    console.log(error)
    res.status(500).json({
        ok:false,
        msg:"no se pudo actualizar el evento"
    })
}
}

module.exports={getEvent,createEvent,updateEvent,deleteEvent}