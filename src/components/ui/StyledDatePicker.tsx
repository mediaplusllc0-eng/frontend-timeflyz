import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface StyledDatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  buttonClass?: string;
  icon?: any;
}

const StyledDatePicker: React.FC<StyledDatePickerProps> = ({
  selectedDate,
  setSelectedDate,
  buttonClass,
  icon,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative w-fit border-0 outline-0 mt-[-5px] z-50">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        onClickOutside={() => setOpen(false)}
        onSelect={() => setOpen(false)}
        open={open}
        onInputClick={() => setOpen(true)}
        placeholderText="Select date, time"
        dateFormat="dd/MM/yyyy h:mm aa" // Note the updated format
        minDate={new Date()}
        showTimeSelect // Enable time selection
        timeIntervals={15} // Optional: sets time steps to every 15 minutes
        timeCaption="Time"
        popperPlacement="bottom-start"
        calendarClassName="!p-4 !rounded-xl !shadow-xl !border !border-gray-200 z-[50]"
        customInput={
          <button
            className={`flex items-center gap-4 rounded-md text-gray-400 text-sm w-48 justify-start cursor-pointer`}
            onClick={() => setOpen(!open)}
          >
            {selectedDate
              ? selectedDate.toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              : "Select date, time"}
          </button>
        }
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={decreaseMonth}
              className="text-gray-600 hover:bg-gray-100 rounded-md p-2"
            >
              <ChevronLeft />
            </button>
            <span className="text-lg font-semibold text-gray-800">
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              onClick={increaseMonth}
              className="text-gray-600 hover:bg-gray-100 rounded-md p-2"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      />

    </div>
  );
};

export default StyledDatePicker;
