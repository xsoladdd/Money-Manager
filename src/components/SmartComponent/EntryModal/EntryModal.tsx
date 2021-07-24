import React, {Fragment, useState} from 'react';
import {Modal, View, Text, TextInput} from 'react-native';
import Button from '../../Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioButton} from 'react-native-paper';
import {textColorReverse} from '../../../styles/styles';
import {makeId} from '../../../utils/generateId';
import {itemStructure, transaction} from 'global';
// import {transaction as transactionType} from 'global';

interface EntryModalProps {
  status?: boolean;
  setStatus?: (status: boolean) => void;
  dismissModal: () => void;
}

const EntryModal: React.FC<EntryModalProps> = ({
  status = false,
  dismissModal = () => console.log('dismiss'),
}) => {
  const [transaction, setTransaction] = useState<transaction>('minus');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const saveInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('dataStorage');
      let dataArray = JSON.parse(
        typeof jsonValue === 'string' ? jsonValue : '[]',
      );
      // const id = await shortID.generate();
      // console.log(x[0]);
      const newRecord: itemStructure = {
        id: makeId(),
        value: parseInt(amount),
        transaction: transaction,
        description,
      };
      dataArray.push(newRecord);
      await AsyncStorage.setItem('dataStorage', JSON.stringify(dataArray));
      setAmount('');
      setDescription('');
      setTransaction('minus');
      return dismissModal();
    } catch (e) {
      // error reading value
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={status}
      onRequestClose={() => {
        dismissModal();
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
        <View
          style={{
            padding: 10,
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
            shadowColor: '#000',
          }}>
          {/* TITLE */}
          <Text
            style={{
              marginBottom: 15,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Add New Entry
          </Text>
          <View style={{paddingBottom: 0, alignItems: 'center'}}>
            <Text style={{}}>Select Transaction</Text>
            <RadioButton.Group
              onValueChange={value =>
                setTransaction(value === 'add' ? 'add' : 'minus')
              }
              value={transaction}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <RadioButton.Item label="ADD" value="add" />
                <RadioButton.Item label="SUB" value="minus" />
              </View>
            </RadioButton.Group>
          </View>
          <View
            style={{
              paddingBottom: 10,
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Text>Amount</Text>
            <TextInput
              style={[
                textColorReverse,
                {
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  borderRadius: 5,
                  width: 120,
                },
              ]}
              onChangeText={text => {
                return setAmount(text);
              }}
              value={amount}
              placeholder=""
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              paddingBottom: 10,
              alignItems: 'center',
              // display: 'flex',
              // flexDirection: 'row',
            }}>
            <Text style={{}}>Description</Text>
            <TextInput
              style={[
                textColorReverse,
                {
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  borderRadius: 5,
                  width: 300,
                },
              ]}
              onChangeText={text => {
                return setDescription(text);
              }}
              value={description}
              placeholder=""
              keyboardType="default"
            />
          </View>
          <View
            style={{
              display: 'flex',
              width: '100%',
            }}>
            <Button
              onClick={() => {
                // console.log('Add Transaction');
                saveInfo();
              }}>
              Add Transaction
            </Button>

            <Button
              onClick={() => {
                console.log('Add Transaction');
                setAmount('');
                dismissModal();
              }}
              color="#f85959">
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default EntryModal;
