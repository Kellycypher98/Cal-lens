import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { foodDatabase } from "../data/foodDatabase";
import { Feather } from '@expo/vector-icons';

export default function AddFoodScreen() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = foodDatabase.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-emerald-500 pt-12 pb-4 px-6 rounded-b-3xl shadow-md">
        <Text className="text-2xl font-bold text-white mb-2">Add Food</Text>
        <Text className="text-white text-opacity-80">Search and add food to your daily log</Text>
      </View>
      
      {/* Search bar */}
      <View className="px-4 -mt-6">
        <View className="bg-white rounded-xl shadow px-3 py-2 flex-row items-center border border-gray-100">
          <Feather name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 py-3 text-base"
            placeholder="Search for food..."
            value={search}
            onChangeText={handleSearch}
            placeholderTextColor="#9CA3AF"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Feather name="x" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Results list */}
      <View className="px-4 flex-1 mt-4">
        {results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-white mb-3 rounded-xl p-4 flex-row items-center shadow-sm border border-gray-100">
                <View className="h-12 w-12 bg-emerald-100 rounded-lg items-center justify-center mr-3">
                  <Feather name="coffee" size={20} color="#059669" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800 text-base">{item.name}</Text>
                  <Text className="text-gray-500 text-sm">{item.calories} cal | {item.serving_size}</Text>
                </View>
                <Feather name="plus-circle" size={24} color="#059669" />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              search.length > 0 && (
                <View className="items-center justify-center py-8">
                  <Text className="text-gray-400">No results found</Text>
                </View>
              )
            }
          />
        ) : search.length === 0 ? (
          <View className="mt-6">
            <Text className="text-base font-medium text-gray-700 mb-4">Recent Foods</Text>
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <Text className="text-gray-400 text-center py-4">Your recent foods will appear here</Text>
            </View>
            
            <Text className="text-base font-medium text-gray-700 mt-6 mb-4">Popular Foods</Text>
            {[1, 2, 3].map((i) => (
              <TouchableOpacity key={i} className="bg-white mb-3 rounded-xl p-4 flex-row items-center shadow-sm border border-gray-100">
                <View className="h-12 w-12 bg-emerald-100 rounded-lg items-center justify-center mr-3">
                  <Feather name="coffee" size={20} color="#059669" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800 text-base">
                    {["Greek Yogurt", "Chicken Breast", "Mixed Salad"][i-1]}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {["150 cal | 1 cup", "165 cal | 100g", "45 cal | 1 bowl"][i-1]}
                  </Text>
                </View>
                <Feather name="plus-circle" size={24} color="#059669" />
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
      
      {/* Bottom Action Bar */}
      {results.length > 0 && (
        <View className="px-4 py-3 bg-white border-t border-gray-200">
          <TouchableOpacity className="bg-emerald-500 py-3 rounded-xl items-center">
            <Text className="text-white font-semibold text-base">Add Custom Food</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}