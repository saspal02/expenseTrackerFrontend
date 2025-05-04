import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProfileHeader from './ProfileHeader';
import Spends from './Spends';


const HomeScreen = () => {
  const [totalExpense, setTotalExpense] = useState(0); // Track total expense
  const [expenseLimit, setExpenseLimit] = useState(0); // Track expense limit

  const handleLimitSet = (limit: number) => {
    setExpenseLimit(limit);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader />
      {/* Spends List */}
      <Spends setTotalExpense={setTotalExpense} expenseLimit={expenseLimit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
});

export default HomeScreen;
