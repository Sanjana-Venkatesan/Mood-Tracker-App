import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  SafeAreaView
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';


 function HistoryScreen() {
  const [moods, setMoods] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  const moodGradients = {
    Happy: ['#FFE259', '#FFA751'],
    Sad: ['#74ebd5', '#ACB6E5'],
    Excited: ['#FF416C', '#FF4B2B'],
    Tired: ['#8E2DE2', '#4A00E0'],
    Angry: ['#f5576c', '#f093fb'],
    Calm: ['#2ecc71', '#26c281'],
    Anxious: ['#F7971E', '#FFD200'],
    Grateful: ['#11998e', '#38ef7d'],
    Inspired: ['#8E2DE2', '#4A00E0'],
    Confident: ['#00B4DB', '#0083B0']
  };

  const moodIcons = {
    Happy: '😊',
    Sad: '😢',
    Excited: '🤩',
    Tired: '😴',
    Angry: '😠',
    Calm: '😌',
    Anxious: '😰',
    Grateful: '🙏',
    Inspired: '💫',
    Confident: '💪'
  };

  useEffect(() => {
    fetchMoods();
    animateEntrance();
  }, []);

  const fetchMoods = async () => {
    try {
      const response = await fetch('https://quotes-for-your-moodz.onrender.com/moods');
      const data = await response.json();
      setMoods(data.reverse()); // Show newest first
    } catch (error) {
      console.error('Error fetching moods:', error);
    }
  };

  const animateEntrance = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const MoodCard = ({ mood, date, index }) => {
    const animatedStyle = {
      opacity: fadeAnim,
      transform: [
        { translateY: slideAnim },
        { 
          scale: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
    };

    return (
      <Animated.View 
        style={[
          styles.moodCard,
          animatedStyle,
          { marginTop: index === 0 ? 20 : 0 }
        ]}
      >
        <LinearGradient
          colors={moodGradients[mood] || ['#bdc3c7', '#2c3e50']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.moodCardGradient}
        >
          <View style={styles.moodCardContent}>
            <View style={styles.moodIconContainer}>
              <Text style={styles.moodIcon}>{moodIcons[mood] || '😐'}</Text>
            </View>
            <View style={styles.moodCardInfo}>
              <Text style={styles.moodText}>{mood}</Text>
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const MoodSummary = () => {
    const moodCounts = moods.reduce((acc, { mood }) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});

    const topMood = Object.entries(moodCounts)
      .sort(([, a], [, b]) => b - a)[0];

    return topMood ? (
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Mood Summary</Text>
        <Text style={styles.summaryText}>
          Most frequent mood: {topMood[0]} ({topMood[1]} times)
        </Text>
      </View>
    ) : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <MoodSummary />
        
        {moods.map((moodEntry, index) => (
          <MoodCard
            key={index}
            mood={moodEntry.mood}
            date={moodEntry.date}
            index={index}
          />
        ))}
        
        {moods.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No mood entries yet. Start tracking your moods!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({

  // History Screen Styles
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  moodCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  moodCardGradient: {
    padding: 16,
  },
  moodCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  moodIcon: {
    fontSize: 24,
  },
  moodCardInfo: {
    flex: 1,
  },
  moodText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#4A4A4A',
    textAlign: 'center',
  }
});