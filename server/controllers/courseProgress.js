const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");


exports.updateCourseProgress=async(req,res)=>{
    const {courseId, subSectionId}=req.body;
    const userId=req.user.id;

    try {
        //Check if the subsection is valid
        const subSection =await SubSection.findById(subSectionId);
        console.log("req.user.id:", req.user.id);
        console.log("courseId:", courseId);


        if(!subSection){
            return res.status(404).json({error:"Invalid SubSection"})
        }

        //check for old entry
        let courseProgress=await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        });
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            });
        }
        else{
            // check for re-completing video/subsection
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error:"Subsection already completed"
                })
            }
            //push into completed videos
            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully", 
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({error:"Internal Server Error"});
    }
}