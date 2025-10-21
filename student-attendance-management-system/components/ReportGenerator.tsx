
import React, { useState } from 'react';
import { Student, AttendanceRecord } from '../types';
import { generateAttendanceReport } from '../services/geminiService';

interface ReportGeneratorProps {
  students: Student[];
  attendance: AttendanceRecord;
  selectedDate: Date;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ students, attendance, selectedDate }) => {
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setError('');
    setReport('');
    try {
      const dateString = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const generatedReport = await generateAttendanceReport(students, attendance, dateString);
      setReport(generatedReport);
    } catch (err) {
      setError('An error occurred while generating the report.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Generate Report</h2>
      <button
        onClick={handleGenerateReport}
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <span>{isLoading ? 'Generating...' : 'Generate AI Attendance Report'}</span>
      </button>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {report && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Generated Report</h3>
          <pre className="whitespace-pre-wrap font-sans text-gray-700">{report}</pre>
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;
