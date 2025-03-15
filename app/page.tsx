// filepath: /Users/musaddiqrafi/Desktop/Self_Learning_Updated/dbms_frontend_assignment/app/page.tsx
import './styles/globals.css'; // Adjust the path as necessary
import QueryForm from './components/QueryForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">SQL Query Executor</h1>
      <QueryForm />
    </div>
  );
}