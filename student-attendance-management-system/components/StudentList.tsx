
import React from 'react';
import { Student, AttendanceStatus, AttendanceRecord } from '../types';

interface StudentListProps {
  students: Student[];
  attendance: AttendanceRecord;
  onStatusChange: (studentId: number, status: AttendanceStatus) => void;
}

const statusConfig = {
    [AttendanceStatus.PRESENT]: {
        label: "Present",
        buttonClass: "bg-green-100 text-green-800 ring-green-600/20",
        activeClass: "bg-green-500 text-white ring-green-600/30"
    },
    [AttendanceStatus.ABSENT]: {
        label: "Absent",
        buttonClass: "bg-red-100 text-red-800 ring-red-600/20",
        activeClass: "bg-red-500 text-white ring-red-600/30"
    },
    [AttendanceStatus.LATE]: {
        label: "Late",
        buttonClass: "bg-yellow-100 text-yellow-800 ring-yellow-600/20",
        activeClass: "bg-yellow-500 text-white ring-yellow-600/30"
    }
};

const StudentRow: React.FC<{
  student: Student;
  currentStatus: AttendanceStatus;
  onStatusChange: (studentId: number, status: AttendanceStatus) => void;
}> = ({ student, currentStatus, onStatusChange }) => {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <img className="h-12 w-12 rounded-full object-cover" src={student.avatar} alt={student.name} />
        <div>
          <p className="text-md font-semibold text-gray-900">{student.name}</p>
          <p className="text-sm text-gray-500">{student.class}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(student.id, status)}
            className={`px-3 py-1.5 text-sm font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ring-1 ring-inset transition-colors duration-200
              ${currentStatus === status ? statusConfig[status].activeClass : `${statusConfig[status].buttonClass} hover:${statusConfig[status].activeClass.split(' ')[0]}`}`}
          >
            {statusConfig[status].label}
          </button>
        ))}
      </div>
    </li>
  );
};


const StudentList: React.FC<StudentListProps> = ({ students, attendance, onStatusChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
         <h2 className="text-xl font-bold text-gray-700 mb-4">Mark Attendance</h2>
      <ul className="space-y-3">
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            currentStatus={attendance[student.id] || AttendanceStatus.UNMARKED}
            onStatusChange={onStatusChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
