// components/ErrorPage.js
import { useRouteError } from 'react-router-dom';
import { ErrorBoundary } from '../components/UI';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <ErrorBoundary> 
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Oops!</h1>
      <p className="mb-2">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500 mb-6">
        {error.statusText || error.message}
      </p>
      <a 
        href="/" 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Home
      </a>
    </div>
    </ErrorBoundary >
  );
}