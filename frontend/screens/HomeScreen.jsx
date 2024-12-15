// HomeScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const MOOD_BUTTON_WIDTH = width * 0.42; // Adjust width for responsive design
const MOOD_BUTTON_MARGIN = 8; // Margin between buttons

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    flex: 1,
  },
  historyButton: {
    marginLeft: 16,
  },
  historyButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  historyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  moodButtonContainer: {
    width: MOOD_BUTTON_WIDTH,
    marginBottom: MOOD_BUTTON_MARGIN * 2,
  },
  moodButton: {
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    height: 120,
  },
  moodIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default function HomeScreen({ navigation }) {
  const moods = [
    { name: 'Happy', icon: '😊', gradient: ['#FFE259', '#FFA751'] },
    { name: 'Sad', icon: '😢', gradient: ['#74ebd5', '#ACB6E5'] },
    { name: 'Excited', icon: '🤩', gradient: ['#FF416C', '#FF4B2B'] },
    { name: 'Tired', icon: '😴', gradient: ['#8E2DE2', '#4A00E0'] },
    { name: 'Angry', icon: '😠', gradient: ['#f5576c', '#f093fb'] },
    { name: 'Calm', icon: '😌', gradient: ['#2ecc71', '#26c281'] },
    { name: 'Anxious', icon: '😰', gradient: ['#F7971E', '#FFD200'] },
    { name: 'Grateful', icon: '🙏', gradient: ['#11998e', '#38ef7d'] },
    { name: 'Inspired', icon: '💫', gradient: ['#8E2DE2', '#4A00E0'] },
    { name: 'Confident', icon: '💪', gradient: ['#00B4DB', '#0083B0'] },
  ];

  const handleMoodSelect = (selectedMood) => {
    // Log mood to backend
    fetch('https://quotes-for-your-moodz.onrender.com/moods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood: selectedMood.name }),
    }).catch((err) => console.error('Error logging mood:', err));

    // Navigate to quote screen
    navigation.navigate('Quote', { mood: selectedMood });
  };

  const MoodButton = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleMoodSelect(item)}
      activeOpacity={0.8}
      style={styles.moodButtonContainer}
    >
      <SharedElement id={`mood.${item.name}`}>
        <LinearGradient
          colors={item.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.moodButton}
        >
          <Text style={styles.moodIcon}>{item.icon}</Text>
          <Text style={styles.moodButtonText}>{item.name}</Text>
        </LinearGradient>
      </SharedElement>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling today?</Text>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('History')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#4A00E0', '#8E2DE2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.historyButtonGradient}
          >
            <Text style={styles.historyButtonText}>History</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.moodGrid}>
          {moods.map((item) => (
            <MoodButton key={item.name} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
