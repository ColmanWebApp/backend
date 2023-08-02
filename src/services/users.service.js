const User = require('../models/UserScheme');


const getAllUsers = async () => {
    return await User.find();
}

const getUserById = async (id) => {
    if (id) {
        try{
            const user = await User.findById(id);
            if(user){
                return user;
            }
            throw new Error('User not found');
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('Id is required');
}

const getUserByName = async (name) => {
    if (name) {
        try{
            const user = await User.findOne({name});
            if(user){
                return user;
            }
            throw new Error('User not found');
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('Name is required');
}

const getUserByEmail = async (email) => {
    if (email) {
        try{
            const user = await User.findOne({email});
            if(user){
                return user;
            }
            throw new Error('User not found');
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('Email is required');
}

const createUser = async (user) => {
    if (user) {
        try{
            const {name, email, password} = user;
            if(!name || !email || !password){
                throw new Error('Name, email and password are required');
            }
            const id = (email+name).replace(/\s/g, '_');
            const newUser = new User({
                _id: id,
                name,
                email,
                password
            })
            await newUser.save();
            return newUser;
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('User is required');
}

const deleteUser = async (id) => {
    if (id) {
        try{
            const user = await User.findByIdAndDelete(id);
            if(user){
                return user;
            }
            throw new Error('User not found');
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('Id is required');
}

const updateUser = async (id, newUser) => {
    const {name, email, password} = newUser;
    if (id) {
        try{
            const user = await User.findById(id);
            if(user){
                if(name){
                    user.name = name;
                }
                if(email){
                    user.email = email;
                }
                if(password){
                    user.password = password;
                }
                await user.save();
                return user;
            }
            throw new Error('User not found');
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('Id is required');
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByName,
    getUserByEmail,
    createUser,
    deleteUser,
    updateUser
}

