import React from 'react';
import { cn } from '../../lib/utils';

const Calendar = React.forwardRef(({ 
  className, 
  classNames = {}, 
  showOutsideDays = true, 
  mode = "single",
  selected,
  onSelect,
  disabled,
  ...props 
}, ref) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Get previous month days to show
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentYear, currentMonth + direction, 1));
  };
  
  const handleDateClick = (date) => {
    if (disabled && disabled(date)) return;
    if (onSelect) {
      onSelect(date);
    }
  };
  
  const isSelected = (date) => {
    if (!selected) return false;
    return selected.toDateString() === date.toDateString();
  };
  
  const isToday = (date) => {
    return today.toDateString() === date.toDateString();
  };
  
  const isDisabled = (date) => {
    if (!disabled) return false;
    return disabled(date);
  };
  
  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - 1, daysInPrevMonth - i);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: isSelected(date),
      isDisabled: isDisabled(date)
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    calendarDays.push({
      date,
      isCurrentMonth: true,
      isToday: isToday(date),
      isSelected: isSelected(date),
      isDisabled: isDisabled(date)
    });
  }
  
  // Next month days to fill the grid
  const remainingCells = 42 - calendarDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    const date = new Date(currentYear, currentMonth + 1, day);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: isSelected(date),
      isDisabled: isDisabled(date)
    });
  }
  
  return (
    <div className={cn("p-3", className)} {...props} ref={ref}>
      <div className={cn("flex flex-col space-y-4", classNames.months)}>
        <div className={cn("space-y-4", classNames.month)}>
          {/* Header */}
          <div className={cn("flex justify-center pt-1 relative items-center", classNames.caption)}>
            <button
              type="button"
              className={cn(
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1",
                classNames.nav_button,
                classNames.nav_button_previous
              )}
              onClick={() => navigateMonth(-1)}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className={cn("text-sm font-medium", classNames.caption_label)}>
              {monthNames[currentMonth]} {currentYear}
            </div>
            
            <button
              type="button"
              className={cn(
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1",
                classNames.nav_button,
                classNames.nav_button_next
              )}
              onClick={() => navigateMonth(1)}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Calendar Grid */}
          <table className={cn("w-full border-collapse space-y-1", classNames.table)}>
            {/* Day headers */}
            <thead>
              <tr className={cn("flex", classNames.head_row)}>
                {dayNames.map((day) => (
                  <th
                    key={day}
                    className={cn(
                      "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                      classNames.head_cell
                    )}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Calendar body */}
            <tbody>
              {Array.from({ length: 6 }, (_, weekIndex) => (
                <tr key={weekIndex} className={cn("flex w-full mt-2", classNames.row)}>
                  {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((dayInfo, dayIndex) => (
                    <td
                      key={dayIndex}
                      className={cn(
                        "text-center text-sm p-0 relative",
                        dayInfo.isSelected && "bg-accent first:rounded-l-md last:rounded-r-md",
                        "focus-within:relative focus-within:z-20",
                        classNames.cell
                      )}
                    >
                      <button
                        type="button"
                        className={cn(
                          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                          // Base styles
                          "hover:bg-accent hover:text-accent-foreground",
                          // Current month vs outside days
                          dayInfo.isCurrentMonth ? "text-foreground" : "text-muted-foreground opacity-50",
                          // Today
                          dayInfo.isToday && "bg-accent text-accent-foreground",
                          // Selected
                          dayInfo.isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                          // Disabled
                          dayInfo.isDisabled && "text-muted-foreground opacity-50 cursor-not-allowed",
                          classNames.day,
                          dayInfo.isSelected && classNames.day_selected,
                          dayInfo.isToday && classNames.day_today,
                          !dayInfo.isCurrentMonth && classNames.day_outside,
                          dayInfo.isDisabled && classNames.day_disabled
                        )}
                        onClick={() => handleDateClick(dayInfo.date)}
                        disabled={dayInfo.isDisabled}
                      >
                        {dayInfo.date.getDate()}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

Calendar.displayName = "Calendar";

export { Calendar };
