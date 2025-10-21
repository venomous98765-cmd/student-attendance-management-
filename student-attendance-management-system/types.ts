
export enum AttendanceStatus {
  UNMARKED = 'Unmarked',
  PRESENT = 'Present',
  ABSENT = 'Absent',
  LATE = 'Late',
}

export interface Student {
  id: number;
  name: string;
  class: string;
  avatar: string;
}

export type AttendanceRecord = {
  [studentId: number]: AttendanceStatus;
};

export type FullAttendanceData = {
  [date: string]: AttendanceRecord;
};
