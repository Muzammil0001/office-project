import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { deleteUserApi } from "../../../../apis/user-api";

const DeleteTeacher = ({ isOpenModal, setToClose, teacherId }) => {
  const confirmationHandle = async () => {
    try {
      if (teacherId) {
        const DeletedTeacher = await deleteUserApi(teacherId);
        console.log(" DeletedTeacher:", DeletedTeacher);

        setToClose(false);
      }
    } catch (error) {
      console.error("Error fetching Teacher:", error);
    }
  };

  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}} __demoMode>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="flex justify-center items-center  "
                >
                  <span className="sm:text-xl mb-5 text-base font-medium leading-6 text-gray-900">
                    Confirm To Delete Teacher
                  </span>
                </DialogTitle>

                <div className="mt-6 flex items-center gap-2 justify-center">
                  <Button
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    type="button"
                    onClick={() => setToClose(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    type="button"
                    onClick={confirmationHandle}
                  >
                    Delete
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default DeleteTeacher;
