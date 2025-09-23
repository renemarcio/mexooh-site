import { useState } from "react";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";

type DayLike = Date | string | number;

function toDate(v: DayLike): Date {
  return v instanceof Date ? v : new Date(v);
}

function getDay(date: Date) {
  return date.getDay();
}

function startOfWeek(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - getDay(date));
}

function endOfWeek(date: Date) {
  return dayjs(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - getDay(date)))
  )
    .endOf("date")
    .toDate();
}

function isInWeekRange(date: DayLike, value: Date | null) {
  const d = toDate(date);
  return value
    ? dayjs(d).isBefore(endOfWeek(value)) && dayjs(d).isAfter(startOfWeek(value))
    : false;
}

export default function WeekPicker() {
  const [hovered, setHovered] = useState<Date | null>(null);
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Calendar
      withCellSpacing={false}
      getDayProps={(date) => {
        // Mantine da sua versão entrega `date` como string; normalizamos:
        const d = toDate(date);

        const isHovered = isInWeekRange(d, hovered);
        const isSelected = isInWeekRange(d, value);
        const isInRange = isHovered || isSelected;

        return {
          onMouseEnter: () => setHovered(d),
          onMouseLeave: () => setHovered(null),
          inRange: isInRange,
          firstInRange: isInRange && d.getDay() === 1, // segunda
          lastInRange: isInRange && d.getDay() === 0,  // domingo
          selected: isSelected,
          onClick: () => setValue(d),
        };
      }}
    />
  );
}
