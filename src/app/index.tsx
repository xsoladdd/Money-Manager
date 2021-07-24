import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import ButtonX from '../components/Button';
import Wrapper from '../components/Wrapper';
import {textColor} from '../styles/styles';
import EntryModal from '../components/SmartComponent/EntryModal';

// import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {itemStructure} from 'global';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [alertStatus, setAlertStatus] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [dataStore, setDataStore] = useState<itemStructure[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalLeft, setTotalLeft] = useState(0);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('dataStorage');
      // return jsonValue != null ?  : ;
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue) as itemStructure[];
        const totalExpense = data.reduce(
          (a, {value, transaction}) =>
            transaction === 'minus' ? a + value : a + 0,
          0,
        );
        const totalLeft = data.reduce((a, {value, transaction}) => {
          if (transaction === 'add') {
            return a + value;
          } else {
            return a - value;
          }
        }, 0);
        // const totalExpense = data.map(({transaction, value}) => {});
        setDataStore(data);
        setTotalLeft(totalLeft);
        setTotalExpense(totalExpense);
      } else {
        setTotalExpense(0);
        setTotalLeft(0);
        setDataStore([]);
      }
    } catch (e) {
      // error reading value
    }
  };

  const deleteEntry = async (itemID: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem('dataStorage');
      let dataArray = JSON.parse(
        typeof jsonValue === 'string' ? jsonValue : '[]',
      ) as itemStructure[];

      const newArray = dataArray.filter(({id}) => id !== itemID);
      // console.log(newArray);
      await AsyncStorage.setItem('dataStorage', JSON.stringify(newArray));
      setTrigger(!trigger);
      // setDataStore(data);
      // setTotalLeft(totalLeft);
      // setTotalExpense(totalExpense);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    if (!alertStatus) {
      getData();
    }
    return () => {};
  }, [trigger, alertStatus]);

  return (
    <>
      <EntryModal
        status={alertStatus}
        dismissModal={() => setAlertStatus(false)}></EntryModal>
      <Wrapper>
        <View>
          <Text
            style={[
              textColor,
              {fontWeight: 'bold', fontSize: 30, paddingBottom: 36},
            ]}>
            Money Manager
          </Text>
        </View>
        {/* Amounts */}
        <View
          style={{
            paddingLeft: 30,
            width: '100%',
            paddingBottom: 5,
          }}>
          <Text style={[textColor, {fontWeight: 'bold', fontSize: 20}]}>
            Total Expense : {totalExpense}
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 30,
            width: '100%',
            paddingBottom: 15,
          }}>
          <Text
            style={[
              textColor,
              {paddingLeft: 22, fontWeight: 'bold', fontSize: 20},
            ]}>
            What's Left : {totalLeft}
          </Text>
        </View>
        {/* Buttons */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            paddingBottom: 30,
          }}>
          <ButtonX onClick={() => setAlertStatus(true)} color="#2f89fc">
            New Entry
          </ButtonX>
          <ButtonX
            onClick={() => {
              setTrigger(!trigger);
              AsyncStorage.removeItem('dataStorage');
            }}
            color="#ff5959">
            Reset Data
          </ButtonX>
        </View>
        {/* List */}
        <View>
          {dataStore !== null &&
            dataStore.map(({id, transaction, value, description}) => {
              return (
                <View key={id} style={{display: 'flex', flexDirection: 'row'}}>
                  <View style={{width: 40, marginRight: 30}}>
                    <ButtonX color="#ff5959" onClick={() => deleteEntry(id)}>
                      -
                    </ButtonX>
                  </View>
                  <View>
                    <Text
                      style={[textColor, {fontWeight: '700', fontSize: 20}]}>
                      {description}
                    </Text>
                    <Text
                      style={[
                        textColor,
                        // {fontWeight: 'bold', fontSize: 30, paddingBottom: 36},
                      ]}>
                      {transaction === 'add' ? '+' : '- '} {value}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      </Wrapper>
    </>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
