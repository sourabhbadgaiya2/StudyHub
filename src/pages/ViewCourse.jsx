//  import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Outlet, useParams } from "react-router-dom"
// import { HiMenuAlt3, HiX } from "react-icons/hi"

// import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
// import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
// import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
// import {
//   setCompletedLectures,
//   setCourseSectionData,
//   setEntireCourseData,
//   setTotalNoOfLectures,
// } from "../slices/viewCourseSlice"

// export default function ViewCourse() {
//   const { courseId } = useParams()
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const [reviewModal, setReviewModal] = useState(false)
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false) // sidebar state

//   useEffect(() => {
//     ;(async () => {
//       const courseData = await getFullDetailsOfCourse(courseId, token)
//       dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
//       dispatch(setEntireCourseData(courseData.courseDetails))
//       dispatch(setCompletedLectures(courseData.completedVideos))
//       let lectures = 0
//       courseData?.courseDetails?.courseContent?.forEach((sec) => {
//         lectures += sec.subSection.length
//       })
//       dispatch(setTotalNoOfLectures(lectures))
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <>
//       <div className="relative flex min-h-[calc(100vh-3.5rem)]">
//         {/* Mobile Hamburger Button */}
//          {/* Mobile Hamburger Button */}
//           <button
//             className="fixed right-4 top-[4.2rem] z-20 p-2 text-2xl lg:hidden bg-gray-800 text-white rounded-md shadow-md"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           >
//             {isSidebarOpen ? <HiX /> : <HiMenuAlt3 />}
//           </button>


//         {/* Sidebar */}
//         <div
//           className={`fixed lg:relative z-10 h-full transition-transform duration-300 
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
//           lg:translate-x-0 lg:flex`}
//         >
//           <VideoDetailsSidebar setReviewModal={setReviewModal} />
//         </div>

//         {/* Main Content */}
//         <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//           <div className="mx-6 mt-12 lg:mt-0">{/* margin top to avoid overlap */}
//             <Outlet />
//           </div>
//         </div>
//       </div>

//       {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
//     </>
//   )
// }


import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { HiMenuAlt3, HiX } from "react-icons/hi"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Mobile Hamburger Button */}
      <button
        className="fixed right-4 top-[4.2rem] z-[9999] p-2 text-2xl lg:hidden bg-gray-800 text-gray-400 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>



        {/* Sidebar */}
        <div
          className={`fixed lg:relative z-10 h-full transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:flex`}
        >
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        {/* Main Content */}
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          {/* Add top margin so content doesn't overlap the button */}
          <div className="mx-6 mt-12 lg:mt-0">
            <Outlet />
          </div>
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
