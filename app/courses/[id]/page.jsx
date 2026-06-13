'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function CourseDetailPage() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [userId, setUserId] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      // Get logged in user
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)

        // Check if already enrolled
        const { data: enrollment } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', id)
          .single()

        if (enrollment) {
          setEnrolled(true)
          setCompleted(enrollment.completed)
        }
      }

      // Fetch course details
      const { data: courseData, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching course:', error)
      } else {
        setCourse(courseData)
      }

      setLoading(false)
    }

    fetchData()
  }, [id])

  const handleEnrol = async () => {
    if (!userId) {
      alert('You need to be logged in to enrol!')
      return
    }
    setActionLoading(true)
    const { error } = await supabase
      .from('enrollments')
      .insert({ user_id: userId, course_id: id, completed: false })

    if (error) {
      console.error('Enrol error:', error)
      alert('Something went wrong. Please try again.')
    } else {
      setEnrolled(true)
    }
    setActionLoading(false)
  }

  const handleComplete = async () => {
    setActionLoading(true)
    const { error } = await supabase
      .from('enrollments')
      .update({ completed: true })
      .eq('user_id', userId)
      .eq('course_id', id)

    if (error) {
      console.error('Complete error:', error)
      alert('Something went wrong. Please try again.')
    } else {
      setCompleted(true)
    }
    setActionLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading course...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Course not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <Link href="/courses" className="text-blue-500 text-sm mb-6 inline-block hover:underline">
        ← Back to Courses
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
        <span className="text-xs font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {course.duration}
        </span>

        <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-3">{course.title}</h1>
        <p className="text-gray-500 mb-8">{course.description}</p>

        <div className="flex flex-col gap-3">
          {!enrolled && (
            <button
              onClick={handleEnrol}
              disabled={actionLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition disabled:opacity-50"
            >
              {actionLoading ? 'Enrolling...' : 'Enrol in this Course'}
            </button>
          )}

          {enrolled && !completed && (
            <>
              <div className="bg-green-50 text-green-600 text-sm font-medium px-4 py-3 rounded-xl">
                ✅ You are enrolled in this course
              </div>
              <button
                onClick={handleComplete}
                disabled={actionLoading}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition disabled:opacity-50"
              >
                {actionLoading ? 'Updating...' : 'Mark as Complete'}
              </button>
            </>
          )}

          {completed && (
            <div className="bg-green-50 text-green-600 text-sm font-medium px-4 py-3 rounded-xl">
              🎉 You have completed this course! It will appear on your portfolio.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}