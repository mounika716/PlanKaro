import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF9F5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Mounika's Profile</Text>
      
      <TouchableOpacity 
        style={{ marginTop: 30, backgroundColor: '#FF6B35', padding: 15, borderRadius: 10 }}
        onPress={onLogout}
      >
        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}