import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>
      <View style={styles.about}>
        <Text>Sobre mí:</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Nulla tristique arcu a lectus blandit fringilla. 
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  about: {
    textAlign: 'center',
  },
});

export default ProfileScreen;