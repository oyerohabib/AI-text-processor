import { Component, ReactNode } from "react";
import { toast } from "react-toastify";

// Define the props interface
interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught in ErrorBoundary:", error);
    toast.error("An unexpected error occurred. Please try again later.");
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h1 className="text-xl font-bold text-red-600">
              Something went wrong.
            </h1>
            <p className="mt-2 text-gray-700">{this.state.errorMessage}</p>
            <button
              onClick={this.handleRefresh}
              className="mt-4 bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-900"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
