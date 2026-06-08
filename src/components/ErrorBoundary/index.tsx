"use client";
import React from "react";

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Uncaught error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: "1rem",
            fontFamily: "sans-serif",
          }}
        >
          <h2>Something went wrong.</h2>
          <p style={{ color: "#888", fontSize: "0.875rem" }}>
            {this.state.message}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, message: "" })}
            style={{
              padding: "0.5rem 1.25rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
