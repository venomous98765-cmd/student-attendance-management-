
import React from 'react';
import { AttendanceRecord, AttendanceStatus } from '../types';

interface AttendanceSummaryProps {
  attendance: AttendanceRecord;
}

const SummaryCard: React.FC<{ title: string; count: number; color: string }> = ({ title, count, color }) => (
  <div className={`p-4 rounded-lg shadow-md ${color}`}>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="text-3xl font-bold text-white mt-2">{count}</p>
  </div>
);

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ attendance }) => {
  const counts = React.useMemo(() => {
    const initialCounts = {
      [AttendanceStatus.PRESENT]: 0,
      [AttendanceStatus.ABSENT]: 0,
      [AttendanceStatus.LATE]: 0,
      [AttendanceStatus.UNMARKED]: 0,
    };
    return Object.values(attendance).reduce((acc, status) => {
      acc[status]++;
      return acc;
    }, initialCounts);
  }, [attendance]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Daily Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Present" count={counts[AttendanceStatus.PRESENT]} color="bg-green-500" />
        <SummaryCard title="Absent" count={counts[AttendanceStatus.ABSENT]} color="bg-red-500" />
        <SummaryCard title="Late" count={counts[AttendanceStatus.LATE]} color="bg-yellow-500" />
        <SummaryCard title="Unmarked" count={counts[AttendanceStatus.UNMARKED]} color="bg-gray-400" />
      </div>
    </div>
  );
};

export default AttendanceSummary;
