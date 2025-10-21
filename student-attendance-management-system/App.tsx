import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StudentList from './components/StudentList';
import AttendanceSummary from './components/AttendanceSummary';
import { STUDENTS_DATA } from './constants';
import { Student, AttendanceStatus, AttendanceRecord, FullAttendanceData } from './types';

const App: React.FC = () => {
  const [students] = useState<Student[]>(STUDENTS_DATA);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceData, setAttendanceData] = useState<FullAttendanceData>({});

  // Utility to format date to YYYY-MM-DD string key
  const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('attendanceData');
      if (storedData) {
        setAttendanceData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to load attendance data from localStorage", error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
    } catch (error) {
      console.error("Failed to save attendance data to localStorage", error);
    }
  }, [attendanceData]);

  const handleStatusChange = useCallback((studentId: number, status: AttendanceStatus) => {
    const dateKey = formatDateKey(selectedDate);
    setAttendanceData(prevData => ({
      ...prevData,
      [dateKey]: {
        ...prevData[dateKey],
        [studentId]: status,
      },
    }));
  }, [selectedDate]);

  const getAttendanceForSelectedDate = (): AttendanceRecord => {
    const dateKey = formatDateKey(selectedDate);
    const dailyRecord = attendanceData[dateKey] || {};
    
    // Ensure all students have an entry for the day, default to UNMARKED
    const fullRecord: AttendanceRecord = {};
    students.forEach(student => {
        fullRecord[student.id] = dailyRecord[student.id] || AttendanceStatus.UNMARKED;
    });

    return fullRecord;
  };
  
  const currentAttendance = getAttendanceForSelectedDate();

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <AttendanceSummary attendance={currentAttendance} />
        <StudentList
          students={students}
          attendance={currentAttendance}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
};

export default App;
