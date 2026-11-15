
import { apiRequest } from "./api";

export function getCourses(token) {
  return apiRequest("/api/courses", {}, token);
}

export function getCourseById(id, token) {
  return apiRequest(`/api/courses/${id}`, {}, token);
}

export function createCourse(courseData, token) {
  return apiRequest("/api/courses", {
    method: "POST",
    body: JSON.stringify(courseData)
  }, token);
}

export function updateCourse(id, courseData, token) {
  return apiRequest(`/api/courses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(courseData)
  }, token);
}

export function publishCourse(id, token) {
  return apiRequest(`/api/courses/${id}/publish`, {
    method: "PATCH"
  }, token);
}

export function unpublishCourse(id, token) {
  return apiRequest(`/api/courses/${id}/unpublish`, {
    method: "PATCH"
  }, token);
}

export function archiveCourse(id, token) {
  return apiRequest(`/api/courses/${id}/archived`, {
    method: "PATCH"
  }, token);
}

export function getMyEnrollments(token) {
  return apiRequest("/api/enrollments/me", {}, token);
}
