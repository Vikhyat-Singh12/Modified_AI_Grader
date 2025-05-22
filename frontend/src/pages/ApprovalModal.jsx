import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckCircle,
  XCircle,
} from "lucide-react";

import download from "../assets/download.png";

export default function UserApprovalModal({
  isOpen,
  closeModal,
  user,
  onApprove,
  onReject,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
              >
                <XCircle size={20} />
              </button>

              {/* Title */}
              <Dialog.Title className="text-3xl font-semibold text-violet-900 flex items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
                  alt="Mail Icon"
                  className="w-7 h-7"
                />
                Approve User Request
              </Dialog.Title>

              {/* User Info */}
              <div className="flex items-center gap-32 mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-32 h-39 rounded-lg overflow-hidden border-4 ">
                  <img
                    src={user.profilePicture || download}
                    alt="Profile"
                    className="  "
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    {user.name}
                  </h3>
                  <p className="text-gray-500 flex items-center gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/15047/15047587.png"
                      alt="Mail Icon"
                      className="w-4 h-4"
                    />{" "}
                    {user.email}
                  </p>
                  <p className="text-gray-500 flex items-center gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/13905/13905795.png"
                      alt="Mail Icon"
                      className="w-4 h-4"
                    />{" "}
                    {user.mobile}
                  </p>
                  <p
                    className={`mt-1 px-2 py-1 rounded text-sm font-medium flex items-center gap-2 ${
                      user.role === "student"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3135/3135810.png"
                      alt="Mail Icon"
                      className="w-4 h-4"
                    />
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </p>
                </div>
              </div>

              {/* Role-Specific Details */}
              {user.role === "student" && (
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-gray-700 flex items-center gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/717/717874.png"
                      alt="Mail Icon"
                      className="w-4 h-4"
                    />{" "}
                    Class:
                  </p>
                  <p className="text-gray-600">{user.studentClass}</p>

                  <p className="mt-2 font-semibold text-gray-700 flex items-center gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2097/2097068.png"
                      alt="Mail Icon"
                      className="w-4 h-4"
                    />
                    Subjects:
                  </p>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {user.role === "teacher" && (
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <p className="mt-2 font-semibold text-gray-700 flex items-center gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2097/2097068.png"
                      alt="Mail Icon"
                      className="w-4 h-4"
                    />
                    Specialized Subject:
                  </p>
                  <p className="text-gray-600">{user.specializedSubject}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-2"
                  onClick={onReject}
                >
                  <XCircle size={16} />
                  Reject
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center gap-2"
                  onClick={onApprove}
                >
                  <CheckCircle size={16} />
                  Approve
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
