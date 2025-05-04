import { ExpenseDto } from '@/utils/dto/UserDto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomBox from '../components/CustomBox';
import CustomText from '../components/CustomText';
import Expense from '../components/Expense';
import Heading from '../components/Heading';

type SpendsProps = {
  setTotalExpense: (total: number) => void;
  expenseLimit: number;
};

const Spends: React.FC<SpendsProps> = ({ setTotalExpense, expenseLimit }) => {
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Calculate and update total expense whenever expenses array changes
  useEffect(() => {
    if (expenses.length > 0) {
      const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      setTotalExpense(total);
    } else {
      setTotalExpense(0);
    }
  }, [expenses, setTotalExpense]);

  const fetchExpenses = async () => {
    try {
      const SERVER_BASE_URL = "http://10.0.2.2:8000";
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No access token found.');
      }

      const response = await fetch(`${SERVER_BASE_URL}/expense/v1/getExpense`, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Token is:', accessToken);

      if (!response.ok) {
        throw new Error(`Failed to fetch expenses. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Expenses fetched:', data);

      const transformedExpenses: ExpenseDto[] = data.map((expense: any, index: number) => ({
        key: index + 1,
        amount: expense["amount"],
        merchant: expense["merchant"],
        currency: expense["currency"],
        createdAt: new Date(expense["created_at"]),
      }));
      console.log("Transformed expenses:", transformedExpenses);

      setExpenses(transformedExpenses);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching expenses:', err);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View>
        <Heading props={{ heading: 'spends' }} />
        <CustomBox style={headingBox}>
          <CustomText style={{}}>Loading expenses...</CustomText>
        </CustomBox>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Heading props={{ heading: 'spends' }} />
        <CustomBox style={headingBox}>
          <CustomText style={{}}>Error: {error}</CustomText>
        </CustomBox>
      </View>
    );
  }

  // Calculate remaining budget
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = expenseLimit - totalSpent;
  const isOverBudget = remaining < 0;

  return (
    <View>
      <Heading
        props={{
          heading: 'spends',
        }}
      />
      {expenseLimit > 0 && (
        <CustomBox style={headingBox}>
          <CustomText style={{ fontSize: 16, marginBottom: 10 }}>
            Budget Status: {isOverBudget ? 'Over Budget!' : 'Within Budget'}
          </CustomText>
          <CustomText style={{ color: isOverBudget ? '#FF6347' : '#228B22' }}>
            {isOverBudget ? 'Overspent by: ' : 'Remaining: '} 
            {Math.abs(remaining).toFixed(2)} {expenses.length > 0 ? expenses[0].currency : ''}
          </CustomText>
        </CustomBox>
      )}
      <CustomBox style={headingBox}>
        <View style={styles.expenses}>
          {expenses.map(expense => (
            <Expense key={expense.key} props={expense} />
          ))}
        </View>
      </CustomBox>
    </View>
  );
};

export default Spends;

const styles = StyleSheet.create({
  expenses: {
    marginTop: 20,
  },
});

const headingBox = {
  mainBox: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  shadowBox: {
    backgroundColor: 'gray',
  },
  styles: {
    marginTop: 20,
  },
};