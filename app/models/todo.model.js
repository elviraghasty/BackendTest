module.exports = mongoose =>{
    // const Todos = mongoose.model(
    //     "todos",
    //     mongoose.Schema({
    //         username: String,
    //         title: String,
    //         description: String,
    //         deadline: Date,
    //         isDone: Boolean
    //     },
    //         {timestamps : true}
    //     )
    // );

    var schema = mongoose.Schema({
                 title: String,
                 description: String,
                 deadline: Date,
                 isDone: Boolean
             },
                 {timestamps : true}
             );

    schema.method("toJSON", function(){
        const{__v, _id, ...object} = this.toObject();
        object.id=_id;
        return object;
    });

    const Todos = mongoose.model("todos",schema);
    return Todos;
};