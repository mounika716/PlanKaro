import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Compass, CalendarPlus, Ticket, User } from 'lucide-react-native';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// ⚠️ YOUR API IP ADDRESS
const API_URL = 'http://10.172.147.70:4000/api/auth'; 

const Tab = createBottomTabNavigator();

// We create a dummy wrapper for the Plan and Bookings tabs for now
const DummyScreen = () => <View style={{ flex: 1, backgroundColor: '#FFF9F5' }} />;

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    const endpoint = isLogin ? '/login' : '/register';
    const body = isLogin ? { email, password } : { name, email, password };
    const finalURL = `${API_URL}${endpoint}`;

    try {
      const response = await fetch(finalURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');

      setUser(data.user);
      Alert.alert('Success', `Welcome ${data.user.name}!`);
    } catch (error: any) {
      Alert.alert('Authentication Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- IF USER IS LOGGED IN, SHOW THE MAIN APP ---
  if (user) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#FF6B35',
            tabBarInactiveTintColor: '#999',
            tabBarStyle: { paddingBottom: 10, paddingTop: 10, height: 70, borderTopWidth: 0, elevation: 0 },
            tabBarIcon: ({ color, size }: { color: string; size: number }) => {
              if (route.name === 'Home') return <Home color={color} size={size} />;
              if (route.name === 'Explore') return <Compass color={color} size={size} />;
              if (route.name === 'Plan') return <CalendarPlus color={color} size={size} />;
              if (route.name === 'Bookings') return <Ticket color={color} size={size} />;
              if (route.name === 'Profile') return <User color={color} size={size} />;
              return null;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Explore" component={ExploreScreen} />
          <Tab.Screen name="Plan" component={DummyScreen} />
          <Tab.Screen name="Bookings" component={DummyScreen} />
          
          {/* TypeScript fix: We pass a render function for Profile to pass the logout prop */}
          <Tab.Screen name="Profile">
            {() => <ProfileScreen onLogout={() => setUser(null)} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  // --- IF USER IS NOT LOGGED IN, SHOW THE AUTH SCREEN ---
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Join PLAN KARO'}</Text>
      
      {!isLogin && (
        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#FFD1B3" value={name} onChangeText={setName} />
      )}
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#FFD1B3" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#FFD1B3" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
        {loading ? <ActivityIndicator color="#FF6B35" /> : <Text style={styles.buttonText}>{isLogin ? 'Log In' : 'Sign Up'}</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>{isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF6B35', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', marginBottom: 30 },
  input: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', borderRadius: 10, padding: 15, marginBottom: 15, fontSize: 16 },
  button: { width: '100%', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FF6B35', fontSize: 18, fontWeight: 'bold' },
  switchText: { color: '#FFF4E6', marginTop: 20, fontSize: 14 },
});