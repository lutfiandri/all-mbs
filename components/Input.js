import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

export function CustomTextInput({ name, data, setData, placeholder }) {
  return (
    <FormControl isRequired mb={4}>
      <FormLabel htmlFor={name}>{placeholder}</FormLabel>
      <Input
        id={name}
        placeholder={placeholder}
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
    </FormControl>
  );
}

export function CustomNumberInput({ name, data, setData, placeholder }) {
  return (
    <FormControl isRequired mb={4}>
      <FormLabel htmlFor={name}>{placeholder}</FormLabel>
      <NumberInput max={10000} min={0}>
        <NumberInputField
          id={name}
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder={placeholder}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}
