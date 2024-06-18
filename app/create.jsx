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

const create = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/post`,
        data
      );

      router.push("/");
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  return (
    <StyledView className="flex-1 justify-center p-0.5">
      <StyledText className="text-center text-xl mb-5">
        Create new Post
      </StyledText>

      <StyledText className="mb-2">Title</StyledText>
      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledTextInput
            className="h-10 border border-gray-400 mb-2 px-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Title"
          />
        )}
        rules={{
          minLength: {
            value: 3,
            message: "Title must contain minimum of 3 character",
          },
          required: "Title is required",
        }}
      />
      {errors.title && console.log(errors.title)}
      {errors.title && <Text>{errors.title.message}</Text>}

      <StyledText className="mb-2">Body</StyledText>
      <Controller
        name="body"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledTextInput
            className="h-10 border border-gray-500 mb-2 px-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Body"
          />
        )}
        rules={{
          minLength: {
            value: 3,
            message: "Body must contain minimum of 3 character",
          },
          required: "Body is required",
        }}
      />

      {errors.body && <Text>{errors.body.message}</Text>}

      <StyledButton title="Submit" onPress={handleSubmit(submit)} />
    </StyledView>
  );
};

export default create;
