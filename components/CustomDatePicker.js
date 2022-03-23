import { Box, FormControl } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import id from 'date-fns/locale/id';
import { registerLocale } from 'react-datepicker';
registerLocale('id', id);

export function CustomDatePicker({ date, setStartDate }) {
  const dateToString = (now) => {
    const result = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
    }).format(now);
    return result;
  };

  return (
    <Box w={60} bg="white">
      <FormControl>
        <DatePicker
          locale="id"
          selected={date}
          onChange={(newDate) => setStartDate(newDate)}
          value={dateToString(date)}
        />
      </FormControl>
    </Box>
  );
}
