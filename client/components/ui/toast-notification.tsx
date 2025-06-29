import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastNotification {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  notification: ToastNotification;
  onClose: (id: string) => void;
}

export function Toast({ notification, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Fade in animation
    const timer1 = setTimeout(() => setIsVisible(true), 100);

    // Auto close
    const timer2 = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => onClose(notification.id), 300);
    }, notification.duration || 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [notification.id, notification.duration, onClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => onClose(notification.id), 300);
  };

  const typeStyles = {
    success:
      "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100",
    error:
      "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100",
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: AlertCircle,
  };

  const Icon = icons[notification.type];

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-md transition-all duration-300 transform",
        typeStyles[notification.type],
        isVisible && !isLeaving
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full",
        isLeaving && "opacity-0 translate-x-full",
      )}
    >
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm">{notification.title}</h4>
        {notification.message && (
          <p className="text-sm opacity-90 mt-1">{notification.message}</p>
        )}
      </div>

      <button
        onClick={handleClose}
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Toast container component
export function ToastContainer() {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  useEffect(() => {
    // Listen for custom toast events
    const handleToast = (event: CustomEvent<ToastNotification>) => {
      const notification = { ...event.detail, id: Date.now().toString() };
      setNotifications((prev) => [...prev, notification]);
    };

    window.addEventListener("show-toast", handleToast as EventListener);
    return () =>
      window.removeEventListener("show-toast", handleToast as EventListener);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
}

// Helper function to show toasts
export const showToast = (notification: Omit<ToastNotification, "id">) => {
  const event = new CustomEvent("show-toast", { detail: notification });
  window.dispatchEvent(event);
};
