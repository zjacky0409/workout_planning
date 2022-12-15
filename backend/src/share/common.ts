/*
  Some common object interface
*/

export interface userInfo {
  userId: number;
  username: string;
  role: string[];
  coach_id: number;
  student_id: number;
  student_coach_id: number;
  isVerified: boolean;
}
