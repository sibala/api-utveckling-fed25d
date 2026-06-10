# Videolinks

- [01 - Databas design och ER-diagram](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FFED25%20%2D%20API%2Dutveckling%2D20260609%5F090119%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E968f4a7c%2D04ab%2D44fe%2D8bcf%2Ddc0a0a490e11)
- [02 - Skapa DB tabeller och JOINS utifrån ER-diagramet](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FFED25%20%2D%20API%2Dutveckling%2D20260609%5F101541%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E9db204aa%2D29c0%2D42da%2D8968%2Dce787fc75440)



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
