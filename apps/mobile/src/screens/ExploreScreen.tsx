import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF9F5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Explore Map</Text>
      <Text style={{ color: '#888', marginTop: 10 }}>Coming in Day 4!</Text>
    </SafeAreaView>
  );
}