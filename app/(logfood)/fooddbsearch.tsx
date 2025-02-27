import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { foodDatabase } from "../data/foodDatabase";

export default function AddFoodScreen() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (query: string) => {
    setSearch(query);
    const filtered = foodDatabase.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-4">Search Food</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-4 mb-4"
        placeholder="Search for food..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="p-4 bg-gray-100 mb-2 rounded-lg">
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
