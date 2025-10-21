
import { GoogleGenAI } from "@google/genai";
import { Student, AttendanceRecord, AttendanceStatus } from '../types';

export const generateAttendanceReport = async (
  students: Student[],
  attendance: AttendanceRecord,
  date: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const presentStudents = students
    .filter((s) => attendance[s.id] === AttendanceStatus.PRESENT)
    .map((s) => s.name);
  const absentStudents = students
    .filter((s) => attendance[s.id] === AttendanceStatus.ABSENT)
    .map((s) => s.name);
  const lateStudents = students
    .filter((s) => attendance[s.id] === AttendanceStatus.LATE)
    .map((s) => s.name);

  const prompt = `
    As a helpful school administrative assistant, please generate an attendance report for ${date}.
    
    Here is the attendance data:
    - Present Students: ${presentStudents.join(', ') || 'None'}
    - Absent Students: ${absentStudents.join(', ') || 'None'}
    - Late Students: ${lateStudents.join(', ') || 'None'}

    Please perform the following two tasks based on this data:

    1.  **Generate a concise summary report** for the school administration. The report should be well-structured, easy to read, and start with the heading "Daily Attendance Summary".
    
    2.  **Draft a professional and empathetic email template** to be sent to the parents of each absent student. Use placeholders like [Parent's Name] and [Student's Name]. The email should inform them of their child's absence and ask them to contact the school office. Start this section with the heading "Parent Notification Email Draft".

    Format the entire output in Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating report with Gemini API:", error);
    return "Failed to generate report. Please check the console for more details.";
  }
};
