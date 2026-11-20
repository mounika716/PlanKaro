import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Search, Zap, Coffee } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Mounika! 👋</Text>
            <View style={styles.locationContainer}>
              <MapPin color="#FF6B35" size={16} />
              <Text style={styles.locationText}>Hyderabad, India</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color="#999" size={20} />
          <TextInput 
            placeholder="Where do you want to go?" 
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity style={[styles.categoryChip, { backgroundColor: '#FF6B35' }]}>
            <Text style={styles.categoryTextActive}>Plan Outing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryText}>Cafes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryText}>Adventure</Text>
          </TouchableOpacity>
        </View>

        {/* Trending Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Experiences</Text>
          <View style={styles.card}>
            <View style={styles.cardIconBg}>
              <Zap color="#FFF" size={28} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Wonderla Amusement Park</Text>
              <Text style={styles.cardSubtitle}>Starting from ₹999 • 5 hours</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={[styles.cardIconBg, { backgroundColor: '#4ECDC4' }]}>
              <Coffee color="#FFF" size={28} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Chai & Chill Cafe</Text>
              <Text style={styles.cardSubtitle}>Budget friendly • ₹299 for 2</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F5' },
  header: { padding: 20, paddingTop: 10 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  locationText: { color: '#666', marginLeft: 4, fontSize: 14 },
  searchContainer: { flexDirection: 'row', backgroundColor: '#FFF', margin: 20, marginTop: 10, borderRadius: 15, padding: 15, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  categories: { flexDirection: 'row', paddingHorizontal: 20, gap: 10 },
  categoryChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#FFE4D6' },
  categoryTextActive: { color: '#FFF', fontWeight: 'bold' },
  categoryText: { color: '#FF6B35', fontWeight: 'bold' },
  section: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 20, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, alignItems: 'center' },
  cardIconBg: { backgroundColor: '#FF6B35', width: 60, height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 13, color: '#888', marginTop: 4 },
});