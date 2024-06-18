import { View, Text, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import React from "react";

const FormInputController = () => {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          <TextInput />;
        }}
      />
    </View>
  );
};

export default FormInputController;
