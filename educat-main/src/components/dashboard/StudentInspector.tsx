import { EnhancedStudentInspector } from './EnhancedStudentInspector';

interface StudentInspectorProps {
  studentId: string;
  classId: string;
  onClose: () => void;
}

export const StudentInspector = ({ studentId, classId, onClose }: StudentInspectorProps) => {
  return (
    <EnhancedStudentInspector 
      studentId={studentId}
      classId={classId}
      onClose={onClose}
    />
  );
};