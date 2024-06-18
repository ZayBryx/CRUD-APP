import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";

const Home = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(
          "https://api-practice-r4qr.onrender.com/api/post"
        );
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    getPost();
  }, [post]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api-practice-r4qr.onrender.com/api/post/${id}`
      );
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleAdd = async () => {
    try {
      const { data } = await axios.post();
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  return (
    <SafeAreaView className="gap-5 p-1">
      <ScrollView className="mt-2 p-3">
        {post.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => router.push(`/edit/${item._id}`)}
            className="mb-4 p-4 border border-gray-300 rounded-md bg-white flex-row justify-between items-center"
          >
            <View>
              <Text className="text-lg font-bold mb-2">{item.title}</Text>
              <Text className="text-base">{item.body}</Text>
            </View>
            <TouchableOpacity
              className="bg-red-500 p-2 rounded-md"
              onPress={() => handleDelete(item._id)}
            >
              <Text className="text-white">Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
