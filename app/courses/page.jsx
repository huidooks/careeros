'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from('courses').select('*')
      if (error) {
        console.error('Error fetching courses:', error)
      } else {
        setCourses(data)
      }
      setLoading(false)
    }

    fetchCourses()
  }, [])

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="h-8 w-48 bg-gray-200 rounded-xl animate-pulse mb-3" />
        <div className="h-4 w-72 bg-gray-100 rounded-xl animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
              <div className="h-4 w-20 bg-gray-200 rounded-full mb-4" />
              <div className="h-5 w-3/4 bg-gray-200 rounded-lg mb-3" />
              <div className="h-3 w-full bg-gray-100 rounded mb-2" />
              <div className="h-3 w-5/6 bg-gray-100 rounded mb-2" />
              <div className="h-3 w-4/6 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Empty state
  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3">
        <div className="text-5xl">📚</div>
        <h2 className="text-xl font-semibold text-gray-700">No courses yet</h2>
        <p className="text-gray-400 text-sm">Check back soon — new courses are being added.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">All Courses</h1>
            <p className="text-gray-400 mt-1 text-sm">
              {courses.length} course{courses.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <Link
            href="/courses/request"
            className="text-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl transition font-medium"
          >
            + Request a Change
          </Link>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium bg-blue-50 text-blue-500 px-3 py-1 rounded-full">
                      {course.duration}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h2>
                  <p className="text-sm text-gray-400 line-clamp-3">{course.description}</p>
                </div>
                <div className="mt-5 text-blue-500 text-sm font-medium flex items-center gap-1">
                  View Course <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}