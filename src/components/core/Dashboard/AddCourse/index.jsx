 import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <>
      <div className="flex w-full flex-col gap-6 xl:flex-row">
        {/* Left Section */}
        <div className="flex flex-1 flex-col">
          <h1 className="mb-8 text-2xl md:text-3xl font-medium text-richblack-5">
            Add Course
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>

        {/* Course Upload Tips */}
        <div className="w-full xl:max-w-[400px] flex-1 self-start xl:self-stretch rounded-md border border-richblack-700 bg-richblack-800 p-6 h-auto xl:h-full overflow-y-auto">
          <p className="mb-6 text-lg font-semibold text-richblack-5">
            ⚡ Code Upload Tips
          </p>
          <ul className="ml-5 list-disc space-y-3 text-sm text-richblack-200">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Keep your course structured and clear.</li>
            <li>Write concise and engaging course titles.</li>
            <li>Ensure video and audio quality is high.</li>
            <li>Add quizzes to reinforce learning.</li>
            <li>Preview your course before publishing.</li>
          </ul>
        </div>
      </div>
    </>
  )
}
