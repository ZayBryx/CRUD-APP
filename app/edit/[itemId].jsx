import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styled } from "nativewind";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledButton = styled(Button);

const update = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [post, setPost] = useState({ title: "", body: "" });
  const { itemId } = useLocalSearchParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(
          `https://api-practice-r4qr.onrender.com/api/post/${itemId}`
        );
        setPost(data);
        setValue("title", data.title);
        setValue("body", data.body);
      } catch (error) {
        console.error("ERROR: " + error);
      }
    };

    getPost();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `https://api-practice-r4qr.onrender.com/api/post/${itemId}`,
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

export default update;
