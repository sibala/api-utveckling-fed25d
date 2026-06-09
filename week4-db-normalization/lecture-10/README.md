# Videolinks

- Coming soon



# Example on SQL join through all 4 tables in the lecture


`
SELECT 
  s.name,
  c.course,
  t.name
FROM students s
JOIN students_courses sc ON s.id = sc.student_id
JOIN courses c ON sc.course_id = c.id
JOIN teachers t ON c.teacher_id = t.id
WHERE s.name = 'Ahmed'
`
