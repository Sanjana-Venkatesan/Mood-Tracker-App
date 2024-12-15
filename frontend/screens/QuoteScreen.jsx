import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
  // Quote screen specific styles
  gradientBackground: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  moodHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  moodText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 10,
  },
  quoteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginVertical: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minHeight: 150,
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#4A4A4A',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#4A00E0',
    fontSize: 16,
    fontWeight: '600',
  },
});

const { width } = Dimensions.get('window');
const MOOD_BUTTON_WIDTH = width * 0.42;
const MOOD_BUTTON_MARGIN = 8;

export function QuoteScreen({ route, navigation }) {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const { mood } = route.params;

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    setLoading(true);
    fetch(`https://quotes-for-your-moodz.onrender.com/quote/${mood.name}`)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.text || 'No quote available for this mood.');
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching quote:', err);
        setQuote('Unable to load quote at this time.');
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={mood.gradient}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.moodHeader}>
            <Text style={styles.moodIcon}>{mood.icon}</Text>
            <Text style={styles.moodText}>You're feeling {mood.name}</Text>
          </View>

          <View style={styles.quoteContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#4A00E0" />
            ) : (
              <Text style={styles.quoteText}>{quote}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Choose Another Mood</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
