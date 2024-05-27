import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { RxCross2 } from "react-icons/rx";

const UpdateQuiz = ({ isOpenModal, setToClose }) => {
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
                  className="flex justify-between items-center "
                >
                  <span className="text-lg text-center font-medium leading-6 text-gray-900">
                    Update Quiz
                  </span>
                  <button
                    type="button"
                    className="ml-4 inline-flex justify-center rounded-md text-sm font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => setToClose(false)}
                  >
                    <RxCross2 className="size-5" />
                  </button>
                </DialogTitle>
                <form className="mt-2">
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Quiz Name
                    </label>
                    <input
                      type="text"
                      name="quizName"
                      className="dialog_input"
                      placeholder="Enter quiz name"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      className="dialog_input"
                      placeholder="Duration in minutes"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Class
                    </label>
                    <input
                      type="text"
                      name="class"
                      className="dialog_input"
                      placeholder="Class"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      className="dialog_input"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Batch Number
                    </label>
                    <input
                      type="text"
                      name="batchNumber"
                      className="dialog_input"
                      placeholder="Batch number"
                    />
                  </div>
                  <div className="mt-6 flex items-center justify-end">
                    <Button
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault();
                        setToClose(false);
                      }}
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default UpdateQuiz;
