import {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from './Button';
import Row from './Row';

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleTap = (value?: number | string) => {
    if (currentValue === '0') {
      setCurrentValue(`${value}`);
    } else setCurrentValue(`${currentValue}${value}`);
  };

  const handleOperator = (operator: string) => {
    setOperator(operator);
    setPreviousValue(currentValue);
    setCurrentValue('0');
  };

  const handleClear = () => {
    setCurrentValue('0');
    setOperator(null);
    setPreviousValue(null);
  };

  const handleEqual = () => {
    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue as string);
    let calcuatedValue = '0';
    switch (operator) {
      case '+':
        calcuatedValue = `${previous + current}`;
        break;
      case '-':
        calcuatedValue = `${previous - current}`;
        break;
      case '*':
        calcuatedValue = `${previous * current}`;
        break;
      case '/':
        calcuatedValue = `${previous / current}`;
        break;
    }
    setCurrentValue(calcuatedValue);
    const localHistory = history;
    const recentCalculation = `${previous} ${operator} ${current} = ${calcuatedValue}`;
    localHistory.push(recentCalculation);
    setHistory(localHistory);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          {history.map((item, index) => (
            <Text key={index} style={styles.history}>
              {item}
            </Text>
          ))}
        </ScrollView>

        <Text style={styles.value}>
          {parseFloat(currentValue).toLocaleString()}
        </Text>

        <Row>
          <Button text="C" theme="secondary" onPress={handleClear} />

          <Button
            text="+/-"
            theme="secondary"
            onPress={() => setCurrentValue(`${parseFloat(currentValue) * -1}`)}
          />

          <Button
            text="%"
            theme="secondary"
            onPress={() =>
              setCurrentValue(`${parseFloat(currentValue) * 0.01}`)
            }
          />

          <Button text="/" theme="accent" onPress={() => handleOperator('/')} />
        </Row>

        <Row>
          {[7, 8, 9].map(value => (
            <Button
              key={value}
              text={String(value)}
              onPress={() => handleTap(value)}
            />
          ))}
          <Button text="X" theme="accent" onPress={() => handleOperator('*')} />
        </Row>

        <Row>
          {[4, 5, 6].map(value => (
            <Button
              key={value}
              text={String(value)}
              onPress={() => handleTap(value)}
            />
          ))}
          <Button text="-" theme="accent" onPress={() => handleOperator('-')} />
        </Row>

        <Row>
          {[1, 2, 3].map(value => (
            <Button
              key={value}
              text={String(value)}
              onPress={() => handleTap(value)}
            />
          ))}
          <Button text="+" theme="accent" onPress={() => handleOperator('+')} />
        </Row>

        <Row>
          <Button text="0" onPress={() => handleTap(0)} size="double" />
          <Button text="." onPress={() => handleTap('.')} />
          <Button text="=" theme="primary" onPress={handleEqual} />
        </Row>
      </SafeAreaView>
    </View>
  );
};

export default Calculator;

// create styles of app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 48,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
  history: {
    color: '#808080',
    fontSize: 30,
    textAlign: 'right',
    marginRight: 20,
    paddingBottom: 10,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
});
