import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const Rule = () => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); // Set an initial value as null
  const [items, setItems] = useState([
    { label: 'Top 1', value: '1' },
    { label: 'Top 2', value: '2' },
    { label: 'Top 3', value: '3' },
  ]);

  const handleInputChange = (text) => {
    // Regular expression to match float values
    const regex = /^-?\d*(\.\d*)?$/;
    if (regex.test(text) || text === '') {
      setInputValue(text);
    }
  };

  const handleDropdownChange = (item) => {
    setValue(item.value);
  };

  const onpresshandler = () => {
    console.log('TextInput Value:', inputValue);
    console.log('Dropdown Value:', value);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100 }}>
        <Text style={{ fontSize: 20, paddingTop: 4, fontFamily: 'Poppins-Regular', left: 20 }}>Rules No 1</Text>
      </View>
      <TextInput
        placeholder='Enter Cgpa'
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        keyboardType="numeric"
      />
      <View style={styles.dropdown}>
        <Text style={{ fontSize: 20, paddingTop: 4, fontFamily: 'Poppins-Regular', left: 20 }}>Rules No 2</Text>
        <DropDownPicker
          placeholder='Select Top'
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue} // Pass the function directly
          setItems={setItems}
          style={{
            backgroundColor: '#CBEDD5',
          }}
          maxHeight={200}
        />
      </View>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => { onpresshandler() }}>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Rule;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CBEDD5",
    flex: 1
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10,
    left: 30
  },
  dropdown: {
    marginTop: 10
  },
  btn: {
    marginTop: 140,
    alignItems: 'center',
    backgroundColor: "#54B435",
    marginLeft: 75,
    marginRight: 90,
    justifyContent: 'center',
    width: 180,
    height: 50,
    borderRadius: 15,
  },
});
