import React from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styled } from "nativewind";
import axios from "axios";
import { router } from "expo-router";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledButton = styled(Button);

const add = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://api-practice-r4qr.onrender.com/api/post",
        data
      );

      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <StyledView className="flex-1 justify-center p-4">
      <StyledText className="mb-2">Title</StyledText>
      <Controller
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledTextInput
            className="h-10 border border-gray-400 mb-2 px-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Title"
          />
        )}
        name="title"
        defaultValue=""
      />
      {errors.title && (
        <StyledText className="text-red-500 mb-2">
          {errors.title.message}
        </StyledText>
      )}

      <StyledText className="mb-2">Body</StyledText>
      <Controller
        control={control}
        rules={{ required: "Body is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledTextInput
            className="h-10 border border-gray-400 mb-2 px-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Body"
            multiline
            numberOfLines={4}
          />
        )}
        name="body"
        defaultValue=""
      />
      {errors.body && (
        <StyledText className="text-red-500 mb-2">
          {errors.body.message}
        </StyledText>
      )}

      <StyledButton title="Submit" onPress={handleSubmit(onSubmit)} />
    </StyledView>
  );
};

export default add;
