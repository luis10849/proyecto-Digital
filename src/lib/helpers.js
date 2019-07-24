const bcrypt= require('bcryptjs');
const helpers={};

// encriptar contraseña
helpers.encryptar= async (password)=>{
  const salt= await bcrypt.genSalt(10);
  const cifrado= await bcrypt.hash(password, salt);
  return cifrado;
};

// compara las contraseñas al iniciar sesion
helpers.comparar= async (password,savedPassword)=>{
    try {
       console.log(savedPassword);
       console.log(password);
       return await bcrypt.compare(password,savedPassword);
    } catch (e) {
        console.log(e);
    }
  };
module.exports=helpers;