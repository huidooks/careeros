'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function CourseRequestPage() {
  const [courses, setCourses] = useState([])
  const [requests, setRequests] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      // Get logged in user
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)

        // Fetch this recruiter's previous requests
        const { data: requestData } = await supabase
          .from('course_requests')
          .select('id, notes, created_at, courses(title)')
          .eq('recruiter_id', user.id)
          .order('created_at', { ascending: false })

        if (requestData) setRequests(requestData)
      }

      // Fetch all courses for dropdown
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')

      if (courseData) setCourses(courseData)
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleSubmit = async () => {
    if (!userId) {
      alert('You need to be logged in!')
      return
    }
    if (!selectedCourse) {
      alert('Please select a course!')
      return
    }
    if (!notes.trim()) {
      alert('Please add some notes!')
      return
    }

    setSubmitting(true)

    const { error } = await supabase
      .from('course_requests')
      .insert({
        recruiter_id: userId,
        course_id: selectedCourse,
        notes: notes.trim()
      })

    if (error) {
      console.error('Submit error:', error)
      alert('Something went wrong. Please try again.')
    } else {
      setSuccess(true)
      setNotes('')
      setSelectedCourse('')

      // Refresh requests list
      const { data: requestData } = await supabase
        .from('course_requests')
        .select('id, notes, created_at, courses(title)')
        .eq('recruiter_id', userId)
        .order('created_at', { ascending: false })

      if (requestData) setRequests(requestData)

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    }

    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <Link href="/courses" className="text-blue-500 text-sm mb-6 inline-block hover:underline">
        ← Back to Courses
      </Link>

      <div className="max-w-2xl mx-auto">

        {/* Request Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Request a Course Modification</h1>
          <p className="text-gray-500 text-sm mb-6">Suggest changes or improvements to an existing course.</p>

          {success && (
            <div className="bg-green-50 text-green-600 text-sm font-medium px-4 py-3 rounded-xl mb-6">
              ✅ Request submitted successfully!
            </div>
          )}

          <div className="flex flex-col gap-5">
            {/* Course Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">-- Choose a course --</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe the changes or improvements you'd like to see..."
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>

        {/* Previous Requests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Requests</h2>

          {requests.length === 0 ? (
            <p className="text-gray-400 text-sm">You haven't submitted any requests yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {requests.map((req) => (
                <div key={req.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {req.courses?.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(req.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{req.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}