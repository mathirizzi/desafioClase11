import userModel from "./daos/models/users.models.js"


class UserManager {


      //--------------------Para ver la lista de usuarios--------------------//
    async getUsers(){
            return await userModel.find({})
       
    }

    //--------------------Para filtrar usuarios--------------------//

    async getUserBy(filter) {
      return await userModel.findOne(filter)
  }

  //--------------------Para ver un usuario por su ID--------------------//

    async getUserID(uid){
        return await userModel.findOne({_id: uid})
    }

   //--------------------Para crear un usuario nuevo--------------------//
    
    async createUser(newUser){
        return await userModel.create(newUser)
    }

  //--------------------Para actualizar un usuario llamado a traves de su ID--------------------//

    async updateUserID(uid, newUserUpdated){
        return await userModel.findByIdAndUpdate({_id: uid}, newUserUpdated)
    }

   //--------------------Para eliminar usuario seleccionado a traves de su ID--------------------//

    async deleteUserID(uid){
        return await userModel.findByIdAndDelete({_id: uid})

    }

}

export default UserManager;