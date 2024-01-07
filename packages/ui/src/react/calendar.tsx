import { Slot } from '@radix-ui/react-slot';
import { cx } from 'class-variance-authority';
import { format } from 'date-fns';
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
} from 'lucide-react';
import * as React from 'react';
import type {
  DateRange,
  DayPickerProps,
  DayProps,
  Matcher,
  SelectRangeEventHandler,
  StyledComponent,
} from 'react-day-picker';
import {
  Button,
  DayPicker,
  isMatch,
  useDayRender,
  useSelectRange,
} from 'react-day-picker';
import { twMerge } from 'tailwind-merge';
import { Popover, PopoverContent, PopoverTrigger } from '@/react/popover';
import { Label } from '@/react/label';
import { Input } from '@/react/input';
import type { FormControl } from '@/react/form';
import { buttonVariants } from '@/classes/button';
import {
  createDate,
  dateRegex,
  getCurrentDate,
  getCurrentTime,
  getDateByRange,
  getFormattedDate,
  getFormattedTime,
  handleInvalidDate,
  handleValidDate,
  isDateOutOfRange,
  isSelectedDayDateRange,
  isValidDate,
  isValidTime,
  matcherToArray,
  timeRegex,
} from '@/lib/calendar';
import { cn } from '@/lib/utils';

/* -----------------------------------------------------------------------------
 * Component: DatePicker
 * -------------------------------------------------------------------------- */

export type DatePickerProps = CalendarProps & {
  classNameTrigger?: string;
  loading?: boolean;
  placeholder?: string;
  slot?: {
    FormControl?: typeof FormControl;
  };
};

export function DatePicker({
  classNameTrigger,
  loading,
  placeholder,
  slot,
  ...props
}: DatePickerProps): React.JSX.Element {
  const displaySelected = React.useMemo(() => {
    switch (props.mode) {
      case 'single':
        return props.selected
          ? props.selected.toLocaleDateString()
          : placeholder || 'Select date';

      case 'multiple':
        return props.selected
          ? props.selected.map((date) => date.toLocaleDateString()).join(', ')
          : placeholder || 'Select dates';

      case 'range':
        if (props.selected?.from && props.selected.to) {
          return `${format(props.selected.from, 'M/d hh:mm a')} - ${format(
            props.selected.to,
            'M/d hh:mma',
          )}`;
        }

        if (props.selected?.from) {
          return format(props.selected.from, 'M/d hh:mm a');
        }

        return placeholder || 'Select date range';

      default:
        return placeholder || 'Select date';
    }
  }, [placeholder, props.mode, props.selected]);

  const Trigger = slot?.FormControl ?? Slot;

  return (
    <Popover variant="simple">
      <Trigger>
        <PopoverTrigger
          className={cn(
            buttonVariants({
              variant: 'outline',
            }),
            classNameTrigger,
          )}
          disabled={loading}
        >
          {loading ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <CalendarDaysIcon size={16} />
          )}

          {displaySelected}
        </PopoverTrigger>
      </Trigger>

      <PopoverContent align="start" className="p-3" sideOffset={5}>
        <Calendar initialFocus {...props} />
      </PopoverContent>
    </Popover>
  );
}

/* -----------------------------------------------------------------------------
 * Component: CalendarDateTimeInput
 * -------------------------------------------------------------------------- */

interface CalendarDateTimeInputVariants {
  date: Date;
  disabled: Matcher[];
  label: {
    date: string;
    root: string;
    time: string;
  };
  maxDate?: Date;
  minDate?: Date;
  onChange?: (day: Date, event: React.MouseEvent) => void;
}

type CalendarDateTimeInputProps = CalendarDateTimeInputVariants &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    keyof CalendarDateTimeInputVariants
  >;

function CalendarDateTimeInput({
  date,
  label,
  onChange,
  minDate,
  maxDate,
  className,
  disabled,
  ...props
}: CalendarDateTimeInputProps): React.JSX.Element {
  const id = React.useId();
  const [dateValue, setDateValue] = React.useState<string>(
    date.toLocaleDateString(),
  );
  const [timeValue, setTimeValue] = React.useState<string>(
    date.toLocaleTimeString(undefined, { timeStyle: 'short' }),
  );
  const newDateRef = React.useRef<Date | undefined>(undefined);

  React.useEffect(() => {
    setDateValue(date.toLocaleDateString());
    setTimeValue(date.toLocaleTimeString(undefined, { timeStyle: 'short' }));
  }, [date]);

  const handleKeyDown = React.useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (!['Enter'].includes(event.key)) {
        return;
      }

      if (newDateRef.current) {
        onChange?.(newDateRef.current, event as unknown as React.MouseEvent);
        handleValidDate(event as unknown as React.FocusEvent<HTMLInputElement>);
      }
    },
    [onChange],
  );

  const handleDateChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const value = event.target.value;
      setDateValue(getFormattedDate(value, date));

      if (!isValidDate(value)) {
        return;
      }

      const currentDate = getCurrentDate(value, date);

      if (
        isDateOutOfRange(currentDate, minDate, maxDate) ||
        isMatch(currentDate, disabled)
      ) {
        handleInvalidDate(event);

        return;
      }

      handleValidDate(event);
      newDateRef.current = currentDate;
    },
    [date, disabled, maxDate, minDate],
  );

  const handleTimeChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const value = event.target.value;
      setTimeValue(getFormattedTime(value, date));

      if (!isValidTime(value)) {
        return;
      }

      const currentDate = getCurrentTime(value, date);

      if (
        isDateOutOfRange(currentDate, minDate, maxDate) ||
        isMatch(currentDate, disabled)
      ) {
        handleInvalidDate(event);

        return;
      }

      handleValidDate(event);
      newDateRef.current = currentDate;
    },
    [date, disabled, maxDate, minDate],
  );

  const handleDateBlur = React.useCallback<
    React.FocusEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (dateRegex.test(event.target.value) && newDateRef.current) {
        onChange?.(newDateRef.current, event as unknown as React.MouseEvent);
      }

      handleValidDate(event);
      setDateValue(date.toLocaleDateString());
    },
    [date, onChange],
  );

  const handleTimeBlur = React.useCallback<
    React.FocusEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (timeRegex.test(event.target.value) && newDateRef.current) {
        onChange?.(newDateRef.current, event as unknown as React.MouseEvent);
      }

      handleValidDate(event);
      setTimeValue(date.toLocaleTimeString(undefined, { timeStyle: 'short' }));
    },
    [date, onChange],
  );

  return (
    <div className={cn('max-w-[15.75rem] space-y-1', className)} {...props}>
      <Label className="text-muted-foreground block text-xs" htmlFor={id}>
        {label.root}
      </Label>

      <div className="grid min-w-0 grid-cols-[55fr_45fr] gap-1">
        <Input
          aria-label={label.date}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          className="invalid:border-destructive"
          id={id}
          onBlur={handleDateBlur}
          onChange={handleDateChange}
          onKeyDown={handleKeyDown}
          pattern={dateRegex.source}
          placeholder="mm/dd/yyyy"
          required
          size="sm"
          spellCheck={false}
          title={label.date}
          type="text"
          value={dateValue}
        />

        <Input
          aria-label={label.time}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          className="invalid:border-destructive"
          onBlur={handleTimeBlur}
          onChange={handleTimeChange}
          onKeyDown={handleKeyDown}
          pattern={timeRegex.source}
          placeholder="hh:mm AM/PM"
          required
          size="sm"
          spellCheck={false}
          title={label.time}
          type="text"
          value={timeValue}
        />
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Component: CalendarRangeInput
 * -------------------------------------------------------------------------- */

type CalendarRangeInputProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'disabled' | 'onSelect'
> & {
  disabled?: Matcher | Matcher[];
  onSelect?: SelectRangeEventHandler;
  selected?: DateRange;
};

function CalendarRangeInput({
  selected,
  disabled,
  onSelect,
  className,
  ...props
}: CalendarRangeInputProps): React.JSX.Element {
  const from = createDate(selected?.from, 0, 0, 0, 0);
  const to = createDate(selected?.to, 23, 59, 59, 999);

  return (
    <div className={cn('flex flex-col gap-x-4 gap-y-2', className)} {...props}>
      <CalendarDateTimeInput
        date={from}
        disabled={matcherToArray(disabled)}
        label={{ date: 'Start date', root: 'Start', time: 'Start time' }}
        maxDate={to}
        onChange={(date, event) =>
          onSelect?.({ from: date, to }, date, {}, event)
        }
      />

      <CalendarDateTimeInput
        date={to}
        disabled={matcherToArray(disabled)}
        label={{ date: 'End date', root: 'End', time: 'End time' }}
        minDate={from}
        onChange={(date, event) =>
          onSelect?.({ from, to: date }, date, {}, event)
        }
      />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Component: CalendarDay
 * -------------------------------------------------------------------------- */

function CalendarDay(props: DayProps): React.JSX.Element {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);
  const range = useSelectRange();

  const handleClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (event) => {
      if (!isSelectedDayDateRange(dayRender.selectedDays)) {
        dayRender.buttonProps.onClick?.(event);

        return;
      }

      const day = getDateByRange(
        new Date(props.date.getTime()),
        dayRender.selectedDays,
      );

      range.onDayClick?.(day, dayRender.activeModifiers, event);
    },
    [dayRender, props.date, range],
  );

  if (dayRender.isHidden) {
    return <div role="gridcell" />;
  }

  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />;
  }

  return (
    <Button
      name="day"
      ref={buttonRef}
      {...dayRender.buttonProps}
      onClick={handleClick}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: Calendar
 * -------------------------------------------------------------------------- */

function ChevronLeft(rest: StyledComponent): React.JSX.Element {
  return <ChevronLeftIcon {...rest} size={16} />;
}

function ChevronRight(rest: StyledComponent): React.JSX.Element {
  return <ChevronRightIcon {...rest} size={16} />;
}

export type CalendarProps = DayPickerProps & {
  // Show the date range input when the mode is `range`.
  showDateRangeInput?: boolean;
};

export function Calendar({
  showDateRangeInput,
  classNames,
  ...props
}: CalendarProps): React.JSX.Element {
  return (
    <>
      {props.mode === 'range' && showDateRangeInput ? (
        <CalendarRangeInput
          className={cn(
            'mb-4',
            props.numberOfMonths && props.numberOfMonths > 1 && 'sm:flex-row',
          )}
          disabled={props.disabled}
          onSelect={props.onSelect}
          selected={props.selected}
        />
      ) : null}

      <DayPicker
        classNames={{
          caption: 'relative flex items-center justify-center',
          caption_dropdowns: 'relative inline-flex gap-4',
          caption_label: cx([
            'inline-flex items-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium',
            'ring-offset-background',
            'peer-hover:border-input peer-hover:bg-accent',
            'peer-focus:ring-ring peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2',
          ]),
          cell: cx([
            'cell relative flex h-8 flex-1 items-center justify-center px-0.5 first:rounded-l-md last:rounded-r-md',
            '[&:has(.weeknumber)+&]:rounded-l-md',
            '[&:has(.day-range-middle)]:bg-accent',
            '[&:has(.day-range-end:not(.day-range-start))]:before:bg-accent [&:has(.day-range-end:not(.day-range-start))]:before:absolute [&:has(.day-range-end:not(.day-range-start))]:before:inset-y-0 [&:has(.day-range-end:not(.day-range-start))]:before:left-0 [&:has(.day-range-end:not(.day-range-start))]:before:w-1/2',
            '[&:has(.day-range-start:not(.day-range-end))]:after:bg-accent [&:has(.day-range-start:not(.day-range-end))]:after:absolute [&:has(.day-range-start:not(.day-range-end))]:after:inset-y-0 [&:has(.day-range-start:not(.day-range-end))]:after:right-0 [&:has(.day-range-start:not(.day-range-end))]:after:w-1/2',
          ]),
          day: cx([
            'day relative z-40 flex size-8 items-center justify-center rounded-md border border-transparent text-center text-sm',
            '[&:not(.day-today,[disabled])]:hover:border-primary',
          ]),
          day_disabled: 'disabled:text-muted-foreground/25',
          day_outside: 'text-muted-foreground/75',
          day_range_end: 'day-range-end',
          day_range_middle: 'day-range-middle [&:not(.day-today)]:bg-accent',
          day_range_start: 'day-range-start',
          day_selected: cx([
            'bg-primary',
            'ring-offset-background',
            'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            '[&:not(.day-range-middle)]:text-primary-foreground',
            '[&:is(.day-today):not(.day-range-middle)]:border-primary',
            '[&:is(.day-today):not(.day-range-middle)]:bg-primary',
          ]),
          day_today:
            'day-today bg-primary/10 [&:not([disabled])]:hover:border-primary text-primary',
          dropdown: 'peer absolute inset-0 text-sm font-medium opacity-0',
          dropdown_icon: 'size-2',
          dropdown_month: 'relative inline-flex items-center',
          dropdown_year: 'relative inline-flex items-center',
          head: 'block',
          head_cell:
            'text-muted-foreground flex-1 text-xs font-medium uppercase',
          head_row: 'flex',
          month: 'w-full space-y-4',
          months: 'flex flex-col gap-4 sm:flex-row',
          nav: '',
          nav_button: twMerge(
            buttonVariants({
              icon: true,
              size: 'sm',
              variant: 'outline',
            }),
            'absolute inset-y-0',
          ),
          nav_button_next: 'right-0',
          nav_button_previous: 'left-0',
          row: 'my-1 flex',
          table: 'block table-fixed border-collapse',
          tbody: 'block',
          vhidden: 'hidden',
          weeknumber: 'weeknumber text-xs',
          ...classNames,
        }}
        components={{
          Day: props.mode === 'range' ? CalendarDay : undefined,
          IconLeft: ChevronLeft,
          IconRight: ChevronRight,
        }}
        showOutsideDays
        {...props}
      />
    </>
  );
}
