const mongoose = require("mongoose")

const courseModulesSchema = mongoose.Schema({
    course_Id:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"course"},
    instructor_Id:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"user"},
    title:{type:String, required:true},
    content:{type:Array, required:true},
    video_link:{type:String,required:true}
})



const CourseModuleModel = mongoose.model("course_module", courseModulesSchema)

module.exports= CourseModuleModel