export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  location?: string;
  language?: string;
  avatar?: string;
  intention?: string;
  baselineAnswers?: any[];
  completedLessons?: number[];
}
