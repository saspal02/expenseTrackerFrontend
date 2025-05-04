import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      {/* Logo on the left */}
      <Image
        source={require('assets/images/logo.png')} // Replace with your logo URL
        style={styles.logo}
      />

      {/* Title centered */}
      <View style={styles.titleWrapper}>
        <Text style={styles.appName}>Expense Tracker</Text>
      </View>

      {/* Profile Image on the right */}
      <Image
        source={require('assets/images/avatar.png')} // Replace with real image later
        style={styles.profileImage}
      />
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures logo is left and profile image is right
    marginBottom: 24,
    position: 'relative',
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 10, // Space from the left edge
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10, // Space from the right edge
  },
});
